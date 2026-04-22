import { describe, it, expect, vi, beforeEach } from 'vitest'
import {
  getWorkOrders,
  getWorkOrderById,
  createWorkOrder,
  updateWorkOrder,
  updateWorkOrderStatus,
  assignTechnician,
  confirmBhp,
  getMessages,
  addMessage,
  getWorkOrderParts,
  addPart
} from '../work-orders.service.js'
import prisma from '../../../lib/prisma.js'
import {
  WorkOrderStatus,
  Priority,
  UserRole
} from '../../../../generated/prisma/client.js'

vi.mock('../../../lib/prisma.js', () => ({
  default: {
    workOrder: {
      findMany: vi.fn(),
      findUnique: vi.fn(),
      create: vi.fn(),
      update: vi.fn()
    },
    workOrderMessage: {
      findMany: vi.fn(),
      create: vi.fn()
    },
    workOrderPart: {
      findMany: vi.fn(),
      findUnique: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
      aggregate: vi.fn()
    },
    machine: {
      findUnique: vi.fn()
    },
    user: {
      findUnique: vi.fn()
    },
    part: {
      findUnique: vi.fn(),
      update: vi.fn()
    }
  }
}))

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mp = vi.mocked(prisma) as any

const WO_ID = 'a0000000-0000-4000-8000-000000000001'
const MACHINE_ID = 'a0000000-0000-4000-8000-000000000002'
const USER_ID = 'a0000000-0000-4000-8000-000000000003'
const TECH_ID = 'a0000000-0000-4000-8000-000000000004'
const PART_ID = 'a0000000-0000-4000-8000-000000000005'

const makeWorkOrder = (overrides = {}) => ({
  id: WO_ID,
  machineId: MACHINE_ID,
  reportedById: USER_ID,
  assignedToId: null,
  title: 'Fix broken pump',
  description: 'The pump is leaking oil',
  priority: Priority.MEDIUM,
  status: WorkOrderStatus.NEW,
  bhpConfirmed: false,
  startedAt: null,
  closedAt: null,
  laborCost: null,
  partsCost: 0,
  createdAt: new Date(),
  updatedAt: new Date(),
  ...overrides
})

const makeMachine = (overrides = {}) => ({
  id: MACHINE_ID,
  name: 'Pump A',
  isActive: true,
  ...overrides
})

const makeTechnician = (overrides = {}) => ({
  id: TECH_ID,
  name: 'John Tech',
  email: 'tech@example.com',
  role: UserRole.TECHNICIAN,
  certifications: [],
  ...overrides
})

const makePart = (overrides = {}) => ({
  id: PART_ID,
  name: 'Oil Filter',
  unitPrice: 25.5,
  stockQuantity: 10,
  ...overrides
})

const makeMessage = (overrides = {}) => ({
  id: 'msg-id-1',
  workOrderId: WO_ID,
  userId: USER_ID,
  content: 'This is a test message',
  sentAt: new Date(),
  ...overrides
})

const makeWorkOrderPart = (overrides = {}) => ({
  workOrderId: WO_ID,
  partId: PART_ID,
  quantity: 2,
  ...overrides
})

beforeEach(() => {
  vi.clearAllMocks()
})

// ─── getWorkOrders ────────────────────────────────────────────────────────────

describe('getWorkOrders', () => {
  it('should return list of work orders with relations', async () => {
    const workOrders = [makeWorkOrder()]
    mp.workOrder.findMany.mockResolvedValue(workOrders)

    const result = await getWorkOrders()

    expect(result).toEqual(workOrders)
    expect(mp.workOrder.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        include: expect.objectContaining({ machine: true }),
        orderBy: { createdAt: 'desc' }
      })
    )
  })

  it('should return empty array when no work orders exist', async () => {
    mp.workOrder.findMany.mockResolvedValue([])

    const result = await getWorkOrders()

    expect(result).toEqual([])
  })
})

// ─── getWorkOrderById ─────────────────────────────────────────────────────────

