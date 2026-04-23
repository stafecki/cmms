import { describe, it, expect, vi, beforeAll, beforeEach } from 'vitest'
import { Hono } from 'hono'
import { testClient } from 'hono/testing'
import { HTTPException } from 'hono/http-exception'
import workOrders from '../work-orders.routes.js'
import * as workOrdersService from '../work-orders.service.js'
import {
  UserRole,
  WorkOrderStatus,
  Priority
} from '../../../../generated/prisma/client.js'
import { requireRoles } from '../../../middleware/roles.middleware.js'

const { rolesMiddleware } = vi.hoisted(() => ({
  rolesMiddleware: vi.fn(async (_c: unknown, next: () => Promise<void>) => {
    await next()
  })
}))

vi.mock('../work-orders.service.js', () => ({
  getWorkOrders: vi.fn(),
  getWorkOrderById: vi.fn(),
  createWorkOrder: vi.fn(),
  updateWorkOrder: vi.fn(),
  updateWorkOrderStatus: vi.fn(),
  assignTechnician: vi.fn(),
  confirmBhp: vi.fn(),
  getMessages: vi.fn(),
  addMessage: vi.fn(),
  getWorkOrderParts: vi.fn(),
  addPart: vi.fn()
}))

vi.mock('../../../middleware/auth.middleware.js', () => ({
  authMiddleware: vi.fn(async (c, next) => {
    c.set('user', {
      sub: USER_ID,
      role: UserRole.ADMIN,
      email: 'admin@example.com',
      jti: 'jti-123',
      exp: Math.floor(Date.now() / 1000) + 3600
    })
    await next()
  })
}))

vi.mock('../../../middleware/roles.middleware.js', () => ({
  requireRoles: vi.fn((..._roles: string[]) => rolesMiddleware)
}))

const USER_ID = 'a0000000-0000-4000-8000-000000000001'
const WO_ID = 'a0000000-0000-4000-8000-000000000002'
const MACHINE_ID = 'a0000000-0000-4000-8000-000000000003'
const TECH_ID = 'a0000000-0000-4000-8000-000000000004'
const PART_ID = 'a0000000-0000-4000-8000-000000000005'
const MSG_ID = 'a0000000-0000-4000-8000-000000000006'

const mockedService = vi.mocked(workOrdersService)

const makeWorkOrder = (overrides = {}) => ({
  id: WO_ID,
  machineId: MACHINE_ID,
  reportedById: USER_ID,
  assignedToId: null,
  title: 'Fix broken pump',
  description: 'The pump is leaking oil and needs repair',
  priority: Priority.MEDIUM,
  status: WorkOrderStatus.NEW,
  bhpConfirmed: false,
  startedAt: null,
  closedAt: null,
  laborCost: null,
  partsCost: 0,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  machine: { id: MACHINE_ID, name: 'Pump A' },
  reportedBy: {
    id: USER_ID,
    name: 'Admin User',
    email: 'admin@example.com',
    role: UserRole.ADMIN
  },
  assignedTo: null,
  parts: [],
  ...overrides
})

const makeMessage = (overrides = {}) => ({
  id: MSG_ID,
  workOrderId: WO_ID,
  userId: USER_ID,
  content: 'This is a test message',
  sentAt: new Date().toISOString(),
  user: { id: USER_ID, name: 'Admin User', role: UserRole.ADMIN },
  ...overrides
})

const makeWorkOrderPart = (overrides = {}) => ({
  workOrderId: WO_ID,
  partId: PART_ID,
  quantity: 2,
  part: { id: PART_ID, name: 'Oil Filter', unitPrice: 25.5, stockQuantity: 10 },
  ...overrides
})

type AppEnv = {
  Variables: {
    user: {
      sub: string
      role: string
      email: string
      jti: string
      exp: number
    }
  }
}

const app = new Hono<AppEnv>()
app.route('/work-orders', workOrders)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const client = testClient(app) as any

