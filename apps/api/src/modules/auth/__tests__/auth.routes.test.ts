import { describe, it, expect, vi, beforeEach } from 'vitest'
import { Hono } from 'hono'
import { testClient } from 'hono/testing'
import auth from '../auth.routes.js'
import * as authService from '../auth.service.js'
import { UserRole } from '../../../../generated/prisma/client.js'
import { jwtVerify } from 'jose'
import { HTTPException } from 'hono/http-exception'
import { authMiddleware } from '../../../middleware/auth.middleware.js'

vi.mock('../auth.service.js', () => ({
  register: vi.fn(),
  login: vi.fn(),
  logout: vi.fn(),
  refreshTokens: vi.fn(),
  getMe: vi.fn()
}))

vi.mock('jose', () => ({
  jwtVerify: vi.fn()
}))

vi.mock('../../../lib/redis.js', () => ({
  default: {
    get: vi.fn(),
    set: vi.fn()
  }
}))

vi.mock('../../../middleware/auth.middleware.js', () => ({
  authMiddleware: vi.fn(async (c, next) => {
    c.set('user', {
      sub: 'user-id',
      role: 'OPERATOR',
      email: 'john@example.com',
      jti: 'jti-123',
      exp: Math.floor(Date.now() / 1000) + 3600
    })
    await next()
  }),
  getJwtSecret: vi.fn(() => new TextEncoder().encode('secret'))
}))

const mockedAuthService = vi.mocked(authService)

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
app.route('/auth', auth)
const client = testClient(app)

