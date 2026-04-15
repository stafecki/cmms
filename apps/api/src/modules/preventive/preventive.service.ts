import { HTTPException } from "hono/http-exception"
import prisma from "../../lib/prisma.js"
import type { PreventivePlan, WorkOrder, Prisma } from "../../../generated/prisma/client.js"
import { WorkOrderStatus, Priority } from "../../../generated/prisma/client.js"
import type {
    CreatePreventivePlanInput,
    UpdatePreventivePlanInput
} from "./preventive.schema.js"

type PreventivePlanWithMachine = Prisma.PreventivePlanGetPayload<{
    include: { machine: true }
}>

type ChecklistItem = {
    step: number
    label: string
    done: boolean
}

const calculateNextRunAt = (
    intervalHours?: number | null,
    intervalDays?: number | null,
    fromDate: Date = new Date()
): Date => {
    const next = new Date(fromDate)

    if (intervalDays) {
        next.setDate(next.getDate() + intervalDays)
    } else if (intervalHours) {
        next.setHours(next.getHours() + intervalHours)
    }

    return next
}

export const getPreventivePlans = async (): Promise<PreventivePlanWithMachine[]> => {
    return prisma.preventivePlan.findMany({
        where: { isActive: true },
        include: { machine: true },
        orderBy: { nextRunAt: "asc" }
    })
}

export const getPreventivePlanById = async (id: string): Promise<PreventivePlanWithMachine> => {
    const plan = await prisma.preventivePlan.findUnique({
        where: { id },
        include: { machine: true }
    })

    if (!plan) {
        throw new HTTPException(404, { message: "Preventive plan not found" })
    }

    return plan
}

export const createPreventivePlan = async (
    input: CreatePreventivePlanInput
): Promise<PreventivePlan> => {
    const machine = await prisma.machine.findUnique({
        where: { id: input.machineId }
    })

    if (!machine || !machine.isActive) {
        throw new HTTPException(404, { message: "Machine not found" })
    }

    const checklist: ChecklistItem[] = input.checklist.map((item) => ({
        ...item,
        done: false
    }))

    const nextRunAt = calculateNextRunAt(input.intervalHours, input.intervalDays)

    return prisma.preventivePlan.create({
        data: {
            machineId: input.machineId,
            name: input.name,
            intervalHours: input.intervalHours,
            intervalDays: input.intervalDays,
            advanceDays: input.advanceDays,
            checklist,
            nextRunAt
        }
    })
}

export const updatePreventivePlan = async (
    id: string,
    input: UpdatePreventivePlanInput
): Promise<PreventivePlan> => {
    const plan = await prisma.preventivePlan.findUnique({ where: { id } })

    if (!plan) {
        throw new HTTPException(404, { message: "Preventive plan not found" })
    }

    const checklist = input.checklist
        ? input.checklist.map((item) => ({ ...item, done: false }))
        : undefined

    return prisma.preventivePlan.update({
        where: { id },
        data: {
            ...input,
            checklist
        }
    })
}

export const deletePreventivePlan = async (id: string): Promise<void> => {
    const plan = await prisma.preventivePlan.findUnique({ where: { id } })

    if (!plan) {
        throw new HTTPException(404, { message: "Preventive plan not found" })
    }

    await prisma.preventivePlan.update({
        where: { id },
        data: { isActive: false }
    })
}

export const getUpcomingPlans = async (days: number = 7): Promise<PreventivePlanWithMachine[]> => {
    const until = new Date()
    until.setDate(until.getDate() + days)

    return prisma.preventivePlan.findMany({
        where: {
            isActive: true,
            nextRunAt: { lte: until }
        },
        include: { machine: true },
        orderBy: { nextRunAt: "asc" }
    })
}

export const triggerPreventiveWorkOrder = async (
    planId: string,
    reportedById: string
): Promise<WorkOrder> => {
    const plan = await prisma.preventivePlan.findUnique({
        where: { id: planId },
        include: { machine: true }
    })

    if (!plan) {
        throw new HTTPException(404, { message: "Preventive plan not found" })
    }

    const workOrder = await prisma.workOrder.create({
        data: {
            machineId: plan.machineId,
            reportedById,
            title: `Przegląd okresowy: ${plan.name}`,
            description: `Automatycznie wygenerowane zlecenie przeglądowe dla maszyny ${plan.machine.name}`,
            priority: Priority.MEDIUM,
            status: WorkOrderStatus.NEW
        }
    })

    const nextRunAt = calculateNextRunAt(
        plan.intervalHours,
        plan.intervalDays,
        new Date()
    )

    await prisma.preventivePlan.update({
        where: { id: planId },
        data: {
            lastRunAt: new Date(),
            nextRunAt
        }
    })

    return workOrder
}

export const checkAndCreatePreventiveOrders = async (): Promise<number> => {
    const now = new Date()
    const admin = await prisma.user.findFirst({
        where: { role: "ADMIN" },
        select: { id: true }
    })

    if (!admin) return 0

    const duePlans = await prisma.preventivePlan.findMany({
        where: {
            isActive: true,
            nextRunAt: { lte: now }
        },
        include: { machine: true }
    })

    let created = 0

    for (const plan of duePlans) {
        const existingOrder = await prisma.workOrder.findFirst({
            where: {
                machineId: plan.machineId,
                title: { contains: plan.name },
                status: { notIn: [WorkOrderStatus.COMPLETED, WorkOrderStatus.CANCELLED] }
            }
        })

        if (!existingOrder) {
            await triggerPreventiveWorkOrder(plan.id, admin.id)
            created++
        }
    }

    return created
}
