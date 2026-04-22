import { describe, it, expect, vi, beforeEach } from 'vitest'
import { getDashboard } from '../dashboard.service.js'
import prisma from '../../../lib/prisma.js'
import {
  WorkOrderStatus,
  Priority
} from '../../../../generated/prisma/client.js'

vi.mock('../../../lib/prisma.js', () => ({
  default: {
    workOrder: {
      findMany: vi.fn(),
      count: vi.fn()
    },
    machine: {
      count: vi.fn()
    },
    part: {
      count: vi.fn()
    },
    toolLoan: {
      count: vi.fn()
    },
    preventivePlan: {
      count: vi.fn()
    }
  }
}))

const mockedPrisma = vi.mocked(prisma)

// Pomocnicze factory — unika duplikowania danych w każdym teście
const makeWorkOrder = (overrides = {}) => ({
  status: WorkOrderStatus.COMPLETED,
  priority: Priority.MEDIUM,
  laborCost: 100,
  partsCost: 50,
  machineId: 'machine-1',
  machine: { name: 'Machine Alpha' },
  startedAt: new Date('2024-01-01T08:00:00Z'),
  closedAt: new Date('2024-01-01T10:00:00Z'),
  createdAt: new Date('2024-01-01T07:00:00Z'),
  ...overrides
})

