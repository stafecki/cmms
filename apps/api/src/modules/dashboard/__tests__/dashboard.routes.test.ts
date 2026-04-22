import { describe, it, expect, vi, beforeAll, beforeEach } from 'vitest'
import { Hono } from 'hono'
import { testClient } from 'hono/testing'
import { HTTPException } from 'hono/http-exception'
import dashboard from '../dashboard.routes.js'
import * as dashboardService from '../dashboard.service.js'
import { UserRole } from '../../../../generated/prisma/client.js'
import { authMiddleware } from '../../../middleware/auth.middleware.js'
import { requireRoles } from '../../../middleware/roles.middleware.js'

// rolesMiddleware musi być vi.fn() żeby można było nadpisać implementację per-test.
// requireRoles() jest wywoływany RAZ przy imporcie modułu routy i zwraca tę funkcję —
// Hono przechowuje referencję do niej, nie do requireRoles samego w sobie.
const { rolesMiddleware } = vi.hoisted(() => ({
  rolesMiddleware: vi.fn(async (_c: unknown, next: () => Promise<void>) => {
    await next()
  })
}))

vi.mock('../dashboard.service.js', () => ({
  getDashboard: vi.fn()
}))

vi.mock('../../../middleware/auth.middleware.js', () => ({
  authMiddleware: vi.fn(async (c, next) => {
    c.set('user', {
      sub: 'user-id',
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

const mockedService = vi.mocked(dashboardService)

// Przykładowa odpowiedź serwisu — pokrywa cały shape DashboardData
const makeDashboardResponse = (period = 'month') => ({
  period,
  from: new Date('2024-01-01T00:00:00Z'),
  to: new Date('2024-02-01T00:00:00Z'),
  workOrders: {
    total: 10,
    byStatus: { COMPLETED: 8, NEW: 2 },
    byPriority: { HIGH: 3, MEDIUM: 7 },
    open: 2,
    critical: 1
  },
  costs: {
    totalLaborCost: 1000,
    totalPartsCost: 500,
    totalCost: 1500,
    topMachinesByCost: [
      { machineId: 'machine-1', machineName: 'Alpha', totalCost: 1000 }
    ]
  },
  machines: { total: 20, active: 18, mttr: 3, mtbf: 48 },
  inventory: { totalParts: 100, lowStockCount: 5, activeLoans: 2 },
  preventive: { totalPlans: 10, upcomingIn7Days: 3, overdue: 1 }
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
app.route('/dashboard', dashboard)
const client = testClient(app)

describe('Dashboard Routes', () => {
  // requireRoles jest wywoływany przy imporcie modułu (rejestracja routy), przed jakimkolwiek
  // beforeEach. Przechwytujemy argumenty tutaj, zanim clearAllMocks wyczyści historię.
  let initialRequireRolesCalls: unknown[][]

  beforeAll(() => {
    initialRequireRolesCalls = vi
      .mocked(requireRoles)
      .mock.calls.map((call) => [...call])
  })

  beforeEach(() => {
    vi.clearAllMocks()
    // Przywróć domyślne zachowanie (pass-through) po wyczyszczeniu mocków
    rolesMiddleware.mockImplementation(
      async (_c: unknown, next: () => Promise<void>) => {
        await next()
      }
    )
  })

  // ─── GET /dashboard ────────────────────────────────────────────────────────

  describe('GET /dashboard', () => {
    it('should return dashboard data with default period (month)', async () => {
      const response = makeDashboardResponse('month')
      mockedService.getDashboard.mockResolvedValue(response)

      const res = await client.dashboard.$get({
        query: {}
      })

      expect(res.status).toBe(200)
      const data = await res.json()
      // Daty są serializowane do stringa w JSON
      expect(data).toMatchObject({
        period: 'month',
        workOrders: response.workOrders,
        costs: response.costs,
        machines: response.machines,
        inventory: response.inventory,
        preventive: response.preventive
      })
    })

    it('should pass period=week to service', async () => {
      mockedService.getDashboard.mockResolvedValue(
        makeDashboardResponse('week')
      )

      const res = await client.dashboard.$get({
        query: { period: 'week' }
      })

      expect(res.status).toBe(200)
      expect(mockedService.getDashboard).toHaveBeenCalledWith('week')
    })

    it('should pass period=month to service', async () => {
      mockedService.getDashboard.mockResolvedValue(
        makeDashboardResponse('month')
      )

      const res = await client.dashboard.$get({
        query: { period: 'month' }
      })

      expect(res.status).toBe(200)
      expect(mockedService.getDashboard).toHaveBeenCalledWith('month')
    })

    it('should pass period=year to service', async () => {
      mockedService.getDashboard.mockResolvedValue(
        makeDashboardResponse('year')
      )

      const res = await client.dashboard.$get({
        query: { period: 'year' }
      })

      expect(res.status).toBe(200)
      expect(mockedService.getDashboard).toHaveBeenCalledWith('year')
    })

    it('should return 400 for invalid period value', async () => {
      const res = await client.dashboard.$get({
        query: { period: 'invalid' as 'week' }
      })

      expect(res.status).toBe(400)
      expect(mockedService.getDashboard).not.toHaveBeenCalled()
    })

    it('should return application/json content-type', async () => {
      mockedService.getDashboard.mockResolvedValue(makeDashboardResponse())

      const res = await client.dashboard.$get({ query: {} })

      expect(res.headers.get('content-type')).toBe('application/json')
    })

    it('should serialize dates as ISO strings in JSON response', async () => {
      mockedService.getDashboard.mockResolvedValue(makeDashboardResponse())

      const res = await client.dashboard.$get({ query: {} })
      const data = await res.json()

      expect(typeof data.from).toBe('string')
      expect(typeof data.to).toBe('string')
      expect(() => new Date(data.from)).not.toThrow()
    })
  })

  // ─── Auth middleware ───────────────────────────────────────────────────────

  describe('authentication', () => {
    it('should return 401 when authMiddleware rejects (missing token)', async () => {
      vi.mocked(authMiddleware).mockImplementationOnce(async (_c, _next) => {
        throw new HTTPException(401, { message: 'Missing or invalid token' })
      })

      const res = await client.dashboard.$get({ query: {} })

      expect(res.status).toBe(401)
      expect(mockedService.getDashboard).not.toHaveBeenCalled()
    })

    it('should return 401 when token is expired', async () => {
      vi.mocked(authMiddleware).mockImplementationOnce(async (_c, _next) => {
        throw new HTTPException(401, { message: 'Token expired' })
      })

      const res = await client.dashboard.$get({ query: {} })

      expect(res.status).toBe(401)
    })

    it('should return 401 when token is blacklisted', async () => {
      vi.mocked(authMiddleware).mockImplementationOnce(async (_c, _next) => {
        throw new HTTPException(401, { message: 'Token blacklisted' })
      })

      const res = await client.dashboard.$get({ query: {} })

      expect(res.status).toBe(401)
    })
  })

  // ─── Role middleware ───────────────────────────────────────────────────────

  describe('authorization', () => {
    it('should return 403 when user lacks required role', async () => {
      rolesMiddleware.mockImplementationOnce(
        async (_c: unknown, _next: () => Promise<void>) => {
          throw new HTTPException(403, { message: 'Insufficient permissions' })
        }
      )

      const res = await client.dashboard.$get({ query: {} })

      expect(res.status).toBe(403)
      expect(mockedService.getDashboard).not.toHaveBeenCalled()
    })

    it('should call requireRoles with ADMIN and MANAGER', () => {
      // requireRoles jest wywoływany przy rejestracji routy (imporcie modułu), nie przy każdym
      // requeście. Przechwytujemy argumenty w beforeAll, zanim clearAllMocks wyczyści historię.
      expect(initialRequireRolesCalls).toContainEqual([
        UserRole.ADMIN,
        UserRole.MANAGER
      ])
    })
  })

  // ─── Error handling ────────────────────────────────────────────────────────

  describe('error handling', () => {
    it('should propagate 500 when service throws unexpected error', async () => {
      mockedService.getDashboard.mockRejectedValue(
        new Error('Database connection failed')
      )

      const res = await client.dashboard.$get({ query: {} })

      expect(res.status).toBe(500)
    })

    it('should propagate HTTPException from service', async () => {
      mockedService.getDashboard.mockRejectedValue(
        new HTTPException(503, { message: 'Service unavailable' })
      )

      const res = await client.dashboard.$get({ query: {} })

      expect(res.status).toBe(503)
    })
  })
})