describe('getWorkOrderById', () => {
  it('should return work order when found', async () => {
    const workOrder = makeWorkOrder()
    mp.workOrder.findUnique.mockResolvedValue(workOrder)

    const result = await getWorkOrderById(WO_ID)

    expect(result).toEqual(workOrder)
    expect(mp.workOrder.findUnique).toHaveBeenCalledWith(
      expect.objectContaining({ where: { id: WO_ID } })
    )
  })

  it('should throw 404 when work order not found', async () => {
    mp.workOrder.findUnique.mockResolvedValue(null)

    await expect(getWorkOrderById(WO_ID)).rejects.toMatchObject({ status: 404 })
  })
})

// ─── createWorkOrder ──────────────────────────────────────────────────────────

describe('createWorkOrder', () => {
  const input = {
    machineId: MACHINE_ID,
    title: 'Fix broken pump',
    description: 'The pump is leaking oil',
    priority: Priority.HIGH
  }

  it('should create work order with status NEW', async () => {
    const workOrder = makeWorkOrder({
      priority: Priority.HIGH,
      status: WorkOrderStatus.NEW
    })
    mp.machine.findUnique.mockResolvedValue(makeMachine())
    mp.workOrder.create.mockResolvedValue(workOrder)

    const result = await createWorkOrder(input, USER_ID)

    expect(result).toEqual(workOrder)
    expect(mp.workOrder.create).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          machineId: MACHINE_ID,
          reportedById: USER_ID,
          status: WorkOrderStatus.NEW
        })
      })
    )
  })

  it('should throw 404 when machine not found', async () => {
    mp.machine.findUnique.mockResolvedValue(null)

    await expect(createWorkOrder(input, USER_ID)).rejects.toMatchObject({
      status: 404
    })
    expect(mp.workOrder.create).not.toHaveBeenCalled()
  })

  it('should throw 404 when machine is inactive', async () => {
    mp.machine.findUnique.mockResolvedValue(makeMachine({ isActive: false }))

    await expect(createWorkOrder(input, USER_ID)).rejects.toMatchObject({
      status: 404
    })
    expect(mp.workOrder.create).not.toHaveBeenCalled()
  })
})

// ─── updateWorkOrder ──────────────────────────────────────────────────────────

describe('updateWorkOrder', () => {
  it('should update work order when active', async () => {
    const workOrder = makeWorkOrder()
    const updated = makeWorkOrder({ title: 'Updated title' })
    mp.workOrder.findUnique.mockResolvedValue(workOrder)
    mp.workOrder.update.mockResolvedValue(updated)

    const result = await updateWorkOrder(WO_ID, { title: 'Updated title' })

    expect(result).toEqual(updated)
    expect(mp.workOrder.update).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { id: WO_ID },
        data: { title: 'Updated title' }
      })
    )
  })

  it('should throw 404 when work order not found', async () => {
    mp.workOrder.findUnique.mockResolvedValue(null)

    await expect(
      updateWorkOrder(WO_ID, { title: 'New title' })
    ).rejects.toMatchObject({
      status: 404
    })
  })

  it('should throw 400 when work order is COMPLETED', async () => {
    mp.workOrder.findUnique.mockResolvedValue(
      makeWorkOrder({ status: WorkOrderStatus.COMPLETED })
    )

    await expect(
      updateWorkOrder(WO_ID, { title: 'New title' })
    ).rejects.toMatchObject({
      status: 400
    })
    expect(mp.workOrder.update).not.toHaveBeenCalled()
  })

  it('should throw 400 when work order is CANCELLED', async () => {
    mp.workOrder.findUnique.mockResolvedValue(
      makeWorkOrder({ status: WorkOrderStatus.CANCELLED })
    )

    await expect(
      updateWorkOrder(WO_ID, { title: 'New title' })
    ).rejects.toMatchObject({
      status: 400
    })
    expect(mp.workOrder.update).not.toHaveBeenCalled()
  })
})

// ─── updateWorkOrderStatus ────────────────────────────────────────────────────

