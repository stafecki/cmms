import { describe, it, expect, vi, beforeEach } from 'vitest'
import {
  getPreventivePlans,
  getPreventivePlanById,
  createPreventivePlan,
  updatePreventivePlan,
  deletePreventivePlan,
  getUpcomingPlans,
  triggerPreventiveWorkOrder,
  checkAndCreatePreventiveOrders
} from '../preventive.service.js'
import prisma from '../../../lib/prisma.js'
import {
  WorkOrderStatus,
  Priority
} from '../../../../generated/prisma/client.js'

vi.mock('../../../lib/prisma.js', () => ({
  default: {
    preventivePlan: {
      findMany: vi.fn(),
      findUnique: vi.fn(),
      create: vi.fn(),
      update: vi.fn()
    },
    machine: {
      findUnique: vi.fn()
    },
    workOrder: {
      create: vi.fn(),
      findFirst: vi.fn()
    },
    user: {
      findFirst: vi.fn()
    }
  }
}))

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mockedPrisma = vi.mocked(prisma) as any

const PLAN_ID = 'a0000000-0000-4000-8000-000000000001'
const MACHINE_ID = 'a0000000-0000-4000-8000-000000000002'
const USER_ID = 'a0000000-0000-4000-8000-000000000099'

const makeMachine = (overrides: Record<string, unknown> = {}) => ({
  id: MACHINE_ID,
  name: 'CNC Lathe',
  isActive: true,
  ...overrides
})

const makePlan = (overrides: Record<string, unknown> = {}) => ({
  id: PLAN_ID,
  machineId: MACHINE_ID,
  name: 'Monthly inspection',
  intervalHours: null,
  intervalDays: 30,
  advanceDays: 7,
  checklist: [{ step: 1, label: 'Check oil level', done: false }],
  isActive: true,
  lastRunAt: null,
  nextRunAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  createdAt: new Date(),
  updatedAt: new Date(),
  ...overrides
})

const makePlanWithMachine = (overrides: Record<string, unknown> = {}) => ({
  ...makePlan(),
  machine: makeMachine(),
  ...overrides
})

const makeWorkOrder = (overrides: Record<string, unknown> = {}) => ({
  id: 'a0000000-0000-4000-8000-000000000010',
  machineId: MACHINE_ID,
  reportedById: USER_ID,
  title: 'Przegląd okresowy: Monthly inspection',
  status: WorkOrderStatus.NEW,
  priority: Priority.MEDIUM,
  createdAt: new Date(),
  updatedAt: new Date(),
  ...overrides
})

