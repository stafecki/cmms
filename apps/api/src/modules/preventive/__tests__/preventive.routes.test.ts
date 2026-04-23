import { describe, it, expect, vi, beforeAll, beforeEach } from 'vitest'
import { Hono } from 'hono'
import { testClient } from 'hono/testing'
import { HTTPException } from 'hono/http-exception'
import preventive from '../preventive.routes.js'
import * as preventiveService from '../preventive.service.js'
import { UserRole } from '../../../../generated/prisma/client.js'
import { authMiddleware } from '../../../middleware/auth.middleware.js'
import { requireRoles } from '../../../middleware/roles.middleware.js'

const { rolesMiddleware } = vi.hoisted(() => ({
  rolesMiddleware: vi.fn(async (_c: unknown, next: () => Promise<void>) => {
    await next()
  })
}))

vi.mock('../preventive.service.js', () => ({
  getPreventivePlans: vi.fn(),
  getPreventivePlanById: vi.fn(),
  createPreventivePlan: vi.fn(),
  updatePreventivePlan: vi.fn(),
  deletePreventivePlan: vi.fn(),
  getUpcomingPlans: vi.fn(),
  triggerPreventiveWorkOrder: vi.fn(),
  checkAndCreatePreventiveOrders: vi.fn()
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

vi.mock('../../../lib/redis.js', () => ({
  default: { get: vi.fn(), set: vi.fn() }
}))

const USER_ID = 'a0000000-0000-4000-8000-000000000099'
const PLAN_ID = 'a0000000-0000-4000-8000-000000000001'
const MACHINE_ID = 'a0000000-0000-4000-8000-000000000002'

const mockedService = vi.mocked(preventiveService)

const makePlan = (overrides = {}) => ({
  id: PLAN_ID,
  machineId: MACHINE_ID,
  name: 'Monthly inspection',
  intervalHours: null,
  intervalDays: 30,
  advanceDays: 7,
  checklist: [{ step: 1, label: 'Check oil level', done: false }],
  isActive: true,
  lastRunAt: null,
  nextRunAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  machine: { id: MACHINE_ID, name: 'CNC Lathe' },
  ...overrides
})

const makeWorkOrder = (overrides = {}) => ({
  id: 'a0000000-0000-4000-8000-000000000010',
  machineId: MACHINE_ID,
  reportedById: USER_ID,
  title: 'Przegląd okresowy: Monthly inspection',
  status: 'NEW',
  priority: 'MEDIUM',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
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
app.route('/preventive', preventive)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const client = testClient(app) as any

describe('Preventive Routes', () => {
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
    it('should return 200 with list of active plans', async () => {
      mockedService.getPreventivePlans.mockResolvedValue([makePlan()] as never)

      const res = await client.preventive.$get({})
      const body = await res.json()

      expect(res.status).toBe(200)
      expect(Array.isArray(body)).toBe(true)
      expect(mockedService.getPreventivePlans).toHaveBeenCalledOnce()
    })

    it('should return 401 when auth middleware rejects', async () => {
      vi.mocked(authMiddleware).mockImplementationOnce(async (_c, _next) => {
        throw new HTTPException(401, { message: 'Unauthorized' })
      })

      const res = await client.preventive.$get({})

      expect(res.status).toBe(401)
      expect(mockedService.getPreventivePlans).not.toHaveBeenCalled()
    })

    it('should return 500 when service throws unexpected error', async () => {
      mockedService.getPreventivePlans.mockRejectedValue(
        new Error('Database connection failed')
      )

      const res = await client.preventive.$get({})

      expect(res.status).toBe(500)
    })
  })

  // ─── GET /upcoming ────────────────────────────────────────────────────────────

  describe('GET /upcoming', () => {
    it('should return 200 with upcoming plans using default 7 days', async () => {
      mockedService.getUpcomingPlans.mockResolvedValue([makePlan()] as never)

      const res = await client.preventive.upcoming.$get({ query: {} })

      expect(res.status).toBe(200)
      expect(mockedService.getUpcomingPlans).toHaveBeenCalledWith(7)
    })

    it('should pass custom days param to service', async () => {
      mockedService.getUpcomingPlans.mockResolvedValue([makePlan()] as never)

      const res = await client.preventive.upcoming.$get({
        query: { days: '14' }
      })

      expect(res.status).toBe(200)
      expect(mockedService.getUpcomingPlans).toHaveBeenCalledWith(14)
    })

    it('should use default 7 when days param is not a number', async () => {
      mockedService.getUpcomingPlans.mockResolvedValue([] as never)

      const res = await client.preventive.upcoming.$get({
        query: { days: 'abc' }
      })

      expect(res.status).toBe(200)
      expect(mockedService.getUpcomingPlans).toHaveBeenCalledWith(7)
    })

    it('should return 401 when auth middleware rejects', async () => {
      vi.mocked(authMiddleware).mockImplementationOnce(async (_c, _next) => {
        throw new HTTPException(401, { message: 'Unauthorized' })
      })

      const res = await client.preventive.upcoming.$get({ query: {} })

      expect(res.status).toBe(401)
      expect(mockedService.getUpcomingPlans).not.toHaveBeenCalled()
    })
  })

  // ─── GET /check ───────────────────────────────────────────────────────────────

  describe('GET /check', () => {
    it('should return 200 with count of created work orders', async () => {
      mockedService.checkAndCreatePreventiveOrders.mockResolvedValue(3)

      const res = await client.preventive.check.$get({})
      const body = await res.json()

      expect(res.status).toBe(200)
      expect(body).toEqual({ message: 'Created 3 preventive work orders' })
      expect(
        mockedService.checkAndCreatePreventiveOrders
      ).toHaveBeenCalledOnce()
    })

    it('should return 200 with 0 when no orders were created', async () => {
      mockedService.checkAndCreatePreventiveOrders.mockResolvedValue(0)

      const res = await client.preventive.check.$get({})
      const body = await res.json()

      expect(res.status).toBe(200)
      expect(body).toEqual({ message: 'Created 0 preventive work orders' })
    })

    it('should return 403 when user lacks ADMIN role', async () => {
      rolesMiddleware.mockImplementationOnce(
        async (_c: unknown, _next: () => Promise<void>) => {
          throw new HTTPException(403, { message: 'Insufficient permissions' })
        }
      )

      const res = await client.preventive.check.$get({})

      expect(res.status).toBe(403)
      expect(
        mockedService.checkAndCreatePreventiveOrders
      ).not.toHaveBeenCalled()
    })

    it('should require ADMIN role', () => {
      expect(initialRequireRolesCalls).toContainEqual([UserRole.ADMIN])
    })
  })

  // ─── GET /:id ─────────────────────────────────────────────────────────────────

  describe('GET /:id', () => {
    it('should return 200 with plan data', async () => {
      mockedService.getPreventivePlanById.mockResolvedValue(makePlan() as never)

      const res = await client.preventive[':id'].$get({
        param: { id: PLAN_ID }
      })

      expect(res.status).toBe(200)
      expect(mockedService.getPreventivePlanById).toHaveBeenCalledWith(PLAN_ID)
    })

    it('should return 400 when id is not a valid UUID', async () => {
      const res = await client.preventive[':id'].$get({
        param: { id: 'bad-id' }
      })

      expect(res.status).toBe(400)
      expect(mockedService.getPreventivePlanById).not.toHaveBeenCalled()
    })

    it('should return 404 when plan does not exist', async () => {
      mockedService.getPreventivePlanById.mockRejectedValue(
        new HTTPException(404, { message: 'Preventive plan not found' })
      )

      const res = await client.preventive[':id'].$get({
        param: { id: PLAN_ID }
      })

      expect(res.status).toBe(404)
    })

    it('should return 401 when auth middleware rejects', async () => {
      vi.mocked(authMiddleware).mockImplementationOnce(async (_c, _next) => {
        throw new HTTPException(401, { message: 'Unauthorized' })
      })

      const res = await client.preventive[':id'].$get({
        param: { id: PLAN_ID }
      })

      expect(res.status).toBe(401)
      expect(mockedService.getPreventivePlanById).not.toHaveBeenCalled()
    })
  })

  // ─── POST / ───────────────────────────────────────────────────────────────────

  describe('POST /', () => {
    const validBody = {
      machineId: MACHINE_ID,
      name: 'Monthly inspection',
      intervalDays: 30,
      advanceDays: 7,
      checklist: [{ step: 1, label: 'Check oil level' }]
    }

    it('should return 201 with created plan', async () => {
      mockedService.createPreventivePlan.mockResolvedValue(makePlan() as never)

      const res = await client.preventive.$post({ json: validBody })

      expect(res.status).toBe(201)
      expect(mockedService.createPreventivePlan).toHaveBeenCalledOnce()
    })

    it('should return 201 with intervalHours instead of intervalDays', async () => {
      mockedService.createPreventivePlan.mockResolvedValue(
        makePlan({ intervalHours: 500, intervalDays: null }) as never
      )

      const res = await client.preventive.$post({
        json: { ...validBody, intervalDays: undefined, intervalHours: 500 }
      })

      expect(res.status).toBe(201)
    })

    it('should return 400 when machineId is not a valid UUID', async () => {
      const res = await client.preventive.$post({
        json: { ...validBody, machineId: 'not-a-uuid' }
      })

      expect(res.status).toBe(400)
      expect(mockedService.createPreventivePlan).not.toHaveBeenCalled()
    })

    it('should return 400 when name is shorter than 3 characters', async () => {
      const res = await client.preventive.$post({
        json: { ...validBody, name: 'AB' }
      })

      expect(res.status).toBe(400)
      expect(mockedService.createPreventivePlan).not.toHaveBeenCalled()
    })

    it('should return 400 when name exceeds 200 characters', async () => {
      const res = await client.preventive.$post({
        json: { ...validBody, name: 'A'.repeat(201) }
      })

      expect(res.status).toBe(400)
      expect(mockedService.createPreventivePlan).not.toHaveBeenCalled()
    })

    it('should return 400 when neither intervalHours nor intervalDays is provided', async () => {
      const { intervalDays: _, ...bodyWithoutInterval } = validBody

      const res = await client.preventive.$post({
        json: bodyWithoutInterval as typeof validBody
      })

      expect(res.status).toBe(400)
      expect(mockedService.createPreventivePlan).not.toHaveBeenCalled()
    })

    it('should return 400 when checklist is empty', async () => {
      const res = await client.preventive.$post({
        json: { ...validBody, checklist: [] }
      })

      expect(res.status).toBe(400)
      expect(mockedService.createPreventivePlan).not.toHaveBeenCalled()
    })

    it('should return 400 when checklist step label is shorter than 3 characters', async () => {
      const res = await client.preventive.$post({
        json: {
          ...validBody,
          checklist: [{ step: 1, label: 'AB' }]
        }
      })

      expect(res.status).toBe(400)
      expect(mockedService.createPreventivePlan).not.toHaveBeenCalled()
    })

    it('should return 403 when user lacks required role', async () => {
      rolesMiddleware.mockImplementationOnce(
        async (_c: unknown, _next: () => Promise<void>) => {
          throw new HTTPException(403, { message: 'Insufficient permissions' })
        }
      )

      const res = await client.preventive.$post({ json: validBody })

      expect(res.status).toBe(403)
      expect(mockedService.createPreventivePlan).not.toHaveBeenCalled()
    })

    it('should return 404 when machine does not exist', async () => {
      mockedService.createPreventivePlan.mockRejectedValue(
        new HTTPException(404, { message: 'Machine not found' })
      )

      const res = await client.preventive.$post({ json: validBody })

      expect(res.status).toBe(404)
    })

    it('should require ADMIN or MANAGER role', () => {
      expect(initialRequireRolesCalls).toContainEqual([
        UserRole.ADMIN,
        UserRole.MANAGER
      ])
    })
  })

  // ─── PATCH /:id ───────────────────────────────────────────────────────────────

  describe('PATCH /:id', () => {
    it('should return 200 with updated plan', async () => {
      mockedService.updatePreventivePlan.mockResolvedValue(
        makePlan({ name: 'Updated inspection' }) as never
      )

      const res = await client.preventive[':id'].$patch({
        param: { id: PLAN_ID },
        json: { name: 'Updated inspection' }
      })

      expect(res.status).toBe(200)
      expect(mockedService.updatePreventivePlan).toHaveBeenCalledWith(
        PLAN_ID,
        expect.objectContaining({ name: 'Updated inspection' })
      )
    })

    it('should return 400 when id is not a valid UUID', async () => {
      const res = await client.preventive[':id'].$patch({
        param: { id: 'bad-id' },
        json: { name: 'Updated' }
      })

      expect(res.status).toBe(400)
      expect(mockedService.updatePreventivePlan).not.toHaveBeenCalled()
    })

    it('should return 400 when name is shorter than 3 characters', async () => {
      const res = await client.preventive[':id'].$patch({
        param: { id: PLAN_ID },
        json: { name: 'AB' }
      })

      expect(res.status).toBe(400)
    })

    it('should return 400 when machineId is not a valid UUID', async () => {
      const res = await client.preventive[':id'].$patch({
        param: { id: PLAN_ID },
        json: { machineId: 'not-a-uuid' }
      })

      expect(res.status).toBe(400)
    })

    it('should return 403 when user lacks required role', async () => {
      rolesMiddleware.mockImplementationOnce(
        async (_c: unknown, _next: () => Promise<void>) => {
          throw new HTTPException(403, { message: 'Insufficient permissions' })
        }
      )

      const res = await client.preventive[':id'].$patch({
        param: { id: PLAN_ID },
        json: { name: 'Updated inspection' }
      })

      expect(res.status).toBe(403)
    })

    it('should return 404 when plan does not exist', async () => {
      mockedService.updatePreventivePlan.mockRejectedValue(
        new HTTPException(404, { message: 'Preventive plan not found' })
      )

      const res = await client.preventive[':id'].$patch({
        param: { id: PLAN_ID },
        json: { name: 'Updated inspection' }
      })

      expect(res.status).toBe(404)
    })
  })

  // ─── DELETE /:id ──────────────────────────────────────────────────────────────

  describe('DELETE /:id', () => {
    it('should return 200 on successful delete', async () => {
      mockedService.deletePreventivePlan.mockResolvedValue(undefined)

      const res = await client.preventive[':id'].$delete({
        param: { id: PLAN_ID }
      })
      const body = await res.json()

      expect(res.status).toBe(200)
      expect(body).toEqual({ message: 'Preventive plan deleted successfully' })
      expect(mockedService.deletePreventivePlan).toHaveBeenCalledWith(PLAN_ID)
    })

    it('should return 400 when id is not a valid UUID', async () => {
      const res = await client.preventive[':id'].$delete({
        param: { id: 'bad-id' }
      })

      expect(res.status).toBe(400)
      expect(mockedService.deletePreventivePlan).not.toHaveBeenCalled()
    })

    it('should return 403 when user lacks ADMIN role', async () => {
      rolesMiddleware.mockImplementationOnce(
        async (_c: unknown, _next: () => Promise<void>) => {
          throw new HTTPException(403, { message: 'Insufficient permissions' })
        }
      )

      const res = await client.preventive[':id'].$delete({
        param: { id: PLAN_ID }
      })

      expect(res.status).toBe(403)
    })

    it('should return 404 when plan does not exist', async () => {
      mockedService.deletePreventivePlan.mockRejectedValue(
        new HTTPException(404, { message: 'Preventive plan not found' })
      )

      const res = await client.preventive[':id'].$delete({
        param: { id: PLAN_ID }
      })

      expect(res.status).toBe(404)
    })

    it('should require ADMIN role', () => {
      expect(initialRequireRolesCalls).toContainEqual([UserRole.ADMIN])
    })
  })

  // ─── POST /:id/trigger ────────────────────────────────────────────────────────

  describe('POST /:id/trigger', () => {
    it('should return 201 with created work order', async () => {
      mockedService.triggerPreventiveWorkOrder.mockResolvedValue(
        makeWorkOrder() as never
      )

      const res = await client.preventive[':id'].trigger.$post({
        param: { id: PLAN_ID }
      })

      expect(res.status).toBe(201)
      expect(mockedService.triggerPreventiveWorkOrder).toHaveBeenCalledWith(
        PLAN_ID,
        USER_ID
      )
    })

    it('should return 400 when id is not a valid UUID', async () => {
      const res = await client.preventive[':id'].trigger.$post({
        param: { id: 'bad-id' }
      })

      expect(res.status).toBe(400)
      expect(mockedService.triggerPreventiveWorkOrder).not.toHaveBeenCalled()
    })

    it('should return 403 when user lacks required role', async () => {
      rolesMiddleware.mockImplementationOnce(
        async (_c: unknown, _next: () => Promise<void>) => {
          throw new HTTPException(403, { message: 'Insufficient permissions' })
        }
      )

      const res = await client.preventive[':id'].trigger.$post({
        param: { id: PLAN_ID }
      })

      expect(res.status).toBe(403)
    })

    it('should return 404 when plan does not exist', async () => {
      mockedService.triggerPreventiveWorkOrder.mockRejectedValue(
        new HTTPException(404, { message: 'Preventive plan not found' })
      )

      const res = await client.preventive[':id'].trigger.$post({
        param: { id: PLAN_ID }
      })

      expect(res.status).toBe(404)
    })

    it('should pass authenticated user id to service', async () => {
      mockedService.triggerPreventiveWorkOrder.mockResolvedValue(
        makeWorkOrder() as never
      )

      await client.preventive[':id'].trigger.$post({
        param: { id: PLAN_ID }
      })

      expect(mockedService.triggerPreventiveWorkOrder).toHaveBeenCalledWith(
        PLAN_ID,
        USER_ID
      )
    })
  })
})