describe('updateWorkOrderStatus', () => {
  it('should throw 404 when work order not found', async () => {
    mp.workOrder.findUnique.mockResolvedValue(null)

    await expect(
      updateWorkOrderStatus(WO_ID, { status: WorkOrderStatus.IN_PROGRESS })
    ).rejects.toMatchObject({ status: 404 })
  })

  it('should throw 400 for invalid transition NEW → COMPLETED', async () => {
    mp.workOrder.findUnique.mockResolvedValue(
      makeWorkOrder({ status: WorkOrderStatus.NEW })
    )

    await expect(
      updateWorkOrderStatus(WO_ID, { status: WorkOrderStatus.COMPLETED })
    ).rejects.toMatchObject({ status: 400 })
  })

  it('should throw 400 for invalid transition COMPLETED → anything', async () => {
    mp.workOrder.findUnique.mockResolvedValue(
      makeWorkOrder({ status: WorkOrderStatus.COMPLETED })
    )

    await expect(
      updateWorkOrderStatus(WO_ID, { status: WorkOrderStatus.IN_PROGRESS })
    ).rejects.toMatchObject({ status: 400 })
  })

  it('should throw 400 for invalid transition CANCELLED → anything', async () => {
    mp.workOrder.findUnique.mockResolvedValue(
      makeWorkOrder({ status: WorkOrderStatus.CANCELLED })
    )

    await expect(
      updateWorkOrderStatus(WO_ID, { status: WorkOrderStatus.NEW })
    ).rejects.toMatchObject({ status: 400 })
  })

  it('should throw 400 when transitioning to IN_PROGRESS without BHP confirmed', async () => {
    mp.workOrder.findUnique.mockResolvedValue(
      makeWorkOrder({ status: WorkOrderStatus.NEW, bhpConfirmed: false })
    )

    await expect(
      updateWorkOrderStatus(WO_ID, { status: WorkOrderStatus.IN_PROGRESS })
    ).rejects.toMatchObject({ status: 400 })
  })

  it('should allow NEW → IN_PROGRESS when BHP confirmed', async () => {
    const workOrder = makeWorkOrder({
      status: WorkOrderStatus.NEW,
      bhpConfirmed: true
    })
    const updated = makeWorkOrder({ status: WorkOrderStatus.IN_PROGRESS })
    mp.workOrder.findUnique.mockResolvedValue(workOrder)
    mp.workOrder.update.mockResolvedValue(updated)

    const result = await updateWorkOrderStatus(WO_ID, {
      status: WorkOrderStatus.IN_PROGRESS
    })

    expect(result.status).toBe(WorkOrderStatus.IN_PROGRESS)
    expect(mp.workOrder.update).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({ status: WorkOrderStatus.IN_PROGRESS })
      })
    )
  })

  it('should set startedAt when transitioning to IN_PROGRESS for the first time', async () => {
    const workOrder = makeWorkOrder({
      status: WorkOrderStatus.NEW,
      bhpConfirmed: true,
      startedAt: null
    })
    mp.workOrder.findUnique.mockResolvedValue(workOrder)
    mp.workOrder.update.mockResolvedValue(
      makeWorkOrder({ status: WorkOrderStatus.IN_PROGRESS })
    )

    await updateWorkOrderStatus(WO_ID, { status: WorkOrderStatus.IN_PROGRESS })

    expect(mp.workOrder.update).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          status: WorkOrderStatus.IN_PROGRESS,
          startedAt: expect.any(Date)
        })
      })
    )
  })

  it('should not reset startedAt on second IN_PROGRESS transition', async () => {
    const startedAt = new Date('2025-01-01T10:00:00Z')
    const workOrder = makeWorkOrder({
      status: WorkOrderStatus.WAITING_FOR_PARTS,
      bhpConfirmed: true,
      startedAt
    })
    mp.workOrder.findUnique.mockResolvedValue(workOrder)
    mp.workOrder.update.mockResolvedValue(
      makeWorkOrder({ status: WorkOrderStatus.IN_PROGRESS })
    )

    await updateWorkOrderStatus(WO_ID, { status: WorkOrderStatus.IN_PROGRESS })

    const updateCall = mp.workOrder.update.mock.calls[0][0]
    expect(updateCall.data.startedAt).toBeUndefined()
  })

  it('should allow NEW → CANCELLED', async () => {
    mp.workOrder.findUnique.mockResolvedValue(
      makeWorkOrder({ status: WorkOrderStatus.NEW })
    )
    mp.workOrder.update.mockResolvedValue(
      makeWorkOrder({ status: WorkOrderStatus.CANCELLED })
    )

    const result = await updateWorkOrderStatus(WO_ID, {
      status: WorkOrderStatus.CANCELLED
    })

    expect(result.status).toBe(WorkOrderStatus.CANCELLED)
  })

  it('should allow IN_PROGRESS → WAITING_FOR_PARTS', async () => {
    mp.workOrder.findUnique.mockResolvedValue(
      makeWorkOrder({ status: WorkOrderStatus.IN_PROGRESS, bhpConfirmed: true })
    )
    mp.workOrder.update.mockResolvedValue(
      makeWorkOrder({ status: WorkOrderStatus.WAITING_FOR_PARTS })
    )

    const result = await updateWorkOrderStatus(WO_ID, {
      status: WorkOrderStatus.WAITING_FOR_PARTS
    })

    expect(result.status).toBe(WorkOrderStatus.WAITING_FOR_PARTS)
  })

  it('should set closedAt and calculate laborCost on COMPLETED', async () => {
    const startedAt = new Date(Date.now() - 2 * 3600 * 1000)
    const workOrder = makeWorkOrder({
      status: WorkOrderStatus.IN_PROGRESS,
      bhpConfirmed: true,
      startedAt
    })
    mp.workOrder.findUnique.mockResolvedValue(workOrder)
    mp.workOrder.update.mockResolvedValue(
      makeWorkOrder({ status: WorkOrderStatus.COMPLETED })
    )

    await updateWorkOrderStatus(WO_ID, { status: WorkOrderStatus.COMPLETED })

    const updateCall = mp.workOrder.update.mock.calls[0][0]
    expect(updateCall.data.closedAt).toBeInstanceOf(Date)
    expect(typeof updateCall.data.laborCost).toBe('number')
    expect(updateCall.data.laborCost).toBeGreaterThan(0)
  })

  it('should set closedAt without laborCost when startedAt is null', async () => {
    const workOrder = makeWorkOrder({
      status: WorkOrderStatus.IN_PROGRESS,
      bhpConfirmed: true,
      startedAt: null
    })
    mp.workOrder.findUnique.mockResolvedValue(workOrder)
    mp.workOrder.update.mockResolvedValue(
      makeWorkOrder({ status: WorkOrderStatus.COMPLETED })
    )

    await updateWorkOrderStatus(WO_ID, { status: WorkOrderStatus.COMPLETED })

    const updateCall = mp.workOrder.update.mock.calls[0][0]
    expect(updateCall.data.closedAt).toBeInstanceOf(Date)
    expect(updateCall.data.laborCost).toBeUndefined()
  })
})