describe('Preventive Service', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  // ─── getPreventivePlans ───────────────────────────────────────────────────────

  describe('getPreventivePlans', () => {
    it('should return active plans with machine, ordered by nextRunAt asc', async () => {
      const plans = [makePlanWithMachine()]
      mockedPrisma.preventivePlan.findMany.mockResolvedValue(plans)

      const result = await getPreventivePlans()

      expect(result).toEqual(plans)
      expect(mockedPrisma.preventivePlan.findMany).toHaveBeenCalledWith({
        where: { isActive: true },
        include: { machine: true },
        orderBy: { nextRunAt: 'asc' }
      })
    })

    it('should return empty array when no active plans exist', async () => {
      mockedPrisma.preventivePlan.findMany.mockResolvedValue([])

      const result = await getPreventivePlans()

      expect(result).toEqual([])
    })
  })

  // ─── getPreventivePlanById ────────────────────────────────────────────────────

  describe('getPreventivePlanById', () => {
    it('should return plan with machine included', async () => {
      const plan = makePlanWithMachine()
      mockedPrisma.preventivePlan.findUnique.mockResolvedValue(plan)

      const result = await getPreventivePlanById(PLAN_ID)

      expect(result).toEqual(plan)
      expect(mockedPrisma.preventivePlan.findUnique).toHaveBeenCalledWith({
        where: { id: PLAN_ID },
        include: { machine: true }
      })
    })

    it('should throw 404 when plan does not exist', async () => {
      mockedPrisma.preventivePlan.findUnique.mockResolvedValue(null)

      await expect(getPreventivePlanById(PLAN_ID)).rejects.toMatchObject({
        status: 404
      })
    })
  })

  // ─── createPreventivePlan ─────────────────────────────────────────────────────

  describe('createPreventivePlan', () => {
    const input = {
      machineId: MACHINE_ID,
      name: 'Monthly inspection',
      intervalDays: 30,
      advanceDays: 7,
      checklist: [{ step: 1, label: 'Check oil level' }]
    }

    it('should create plan and return it', async () => {
      mockedPrisma.machine.findUnique.mockResolvedValue(makeMachine())
      const plan = makePlan()
      mockedPrisma.preventivePlan.create.mockResolvedValue(plan)

      const result = await createPreventivePlan(input)

      expect(result).toEqual(plan)
      expect(mockedPrisma.preventivePlan.create).toHaveBeenCalledOnce()
    })

    it('should set done:false on all checklist items', async () => {
      mockedPrisma.machine.findUnique.mockResolvedValue(makeMachine())
      mockedPrisma.preventivePlan.create.mockResolvedValue(makePlan())

      await createPreventivePlan(input)

      const createCall = mockedPrisma.preventivePlan.create.mock.calls[0][0]
      const checklist = createCall.data.checklist as Array<{
        step: number
        label: string
        done: boolean
      }>
      expect(checklist.every((item) => item.done === false)).toBe(true)
    })

    it('should set nextRunAt based on intervalDays', async () => {
      mockedPrisma.machine.findUnique.mockResolvedValue(makeMachine())
      mockedPrisma.preventivePlan.create.mockResolvedValue(makePlan())

      const before = new Date()
      await createPreventivePlan(input)
      const after = new Date()

      const createCall = mockedPrisma.preventivePlan.create.mock.calls[0][0]
      const nextRunAt = createCall.data.nextRunAt as Date

      const expectedMin = new Date(before)
      expectedMin.setDate(expectedMin.getDate() + 30)
      const expectedMax = new Date(after)
      expectedMax.setDate(expectedMax.getDate() + 30)

      expect(nextRunAt.getTime()).toBeGreaterThanOrEqual(expectedMin.getTime())
      expect(nextRunAt.getTime()).toBeLessThanOrEqual(expectedMax.getTime())
    })

    it('should set nextRunAt based on intervalHours when days not provided', async () => {
      const hoursInput = {
        machineId: MACHINE_ID,
        name: 'Hourly check',
        intervalHours: 500,
        advanceDays: 3,
        checklist: [{ step: 1, label: 'Check oil' }]
      }
      mockedPrisma.machine.findUnique.mockResolvedValue(makeMachine())
      mockedPrisma.preventivePlan.create.mockResolvedValue(
        makePlan({ intervalHours: 500, intervalDays: null })
      )

      const before = new Date()
      await createPreventivePlan(hoursInput)
      const after = new Date()

      const createCall = mockedPrisma.preventivePlan.create.mock.calls[0][0]
      const nextRunAt = createCall.data.nextRunAt as Date

      const expectedMin = new Date(before)
      expectedMin.setHours(expectedMin.getHours() + 500)
      const expectedMax = new Date(after)
      expectedMax.setHours(expectedMax.getHours() + 500)

      expect(nextRunAt.getTime()).toBeGreaterThanOrEqual(expectedMin.getTime())
      expect(nextRunAt.getTime()).toBeLessThanOrEqual(expectedMax.getTime())
    })

    it('should throw 404 when machine does not exist', async () => {
      mockedPrisma.machine.findUnique.mockResolvedValue(null)

      await expect(createPreventivePlan(input)).rejects.toMatchObject({
        status: 404
      })
      expect(mockedPrisma.preventivePlan.create).not.toHaveBeenCalled()
    })

    it('should throw 404 when machine is inactive', async () => {
      mockedPrisma.machine.findUnique.mockResolvedValue(
        makeMachine({ isActive: false })
      )

      await expect(createPreventivePlan(input)).rejects.toMatchObject({
        status: 404
      })
      expect(mockedPrisma.preventivePlan.create).not.toHaveBeenCalled()
    })

    it('should look up machine by machineId', async () => {
      mockedPrisma.machine.findUnique.mockResolvedValue(makeMachine())
      mockedPrisma.preventivePlan.create.mockResolvedValue(makePlan())

      await createPreventivePlan(input)

      expect(mockedPrisma.machine.findUnique).toHaveBeenCalledWith({
        where: { id: MACHINE_ID }
      })
    })
  })

  // ─── updatePreventivePlan ─────────────────────────────────────────────────────

  describe('updatePreventivePlan', () => {
    it('should update and return plan', async () => {
      mockedPrisma.preventivePlan.findUnique.mockResolvedValue(makePlan())
      const updated = makePlan({ name: 'Updated inspection' })
      mockedPrisma.preventivePlan.update.mockResolvedValue(updated)

      const result = await updatePreventivePlan(PLAN_ID, {
        name: 'Updated inspection'
      })

      expect(result).toEqual(updated)
      expect(mockedPrisma.preventivePlan.update).toHaveBeenCalledWith({
        where: { id: PLAN_ID },
        data: expect.objectContaining({ name: 'Updated inspection' })
      })
    })

    it('should set done:false on checklist items when checklist is updated', async () => {
      mockedPrisma.preventivePlan.findUnique.mockResolvedValue(makePlan())
      mockedPrisma.preventivePlan.update.mockResolvedValue(makePlan())

      await updatePreventivePlan(PLAN_ID, {
        checklist: [
          { step: 1, label: 'New step one' },
          { step: 2, label: 'New step two' }
        ]
      })

      const updateCall = mockedPrisma.preventivePlan.update.mock.calls[0][0]
      const checklist = updateCall.data.checklist as Array<{
        step: number
        label: string
        done: boolean
      }>
      expect(checklist.every((item) => item.done === false)).toBe(true)
    })

    it('should pass undefined checklist when checklist is not in input', async () => {
      mockedPrisma.preventivePlan.findUnique.mockResolvedValue(makePlan())
      mockedPrisma.preventivePlan.update.mockResolvedValue(makePlan())

      await updatePreventivePlan(PLAN_ID, { name: 'Updated name' })

      const updateCall = mockedPrisma.preventivePlan.update.mock.calls[0][0]
      expect(updateCall.data.checklist).toBeUndefined()
    })

    it('should throw 404 when plan does not exist', async () => {
      mockedPrisma.preventivePlan.findUnique.mockResolvedValue(null)

      await expect(
        updatePreventivePlan(PLAN_ID, { name: 'Updated' })
      ).rejects.toMatchObject({ status: 404 })
      expect(mockedPrisma.preventivePlan.update).not.toHaveBeenCalled()
    })
  })

  // ─── deletePreventivePlan ─────────────────────────────────────────────────────

  describe('deletePreventivePlan', () => {
    it('should soft-delete plan by setting isActive to false', async () => {
      mockedPrisma.preventivePlan.findUnique.mockResolvedValue(makePlan())
      mockedPrisma.preventivePlan.update.mockResolvedValue(
        makePlan({ isActive: false })
      )

      await deletePreventivePlan(PLAN_ID)

      expect(mockedPrisma.preventivePlan.update).toHaveBeenCalledWith({
        where: { id: PLAN_ID },
        data: { isActive: false }
      })
    })

    it('should throw 404 when plan does not exist', async () => {
      mockedPrisma.preventivePlan.findUnique.mockResolvedValue(null)

      await expect(deletePreventivePlan(PLAN_ID)).rejects.toMatchObject({
        status: 404
      })
      expect(mockedPrisma.preventivePlan.update).not.toHaveBeenCalled()
    })

    it('should return void on success', async () => {
      mockedPrisma.preventivePlan.findUnique.mockResolvedValue(makePlan())
      mockedPrisma.preventivePlan.update.mockResolvedValue(
        makePlan({ isActive: false })
      )

      const result = await deletePreventivePlan(PLAN_ID)

      expect(result).toBeUndefined()
    })
  })

  // ─── getUpcomingPlans ─────────────────────────────────────────────────────────

  describe('getUpcomingPlans', () => {
    it('should return plans due within the given number of days', async () => {
      const plans = [makePlanWithMachine()]
      mockedPrisma.preventivePlan.findMany.mockResolvedValue(plans)

      const result = await getUpcomingPlans(7)

      expect(result).toEqual(plans)
    })

    it('should query only active plans with nextRunAt within the window', async () => {
      mockedPrisma.preventivePlan.findMany.mockResolvedValue([])

      const before = new Date()
      await getUpcomingPlans(14)
      const after = new Date()

      const callArg = mockedPrisma.preventivePlan.findMany.mock.calls[0][0]
      expect(callArg.where.isActive).toBe(true)

      const until = callArg.where.nextRunAt.lte as Date
      const expectedMin = new Date(before)
      expectedMin.setDate(expectedMin.getDate() + 14)
      const expectedMax = new Date(after)
      expectedMax.setDate(expectedMax.getDate() + 14)

      expect(until.getTime()).toBeGreaterThanOrEqual(expectedMin.getTime())
      expect(until.getTime()).toBeLessThanOrEqual(expectedMax.getTime())
    })

    it('should order results by nextRunAt ascending', async () => {
      mockedPrisma.preventivePlan.findMany.mockResolvedValue([])

      await getUpcomingPlans(7)

      expect(mockedPrisma.preventivePlan.findMany).toHaveBeenCalledWith(
        expect.objectContaining({ orderBy: { nextRunAt: 'asc' } })
      )
    })

    it('should return empty array when no plans are due', async () => {
      mockedPrisma.preventivePlan.findMany.mockResolvedValue([])

      const result = await getUpcomingPlans(7)

      expect(result).toEqual([])
    })
  })

  // ─── triggerPreventiveWorkOrder ───────────────────────────────────────────────

  describe('triggerPreventiveWorkOrder', () => {
    it('should create work order with correct data', async () => {
      const plan = makePlanWithMachine()
      mockedPrisma.preventivePlan.findUnique.mockResolvedValue(plan)
      const workOrder = makeWorkOrder()
      mockedPrisma.workOrder.create.mockResolvedValue(workOrder)
      mockedPrisma.preventivePlan.update.mockResolvedValue(plan)

      const result = await triggerPreventiveWorkOrder(PLAN_ID, USER_ID)

      expect(result).toEqual(workOrder)
      expect(mockedPrisma.workOrder.create).toHaveBeenCalledWith({
        data: {
          machineId: plan.machineId,
          reportedById: USER_ID,
          title: `Przegląd okresowy: ${plan.name}`,
          description: expect.stringContaining(plan.machine.name),
          priority: Priority.MEDIUM,
          status: WorkOrderStatus.NEW
        }
      })
    })

    it('should update lastRunAt and nextRunAt after creating work order', async () => {
      const plan = makePlanWithMachine()
      mockedPrisma.preventivePlan.findUnique.mockResolvedValue(plan)
      mockedPrisma.workOrder.create.mockResolvedValue(makeWorkOrder())
      mockedPrisma.preventivePlan.update.mockResolvedValue(plan)

      const before = new Date()
      await triggerPreventiveWorkOrder(PLAN_ID, USER_ID)
      const after = new Date()

      const updateCall = mockedPrisma.preventivePlan.update.mock.calls[0][0]
      expect(updateCall.where).toEqual({ id: PLAN_ID })
      expect(updateCall.data.lastRunAt.getTime()).toBeGreaterThanOrEqual(
        before.getTime()
      )
      expect(updateCall.data.lastRunAt.getTime()).toBeLessThanOrEqual(
        after.getTime()
      )
      expect(updateCall.data.nextRunAt).toBeInstanceOf(Date)
    })

    it('should calculate nextRunAt using intervalDays', async () => {
      const plan = makePlanWithMachine({
        intervalDays: 30,
        intervalHours: null
      })
      mockedPrisma.preventivePlan.findUnique.mockResolvedValue(plan)
      mockedPrisma.workOrder.create.mockResolvedValue(makeWorkOrder())
      mockedPrisma.preventivePlan.update.mockResolvedValue(plan)

      const before = new Date()
      await triggerPreventiveWorkOrder(PLAN_ID, USER_ID)
      const after = new Date()

      const updateCall = mockedPrisma.preventivePlan.update.mock.calls[0][0]
      const nextRunAt = updateCall.data.nextRunAt as Date

      const expectedMin = new Date(before)
      expectedMin.setDate(expectedMin.getDate() + 30)
      const expectedMax = new Date(after)
      expectedMax.setDate(expectedMax.getDate() + 30)

      expect(nextRunAt.getTime()).toBeGreaterThanOrEqual(expectedMin.getTime())
      expect(nextRunAt.getTime()).toBeLessThanOrEqual(expectedMax.getTime())
    })

    it('should throw 404 when plan does not exist', async () => {
      mockedPrisma.preventivePlan.findUnique.mockResolvedValue(null)

      await expect(
        triggerPreventiveWorkOrder(PLAN_ID, USER_ID)
      ).rejects.toMatchObject({ status: 404 })
      expect(mockedPrisma.workOrder.create).not.toHaveBeenCalled()
    })

    it('should fetch plan with machine included', async () => {
      mockedPrisma.preventivePlan.findUnique.mockResolvedValue(
        makePlanWithMachine()
      )
      mockedPrisma.workOrder.create.mockResolvedValue(makeWorkOrder())
      mockedPrisma.preventivePlan.update.mockResolvedValue(makePlan())

      await triggerPreventiveWorkOrder(PLAN_ID, USER_ID)

      expect(mockedPrisma.preventivePlan.findUnique).toHaveBeenCalledWith({
        where: { id: PLAN_ID },
        include: { machine: true }
      })
    })
  })

  // ─── checkAndCreatePreventiveOrders ──────────────────────────────────────────

  describe('checkAndCreatePreventiveOrders', () => {
    it('should return 0 when no admin user exists', async () => {
      mockedPrisma.user.findFirst.mockResolvedValue(null)

      const result = await checkAndCreatePreventiveOrders()

      expect(result).toBe(0)
      expect(mockedPrisma.preventivePlan.findMany).not.toHaveBeenCalled()
    })

    it('should return 0 when no plans are due', async () => {
      mockedPrisma.user.findFirst.mockResolvedValue({ id: USER_ID })
      mockedPrisma.preventivePlan.findMany.mockResolvedValue([])

      const result = await checkAndCreatePreventiveOrders()

      expect(result).toBe(0)
    })

    it('should skip plans that already have an open work order', async () => {
      mockedPrisma.user.findFirst.mockResolvedValue({ id: USER_ID })
      mockedPrisma.preventivePlan.findMany.mockResolvedValue([
        makePlanWithMachine()
      ])
      mockedPrisma.workOrder.findFirst.mockResolvedValue(makeWorkOrder())

      const result = await checkAndCreatePreventiveOrders()

      expect(result).toBe(0)
      expect(mockedPrisma.workOrder.create).not.toHaveBeenCalled()
    })

    it('should create work order for plans without an existing open order', async () => {
      mockedPrisma.user.findFirst.mockResolvedValue({ id: USER_ID })
      mockedPrisma.preventivePlan.findMany.mockResolvedValue([
        makePlanWithMachine()
      ])
      mockedPrisma.workOrder.findFirst.mockResolvedValue(null)
      mockedPrisma.workOrder.create.mockResolvedValue(makeWorkOrder())
      mockedPrisma.preventivePlan.update.mockResolvedValue(makePlan())

      const result = await checkAndCreatePreventiveOrders()

      expect(result).toBe(1)
      expect(mockedPrisma.workOrder.create).toHaveBeenCalledOnce()
    })

    it('should return count of created orders across multiple plans', async () => {
      const plan1 = makePlanWithMachine({ id: 'plan-1' })
      const plan2 = makePlanWithMachine({ id: 'plan-2' })
      mockedPrisma.user.findFirst.mockResolvedValue({ id: USER_ID })
      mockedPrisma.preventivePlan.findMany.mockResolvedValue([plan1, plan2])
      mockedPrisma.workOrder.findFirst.mockResolvedValue(null)
      mockedPrisma.workOrder.create.mockResolvedValue(makeWorkOrder())
      mockedPrisma.preventivePlan.update.mockResolvedValue(makePlan())

      const result = await checkAndCreatePreventiveOrders()

      expect(result).toBe(2)
    })

    it('should query due plans that are active and past nextRunAt', async () => {
      mockedPrisma.user.findFirst.mockResolvedValue({ id: USER_ID })
      mockedPrisma.preventivePlan.findMany.mockResolvedValue([])

      await checkAndCreatePreventiveOrders()

      const callArg = mockedPrisma.preventivePlan.findMany.mock.calls[0][0]
      expect(callArg.where.isActive).toBe(true)
      expect(callArg.where.nextRunAt.lte).toBeInstanceOf(Date)
    })

    it('should check for existing open orders excluding COMPLETED and CANCELLED', async () => {
      const plan = makePlanWithMachine()
      mockedPrisma.user.findFirst.mockResolvedValue({ id: USER_ID })
      mockedPrisma.preventivePlan.findMany.mockResolvedValue([plan])
      mockedPrisma.workOrder.findFirst.mockResolvedValue(makeWorkOrder())

      await checkAndCreatePreventiveOrders()

      const findFirstCall = mockedPrisma.workOrder.findFirst.mock.calls[0][0]
      expect(findFirstCall.where.status.notIn).toContain(
        WorkOrderStatus.COMPLETED
      )
      expect(findFirstCall.where.status.notIn).toContain(
        WorkOrderStatus.CANCELLED
      )
    })
  })
})
