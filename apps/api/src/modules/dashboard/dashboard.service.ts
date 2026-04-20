import prisma from '../../lib/prisma.js'
import { WorkOrderStatus, Priority } from '../../../generated/prisma/client.js'

type Period = 'week' | 'month' | 'year'

type WorkOrderStats = {
    total: number
    byStatus: Record<string, number>
    byPriority: Record<string, number>
    open: number
    critical: number
}

type CostStats = {
    totalLaborCost: number
    totalPartsCost: number
    totalCost: number
    topMachinesByCost: {
        machineId: string
        machineName: string
        totalCost: number
    }[]
}

type MachineStats = {
    total: number
    active: number
    mttr: number
    mtbf: number
}

type InventoryStats = {
    totalParts: number
    lowStockCount: number
    activeLoans: number
}

type PreventiveStats = {
    totalPlans: number
    upcomingIn7Days: number
    overdue: number
}

type DashboardData = {
    period: Period
    from: Date
    to: Date
    workOrders: WorkOrderStats
    costs: CostStats
    machines: MachineStats
    inventory: InventoryStats
    preventive: PreventiveStats
}

const getPeriodDates = (period: Period): { from: Date; to: Date } => {
    const to = new Date()
    const from = new Date()

    if (period === 'week') {
        from.setDate(from.getDate() - 7)
    } else if (period === 'month') {
        from.setMonth(from.getMonth() - 1)
    } else {
        from.setFullYear(from.getFullYear() - 1)
    }

    return { from, to }
}

const getWorkOrderStats = async (from: Date, to: Date): Promise<WorkOrderStats> => {
    const workOrders = await prisma.workOrder.findMany({
        where: {
            createdAt: { gte: from, lte: to }
        },
        select: { status: true, priority: true }
    })

    const byStatus: Record<string, number> = {}
    const byPriority: Record<string, number> = {}

    for (const wo of workOrders) {
        byStatus[wo.status] = (byStatus[wo.status] ?? 0) + 1
        byPriority[wo.priority] = (byPriority[wo.priority] ?? 0) + 1
    }

    const open = await prisma.workOrder.count({
        where: {
            status: { in: [WorkOrderStatus.NEW, WorkOrderStatus.IN_PROGRESS, WorkOrderStatus.WAITING_FOR_PARTS] }
        }
    })

    const critical = await prisma.workOrder.count({
        where: {
            priority: Priority.CRITICAL,
            status: { in: [WorkOrderStatus.NEW, WorkOrderStatus.IN_PROGRESS, WorkOrderStatus.WAITING_FOR_PARTS] }
        }
    })

    return {
        total: workOrders.length,
        byStatus,
        byPriority,
        open,
        critical
    }
}

const getCostStats = async (from: Date, to: Date): Promise<CostStats> => {
    const completedOrders = await prisma.workOrder.findMany({
        where: {
            status: WorkOrderStatus.COMPLETED,
            closedAt: { gte: from, lte: to }
        },
        select: {
            laborCost: true,
            partsCost: true,
            machineId: true,
            machine: { select: { name: true } }
        }
    })

    const totalLaborCost = completedOrders.reduce(
        (sum, wo) => sum + Number(wo.laborCost),
        0
    )

    const totalPartsCost = completedOrders.reduce(
        (sum, wo) => sum + Number(wo.partsCost),
        0
    )

    const costByMachine: Record<string, { machineName: string; totalCost: number }> = {}

    for (const wo of completedOrders) {
        if (!costByMachine[wo.machineId]) {
            costByMachine[wo.machineId] = {
                machineName: wo.machine.name,
                totalCost: 0
            }
        }
        costByMachine[wo.machineId].totalCost += Number(wo.laborCost) + Number(wo.partsCost)
    }

    const topMachinesByCost = Object.entries(costByMachine)
        .map(([machineId, data]) => ({ machineId, ...data }))
        .sort((a, b) => b.totalCost - a.totalCost)
        .slice(0, 5)

    return {
        totalLaborCost: Math.round(totalLaborCost * 100) / 100,
        totalPartsCost: Math.round(totalPartsCost * 100) / 100,
        totalCost: Math.round((totalLaborCost + totalPartsCost) * 100) / 100,
        topMachinesByCost: topMachinesByCost
    }
}

const getMachineStats = async (from: Date, to: Date): Promise<MachineStats> => {
    const [total, active] = await Promise.all([
        prisma.machine.count(),
        prisma.machine.count({ where: { isActive: true } })
    ])

    const completedOrders = await prisma.workOrder.findMany({
        where: {
            status: WorkOrderStatus.COMPLETED,
            startedAt: { not: null },
            closedAt: { gte: from, lte: to }
        },
        select: { startedAt: true, closedAt: true, machineId: true, createdAt: true }
    })

    let mttr = 0
    if (completedOrders.length > 0) {
        const totalRepairTime = completedOrders.reduce((sum, wo) => {
            if (wo.startedAt && wo.closedAt) {
                return sum + (wo.closedAt.getTime() - wo.startedAt.getTime())
            }
            return sum
        }, 0)
        mttr = Math.round(totalRepairTime / completedOrders.length / 1000 / 3600)
    }

    const machineOrders = new Map<string, Date[]>()
    for (const wo of completedOrders) {
        if (!machineOrders.has(wo.machineId)) {
            machineOrders.set(wo.machineId, [])
        }
        machineOrders.get(wo.machineId)!.push(wo.createdAt)
    }

    let mtbf = 0
    let mtbfCount = 0

    for (const [, dates] of machineOrders) {
        if (dates.length < 2) continue
        dates.sort((a, b) => a.getTime() - b.getTime())
        for (let i = 1; i < dates.length; i++) {
            mtbf += dates[i].getTime() - dates[i - 1].getTime()
            mtbfCount++
        }
    }

    if (mtbfCount > 0) {
        mtbf = Math.round(mtbf / mtbfCount / 1000 / 3600)
    }

    return { total, active, mttr, mtbf }
}

const getInventoryStats = async (): Promise<InventoryStats> => {
    const [totalParts, activeLoans] = await Promise.all([
        prisma.part.count({ where: { isActive: true } }),
        prisma.toolLoan.count({ where: { returnedAt: null } })
    ])

    const lowStockCount = await prisma.part.count({
        where: {
            isActive: true,
            stockQuantity: { lte: 5 }
        }
    })

    return { totalParts, lowStockCount, activeLoans }
}

const getPreventiveStats = async (): Promise<PreventiveStats> => {
    const now = new Date()
    const in7Days = new Date()
    in7Days.setDate(in7Days.getDate() + 7)

    const [totalPlans, upcomingIn7Days, overdue] = await Promise.all([
        prisma.preventivePlan.count({ where: { isActive: true } }),
        prisma.preventivePlan.count({
            where: {
                isActive: true,
                nextRunAt: { gte: now, lte: in7Days }
            }
        }),
        prisma.preventivePlan.count({
            where: {
                isActive: true,
                nextRunAt: { lt: now }
            }
        })
    ])

    return { totalPlans, upcomingIn7Days, overdue }
}

export const getDashboard = async (period: Period): Promise<DashboardData> => {
    const { from, to } = getPeriodDates(period)

    const [workOrders, costs, machines, inventory, preventive] = await Promise.all([
        getWorkOrderStats(from, to),
        getCostStats(from, to),
        getMachineStats(from, to),
        getInventoryStats(),
        getPreventiveStats()
    ])

    return {
        period,
        from,
        to,
        workOrders,
        costs,
        machines,
        inventory,
        preventive
    }
}