// ─── assignTechnician ─────────────────────────────────────────────────────────

describe('assignTechnician', () => {
  it('should assign technician to work order', async () => {
    const workOrder = makeWorkOrder()
    const technician = makeTechnician()
    const updated = makeWorkOrder({ assignedToId: TECH_ID })
    mp.workOrder.findUnique.mockResolvedValue(workOrder)
    mp.user.findUnique.mockResolvedValue(technician)
    mp.workOrder.update.mockResolvedValue(updated)

    const result = await assignTechnician(WO_ID, { technicianId: TECH_ID })

    expect(result).toEqual(updated)
    expect(mp.workOrder.update).toHaveBeenCalledWith(
      expect.objectContaining({
        data: { assignedToId: TECH_ID }
      })
    )
  })

  it('should also allow MANAGER role to be assigned', async () => {
    const workOrder = makeWorkOrder()
    const manager = makeTechnician({ role: UserRole.MANAGER })
    const updated = makeWorkOrder({ assignedToId: TECH_ID })
    mp.workOrder.findUnique.mockResolvedValue(workOrder)
    mp.user.findUnique.mockResolvedValue(manager)
    mp.workOrder.update.mockResolvedValue(updated)

    const result = await assignTechnician(WO_ID, { technicianId: TECH_ID })

    expect(result).toEqual(updated)
  })

  it('should throw 404 when work order not found', async () => {
    mp.workOrder.findUnique.mockResolvedValue(null)

    await expect(
      assignTechnician(WO_ID, { technicianId: TECH_ID })
    ).rejects.toMatchObject({
      status: 404
    })
  })

  it('should throw 404 when technician not found', async () => {
    mp.workOrder.findUnique.mockResolvedValue(makeWorkOrder())
    mp.user.findUnique.mockResolvedValue(null)

    await expect(
      assignTechnician(WO_ID, { technicianId: TECH_ID })
    ).rejects.toMatchObject({
      status: 404
    })
  })

  it('should throw 400 when user role is not TECHNICIAN or MANAGER', async () => {
    mp.workOrder.findUnique.mockResolvedValue(makeWorkOrder())
    mp.user.findUnique.mockResolvedValue(
      makeTechnician({ role: UserRole.OPERATOR })
    )

    await expect(
      assignTechnician(WO_ID, { technicianId: TECH_ID })
    ).rejects.toMatchObject({
      status: 400
    })
    expect(mp.workOrder.update).not.toHaveBeenCalled()
  })

  it('should throw 400 when user role is ADMIN', async () => {
    mp.workOrder.findUnique.mockResolvedValue(makeWorkOrder())
    mp.user.findUnique.mockResolvedValue(
      makeTechnician({ role: UserRole.ADMIN })
    )

    await expect(
      assignTechnician(WO_ID, { technicianId: TECH_ID })
    ).rejects.toMatchObject({
      status: 400
    })
  })
})