describe('Auth Routes', () => {
  beforeEach(() => {
    vi.stubEnv('JWT_SECRET', 'secret')
    vi.clearAllMocks()
    // Poprawka 2: type assertion na jwtVerify
    vi.mocked(jwtVerify).mockResolvedValue({
      payload: {
        sub: 'user-id',
        role: 'OPERATOR',
        jti: 'jti-123',
        exp: Math.floor(Date.now() / 1000) + 3600
      },
      protectedHeader: { alg: 'HS256' }
    } as Awaited<ReturnType<typeof jwtVerify>>)
  })

  describe('POST /auth/register', () => {
    it('should register user successfully', async () => {
      const input = {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'Password123',
        role: 'OPERATOR'
      }
      const response = {
        user: {
          id: 'user-id',
          name: input.name,
          email: input.email,
          role: UserRole.OPERATOR
        },
        tokens: { accessToken: 'access-token', refreshToken: 'refresh-token' }
      }

      mockedAuthService.register.mockResolvedValue(response)

      const res = await client.auth.register.$post({
        json: input
      })

      expect(res.status).toBe(201)
      const data = await res.json()
      expect(data).toEqual(response)
      expect(mockedAuthService.register).toHaveBeenCalledWith(input)
      expect(res.headers.get('content-type')).toBe('application/json')
    })

    it('should return 400 for invalid input', async () => {
      const invalidInput = {
        name: '',
        email: 'invalid-email',
        password: '123'
      }

      const res = await client.auth.register.$post({
        json: invalidInput
      })

      expect(res.status).toBe(400)
      const data = await res.json()
      expect(data.success).toBe(false)
      expect(data).toHaveProperty('error')
      expect(res.headers.get('content-type')).toBe('application/json')
    })
  })

  describe('POST /auth/login', () => {
    it('should login user successfully', async () => {
      const input = {
        email: 'john@example.com',
        password: 'Password123'
      }
      const response = {
        user: {
          id: 'user-id',
          name: 'John Doe',
          email: input.email,
          role: UserRole.OPERATOR
        },
        tokens: { accessToken: 'access-token', refreshToken: 'refresh-token' }
      }

      mockedAuthService.login.mockResolvedValue(response)

      const res = await client.auth.login.$post({
        json: input
      })

      expect(res.status).toBe(200)
      const data = await res.json()
      expect(data).toEqual(response)
      expect(mockedAuthService.login).toHaveBeenCalledWith(input)
      expect(res.headers.get('content-type')).toBe('application/json')
    })

    it('should return 400 for invalid input', async () => {
      const invalidInput = {
        email: 'invalid-email',
        password: ''
      }

      const res = await client.auth.login.$post({
        json: invalidInput
      })

      expect(res.status).toBe(400)
      const data = await res.json()
      expect(data.success).toBe(false)
      expect(data).toHaveProperty('error')
      expect(res.headers.get('content-type')).toBe('application/json')
    })
  })

  describe('POST /auth/logout', () => {
    it('should logout successfully', async () => {
      const token = 'Bearer valid-token'

      mockedAuthService.logout.mockResolvedValue(undefined)

      const res = await client.auth.logout.$post({
        header: {
          Authorization: token
        }
      })

      expect(res.status).toBe(200)
      const data = await res.json()
      expect(data).toEqual({ message: 'Logged out successfully' })
      expect(mockedAuthService.logout).toHaveBeenCalledWith('valid-token')
      expect(res.headers.get('content-type')).toBe('application/json')
    })

    it('should return 401 for missing authorization', async () => {
      const res = await client.auth.logout.$post()

      expect(res.status).toBe(401)
    })
  })

  describe('POST /auth/refresh', () => {
    it('should refresh tokens successfully', async () => {
      const input = { token: 'refresh-token' }
      const response = {
        accessToken: 'new-access',
        refreshToken: 'new-refresh'
      }

      mockedAuthService.refreshTokens.mockResolvedValue(response)

      const res = await client.auth.refresh.$post({
        json: input
      })

      expect(res.status).toBe(200)
      const data = await res.json()
      expect(data).toEqual(response)
      expect(mockedAuthService.refreshTokens).toHaveBeenCalledWith(input)
      expect(res.headers.get('content-type')).toBe('application/json')
    })

    it('should return 400 for invalid input', async () => {
      const invalidInput = { token: '' }

      const res = await client.auth.refresh.$post({
        json: invalidInput
      })

      expect(res.status).toBe(400)
      const data = await res.json()
      expect(data.success).toBe(false)
      expect(data).toHaveProperty('error')
      expect(res.headers.get('content-type')).toBe('application/json')
    })
  })

  describe('GET /auth/me', () => {
    it('should return user data', async () => {
      const token = 'Bearer valid-token'
      const user = {
        id: 'user-id',
        name: 'John Doe',
        email: 'john@example.com',
        role: UserRole.OPERATOR,
        isActive: true,
        // ...existing code...
        createdAt: new Date('2023-01-01T00:00:00.000Z'),
        certifications: [] as []
      }

      mockedAuthService.getMe.mockResolvedValue(user)

      const res = await client.auth.me.$get({
        header: {
          Authorization: token
        }
      })

      expect(res.status).toBe(200)
      const data = await res.json()
      expect(data).toEqual({
        ...user,
        createdAt: user.createdAt.toISOString()
      })
      expect(mockedAuthService.getMe).toHaveBeenCalledWith('user-id')
      expect(res.headers.get('content-type')).toBe('application/json')
    })

    it('should return 401 when authMiddleware rejects', async () => {
      vi.mocked(authMiddleware).mockImplementationOnce(async (c, next) => {
        throw new HTTPException(401, { message: 'Missing or invalid token' })
      })

      const res = await client.auth.me.$get()

      expect(res.status).toBe(401)
    })
  })

  describe('Middleware Errors', () => {
    it('should return 401 for expired token on /auth/me', async () => {
      vi.mocked(authMiddleware).mockImplementationOnce(async (c, next) => {
        throw new HTTPException(401, { message: 'Token expired' })
      })

      const res = await client.auth.me.$get({
        header: { Authorization: 'Bearer token' }
      })

      expect(res.status).toBe(401)
    })

    it('should return 401 for blacklisted token on /auth/me', async () => {
      vi.mocked(authMiddleware).mockImplementationOnce(async (c, next) => {
        throw new HTTPException(401, { message: 'Token blacklisted' })
      })

      const res = await client.auth.me.$get({
        header: { Authorization: 'Bearer token' }
      })

      expect(res.status).toBe(401)
    })

    it('should return 401 for invalid token on /auth/logout', async () => {
      vi.mocked(authMiddleware).mockImplementationOnce(async (c, next) => {
        throw new HTTPException(401, { message: 'Invalid token' })
      })

      const res = await client.auth.logout.$post({
        header: { Authorization: 'Bearer token' }
      })

      expect(res.status).toBe(401)
    })
  })
})
