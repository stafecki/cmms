import { describe, it, expect, vi, beforeAll, beforeEach } from 'vitest'
import { Hono } from 'hono'
import { testClient } from 'hono/testing'
import { HTTPException } from 'hono/http-exception'
import monitoring from '../monitoring.routes.js'
import { RequestLog } from '../../../models/request-log.model.js'
import { ErrorLog } from '../../../models/error-log.model.js'
import { UserRole } from '../../../../generated/prisma/client.js'
import { authMiddleware } from '../../../middleware/auth.middleware.js'
import { requireRoles } from '../../../middleware/roles.middleware.js'

const { rolesMiddleware } = vi.hoisted(() => ({
  rolesMiddleware: vi.fn(async (_c: unknown, next: () => Promise<void>) => {
    await next()
  })
}))

vi.mock('../../../models/request-log.model.js', () => ({
  RequestLog: {
    find: vi.fn(),
    countDocuments: vi.fn()
  }
}))

vi.mock('../../../models/error-log.model.js', () => ({
  ErrorLog: {
    find: vi.fn(),
    countDocuments: vi.fn()
  }
}))

vi.mock('../../../middleware/auth.middleware.js', () => ({
  authMiddleware: vi.fn(async (c, next) => {
    c.set('user', {
      sub: 'a0000000-0000-4000-8000-000000000099',
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

const makeQueryChain = (data: unknown[]) => {
  const chain = {
    sort: vi.fn(),
    skip: vi.fn(),
    limit: vi.fn(),
    lean: vi.fn().mockResolvedValue(data)
  }
  chain.sort.mockReturnValue(chain)
  chain.skip.mockReturnValue(chain)
  chain.limit.mockReturnValue(chain)
  return chain
}

const makeRequestLog = (overrides = {}) => ({
  _id: 'log-req-001',
  method: 'GET',
  url: '/api/machines',
  statusCode: 200,
  duration: 42,
  userId: 'a0000000-0000-4000-8000-000000000099',
  userRole: 'ADMIN',
  ip: '127.0.0.1',
  userAgent: 'vitest',
  createdAt: new Date('2024-06-01T10:00:00.000Z'),
  ...overrides
})

const makeErrorLog = (overrides = {}) => ({
  _id: 'log-err-001',
  message: 'Not Found',
  stack: 'Error: Not Found\n  at ...',
  statusCode: 404,
  method: 'GET',
  url: '/api/machines/bad-id',
  userId: 'a0000000-0000-4000-8000-000000000099',
  userRole: 'ADMIN',
  createdAt: new Date('2024-06-01T10:05:00.000Z'),
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
app.route('/monitoring', monitoring)
const client = testClient(app)

const mockedRequestLog = vi.mocked(RequestLog)
const mockedErrorLog = vi.mocked(ErrorLog)

describe('Monitoring Routes', () => {
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

  // ─── GET /monitoring/requests ─────────────────────────────────────────────────

  describe('GET /requests', () => {
    it('should return 200 with default pagination', async () => {
      const chain = makeQueryChain([makeRequestLog()])
      mockedRequestLog.find.mockReturnValue(chain as never)
      mockedRequestLog.countDocuments.mockResolvedValue(1)

      const res = await client.monitoring.requests.$get({ query: {} })
      const body = await res.json()

      expect(res.status).toBe(200)
      expect(body).toMatchObject({
        data: expect.any(Array),
        total: 1,
        limit: 50,
        offset: 0
      })
    })

    it('should return 200 with explicit limit and offset', async () => {
      const chain = makeQueryChain([makeRequestLog()])
      mockedRequestLog.find.mockReturnValue(chain as never)
      mockedRequestLog.countDocuments.mockResolvedValue(10)

      const res = await client.monitoring.requests.$get({
        query: { limit: '10', offset: '5' }
      })
      const body = await res.json()

      expect(res.status).toBe(200)
      expect(body).toMatchObject({ limit: 10, offset: 5, total: 10 })
      expect(chain.skip).toHaveBeenCalledWith(5)
      expect(chain.limit).toHaveBeenCalledWith(10)
    })

    it('should filter by userId', async () => {
      const chain = makeQueryChain([makeRequestLog()])
      mockedRequestLog.find.mockReturnValue(chain as never)
      mockedRequestLog.countDocuments.mockResolvedValue(1)

      const res = await client.monitoring.requests.$get({
        query: { userId: 'a0000000-0000-4000-8000-000000000099' }
      })

      expect(res.status).toBe(200)
      expect(mockedRequestLog.find).toHaveBeenCalledWith(
        expect.objectContaining({
          userId: 'a0000000-0000-4000-8000-000000000099'
        })
      )
    })

    it('should filter by statusCode', async () => {
      const chain = makeQueryChain([makeRequestLog({ statusCode: 500 })])
      mockedRequestLog.find.mockReturnValue(chain as never)
      mockedRequestLog.countDocuments.mockResolvedValue(1)

      const res = await client.monitoring.requests.$get({
        query: { statusCode: '500' }
      })

      expect(res.status).toBe(200)
      expect(mockedRequestLog.find).toHaveBeenCalledWith(
        expect.objectContaining({ statusCode: 500 })
      )
    })

    it('should filter by from date', async () => {
      const chain = makeQueryChain([makeRequestLog()])
      mockedRequestLog.find.mockReturnValue(chain as never)
      mockedRequestLog.countDocuments.mockResolvedValue(1)

      const res = await client.monitoring.requests.$get({
        query: { from: '2024-06-01T00:00:00.000Z' }
      })

      expect(res.status).toBe(200)
      expect(mockedRequestLog.find).toHaveBeenCalledWith(
        expect.objectContaining({
          createdAt: expect.objectContaining({ $gte: expect.any(Date) })
        })
      )
    })

    it('should filter by to date', async () => {
      const chain = makeQueryChain([makeRequestLog()])
      mockedRequestLog.find.mockReturnValue(chain as never)
      mockedRequestLog.countDocuments.mockResolvedValue(1)

      const res = await client.monitoring.requests.$get({
        query: { to: '2024-06-30T23:59:59.000Z' }
      })

      expect(res.status).toBe(200)
      expect(mockedRequestLog.find).toHaveBeenCalledWith(
        expect.objectContaining({
          createdAt: expect.objectContaining({ $lte: expect.any(Date) })
        })
      )
    })

    it('should filter by from and to dates combined', async () => {
      const chain = makeQueryChain([makeRequestLog()])
      mockedRequestLog.find.mockReturnValue(chain as never)
      mockedRequestLog.countDocuments.mockResolvedValue(1)

      const res = await client.monitoring.requests.$get({
        query: {
          from: '2024-06-01T00:00:00.000Z',
          to: '2024-06-30T23:59:59.000Z'
        }
      })

      expect(res.status).toBe(200)
      expect(mockedRequestLog.find).toHaveBeenCalledWith(
        expect.objectContaining({
          createdAt: expect.objectContaining({
            $gte: expect.any(Date),
            $lte: expect.any(Date)
          })
        })
      )
    })

    it('should filter by all params combined', async () => {
      const chain = makeQueryChain([makeRequestLog({ statusCode: 404 })])
      mockedRequestLog.find.mockReturnValue(chain as never)
      mockedRequestLog.countDocuments.mockResolvedValue(1)

      const res = await client.monitoring.requests.$get({
        query: {
          userId: 'a0000000-0000-4000-8000-000000000099',
          statusCode: '404',
          from: '2024-06-01T00:00:00.000Z',
          to: '2024-06-30T23:59:59.000Z',
          limit: '5',
          offset: '0'
        }
      })

      expect(res.status).toBe(200)
      expect(mockedRequestLog.find).toHaveBeenCalledWith(
        expect.objectContaining({
          userId: 'a0000000-0000-4000-8000-000000000099',
          statusCode: 404,
          createdAt: expect.objectContaining({
            $gte: expect.any(Date),
            $lte: expect.any(Date)
          })
        })
      )
    })

    it('should not include createdAt filter when no date params provided', async () => {
      const chain = makeQueryChain([])
      mockedRequestLog.find.mockReturnValue(chain as never)
      mockedRequestLog.countDocuments.mockResolvedValue(0)

      await client.monitoring.requests.$get({ query: {} })

      const callArg = mockedRequestLog.find.mock.calls[0][0]
      expect(callArg).not.toHaveProperty('createdAt')
    })

    it('should return 400 when limit is 0', async () => {
      const res = await client.monitoring.requests.$get({
        query: { limit: '0' }
      })

      expect(res.status).toBe(400)
      expect(mockedRequestLog.find).not.toHaveBeenCalled()
    })

    it('should return 400 when limit exceeds 100', async () => {
      const res = await client.monitoring.requests.$get({
        query: { limit: '101' }
      })

      expect(res.status).toBe(400)
      expect(mockedRequestLog.find).not.toHaveBeenCalled()
    })

    it('should return 400 when offset is negative', async () => {
      const res = await client.monitoring.requests.$get({
        query: { offset: '-1' }
      })

      expect(res.status).toBe(400)
      expect(mockedRequestLog.find).not.toHaveBeenCalled()
    })

    it('should return 400 when from is not a valid date', async () => {
      const res = await client.monitoring.requests.$get({
        query: { from: 'not-a-date' }
      })

      expect(res.status).toBe(400)
      expect(mockedRequestLog.find).not.toHaveBeenCalled()
    })

    it('should return 400 when to is not a valid date', async () => {
      const res = await client.monitoring.requests.$get({
        query: { to: 'not-a-date' }
      })

      expect(res.status).toBe(400)
      expect(mockedRequestLog.find).not.toHaveBeenCalled()
    })

    it('should return 401 when auth middleware rejects', async () => {
      vi.mocked(authMiddleware).mockImplementationOnce(async (_c, _next) => {
        throw new HTTPException(401, { message: 'Unauthorized' })
      })

      const res = await client.monitoring.requests.$get({ query: {} })

      expect(res.status).toBe(401)
      expect(mockedRequestLog.find).not.toHaveBeenCalled()
    })

    it('should return 403 when user lacks required role', async () => {
      rolesMiddleware.mockImplementationOnce(
        async (_c: unknown, _next: () => Promise<void>) => {
          throw new HTTPException(403, { message: 'Insufficient permissions' })
        }
      )

      const res = await client.monitoring.requests.$get({ query: {} })

      expect(res.status).toBe(403)
      expect(mockedRequestLog.find).not.toHaveBeenCalled()
    })

    it('should return 500 when database throws unexpected error', async () => {
      mockedRequestLog.find.mockImplementation(() => {
        throw new Error('Database connection failed')
      })

      const res = await client.monitoring.requests.$get({ query: {} })

      expect(res.status).toBe(500)
    })

    it('should sort results by createdAt descending', async () => {
      const chain = makeQueryChain([makeRequestLog()])
      mockedRequestLog.find.mockReturnValue(chain as never)
      mockedRequestLog.countDocuments.mockResolvedValue(1)

      await client.monitoring.requests.$get({ query: {} })

      expect(chain.sort).toHaveBeenCalledWith({ createdAt: -1 })
    })
  })

  // ─── GET /monitoring/errors ───────────────────────────────────────────────────

  describe('GET /errors', () => {
    it('should return 200 with default pagination', async () => {
      const chain = makeQueryChain([makeErrorLog()])
      mockedErrorLog.find.mockReturnValue(chain as never)
      mockedErrorLog.countDocuments.mockResolvedValue(1)

      const res = await client.monitoring.errors.$get({ query: {} })
      const body = await res.json()

      expect(res.status).toBe(200)
      expect(body).toMatchObject({
        data: expect.any(Array),
        total: 1,
        limit: 50,
        offset: 0
      })
    })

    it('should return 200 with explicit limit and offset', async () => {
      const chain = makeQueryChain([makeErrorLog()])
      mockedErrorLog.find.mockReturnValue(chain as never)
      mockedErrorLog.countDocuments.mockResolvedValue(5)

      const res = await client.monitoring.errors.$get({
        query: { limit: '20', offset: '2' }
      })
      const body = await res.json()

      expect(res.status).toBe(200)
      expect(body).toMatchObject({ limit: 20, offset: 2, total: 5 })
      expect(chain.skip).toHaveBeenCalledWith(2)
      expect(chain.limit).toHaveBeenCalledWith(20)
    })

    it('should filter by userId', async () => {
      const chain = makeQueryChain([makeErrorLog()])
      mockedErrorLog.find.mockReturnValue(chain as never)
      mockedErrorLog.countDocuments.mockResolvedValue(1)

      const res = await client.monitoring.errors.$get({
        query: { userId: 'a0000000-0000-4000-8000-000000000099' }
      })

      expect(res.status).toBe(200)
      expect(mockedErrorLog.find).toHaveBeenCalledWith(
        expect.objectContaining({
          userId: 'a0000000-0000-4000-8000-000000000099'
        })
      )
    })

    it('should filter by statusCode', async () => {
      const chain = makeQueryChain([makeErrorLog({ statusCode: 500 })])
      mockedErrorLog.find.mockReturnValue(chain as never)
      mockedErrorLog.countDocuments.mockResolvedValue(1)

      const res = await client.monitoring.errors.$get({
        query: { statusCode: '500' }
      })

      expect(res.status).toBe(200)
      expect(mockedErrorLog.find).toHaveBeenCalledWith(
        expect.objectContaining({ statusCode: 500 })
      )
    })

    it('should filter by from date', async () => {
      const chain = makeQueryChain([makeErrorLog()])
      mockedErrorLog.find.mockReturnValue(chain as never)
      mockedErrorLog.countDocuments.mockResolvedValue(1)

      const res = await client.monitoring.errors.$get({
        query: { from: '2024-06-01T00:00:00.000Z' }
      })

      expect(res.status).toBe(200)
      expect(mockedErrorLog.find).toHaveBeenCalledWith(
        expect.objectContaining({
          createdAt: expect.objectContaining({ $gte: expect.any(Date) })
        })
      )
    })

    it('should filter by to date', async () => {
      const chain = makeQueryChain([makeErrorLog()])
      mockedErrorLog.find.mockReturnValue(chain as never)
      mockedErrorLog.countDocuments.mockResolvedValue(1)

      const res = await client.monitoring.errors.$get({
        query: { to: '2024-06-30T23:59:59.000Z' }
      })

      expect(res.status).toBe(200)
      expect(mockedErrorLog.find).toHaveBeenCalledWith(
        expect.objectContaining({
          createdAt: expect.objectContaining({ $lte: expect.any(Date) })
        })
      )
    })

    it('should filter by from and to dates combined', async () => {
      const chain = makeQueryChain([makeErrorLog()])
      mockedErrorLog.find.mockReturnValue(chain as never)
      mockedErrorLog.countDocuments.mockResolvedValue(1)

      const res = await client.monitoring.errors.$get({
        query: {
          from: '2024-06-01T00:00:00.000Z',
          to: '2024-06-30T23:59:59.000Z'
        }
      })

      expect(res.status).toBe(200)
      expect(mockedErrorLog.find).toHaveBeenCalledWith(
        expect.objectContaining({
          createdAt: expect.objectContaining({
            $gte: expect.any(Date),
            $lte: expect.any(Date)
          })
        })
      )
    })

    it('should filter by all params combined', async () => {
      const chain = makeQueryChain([makeErrorLog({ statusCode: 500 })])
      mockedErrorLog.find.mockReturnValue(chain as never)
      mockedErrorLog.countDocuments.mockResolvedValue(1)

      const res = await client.monitoring.errors.$get({
        query: {
          userId: 'a0000000-0000-4000-8000-000000000099',
          statusCode: '500',
          from: '2024-06-01T00:00:00.000Z',
          to: '2024-06-30T23:59:59.000Z',
          limit: '5',
          offset: '0'
        }
      })

      expect(res.status).toBe(200)
      expect(mockedErrorLog.find).toHaveBeenCalledWith(
        expect.objectContaining({
          userId: 'a0000000-0000-4000-8000-000000000099',
          statusCode: 500,
          createdAt: expect.objectContaining({
            $gte: expect.any(Date),
            $lte: expect.any(Date)
          })
        })
      )
    })

    it('should not include createdAt filter when no date params provided', async () => {
      const chain = makeQueryChain([])
      mockedErrorLog.find.mockReturnValue(chain as never)
      mockedErrorLog.countDocuments.mockResolvedValue(0)

      await client.monitoring.errors.$get({ query: {} })

      const callArg = mockedErrorLog.find.mock.calls[0][0]
      expect(callArg).not.toHaveProperty('createdAt')
    })

    it('should return 400 when limit is 0', async () => {
      const res = await client.monitoring.errors.$get({
        query: { limit: '0' }
      })

      expect(res.status).toBe(400)
      expect(mockedErrorLog.find).not.toHaveBeenCalled()
    })

    it('should return 400 when limit exceeds 100', async () => {
      const res = await client.monitoring.errors.$get({
        query: { limit: '101' }
      })

      expect(res.status).toBe(400)
      expect(mockedErrorLog.find).not.toHaveBeenCalled()
    })

    it('should return 400 when offset is negative', async () => {
      const res = await client.monitoring.errors.$get({
        query: { offset: '-1' }
      })

      expect(res.status).toBe(400)
      expect(mockedErrorLog.find).not.toHaveBeenCalled()
    })

    it('should return 400 when from is not a valid date', async () => {
      const res = await client.monitoring.errors.$get({
        query: { from: 'not-a-date' }
      })

      expect(res.status).toBe(400)
      expect(mockedErrorLog.find).not.toHaveBeenCalled()
    })

    it('should return 400 when to is not a valid date', async () => {
      const res = await client.monitoring.errors.$get({
        query: { to: 'not-a-date' }
      })

      expect(res.status).toBe(400)
      expect(mockedErrorLog.find).not.toHaveBeenCalled()
    })

    it('should return 401 when auth middleware rejects', async () => {
      vi.mocked(authMiddleware).mockImplementationOnce(async (_c, _next) => {
        throw new HTTPException(401, { message: 'Unauthorized' })
      })

      const res = await client.monitoring.errors.$get({ query: {} })

      expect(res.status).toBe(401)
      expect(mockedErrorLog.find).not.toHaveBeenCalled()
    })

    it('should return 403 when user lacks required role', async () => {
      rolesMiddleware.mockImplementationOnce(
        async (_c: unknown, _next: () => Promise<void>) => {
          throw new HTTPException(403, { message: 'Insufficient permissions' })
        }
      )

      const res = await client.monitoring.errors.$get({ query: {} })

      expect(res.status).toBe(403)
      expect(mockedErrorLog.find).not.toHaveBeenCalled()
    })

    it('should return 500 when database throws unexpected error', async () => {
      mockedErrorLog.find.mockImplementation(() => {
        throw new Error('Database connection failed')
      })

      const res = await client.monitoring.errors.$get({ query: {} })

      expect(res.status).toBe(500)
    })

    it('should sort results by createdAt descending', async () => {
      const chain = makeQueryChain([makeErrorLog()])
      mockedErrorLog.find.mockReturnValue(chain as never)
      mockedErrorLog.countDocuments.mockResolvedValue(1)

      await client.monitoring.errors.$get({ query: {} })

      expect(chain.sort).toHaveBeenCalledWith({ createdAt: -1 })
    })
  })

  // ─── Role configuration ───────────────────────────────────────────────────────

  describe('role configuration', () => {
    it('should require ADMIN role for all routes', () => {
      expect(initialRequireRolesCalls).toContainEqual([UserRole.ADMIN])
    })
  })
})