// ─── confirmBhp ───────────────────────────────────────────────────────────────

describe('confirmBhp', () => {
  it('should confirm BHP for the assigned technician', async () => {
    const workOrder = makeWorkOrder({
      assignedToId: USER_ID,
      bhpConfirmed: false
    })
    const updated = makeWorkOrder({ bhpConfirmed: true })
    mp.workOrder.findUnique.mockResolvedValue(workOrder)
    mp.workOrder.update.mockResolvedValue(updated)

    const result = await confirmBhp(WO_ID, USER_ID)

    expect(result.bhpConfirmed).toBe(true)
    expect(mp.workOrder.update).toHaveBeenCalledWith(
      expect.objectContaining({
        data: { bhpConfirmed: true }
      })
    )
  })

  it('should throw 404 when work order not found', async () => {
    mp.workOrder.findUnique.mockResolvedValue(null)

    await expect(confirmBhp(WO_ID, USER_ID)).rejects.toMatchObject({
      status: 404
    })
  })

  it('should throw 403 when user is not the assigned technician', async () => {
    mp.workOrder.findUnique.mockResolvedValue(
      makeWorkOrder({ assignedToId: TECH_ID, bhpConfirmed: false })
    )

    await expect(confirmBhp(WO_ID, USER_ID)).rejects.toMatchObject({
      status: 403
    })
    expect(mp.workOrder.update).not.toHaveBeenCalled()
  })

  it('should throw 400 when BHP is already confirmed', async () => {
    mp.workOrder.findUnique.mockResolvedValue(
      makeWorkOrder({ assignedToId: USER_ID, bhpConfirmed: true })
    )

    await expect(confirmBhp(WO_ID, USER_ID)).rejects.toMatchObject({
      status: 400
    })
    expect(mp.workOrder.update).not.toHaveBeenCalled()
  })
})

// ─── getMessages ──────────────────────────────────────────────────────────────

describe('getMessages', () => {
  it('should return messages for work order ordered by sentAt asc', async () => {
    const messages = [makeMessage()]
    mp.workOrder.findUnique.mockResolvedValue(makeWorkOrder())
    mp.workOrderMessage.findMany.mockResolvedValue(messages)

    const result = await getMessages(WO_ID)

    expect(result).toEqual(messages)
    expect(mp.workOrderMessage.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { workOrderId: WO_ID },
        orderBy: { sentAt: 'asc' }
      })
    )
  })

  it('should throw 404 when work order not found', async () => {
    mp.workOrder.findUnique.mockResolvedValue(null)

    await expect(getMessages(WO_ID)).rejects.toMatchObject({ status: 404 })
    expect(mp.workOrderMessage.findMany).not.toHaveBeenCalled()
  })

  it('should return empty array when no messages exist', async () => {
    mp.workOrder.findUnique.mockResolvedValue(makeWorkOrder())
    mp.workOrderMessage.findMany.mockResolvedValue([])

    const result = await getMessages(WO_ID)

    expect(result).toEqual([])
  })
})

