import { describe, it, expect, vi, beforeAll, beforeEach } from 'vitest'
import { Hono } from 'hono'
import { testClient } from 'hono/testing'
import { HTTPException } from 'hono/http-exception'
import locations from '../locations.routes.js'
import * as locationsService from '../locations.service.js'
import { LocationType, UserRole } from '../../../../generated/prisma/client.js'
import { authMiddleware } from '../../../middleware/auth.middleware.js'
import { requireRoles } from '../../../middleware/roles.middleware.js'

const { rolesMiddleware } = vi.hoisted(() => ({
  rolesMiddleware: vi.fn(async (_c: unknown, next: () => Promise<void>) => {
    await next()
  })
}))

vi.mock('../locations.service.js', () => ({
  getLocations: vi.fn(),
  getLocationById: vi.fn(),
  createLocation: vi.fn(),
  updateLocation: vi.fn(),
  deleteLocation: vi.fn()
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

vi.mock('../../../lib/redis.js', () => ({
  default: { get: vi.fn(), set: vi.fn() }
}))

const LOCATION_ID = 'a0000000-0000-4000-8000-000000000001'
const PARENT_ID = 'a0000000-0000-4000-8000-000000000002'

const mockedService = vi.mocked(locationsService)

const makeLocation = (overrides = {}) => ({
  id: LOCATION_ID,
  name: 'Main Hall',
  type: LocationType.HALL,
  parentId: null,
  children: [],
  createdAt: new Date(),
  updatedAt: new Date(),
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
app.route('/locations', locations)
const client = testClient(app)

describe('Locations Routes', () => {
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

  // ─── GET /locations ──────────────────────────────────────────────────────────

  describe('GET /', () => {
    it('should return 200 with list of locations', async () => {
      mockedService.getLocations.mockResolvedValue([makeLocation()])

      const res = await client.locations.$get({})

      expect(res.status).toBe(200)
      expect(mockedService.getLocations).toHaveBeenCalledOnce()
    })

    it('should return 401 when auth middleware rejects', async () => {
      vi.mocked(authMiddleware).mockImplementationOnce(async (_c, _next) => {
        throw new HTTPException(401, { message: 'Unauthorized' })
      })

      const res = await client.locations.$get({})

      expect(res.status).toBe(401)
      expect(mockedService.getLocations).not.toHaveBeenCalled()
    })
  })

  // ─── GET /locations/:id ──────────────────────────────────────────────────────

  describe('GET /:id', () => {
    it('should return 200 with location data', async () => {
      mockedService.getLocationById.mockResolvedValue(makeLocation())

      const res = await client.locations[':id'].$get({
        param: { id: LOCATION_ID }
      })

      expect(res.status).toBe(200)
      expect(mockedService.getLocationById).toHaveBeenCalledWith(LOCATION_ID)
    })

    it('should return 400 when id is not a valid UUID', async () => {
      const res = await client.locations[':id'].$get({
        param: { id: 'not-a-uuid' }
      })

      expect(res.status).toBe(400)
      expect(mockedService.getLocationById).not.toHaveBeenCalled()
    })

    it('should return 404 when service throws HTTPException 404', async () => {
      mockedService.getLocationById.mockRejectedValue(
        new HTTPException(404, { message: 'Location not found' })
      )

      const res = await client.locations[':id'].$get({
        param: { id: LOCATION_ID }
      })

      expect(res.status).toBe(404)
    })
  })

  // ─── POST /locations ─────────────────────────────────────────────────────────

  describe('POST /', () => {
    const validBody = { name: 'Main Hall', type: LocationType.HALL }

    it('should return 201 with created location', async () => {
      mockedService.createLocation.mockResolvedValue(makeLocation())

      const res = await client.locations.$post({ json: validBody })

      expect(res.status).toBe(201)
      expect(mockedService.createLocation).toHaveBeenCalledWith(validBody)
    })

    it('should return 201 with optional parentId', async () => {
      mockedService.createLocation.mockResolvedValue(
        makeLocation({ parentId: PARENT_ID })
      )

      const res = await client.locations.$post({
        json: { ...validBody, parentId: PARENT_ID }
      })

      expect(res.status).toBe(201)
      expect(mockedService.createLocation).toHaveBeenCalledWith({
        ...validBody,
        parentId: PARENT_ID
      })
    })

    it('should return 400 when name is missing', async () => {
      const res = await client.locations.$post({
        json: { type: LocationType.HALL } as {
          name: string
          type: LocationType
        }
      })

      expect(res.status).toBe(400)
      expect(mockedService.createLocation).not.toHaveBeenCalled()
    })

    it('should return 400 when name is shorter than 2 characters', async () => {
      const res = await client.locations.$post({
        json: { name: 'A', type: LocationType.HALL }
      })

      expect(res.status).toBe(400)
      expect(mockedService.createLocation).not.toHaveBeenCalled()
    })

    it('should return 400 when type is invalid', async () => {
      const res = await client.locations.$post({
        json: { name: 'Main Hall', type: 'INVALID' as LocationType }
      })

      expect(res.status).toBe(400)
      expect(mockedService.createLocation).not.toHaveBeenCalled()
    })

    it('should return 400 when parentId is not a valid UUID', async () => {
      const res = await client.locations.$post({
        json: { ...validBody, parentId: 'not-a-uuid' }
      })

      expect(res.status).toBe(400)
      expect(mockedService.createLocation).not.toHaveBeenCalled()
    })

    it('should return 403 when user lacks required role', async () => {
      rolesMiddleware.mockImplementationOnce(
        async (_c: unknown, _next: () => Promise<void>) => {
          throw new HTTPException(403, { message: 'Insufficient permissions' })
        }
      )

      const res = await client.locations.$post({ json: validBody })

      expect(res.status).toBe(403)
      expect(mockedService.createLocation).not.toHaveBeenCalled()
    })

    it('should require ADMIN or MANAGER role', () => {
      expect(initialRequireRolesCalls).toContainEqual([
        UserRole.ADMIN,
        UserRole.MANAGER
      ])
    })
  })

  // ─── PATCH /locations/:id ────────────────────────────────────────────────────

  describe('PATCH /:id', () => {
    it('should return 200 with updated location', async () => {
      mockedService.updateLocation.mockResolvedValue(
        makeLocation({ name: 'Updated Hall' })
      )

      const res = await client.locations[':id'].$patch({
        param: { id: LOCATION_ID },
        json: { name: 'Updated Hall' }
      })

      expect(res.status).toBe(200)
      expect(mockedService.updateLocation).toHaveBeenCalledWith(LOCATION_ID, {
        name: 'Updated Hall'
      })
    })

    it('should return 400 when id is not a valid UUID', async () => {
      const res = await client.locations[':id'].$patch({
        param: { id: 'bad-id' },
        json: { name: 'Updated Hall' }
      })

      expect(res.status).toBe(400)
      expect(mockedService.updateLocation).not.toHaveBeenCalled()
    })

    it('should return 400 when name is shorter than 2 characters', async () => {
      const res = await client.locations[':id'].$patch({
        param: { id: LOCATION_ID },
        json: { name: 'X' }
      })

      expect(res.status).toBe(400)
    })

    it('should return 400 when parentId is not a valid UUID', async () => {
      const res = await client.locations[':id'].$patch({
        param: { id: LOCATION_ID },
        json: { parentId: 'not-a-uuid' }
      })

      expect(res.status).toBe(400)
    })

    it('should return 403 when user lacks required role', async () => {
      rolesMiddleware.mockImplementationOnce(
        async (_c: unknown, _next: () => Promise<void>) => {
          throw new HTTPException(403, { message: 'Insufficient permissions' })
        }
      )

      const res = await client.locations[':id'].$patch({
        param: { id: LOCATION_ID },
        json: { name: 'Updated Hall' }
      })

      expect(res.status).toBe(403)
    })
  })

  // ─── DELETE /locations/:id ───────────────────────────────────────────────────

  describe('DELETE /:id', () => {
    it('should return 200 on successful delete', async () => {
      mockedService.deleteLocation.mockResolvedValue(undefined)

      const res = await client.locations[':id'].$delete({
        param: { id: LOCATION_ID }
      })

      expect(res.status).toBe(200)
      expect(mockedService.deleteLocation).toHaveBeenCalledWith(LOCATION_ID)
    })

    it('should return 400 when id is not a valid UUID', async () => {
      const res = await client.locations[':id'].$delete({
        param: { id: 'bad-id' }
      })

      expect(res.status).toBe(400)
      expect(mockedService.deleteLocation).not.toHaveBeenCalled()
    })

    it('should return 403 when user lacks required role', async () => {
      rolesMiddleware.mockImplementationOnce(
        async (_c: unknown, _next: () => Promise<void>) => {
          throw new HTTPException(403, { message: 'Insufficient permissions' })
        }
      )

      const res = await client.locations[':id'].$delete({
        param: { id: LOCATION_ID }
      })

      expect(res.status).toBe(403)
    })

    it('should require ADMIN role', () => {
      expect(initialRequireRolesCalls).toContainEqual([UserRole.ADMIN])
    })
  })

  // ─── Error propagation ───────────────────────────────────────────────────────

  describe('error propagation', () => {
    it('should return 400 when service throws HTTPException 400', async () => {
      mockedService.deleteLocation.mockRejectedValue(
        new HTTPException(400, {
          message: 'Cannot delete location with children'
        })
      )

      const res = await client.locations[':id'].$delete({
        param: { id: LOCATION_ID }
      })

      expect(res.status).toBe(400)
    })

    it('should return 500 when service throws unexpected error', async () => {
      mockedService.getLocations.mockRejectedValue(
        new Error('Database connection failed')
      )

      const res = await client.locations.$get({})

      expect(res.status).toBe(500)
    })
  })
})
