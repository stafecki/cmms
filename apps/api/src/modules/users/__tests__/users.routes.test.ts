import { describe, it, expect, vi, beforeAll, beforeEach } from 'vitest'
import { Hono } from 'hono'
import { testClient } from 'hono/testing'
import { HTTPException } from 'hono/http-exception'
import users from '../users.routes.js'
import * as usersService from '../users.service.js'
import {
  CertificationType,
  UserRole
} from '../../../../generated/prisma/client.js'
import { authMiddleware } from '../../../middleware/auth.middleware.js'
import { requireRoles } from '../../../middleware/roles.middleware.js'

const { rolesMiddleware } = vi.hoisted(() => ({
  rolesMiddleware: vi.fn(async (_c: unknown, next: () => Promise<void>) => {
    await next()
  })
}))

vi.mock('../users.service.js', () => ({
  getUsers: vi.fn(),
  getUserById: vi.fn(),
  updateUser: vi.fn(),
  deleteUser: vi.fn(),
  getCertifications: vi.fn(),
  createCertification: vi.fn(),
  deleteCertification: vi.fn()
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
const OTHER_USER_ID = 'a0000000-0000-4000-8000-000000000088'
const CERT_ID = 'a0000000-0000-4000-8000-000000000011'

const mockedService = vi.mocked(usersService)

const makeUser = (overrides = {}) => ({
  id: USER_ID,
  name: 'John Doe',
  email: 'john@example.com',
  role: UserRole.TECHNICIAN,
  isActive: true,
  createdAt: new Date().toISOString(),
  certifications: [],
  ...overrides
})

const makeCertification = (overrides = {}) => ({
  id: CERT_ID,
  userId: USER_ID,
  type: CertificationType.SEP,
  issuedAt: new Date('2024-01-01').toISOString(),
  expiresAt: new Date('2026-01-01').toISOString(),
  isValid: true,
  createdAt: new Date().toISOString(),
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
app.route('/users', users)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const client = testClient(app) as any

describe('Users Routes', () => {
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
    const paginatedResult = {
      data: [makeUser()],
      total: 1,
      limit: 50,
      offset: 0
    }

    it('should return 200 with paginated user list', async () => {
      mockedService.getUsers.mockResolvedValue(paginatedResult as never)

      const res = await client.users.$get({ query: {} })
      const body = await res.json()

      expect(res.status).toBe(200)
      expect(body).toMatchObject({ data: expect.any(Array), total: 1 })
      expect(mockedService.getUsers).toHaveBeenCalledOnce()
    })

    it('should pass limit and offset query params to service', async () => {
      mockedService.getUsers.mockResolvedValue({
        ...paginatedResult,
        limit: 10,
        offset: 5
      } as never)

      await client.users.$get({ query: { limit: '10', offset: '5' } })

      expect(mockedService.getUsers).toHaveBeenCalledWith(
        expect.objectContaining({ limit: 10, offset: 5 })
      )
    })

    it('should pass role filter to service', async () => {
      mockedService.getUsers.mockResolvedValue(paginatedResult as never)

      await client.users.$get({ query: { role: UserRole.TECHNICIAN } })

      expect(mockedService.getUsers).toHaveBeenCalledWith(
        expect.objectContaining({ role: UserRole.TECHNICIAN })
      )
    })

    it('should pass isActive filter to service', async () => {
      mockedService.getUsers.mockResolvedValue(paginatedResult as never)

      await client.users.$get({ query: { isActive: 'true' } })

      expect(mockedService.getUsers).toHaveBeenCalledWith(
        expect.objectContaining({ isActive: true })
      )
    })

    it('should return 400 when role is invalid', async () => {
      const res = await client.users.$get({
        query: { role: 'SUPERUSER' }
      })

      expect(res.status).toBe(400)
      expect(mockedService.getUsers).not.toHaveBeenCalled()
    })

    it('should return 400 when limit exceeds 100', async () => {
      const res = await client.users.$get({ query: { limit: '101' } })

      expect(res.status).toBe(400)
      expect(mockedService.getUsers).not.toHaveBeenCalled()
    })

    it('should return 400 when offset is negative', async () => {
      const res = await client.users.$get({ query: { offset: '-1' } })

      expect(res.status).toBe(400)
      expect(mockedService.getUsers).not.toHaveBeenCalled()
    })

    it('should return 401 when auth middleware rejects', async () => {
      vi.mocked(authMiddleware).mockImplementationOnce(async (_c, _next) => {
        throw new HTTPException(401, { message: 'Unauthorized' })
      })

      const res = await client.users.$get({ query: {} })

      expect(res.status).toBe(401)
      expect(mockedService.getUsers).not.toHaveBeenCalled()
    })

    it('should return 403 when user lacks required role', async () => {
      rolesMiddleware.mockImplementationOnce(
        async (_c: unknown, _next: () => Promise<void>) => {
          throw new HTTPException(403, { message: 'Insufficient permissions' })
        }
      )

      const res = await client.users.$get({ query: {} })

      expect(res.status).toBe(403)
      expect(mockedService.getUsers).not.toHaveBeenCalled()
    })

    it('should require ADMIN or MANAGER role', () => {
      expect(initialRequireRolesCalls).toContainEqual([
        UserRole.ADMIN,
        UserRole.MANAGER
      ])
    })
  })

  // ─── GET /:id ─────────────────────────────────────────────────────────────────

  describe('GET /:id', () => {
    it('should return 200 with user data', async () => {
      mockedService.getUserById.mockResolvedValue(makeUser() as never)

      const res = await client.users[':id'].$get({ param: { id: USER_ID } })

      expect(res.status).toBe(200)
      expect(mockedService.getUserById).toHaveBeenCalledWith(USER_ID)
    })

    it('should return 400 when id is not a valid UUID', async () => {
      const res = await client.users[':id'].$get({ param: { id: 'bad-id' } })

      expect(res.status).toBe(400)
      expect(mockedService.getUserById).not.toHaveBeenCalled()
    })

    it('should return 404 when user does not exist', async () => {
      mockedService.getUserById.mockRejectedValue(
        new HTTPException(404, { message: 'User not found' })
      )

      const res = await client.users[':id'].$get({ param: { id: USER_ID } })

      expect(res.status).toBe(404)
    })

    it('should return 403 when user lacks required role', async () => {
      rolesMiddleware.mockImplementationOnce(
        async (_c: unknown, _next: () => Promise<void>) => {
          throw new HTTPException(403, { message: 'Insufficient permissions' })
        }
      )

      const res = await client.users[':id'].$get({ param: { id: USER_ID } })

      expect(res.status).toBe(403)
    })
  })

  // ─── PATCH /:id ───────────────────────────────────────────────────────────────

  describe('PATCH /:id', () => {
    it('should return 200 with updated user', async () => {
      mockedService.updateUser.mockResolvedValue(
        makeUser({ name: 'Jane Doe' }) as never
      )

      const res = await client.users[':id'].$patch({
        param: { id: USER_ID },
        json: { name: 'Jane Doe' }
      })

      expect(res.status).toBe(200)
      expect(mockedService.updateUser).toHaveBeenCalledWith(
        USER_ID,
        expect.objectContaining({ name: 'Jane Doe' })
      )
    })

    it('should return 400 when id is not a valid UUID', async () => {
      const res = await client.users[':id'].$patch({
        param: { id: 'bad-id' },
        json: { name: 'Jane Doe' }
      })

      expect(res.status).toBe(400)
      expect(mockedService.updateUser).not.toHaveBeenCalled()
    })

    it('should return 400 when name is shorter than 2 characters', async () => {
      const res = await client.users[':id'].$patch({
        param: { id: USER_ID },
        json: { name: 'A' }
      })

      expect(res.status).toBe(400)
      expect(mockedService.updateUser).not.toHaveBeenCalled()
    })

    it('should return 400 when name exceeds 100 characters', async () => {
      const res = await client.users[':id'].$patch({
        param: { id: USER_ID },
        json: { name: 'A'.repeat(101) }
      })

      expect(res.status).toBe(400)
      expect(mockedService.updateUser).not.toHaveBeenCalled()
    })

    it('should return 400 when role is invalid', async () => {
      const res = await client.users[':id'].$patch({
        param: { id: USER_ID },
        json: { role: 'SUPERUSER' as UserRole }
      })

      expect(res.status).toBe(400)
      expect(mockedService.updateUser).not.toHaveBeenCalled()
    })

    it('should return 403 when user lacks ADMIN role', async () => {
      rolesMiddleware.mockImplementationOnce(
        async (_c: unknown, _next: () => Promise<void>) => {
          throw new HTTPException(403, { message: 'Insufficient permissions' })
        }
      )

      const res = await client.users[':id'].$patch({
        param: { id: USER_ID },
        json: { name: 'Jane Doe' }
      })

      expect(res.status).toBe(403)
    })

    it('should return 404 when user does not exist', async () => {
      mockedService.updateUser.mockRejectedValue(
        new HTTPException(404, { message: 'User not found' })
      )

      const res = await client.users[':id'].$patch({
        param: { id: USER_ID },
        json: { name: 'Jane Doe' }
      })

      expect(res.status).toBe(404)
    })

    it('should require ADMIN role', () => {
      expect(initialRequireRolesCalls).toContainEqual([UserRole.ADMIN])
    })
  })

  // ─── DELETE /:id ──────────────────────────────────────────────────────────────

  describe('DELETE /:id', () => {
    it('should return 200 on successful deactivation', async () => {
      mockedService.deleteUser.mockResolvedValue(undefined)

      const res = await client.users[':id'].$delete({
        param: { id: OTHER_USER_ID }
      })
      const body = await res.json()

      expect(res.status).toBe(200)
      expect(body).toEqual({ message: 'User deactivated successfully' })
      expect(mockedService.deleteUser).toHaveBeenCalledWith(OTHER_USER_ID)
    })

    it('should return 400 when id is not a valid UUID', async () => {
      const res = await client.users[':id'].$delete({
        param: { id: 'bad-id' }
      })

      expect(res.status).toBe(400)
      expect(mockedService.deleteUser).not.toHaveBeenCalled()
    })

    it('should return 400 when deleting last admin account', async () => {
      mockedService.deleteUser.mockRejectedValue(
        new HTTPException(400, {
          message: 'Cannot deactivate the last admin account'
        })
      )

      const res = await client.users[':id'].$delete({
        param: { id: USER_ID }
      })

      expect(res.status).toBe(400)
    })

    it('should return 403 when user lacks ADMIN role', async () => {
      rolesMiddleware.mockImplementationOnce(
        async (_c: unknown, _next: () => Promise<void>) => {
          throw new HTTPException(403, { message: 'Insufficient permissions' })
        }
      )

      const res = await client.users[':id'].$delete({
        param: { id: OTHER_USER_ID }
      })

      expect(res.status).toBe(403)
    })

    it('should return 404 when user does not exist', async () => {
      mockedService.deleteUser.mockRejectedValue(
        new HTTPException(404, { message: 'User not found' })
      )

      const res = await client.users[':id'].$delete({
        param: { id: OTHER_USER_ID }
      })

      expect(res.status).toBe(404)
    })
  })

  // ─── GET /:id/certifications ──────────────────────────────────────────────────

  describe('GET /:id/certifications', () => {
    it('should return 200 with list of certifications', async () => {
      mockedService.getCertifications.mockResolvedValue([
        makeCertification()
      ] as never)

      const res = await client.users[':id'].certifications.$get({
        param: { id: USER_ID }
      })
      const body = await res.json()

      expect(res.status).toBe(200)
      expect(Array.isArray(body)).toBe(true)
      expect(mockedService.getCertifications).toHaveBeenCalledWith(USER_ID)
    })

    it('should return 400 when id is not a valid UUID', async () => {
      const res = await client.users[':id'].certifications.$get({
        param: { id: 'bad-id' }
      })

      expect(res.status).toBe(400)
      expect(mockedService.getCertifications).not.toHaveBeenCalled()
    })

    it('should return 404 when user does not exist', async () => {
      mockedService.getCertifications.mockRejectedValue(
        new HTTPException(404, { message: 'User not found' })
      )

      const res = await client.users[':id'].certifications.$get({
        param: { id: USER_ID }
      })

      expect(res.status).toBe(404)
    })

    it('should return 403 when user lacks required role', async () => {
      rolesMiddleware.mockImplementationOnce(
        async (_c: unknown, _next: () => Promise<void>) => {
          throw new HTTPException(403, { message: 'Insufficient permissions' })
        }
      )

      const res = await client.users[':id'].certifications.$get({
        param: { id: USER_ID }
      })

      expect(res.status).toBe(403)
    })
  })

  // ─── POST /:id/certifications ─────────────────────────────────────────────────

  describe('POST /:id/certifications', () => {
    const validBody = {
      type: CertificationType.SEP,
      issuedAt: '2024-01-01',
      expiresAt: '2026-01-01'
    }

    it('should return 201 with created certification', async () => {
      mockedService.createCertification.mockResolvedValue(
        makeCertification() as never
      )

      const res = await client.users[':id'].certifications.$post({
        param: { id: USER_ID },
        json: validBody
      })

      expect(res.status).toBe(201)
      expect(mockedService.createCertification).toHaveBeenCalledWith(
        USER_ID,
        expect.objectContaining({ type: CertificationType.SEP })
      )
    })

    it('should return 400 when id is not a valid UUID', async () => {
      const res = await client.users[':id'].certifications.$post({
        param: { id: 'bad-id' },
        json: validBody
      })

      expect(res.status).toBe(400)
      expect(mockedService.createCertification).not.toHaveBeenCalled()
    })

    it('should return 400 when type is invalid', async () => {
      const res = await client.users[':id'].certifications.$post({
        param: { id: USER_ID },
        json: { ...validBody, type: 'INVALID' as CertificationType }
      })

      expect(res.status).toBe(400)
      expect(mockedService.createCertification).not.toHaveBeenCalled()
    })

    it('should return 400 when expiresAt is before issuedAt', async () => {
      const res = await client.users[':id'].certifications.$post({
        param: { id: USER_ID },
        json: { ...validBody, issuedAt: '2026-01-01', expiresAt: '2024-01-01' }
      })

      expect(res.status).toBe(400)
      expect(mockedService.createCertification).not.toHaveBeenCalled()
    })

    it('should return 400 when issuedAt is missing', async () => {
      const res = await client.users[':id'].certifications.$post({
        param: { id: USER_ID },
        json: {
          type: CertificationType.SEP,
          expiresAt: '2026-01-01'
        } as typeof validBody
      })

      expect(res.status).toBe(400)
    })

    it('should return 403 when user lacks ADMIN role', async () => {
      rolesMiddleware.mockImplementationOnce(
        async (_c: unknown, _next: () => Promise<void>) => {
          throw new HTTPException(403, { message: 'Insufficient permissions' })
        }
      )

      const res = await client.users[':id'].certifications.$post({
        param: { id: USER_ID },
        json: validBody
      })

      expect(res.status).toBe(403)
      expect(mockedService.createCertification).not.toHaveBeenCalled()
    })

    it('should return 404 when user does not exist', async () => {
      mockedService.createCertification.mockRejectedValue(
        new HTTPException(404, { message: 'User not found' })
      )

      const res = await client.users[':id'].certifications.$post({
        param: { id: USER_ID },
        json: validBody
      })

      expect(res.status).toBe(404)
    })

    it('should return 409 when valid certification of same type already exists', async () => {
      mockedService.createCertification.mockRejectedValue(
        new HTTPException(409, {
          message: 'User already has a valid certification of this type'
        })
      )

      const res = await client.users[':id'].certifications.$post({
        param: { id: USER_ID },
        json: validBody
      })

      expect(res.status).toBe(409)
    })
  })

  // ─── DELETE /:id/certifications/:certId ──────────────────────────────────────

  describe('DELETE /:id/certifications/:certId', () => {
    it('should return 200 on successful delete', async () => {
      mockedService.deleteCertification.mockResolvedValue(undefined)

      const res = await client.users[':id'].certifications[':certId'].$delete({
        param: { id: USER_ID, certId: CERT_ID }
      })
      const body = await res.json()

      expect(res.status).toBe(200)
      expect(body).toEqual({ message: 'Certification deleted successfully' })
      expect(mockedService.deleteCertification).toHaveBeenCalledWith(
        USER_ID,
        CERT_ID
      )
    })

    it('should return 400 when id is not a valid UUID', async () => {
      const res = await client.users[':id'].certifications[':certId'].$delete({
        param: { id: 'bad-id', certId: CERT_ID }
      })

      expect(res.status).toBe(400)
      expect(mockedService.deleteCertification).not.toHaveBeenCalled()
    })

    it('should return 400 when certId is not a valid UUID', async () => {
      const res = await client.users[':id'].certifications[':certId'].$delete({
        param: { id: USER_ID, certId: 'bad-cert-id' }
      })

      expect(res.status).toBe(400)
      expect(mockedService.deleteCertification).not.toHaveBeenCalled()
    })

    it('should return 403 when certification belongs to another user', async () => {
      mockedService.deleteCertification.mockRejectedValue(
        new HTTPException(403, {
          message: 'Certification does not belong to this user'
        })
      )

      const res = await client.users[':id'].certifications[':certId'].$delete({
        param: { id: OTHER_USER_ID, certId: CERT_ID }
      })

      expect(res.status).toBe(403)
    })

    it('should return 403 when user lacks ADMIN role', async () => {
      rolesMiddleware.mockImplementationOnce(
        async (_c: unknown, _next: () => Promise<void>) => {
          throw new HTTPException(403, { message: 'Insufficient permissions' })
        }
      )

      const res = await client.users[':id'].certifications[':certId'].$delete({
        param: { id: USER_ID, certId: CERT_ID }
      })

      expect(res.status).toBe(403)
    })

    it('should return 404 when certification does not exist', async () => {
      mockedService.deleteCertification.mockRejectedValue(
        new HTTPException(404, { message: 'Certification not found' })
      )

      const res = await client.users[':id'].certifications[':certId'].$delete({
        param: { id: USER_ID, certId: CERT_ID }
      })

      expect(res.status).toBe(404)
    })
  })
})