// ─── addMessage ───────────────────────────────────────────────────────────────

describe('addMessage', () => {
  it('should create message for active work order', async () => {
    const message = makeMessage()
    mp.workOrder.findUnique.mockResolvedValue(makeWorkOrder())
    mp.workOrderMessage.create.mockResolvedValue(message)

    const result = await addMessage(WO_ID, USER_ID, {
      content: 'This is a test message'
    })

    expect(result).toEqual(message)
    expect(mp.workOrderMessage.create).toHaveBeenCalledWith(
      expect.objectContaining({
        data: {
          workOrderId: WO_ID,
          userId: USER_ID,
          content: 'This is a test message'
        }
      })
    )
  })

  it('should throw 404 when work order not found', async () => {
    mp.workOrder.findUnique.mockResolvedValue(null)

    await expect(
      addMessage(WO_ID, USER_ID, { content: 'Hello' })
    ).rejects.toMatchObject({ status: 404 })
  })

  it('should throw 400 when work order is COMPLETED', async () => {
    mp.workOrder.findUnique.mockResolvedValue(
      makeWorkOrder({ status: WorkOrderStatus.COMPLETED })
    )

    await expect(
      addMessage(WO_ID, USER_ID, { content: 'Hello' })
    ).rejects.toMatchObject({ status: 400 })
    expect(mp.workOrderMessage.create).not.toHaveBeenCalled()
  })

  it('should throw 400 when work order is CANCELLED', async () => {
    mp.workOrder.findUnique.mockResolvedValue(
      makeWorkOrder({ status: WorkOrderStatus.CANCELLED })
    )

    await expect(
      addMessage(WO_ID, USER_ID, { content: 'Hello' })
    ).rejects.toMatchObject({ status: 400 })
    expect(mp.workOrderMessage.create).not.toHaveBeenCalled()
  })
})

// ─── getWorkOrderParts ────────────────────────────────────────────────────────

describe('getWorkOrderParts', () => {
  it('should return parts for work order with part details', async () => {
    const parts = [makeWorkOrderPart()]
    mp.workOrder.findUnique.mockResolvedValue(makeWorkOrder())
    mp.workOrderPart.findMany.mockResolvedValue(parts)

    const result = await getWorkOrderParts(WO_ID)

    expect(result).toEqual(parts)
    expect(mp.workOrderPart.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { workOrderId: WO_ID },
        include: { part: true }
      })
    )
  })

  it('should throw 404 when work order not found', async () => {
    mp.workOrder.findUnique.mockResolvedValue(null)

    await expect(getWorkOrderParts(WO_ID)).rejects.toMatchObject({
      status: 404
    })
    expect(mp.workOrderPart.findMany).not.toHaveBeenCalled()
  })

  it('should return empty array when no parts exist', async () => {
    mp.workOrder.findUnique.mockResolvedValue(makeWorkOrder())
    mp.workOrderPart.findMany.mockResolvedValue([])

    const result = await getWorkOrderParts(WO_ID)

    expect(result).toEqual([])
  })
})

// ─── addPart ──────────────────────────────────────────────────────────────────