describe('Work Orders Routes', () => {
  let initialRequireRolesCalls: unknown[][]

  beforeAll(() => {
    initialRequireRolesCalls = vi
      .mocked(requireRoles)
      .mock.calls.map((call) => [...call])
  })

  beforeEach(() => {
    vi.clearAllMocks()
    rolesMiddleware.mockImplementation(
      async (_c: unknown, next: () => Promise<void>) => {
        await next()
      }
    )
  })

  // ─── GET / ────────────────────────────────────────────────────────────────────

  describe('GET /', () => {
    it('should return 200 with list of work orders', async () => {
      mockedService.getWorkOrders.mockResolvedValue([makeWorkOrder()] as never)

      const res = await client['work-orders'].$get()
      const body = await res.json()

      expect(res.status).toBe(200)
      expect(Array.isArray(body)).toBe(true)
      expect(mockedService.getWorkOrders).toHaveBeenCalledOnce()
    })

    it('should return empty array when no work orders exist', async () => {
      mockedService.getWorkOrders.mockResolvedValue([] as never)

      const res = await client['work-orders'].$get()
      const body = await res.json()

      expect(res.status).toBe(200)
      expect(body).toEqual([])
    })

    it('should propagate service errors', async () => {
      mockedService.getWorkOrders.mockRejectedValue(
        new HTTPException(500, { message: 'DB error' })
      )

      const res = await client['work-orders'].$get()

      expect(res.status).toBe(500)
    })
  })

  // ─── GET /:id ─────────────────────────────────────────────────────────────────

  describe('GET /:id', () => {
    it('should return 200 with work order by id', async () => {
      mockedService.getWorkOrderById.mockResolvedValue(makeWorkOrder() as never)

      const res = await client['work-orders'][':id'].$get({
        param: { id: WO_ID }
      })
      const body = await res.json()

      expect(res.status).toBe(200)
      expect(body).toMatchObject({ id: WO_ID })
      expect(mockedService.getWorkOrderById).toHaveBeenCalledWith(WO_ID)
    })

    it('should return 400 for invalid UUID', async () => {
      const res = await client['work-orders'][':id'].$get({
        param: { id: 'not-a-uuid' }
      })

      expect(res.status).toBe(400)
    })

    it('should propagate 404 when work order not found', async () => {
      mockedService.getWorkOrderById.mockRejectedValue(
        new HTTPException(404, { message: 'Work order not found' })
      )

      const res = await client['work-orders'][':id'].$get({
        param: { id: WO_ID }
      })

      expect(res.status).toBe(404)
    })
  })

  // ─── POST / ───────────────────────────────────────────────────────────────────

  describe('POST /', () => {
    const validBody = {
      machineId: MACHINE_ID,
      title: 'Fix broken pump',
      description: 'The pump is leaking oil and needs repair',
      priority: Priority.HIGH
    }

    it('should return 201 and create work order', async () => {
      mockedService.createWorkOrder.mockResolvedValue(makeWorkOrder() as never)

      const res = await client['work-orders'].$post({ json: validBody })
      const body = await res.json()

      expect(res.status).toBe(201)
      expect(body).toMatchObject({ id: WO_ID })
      expect(mockedService.createWorkOrder).toHaveBeenCalledWith(
        expect.objectContaining({
          machineId: MACHINE_ID,
          title: 'Fix broken pump'
        }),
        USER_ID
      )
    })

    it('should use default priority MEDIUM when not provided', async () => {
      mockedService.createWorkOrder.mockResolvedValue(makeWorkOrder() as never)

      const res = await client['work-orders'].$post({
        json: {
          machineId: MACHINE_ID,
          title: 'Fix pump',
          description: 'The pump is leaking oil'
        }
      })

      expect(res.status).toBe(201)
      expect(mockedService.createWorkOrder).toHaveBeenCalledWith(
        expect.objectContaining({ priority: Priority.MEDIUM }),
        USER_ID
      )
    })

    it('should return 400 for missing required fields', async () => {
      const res = await client['work-orders'].$post({
        json: { title: 'Fix pump' }
      })

      expect(res.status).toBe(400)
    })

    it('should return 400 for invalid machineId UUID', async () => {
      const res = await client['work-orders'].$post({
        json: { ...validBody, machineId: 'not-a-uuid' }
      })

      expect(res.status).toBe(400)
    })

    it('should return 400 for title too short', async () => {
      const res = await client['work-orders'].$post({
        json: { ...validBody, title: 'ab' }
      })

      expect(res.status).toBe(400)
    })

    it('should return 400 for description too short', async () => {
      const res = await client['work-orders'].$post({
        json: { ...validBody, description: 'short' }
      })

      expect(res.status).toBe(400)
    })

    it('should propagate 404 when machine not found', async () => {
      mockedService.createWorkOrder.mockRejectedValue(
        new HTTPException(404, { message: 'Machine not found' })
      )

      const res = await client['work-orders'].$post({ json: validBody })

      expect(res.status).toBe(404)
    })
  })

  // ─── PATCH /:id ───────────────────────────────────────────────────────────────

  describe('PATCH /:id', () => {
    it('should return 200 and update work order', async () => {
      const updated = makeWorkOrder({ title: 'Updated title' })
      mockedService.updateWorkOrder.mockResolvedValue(updated as never)

      const res = await client['work-orders'][':id'].$patch({
        param: { id: WO_ID },
        json: { title: 'Updated title' }
      })
      const body = await res.json()

      expect(res.status).toBe(200)
      expect(body).toMatchObject({ title: 'Updated title' })
      expect(mockedService.updateWorkOrder).toHaveBeenCalledWith(
        WO_ID,
        expect.objectContaining({ title: 'Updated title' })
      )
    })

    it('should require ADMIN or MANAGER role', () => {
      const calls = initialRequireRolesCalls.find(
        (call) =>
          call.includes(UserRole.ADMIN) &&
          call.includes(UserRole.MANAGER) &&
          !call.includes(UserRole.TECHNICIAN)
      )
      expect(calls).toBeDefined()
    })

    it('should return 403 when role check fails', async () => {
      rolesMiddleware.mockImplementation(async () => {
        throw new HTTPException(403, { message: 'Forbidden' })
      })

      const res = await client['work-orders'][':id'].$patch({
        param: { id: WO_ID },
        json: { title: 'Updated title' }
      })

      expect(res.status).toBe(403)
    })

    it('should return 400 for invalid UUID param', async () => {
      const res = await client['work-orders'][':id'].$patch({
        param: { id: 'bad-id' },
        json: { title: 'Updated title' }
      })

      expect(res.status).toBe(400)
    })

    it('should propagate 400 when work order is closed', async () => {
      mockedService.updateWorkOrder.mockRejectedValue(
        new HTTPException(400, { message: 'Cannot update a closed work order' })
      )

      const res = await client['work-orders'][':id'].$patch({
        param: { id: WO_ID },
        json: { title: 'Updated title' }
      })

      expect(res.status).toBe(400)
    })
  })

  // ─── PATCH /:id/status ────────────────────────────────────────────────────────

  describe('PATCH /:id/status', () => {
    it('should return 200 and update work order status', async () => {
      const updated = makeWorkOrder({ status: WorkOrderStatus.IN_PROGRESS })
      mockedService.updateWorkOrderStatus.mockResolvedValue(updated as never)

      const res = await client['work-orders'][':id'].status.$patch({
        param: { id: WO_ID },
        json: { status: WorkOrderStatus.IN_PROGRESS }
      })
      const body = await res.json()

      expect(res.status).toBe(200)
      expect(body).toMatchObject({ status: WorkOrderStatus.IN_PROGRESS })
      expect(mockedService.updateWorkOrderStatus).toHaveBeenCalledWith(WO_ID, {
        status: WorkOrderStatus.IN_PROGRESS
      })
    })

    it('should require ADMIN, MANAGER, or TECHNICIAN role', () => {
      const calls = initialRequireRolesCalls.find(
        (call) =>
          call.includes(UserRole.ADMIN) &&
          call.includes(UserRole.MANAGER) &&
          call.includes(UserRole.TECHNICIAN)
      )
      expect(calls).toBeDefined()
    })

    it('should return 403 when role check fails', async () => {
      rolesMiddleware.mockImplementation(async () => {
        throw new HTTPException(403, { message: 'Forbidden' })
      })

      const res = await client['work-orders'][':id'].status.$patch({
        param: { id: WO_ID },
        json: { status: WorkOrderStatus.CANCELLED }
      })

      expect(res.status).toBe(403)
    })

    it('should return 400 for invalid status value', async () => {
      const res = await client['work-orders'][':id'].status.$patch({
        param: { id: WO_ID },
        json: { status: 'INVALID_STATUS' }
      })

      expect(res.status).toBe(400)
    })

    it('should propagate 400 for invalid state transition', async () => {
      mockedService.updateWorkOrderStatus.mockRejectedValue(
        new HTTPException(400, {
          message: 'Cannot transition from NEW to COMPLETED'
        })
      )

      const res = await client['work-orders'][':id'].status.$patch({
        param: { id: WO_ID },
        json: { status: WorkOrderStatus.COMPLETED }
      })

      expect(res.status).toBe(400)
    })

    it('should propagate 400 when BHP not confirmed', async () => {
      mockedService.updateWorkOrderStatus.mockRejectedValue(
        new HTTPException(400, {
          message: 'BHP confirmation required before starting work'
        })
      )

      const res = await client['work-orders'][':id'].status.$patch({
        param: { id: WO_ID },
        json: { status: WorkOrderStatus.IN_PROGRESS }
      })

      expect(res.status).toBe(400)
    })
  })

  // ─── PATCH /:id/assign ────────────────────────────────────────────────────────

  describe('PATCH /:id/assign', () => {
    it('should return 200 and assign technician', async () => {
      const updated = makeWorkOrder({ assignedToId: TECH_ID })
      mockedService.assignTechnician.mockResolvedValue(updated as never)

      const res = await client['work-orders'][':id'].assign.$patch({
        param: { id: WO_ID },
        json: { technicianId: TECH_ID }
      })
      const body = await res.json()

      expect(res.status).toBe(200)
      expect(mockedService.assignTechnician).toHaveBeenCalledWith(WO_ID, {
        technicianId: TECH_ID
      })
      expect(body).toMatchObject({ assignedToId: TECH_ID })
    })

    it('should return 400 for invalid technicianId UUID', async () => {
      const res = await client['work-orders'][':id'].assign.$patch({
        param: { id: WO_ID },
        json: { technicianId: 'not-a-uuid' }
      })

      expect(res.status).toBe(400)
    })

    it('should return 400 for missing technicianId', async () => {
      const res = await client['work-orders'][':id'].assign.$patch({
        param: { id: WO_ID },
        json: {}
      })

      expect(res.status).toBe(400)
    })

    it('should return 403 when role check fails', async () => {
      rolesMiddleware.mockImplementation(async () => {
        throw new HTTPException(403, { message: 'Forbidden' })
      })

      const res = await client['work-orders'][':id'].assign.$patch({
        param: { id: WO_ID },
        json: { technicianId: TECH_ID }
      })

      expect(res.status).toBe(403)
    })

    it('should propagate 404 when technician not found', async () => {
      mockedService.assignTechnician.mockRejectedValue(
        new HTTPException(404, { message: 'Technician not found' })
      )

      const res = await client['work-orders'][':id'].assign.$patch({
        param: { id: WO_ID },
        json: { technicianId: TECH_ID }
      })

      expect(res.status).toBe(404)
    })

    it('should propagate 400 when user is not a technician', async () => {
      mockedService.assignTechnician.mockRejectedValue(
        new HTTPException(400, { message: 'User is not a technician' })
      )

      const res = await client['work-orders'][':id'].assign.$patch({
        param: { id: WO_ID },
        json: { technicianId: TECH_ID }
      })

      expect(res.status).toBe(400)
    })
  })

  // ─── POST /:id/bhp-confirm ────────────────────────────────────────────────────

  describe('POST /:id/bhp-confirm', () => {
    it('should return 200 and confirm BHP', async () => {
      const confirmed = makeWorkOrder({
        bhpConfirmed: true,
        assignedToId: USER_ID
      })
      mockedService.confirmBhp.mockResolvedValue(confirmed as never)

      const res = await client['work-orders'][':id']['bhp-confirm'].$post({
        param: { id: WO_ID }
      })
      const body = await res.json()

      expect(res.status).toBe(200)
      expect(mockedService.confirmBhp).toHaveBeenCalledWith(WO_ID, USER_ID)
      expect(body).toMatchObject({ bhpConfirmed: true })
    })

    it('should require TECHNICIAN role only', () => {
      const calls = initialRequireRolesCalls.find(
        (call) => call.includes(UserRole.TECHNICIAN) && call.length === 1
      )
      expect(calls).toBeDefined()
    })

    it('should return 403 when role check fails', async () => {
      rolesMiddleware.mockImplementation(async () => {
        throw new HTTPException(403, { message: 'Forbidden' })
      })

      const res = await client['work-orders'][':id']['bhp-confirm'].$post({
        param: { id: WO_ID }
      })

      expect(res.status).toBe(403)
    })

    it('should return 400 for invalid UUID param', async () => {
      const res = await client['work-orders'][':id']['bhp-confirm'].$post({
        param: { id: 'bad-id' }
      })

      expect(res.status).toBe(400)
    })

    it('should propagate 403 when user is not the assigned technician', async () => {
      mockedService.confirmBhp.mockRejectedValue(
        new HTTPException(403, {
          message: 'Only assigned technician can confirm BHP'
        })
      )

      const res = await client['work-orders'][':id']['bhp-confirm'].$post({
        param: { id: WO_ID }
      })

      expect(res.status).toBe(403)
    })

    it('should propagate 400 when BHP already confirmed', async () => {
      mockedService.confirmBhp.mockRejectedValue(
        new HTTPException(400, { message: 'BHP already confirmed' })
      )

      const res = await client['work-orders'][':id']['bhp-confirm'].$post({
        param: { id: WO_ID }
      })

      expect(res.status).toBe(400)
    })
  })

  // ─── GET /:id/messages ────────────────────────────────────────────────────────

  describe('GET /:id/messages', () => {
    it('should return 200 with list of messages', async () => {
      mockedService.getMessages.mockResolvedValue([makeMessage()] as never)

      const res = await client['work-orders'][':id'].messages.$get({
        param: { id: WO_ID }
      })
      const body = await res.json()

      expect(res.status).toBe(200)
      expect(Array.isArray(body)).toBe(true)
      expect(mockedService.getMessages).toHaveBeenCalledWith(WO_ID)
    })

    it('should return 400 for invalid UUID param', async () => {
      const res = await client['work-orders'][':id'].messages.$get({
        param: { id: 'not-a-uuid' }
      })

      expect(res.status).toBe(400)
    })

    it('should propagate 404 when work order not found', async () => {
      mockedService.getMessages.mockRejectedValue(
        new HTTPException(404, { message: 'Work order not found' })
      )

      const res = await client['work-orders'][':id'].messages.$get({
        param: { id: WO_ID }
      })

      expect(res.status).toBe(404)
    })
  })

  // ─── POST /:id/messages ───────────────────────────────────────────────────────

  describe('POST /:id/messages', () => {
    it('should return 201 and add message', async () => {
      mockedService.addMessage.mockResolvedValue(makeMessage() as never)

      const res = await client['work-orders'][':id'].messages.$post({
        param: { id: WO_ID },
        json: { content: 'This is a test message' }
      })
      const body = await res.json()

      expect(res.status).toBe(201)
      expect(mockedService.addMessage).toHaveBeenCalledWith(WO_ID, USER_ID, {
        content: 'This is a test message'
      })
      expect(body).toMatchObject({ workOrderId: WO_ID })
    })

    it('should return 400 for empty content', async () => {
      const res = await client['work-orders'][':id'].messages.$post({
        param: { id: WO_ID },
        json: { content: '' }
      })

      expect(res.status).toBe(400)
    })

    it('should return 400 for content exceeding 2000 characters', async () => {
      const res = await client['work-orders'][':id'].messages.$post({
        param: { id: WO_ID },
        json: { content: 'a'.repeat(2001) }
      })

      expect(res.status).toBe(400)
    })

    it('should propagate 400 when work order is closed', async () => {
      mockedService.addMessage.mockRejectedValue(
        new HTTPException(400, {
          message: 'Cannot add message to a closed work order'
        })
      )

      const res = await client['work-orders'][':id'].messages.$post({
        param: { id: WO_ID },
        json: { content: 'Hello' }
      })

      expect(res.status).toBe(400)
    })
  })

  // ─── GET /:id/parts ───────────────────────────────────────────────────────────

  describe('GET /:id/parts', () => {
    it('should return 200 with list of parts', async () => {
      mockedService.getWorkOrderParts.mockResolvedValue([
        makeWorkOrderPart()
      ] as never)

      const res = await client['work-orders'][':id'].parts.$get({
        param: { id: WO_ID }
      })
      const body = await res.json()

      expect(res.status).toBe(200)
      expect(Array.isArray(body)).toBe(true)
      expect(mockedService.getWorkOrderParts).toHaveBeenCalledWith(WO_ID)
    })

    it('should return 400 for invalid UUID param', async () => {
      const res = await client['work-orders'][':id'].parts.$get({
        param: { id: 'not-a-uuid' }
      })

      expect(res.status).toBe(400)
    })

    it('should propagate 404 when work order not found', async () => {
      mockedService.getWorkOrderParts.mockRejectedValue(
        new HTTPException(404, { message: 'Work order not found' })
      )

      const res = await client['work-orders'][':id'].parts.$get({
        param: { id: WO_ID }
      })

      expect(res.status).toBe(404)
    })
  })

  // ─── POST /:id/parts ──────────────────────────────────────────────────────────

  describe('POST /:id/parts', () => {
    const validBody = { partId: PART_ID, quantity: 2 }

    it('should return 201 and add part', async () => {
      mockedService.addPart.mockResolvedValue(makeWorkOrderPart() as never)

      const res = await client['work-orders'][':id'].parts.$post({
        param: { id: WO_ID },
        json: validBody
      })
      const body = await res.json()

      expect(res.status).toBe(201)
      expect(mockedService.addPart).toHaveBeenCalledWith(WO_ID, validBody)
      expect(body).toMatchObject({ partId: PART_ID, quantity: 2 })
    })

    it('should require ADMIN, MANAGER, or TECHNICIAN role', () => {
      const calls = initialRequireRolesCalls.filter(
        (call) =>
          call.includes(UserRole.ADMIN) &&
          call.includes(UserRole.MANAGER) &&
          call.includes(UserRole.TECHNICIAN)
      )
      expect(calls.length).toBeGreaterThanOrEqual(1)
    })

    it('should return 403 when role check fails', async () => {
      rolesMiddleware.mockImplementation(async () => {
        throw new HTTPException(403, { message: 'Forbidden' })
      })

      const res = await client['work-orders'][':id'].parts.$post({
        param: { id: WO_ID },
        json: validBody
      })

      expect(res.status).toBe(403)
    })

    it('should return 400 for invalid partId UUID', async () => {
      const res = await client['work-orders'][':id'].parts.$post({
        param: { id: WO_ID },
        json: { partId: 'not-a-uuid', quantity: 2 }
      })

      expect(res.status).toBe(400)
    })

    it('should return 400 for quantity less than 1', async () => {
      const res = await client['work-orders'][':id'].parts.$post({
        param: { id: WO_ID },
        json: { partId: PART_ID, quantity: 0 }
      })

      expect(res.status).toBe(400)
    })

    it('should return 400 for non-integer quantity', async () => {
      const res = await client['work-orders'][':id'].parts.$post({
        param: { id: WO_ID },
        json: { partId: PART_ID, quantity: 1.5 }
      })

      expect(res.status).toBe(400)
    })

    it('should propagate 404 when work order not found', async () => {
      mockedService.addPart.mockRejectedValue(
        new HTTPException(404, { message: 'Work order not found' })
      )

      const res = await client['work-orders'][':id'].parts.$post({
        param: { id: WO_ID },
        json: validBody
      })

      expect(res.status).toBe(404)
    })

    it('should propagate 400 when insufficient stock', async () => {
      mockedService.addPart.mockRejectedValue(
        new HTTPException(400, { message: 'Insufficient stock. Available: 1' })
      )

      const res = await client['work-orders'][':id'].parts.$post({
        param: { id: WO_ID },
        json: validBody
      })

      expect(res.status).toBe(400)
    })

    it('should propagate 400 when work order is closed', async () => {
      mockedService.addPart.mockRejectedValue(
        new HTTPException(400, {
          message: 'Cannot add parts to a closed work order'
        })
      )

      const res = await client['work-orders'][':id'].parts.$post({
        param: { id: WO_ID },
        json: validBody
      })

      expect(res.status).toBe(400)
    })
  })
})