describe('Dashboard Service', () => {
  beforeEach(() => {
    vi.clearAllMocks()

    // Domyślne mocki — każdy test może je nadpisać przez mockResolvedValueOnce
    mockedPrisma.workOrder.findMany.mockResolvedValue([])
    mockedPrisma.workOrder.count.mockResolvedValue(0)
    mockedPrisma.machine.count.mockResolvedValue(0)
    mockedPrisma.part.count.mockResolvedValue(0)
    mockedPrisma.toolLoan.count.mockResolvedValue(0)
    mockedPrisma.preventivePlan.count.mockResolvedValue(0)
  })

  // ─── getPeriodDates (testowane pośrednio przez getDashboard) ───────────────

  describe('period date ranges', () => {
    it('should query with correct date range for "week"', async () => {
      const before = new Date()
      await getDashboard('week')
      const after = new Date()

      const call = mockedPrisma.workOrder.findMany.mock.calls[0][0]
      const { gte, lte } = call.where.createdAt

      const expectedFrom = new Date(before)
      expectedFrom.setDate(expectedFrom.getDate() - 7)

      // tolerancja ±5s na czas wykonania testu
      expect(gte.getTime()).toBeGreaterThanOrEqual(
        expectedFrom.getTime() - 5000
      )
      expect(gte.getTime()).toBeLessThanOrEqual(after.getTime())
      expect(lte.getTime()).toBeGreaterThanOrEqual(before.getTime())
      expect(lte.getTime()).toBeLessThanOrEqual(after.getTime())
    })

    it('should query with correct date range for "month"', async () => {
      const before = new Date()
      await getDashboard('month')

      const call = mockedPrisma.workOrder.findMany.mock.calls[0][0]
      const { gte } = call.where.createdAt

      const expectedFrom = new Date(before)
      expectedFrom.setMonth(expectedFrom.getMonth() - 1)

      expect(gte.getTime()).toBeGreaterThanOrEqual(
        expectedFrom.getTime() - 5000
      )
    })

    it('should query with correct date range for "year"', async () => {
      const before = new Date()
      await getDashboard('year')

      const call = mockedPrisma.workOrder.findMany.mock.calls[0][0]
      const { gte } = call.where.createdAt

      const expectedFrom = new Date(before)
      expectedFrom.setFullYear(expectedFrom.getFullYear() - 1)

      expect(gte.getTime()).toBeGreaterThanOrEqual(
        expectedFrom.getTime() - 5000
      )
    })

    it('should return period, from and to in response', async () => {
      const result = await getDashboard('month')

      expect(result.period).toBe('month')
      expect(result.from).toBeInstanceOf(Date)
      expect(result.to).toBeInstanceOf(Date)
      expect(result.from.getTime()).toBeLessThan(result.to.getTime())
    })
  })

  // ─── getWorkOrderStats ─────────────────────────────────────────────────────

  describe('workOrders stats', () => {
    it('should aggregate byStatus and byPriority correctly', async () => {
      mockedPrisma.workOrder.findMany.mockResolvedValueOnce([
        { status: WorkOrderStatus.NEW, priority: Priority.HIGH },
        { status: WorkOrderStatus.NEW, priority: Priority.CRITICAL },
        { status: WorkOrderStatus.COMPLETED, priority: Priority.LOW }
      ])
      mockedPrisma.workOrder.count
        .mockResolvedValueOnce(2) // open
        .mockResolvedValueOnce(1) // critical

      const result = await getDashboard('month')

      expect(result.workOrders.total).toBe(3)
      expect(result.workOrders.byStatus[WorkOrderStatus.NEW]).toBe(2)
      expect(result.workOrders.byStatus[WorkOrderStatus.COMPLETED]).toBe(1)
      expect(result.workOrders.byPriority[Priority.HIGH]).toBe(1)
      expect(result.workOrders.byPriority[Priority.CRITICAL]).toBe(1)
      expect(result.workOrders.byPriority[Priority.LOW]).toBe(1)
    })

    it('should return open and critical counts from prisma.count', async () => {
      mockedPrisma.workOrder.count
        .mockResolvedValueOnce(5) // open
        .mockResolvedValueOnce(2) // critical

      const result = await getDashboard('month')

      expect(result.workOrders.open).toBe(5)
      expect(result.workOrders.critical).toBe(2)
    })

    it('should query open with correct statuses', async () => {
      await getDashboard('month')

      // count wywoływany 2x: open i critical — sprawdzamy pierwsze wywołanie
      const openCall = mockedPrisma.workOrder.count.mock.calls[0][0]
      expect(openCall.where.status.in).toEqual(
        expect.arrayContaining([
          WorkOrderStatus.NEW,
          WorkOrderStatus.IN_PROGRESS,
          WorkOrderStatus.WAITING_FOR_PARTS
        ])
      )
    })

    it('should query critical with correct priority and statuses', async () => {
      await getDashboard('month')

      const criticalCall = mockedPrisma.workOrder.count.mock.calls[1][0]
      expect(criticalCall.where.priority).toBe(Priority.CRITICAL)
      expect(criticalCall.where.status.in).toEqual(
        expect.arrayContaining([WorkOrderStatus.NEW])
      )
    })

    it('should return zeros when no work orders exist', async () => {
      const result = await getDashboard('month')

      expect(result.workOrders.total).toBe(0)
      expect(result.workOrders.byStatus).toEqual({})
      expect(result.workOrders.byPriority).toEqual({})
      expect(result.workOrders.open).toBe(0)
      expect(result.workOrders.critical).toBe(0)
    })
  })

  // ─── getCostStats ──────────────────────────────────────────────────────────

  describe('costs stats', () => {
    it('should sum laborCost and partsCost correctly', async () => {
      mockedPrisma.workOrder.findMany
        .mockResolvedValueOnce([]) // getWorkOrderStats (first findMany)
        .mockResolvedValueOnce([
          // getCostStats (second findMany)
          makeWorkOrder({ laborCost: 100, partsCost: 50 }),
          makeWorkOrder({ laborCost: 200.5, partsCost: 99.99 })
        ])

      const result = await getDashboard('month')

      expect(result.costs.totalLaborCost).toBe(300.5)
      expect(result.costs.totalPartsCost).toBe(149.99)
      expect(result.costs.totalCost).toBe(450.49)
    })

    it('should round costs to 2 decimal places', async () => {
      mockedPrisma.workOrder.findMany
        .mockResolvedValueOnce([])
        .mockResolvedValueOnce([
          makeWorkOrder({ laborCost: 33.333, partsCost: 33.333 })
        ])

      const result = await getDashboard('month')

      expect(result.costs.totalLaborCost).toBe(33.33)
      expect(result.costs.totalPartsCost).toBe(33.33)
      expect(result.costs.totalCost).toBe(66.67)
    })

    it('should group costs by machine and return top 5', async () => {
      const orders = [
        makeWorkOrder({
          machineId: 'machine-1',
          machine: { name: 'Alpha' },
          laborCost: 500,
          partsCost: 0
        }),
        makeWorkOrder({
          machineId: 'machine-1',
          machine: { name: 'Alpha' },
          laborCost: 300,
          partsCost: 0
        }),
        makeWorkOrder({
          machineId: 'machine-2',
          machine: { name: 'Beta' },
          laborCost: 200,
          partsCost: 0
        }),
        makeWorkOrder({
          machineId: 'machine-3',
          machine: { name: 'Gamma' },
          laborCost: 900,
          partsCost: 0
        }),
        makeWorkOrder({
          machineId: 'machine-4',
          machine: { name: 'Delta' },
          laborCost: 100,
          partsCost: 0
        }),
        makeWorkOrder({
          machineId: 'machine-5',
          machine: { name: 'Eta' },
          laborCost: 400,
          partsCost: 0
        }),
        makeWorkOrder({
          machineId: 'machine-6',
          machine: { name: 'Zeta' },
          laborCost: 50,
          partsCost: 0
        })
      ]

      mockedPrisma.workOrder.findMany
        .mockResolvedValueOnce([])
        .mockResolvedValueOnce(orders)

      const result = await getDashboard('month')

      // powinno zwrócić maksymalnie 5 maszyn
      expect(result.costs.topMachinesByCost).toHaveLength(5)

      // posortowane malejąco po koszcie
      expect(result.costs.topMachinesByCost[0].machineId).toBe('machine-3') // 900
      expect(result.costs.topMachinesByCost[1].machineId).toBe('machine-1') // 800
      expect(result.costs.topMachinesByCost[2].machineId).toBe('machine-5') // 400
    })

    it('should return empty costs when no completed orders', async () => {
      const result = await getDashboard('month')

      expect(result.costs.totalLaborCost).toBe(0)
      expect(result.costs.totalPartsCost).toBe(0)
      expect(result.costs.totalCost).toBe(0)
      expect(result.costs.topMachinesByCost).toEqual([])
    })

    it('should query only COMPLETED orders with closedAt filter', async () => {
      mockedPrisma.workOrder.findMany
        .mockResolvedValueOnce([])
        .mockResolvedValueOnce([])

      await getDashboard('month')

      const costCall = mockedPrisma.workOrder.findMany.mock.calls[1][0]
      expect(costCall.where.status).toBe(WorkOrderStatus.COMPLETED)
      expect(costCall.where.closedAt).toBeDefined()
    })
  })

  // ─── getMachineStats ───────────────────────────────────────────────────────

  describe('machines stats', () => {
    it('should return total and active machine counts', async () => {
      mockedPrisma.machine.count
        .mockResolvedValueOnce(20) // total
        .mockResolvedValueOnce(15) // active

      const result = await getDashboard('month')

      expect(result.machines.total).toBe(20)
      expect(result.machines.active).toBe(15)
    })

    it('should calculate MTTR as average repair time in hours', async () => {
      // 2 zlecenia po 2h każde → MTTR = 2h
      const startedAt = new Date('2024-01-01T08:00:00Z')
      const closedAt = new Date('2024-01-01T10:00:00Z')

      mockedPrisma.workOrder.findMany
        .mockResolvedValueOnce([]) // workOrderStats
        .mockResolvedValueOnce([]) // costStats
        .mockResolvedValueOnce([
          // machineStats
          makeWorkOrder({
            startedAt,
            closedAt,
            machineId: 'machine-1',
            createdAt: new Date('2024-01-01T07:00:00Z')
          }),
          makeWorkOrder({
            startedAt,
            closedAt,
            machineId: 'machine-1',
            createdAt: new Date('2024-01-02T07:00:00Z')
          })
        ])

      const result = await getDashboard('month')

      expect(result.machines.mttr).toBe(2)
    })

    it('should return mttr=0 when no completed orders', async () => {
      const result = await getDashboard('month')
      expect(result.machines.mttr).toBe(0)
    })

    it('should calculate MTBF from intervals between failures per machine', async () => {
      // machine-1 ma 3 awarie: 0h, 24h, 48h → 2 interwały × 24h = MTBF 24h
      const base = new Date('2024-01-01T00:00:00Z')
      const d1 = new Date(base.getTime())
      const d2 = new Date(base.getTime() + 24 * 3600 * 1000)
      const d3 = new Date(base.getTime() + 48 * 3600 * 1000)

      mockedPrisma.workOrder.findMany
        .mockResolvedValueOnce([])
        .mockResolvedValueOnce([])
        .mockResolvedValueOnce([
          makeWorkOrder({ machineId: 'machine-1', createdAt: d1 }),
          makeWorkOrder({ machineId: 'machine-1', createdAt: d2 }),
          makeWorkOrder({ machineId: 'machine-1', createdAt: d3 })
        ])

      const result = await getDashboard('month')

      expect(result.machines.mtbf).toBe(24)
    })

    it('should return mtbf=0 when machine has only 1 failure', async () => {
      mockedPrisma.workOrder.findMany
        .mockResolvedValueOnce([])
        .mockResolvedValueOnce([])
        .mockResolvedValueOnce([
          makeWorkOrder({ machineId: 'machine-1', createdAt: new Date() })
        ])

      const result = await getDashboard('month')

      expect(result.machines.mtbf).toBe(0)
    })

    it('should skip mttr for orders without startedAt', async () => {
      mockedPrisma.workOrder.findMany
        .mockResolvedValueOnce([])
        .mockResolvedValueOnce([])
        .mockResolvedValueOnce([
          makeWorkOrder({ startedAt: null, closedAt: new Date() })
        ])

      const result = await getDashboard('month')

      // zlecenie bez startedAt nie powinno wchodzić do MTTR
      expect(result.machines.mttr).toBe(0)
    })
  })

  // ─── getInventoryStats ─────────────────────────────────────────────────────

  describe('inventory stats', () => {
    it('should return totalParts, lowStockCount and activeLoans', async () => {
      mockedPrisma.part.count
        .mockResolvedValueOnce(100) // totalParts (isActive: true)
        .mockResolvedValueOnce(8) // lowStockCount (stockQuantity <= 5)
      mockedPrisma.toolLoan.count.mockResolvedValue(3)

      const result = await getDashboard('month')

      expect(result.inventory.totalParts).toBe(100)
      expect(result.inventory.lowStockCount).toBe(8)
      expect(result.inventory.activeLoans).toBe(3)
    })

    it('should query only active parts for totalParts', async () => {
      await getDashboard('month')

      const totalPartsCall = mockedPrisma.part.count.mock.calls[0][0]
      expect(totalPartsCall.where.isActive).toBe(true)
    })

    it('should query parts with stockQuantity lte 5 for lowStockCount', async () => {
      await getDashboard('month')

      const lowStockCall = mockedPrisma.part.count.mock.calls[1][0]
      expect(lowStockCall.where.stockQuantity).toEqual({ lte: 5 })
      expect(lowStockCall.where.isActive).toBe(true)
    })

    it('should query only active loans (returnedAt: null)', async () => {
      await getDashboard('month')

      const loanCall = mockedPrisma.toolLoan.count.mock.calls[0][0]
      expect(loanCall.where.returnedAt).toBeNull()
    })

    it('should return zeros when nothing in inventory', async () => {
      const result = await getDashboard('month')

      expect(result.inventory.totalParts).toBe(0)
      expect(result.inventory.lowStockCount).toBe(0)
      expect(result.inventory.activeLoans).toBe(0)
    })
  })

  // ─── getPreventiveStats ────────────────────────────────────────────────────

  describe('preventive stats', () => {
    it('should return totalPlans, upcomingIn7Days and overdue', async () => {
      mockedPrisma.preventivePlan.count
        .mockResolvedValueOnce(10) // totalPlans
        .mockResolvedValueOnce(3) // upcomingIn7Days
        .mockResolvedValueOnce(2) // overdue

      const result = await getDashboard('month')

      expect(result.preventive.totalPlans).toBe(10)
      expect(result.preventive.upcomingIn7Days).toBe(3)
      expect(result.preventive.overdue).toBe(2)
    })

    it('should query only active plans for totalPlans', async () => {
      await getDashboard('month')

      const totalCall = mockedPrisma.preventivePlan.count.mock.calls[0][0]
      expect(totalCall.where.isActive).toBe(true)
      expect(totalCall.where.nextRunAt).toBeUndefined()
    })

    it('should query upcoming with nextRunAt between now and now+7days', async () => {
      const before = new Date()
      await getDashboard('month')
      const after = new Date()

      const upcomingCall = mockedPrisma.preventivePlan.count.mock.calls[1][0]
      const { gte, lte } = upcomingCall.where.nextRunAt

      expect(gte.getTime()).toBeGreaterThanOrEqual(before.getTime() - 5000)
      expect(gte.getTime()).toBeLessThanOrEqual(after.getTime() + 5000)

      const expectedTo = new Date(before)
      expectedTo.setDate(expectedTo.getDate() + 7)
      expect(lte.getTime()).toBeGreaterThanOrEqual(expectedTo.getTime() - 5000)
    })

    it('should query overdue with nextRunAt lt now', async () => {
      const before = new Date()
      await getDashboard('month')

      const overdueCall = mockedPrisma.preventivePlan.count.mock.calls[2][0]
      expect(overdueCall.where.nextRunAt.lt.getTime()).toBeGreaterThanOrEqual(
        before.getTime() - 5000
      )
    })

    it('should return zeros when no preventive plans', async () => {
      const result = await getDashboard('month')

      expect(result.preventive.totalPlans).toBe(0)
      expect(result.preventive.upcomingIn7Days).toBe(0)
      expect(result.preventive.overdue).toBe(0)
    })
  })

  // ─── getDashboard (integracja) ─────────────────────────────────────────────

  describe('getDashboard integration', () => {
    it('should return complete dashboard structure', async () => {
      const result = await getDashboard('month')

      expect(result).toHaveProperty('period')
      expect(result).toHaveProperty('from')
      expect(result).toHaveProperty('to')
      expect(result).toHaveProperty('workOrders')
      expect(result).toHaveProperty('costs')
      expect(result).toHaveProperty('machines')
      expect(result).toHaveProperty('inventory')
      expect(result).toHaveProperty('preventive')
    })

    it('should propagate prisma error from workOrder.findMany', async () => {
      mockedPrisma.workOrder.findMany.mockRejectedValue(
        new Error('DB connection failed')
      )

      await expect(getDashboard('month')).rejects.toThrow(
        'DB connection failed'
      )
    })

    it('should propagate prisma error from machine.count', async () => {
      mockedPrisma.machine.count.mockRejectedValue(new Error('DB timeout'))

      await expect(getDashboard('month')).rejects.toThrow('DB timeout')
    })
  })
})