describe('addPart', () => {
  const input = { partId: PART_ID, quantity: 2 }

  const setupHappyPath = ({
    existingEntry = null as ReturnType<typeof makeWorkOrderPart> | null,
    workOrderStatus = WorkOrderStatus.NEW
  } = {}) => {
    mp.workOrder.findUnique.mockResolvedValue(
      makeWorkOrder({ status: workOrderStatus })
    )
    mp.part.findUnique.mockResolvedValue(makePart({ stockQuantity: 10 }))
    mp.workOrderPart.findUnique.mockResolvedValue(existingEntry)
    mp.workOrderPart.create.mockResolvedValue(makeWorkOrderPart())
    mp.workOrderPart.update.mockResolvedValue(
      makeWorkOrderPart({ quantity: 4 })
    )
    mp.part.update.mockResolvedValue(makePart({ stockQuantity: 8 }))
    mp.workOrderPart.aggregate.mockResolvedValue({ _sum: { quantity: 2 } })
    mp.workOrderPart.findMany.mockResolvedValue([
      {
        ...makeWorkOrderPart(),
        part: makePart()
      }
    ])
    mp.workOrder.update.mockResolvedValue(makeWorkOrder({ partsCost: 51 }))
  }

  it('should create new work order part when no existing entry', async () => {
    setupHappyPath()

    const result = await addPart(WO_ID, input)

    expect(result).toMatchObject({ partId: PART_ID, quantity: 2 })
    expect(mp.workOrderPart.create).toHaveBeenCalledWith(
      expect.objectContaining({
        data: { workOrderId: WO_ID, partId: PART_ID, quantity: 2 }
      })
    )
  })

  it('should update quantity when part already exists in work order', async () => {
    setupHappyPath({ existingEntry: makeWorkOrderPart({ quantity: 2 }) })

    const result = await addPart(WO_ID, input)

    expect(mp.workOrderPart.update).toHaveBeenCalledWith(
      expect.objectContaining({
        data: { quantity: 4 }
      })
    )
    expect(mp.workOrderPart.create).not.toHaveBeenCalled()
    expect(result).toMatchObject({ quantity: 4 })
  })

  it('should decrement part stock quantity', async () => {
    setupHappyPath()

    await addPart(WO_ID, input)

    expect(mp.part.update).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { id: PART_ID },
        data: { stockQuantity: { decrement: 2 } }
      })
    )
  })

  it('should recalculate and update partsCost on work order', async () => {
    setupHappyPath()

    await addPart(WO_ID, input)

    expect(mp.workOrder.update).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { id: WO_ID },
        data: { partsCost: expect.any(Number) }
      })
    )
  })

  it('should throw 404 when work order not found', async () => {
    mp.workOrder.findUnique.mockResolvedValue(null)

    await expect(addPart(WO_ID, input)).rejects.toMatchObject({ status: 404 })
  })

  it('should throw 400 when work order is COMPLETED', async () => {
    mp.workOrder.findUnique.mockResolvedValue(
      makeWorkOrder({ status: WorkOrderStatus.COMPLETED })
    )

    await expect(addPart(WO_ID, input)).rejects.toMatchObject({ status: 400 })
    expect(mp.part.findUnique).not.toHaveBeenCalled()
  })

  it('should throw 400 when work order is CANCELLED', async () => {
    mp.workOrder.findUnique.mockResolvedValue(
      makeWorkOrder({ status: WorkOrderStatus.CANCELLED })
    )

    await expect(addPart(WO_ID, input)).rejects.toMatchObject({ status: 400 })
  })

  it('should throw 404 when part not found', async () => {
    mp.workOrder.findUnique.mockResolvedValue(makeWorkOrder())
    mp.part.findUnique.mockResolvedValue(null)

    await expect(addPart(WO_ID, input)).rejects.toMatchObject({ status: 404 })
  })

  it('should throw 400 when insufficient stock', async () => {
    mp.workOrder.findUnique.mockResolvedValue(makeWorkOrder())
    mp.part.findUnique.mockResolvedValue(makePart({ stockQuantity: 1 }))

    await expect(
      addPart(WO_ID, { partId: PART_ID, quantity: 5 })
    ).rejects.toMatchObject({
      status: 400
    })
    expect(mp.workOrderPart.findUnique).not.toHaveBeenCalled()
  })

  it('should throw 400 when stockQuantity exactly equals required quantity minus one', async () => {
    mp.workOrder.findUnique.mockResolvedValue(makeWorkOrder())
    mp.part.findUnique.mockResolvedValue(makePart({ stockQuantity: 2 }))

    await expect(
      addPart(WO_ID, { partId: PART_ID, quantity: 3 })
    ).rejects.toMatchObject({
      status: 400
    })
  })

  it('should succeed when stockQuantity exactly equals required quantity', async () => {
    setupHappyPath()
    mp.part.findUnique.mockResolvedValue(makePart({ stockQuantity: 2 }))

    const result = await addPart(WO_ID, { partId: PART_ID, quantity: 2 })

    expect(result).toBeDefined()
  })
})
