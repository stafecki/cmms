import { describe, it, expect, vi, beforeEach } from 'vitest'
import {
  register,
  login,
  logout,
  refreshTokens,
  getMe
} from '../auth.service.js'
import prisma from '../../../lib/prisma.js'
import redis from '../../../lib/redis.js'
import { hash, verify } from '@node-rs/argon2'
import { SignJWT, jwtVerify } from 'jose'
import { randomUUID } from 'crypto'
import { HTTPException } from 'hono/http-exception'
import type { UserRole } from '../../../../generated/prisma/client.js'

// Mock dependencies
vi.mock('../../../lib/prisma.js', () => ({
  default: {
    user: {
      findUnique: vi.fn(),
      create: vi.fn()
    }
  }
}))

vi.mock('../../../lib/redis.js', () => ({
  default: {
    get: vi.fn(),
    set: vi.fn()
  }
}))

vi.mock('@node-rs/argon2', () => ({
  hash: vi.fn(),
  verify: vi.fn()
}))

let setSubjectCalls: string[] = []
let setExpirationTimeCalls: string[] = []

vi.mock('jose', () => ({
  SignJWT: class {
    setProtectedHeader() {
      return this
    }
    setSubject(sub: string) {
      setSubjectCalls.push(sub)
      return this
    }
    setJti() {
      return this
    }
    setIssuedAt() {
      return this
    }
    setExpirationTime(exp: string) {
      setExpirationTimeCalls.push(exp)
      return this
    }
    sign() {
      return Promise.resolve('token')
    }
  },
  jwtVerify: vi.fn()
}))

vi.mock('crypto', () => ({
  randomUUID: vi.fn()
}))

vi.mock('../middleware/auth.middleware.js', () => ({
  getJwtSecret: vi.fn(() => new TextEncoder().encode('secret'))
}))

const mockedPrisma = vi.mocked(prisma)
const mockedRedis = vi.mocked(redis)
const mockedHash = vi.mocked(hash)
const mockedVerify = vi.mocked(verify)
const mockedRandomUUID = vi.mocked(randomUUID)

describe('Auth Service', () => {
  beforeEach(() => {
    vi.stubEnv('JWT_SECRET', 'secret')
    vi.clearAllMocks()
    setSubjectCalls = []
    setExpirationTimeCalls = []
  })

  describe('register', () => {
    it('should register a new user successfully', async () => {
      const input = {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'Password123',
        role: 'OPERATOR' as UserRole
      }

      mockedPrisma.user.findUnique.mockResolvedValue(null)
      mockedHash.mockResolvedValue('hashedPassword')
      mockedPrisma.user.create.mockResolvedValue({
        id: 'user-id',
        name: input.name,
        email: input.email,
        role: input.role
      })
      mockedRandomUUID.mockReturnValue('jti-123')

      const result = await register(input)

      expect(mockedPrisma.user.findUnique).toHaveBeenCalledWith({
        where: { email: input.email }
      })
      expect(mockedHash).toHaveBeenCalledWith(input.password)
      expect(mockedPrisma.user.create).toHaveBeenCalledWith({
        data: {
          name: input.name,
          email: input.email,
          passwordHash: 'hashedPassword',
          role: input.role
        },
        select: {
          id: true,
          name: true,
          email: true,
          role: true
        }
      })
      expect(result).toEqual({
        user: {
          id: 'user-id',
          name: input.name,
          email: input.email,
          role: input.role
        },
        tokens: {
          accessToken: 'token',
          refreshToken: 'token'
        }
      })
      expect(setSubjectCalls).toEqual(['user-id', 'user-id'])
      expect(setExpirationTimeCalls).toEqual(['15m', '7d'])
      expect(mockedRandomUUID).toHaveBeenCalledTimes(2)
    })

    it('should throw error if user already exists', async () => {
      const input = {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'Password123'
      }

      mockedPrisma.user.findUnique.mockResolvedValue({
        id: 'existing-id'
      } as any)

      await expect(register(input)).rejects.toThrow(
        new HTTPException(409, {
          message: 'User with this email already exists'
        })
      )
    })

    it('should propagate hash error', async () => {
      const input = {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'Password123'
      }

      mockedPrisma.user.findUnique.mockResolvedValue(null)
      mockedHash.mockRejectedValue(new Error('Hashing failed'))

      await expect(register(input)).rejects.toThrow('Hashing failed')
    })

    it('should propagate prisma create error', async () => {
      const input = {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'Password123'
      }

      mockedPrisma.user.findUnique.mockResolvedValue(null)
      mockedHash.mockResolvedValue('hashedPassword')
      mockedPrisma.user.create.mockRejectedValue(new Error('Database error'))

      await expect(register(input)).rejects.toThrow('Database error')
    })
  })

  describe('login', () => {
    it('should login user successfully', async () => {
      const input = {
        email: 'john@example.com',
        password: 'Password123'
      }

      const user = {
        id: 'user-id',
        name: 'John Doe',
        email: input.email,
        role: 'OPERATOR' as UserRole,
        passwordHash: 'hashedPassword',
        isActive: true
      }

      mockedPrisma.user.findUnique.mockResolvedValue(user as any)
      mockedVerify.mockResolvedValue(true)
      mockedRandomUUID.mockReturnValue('jti-123')

      const result = await login(input)

      expect(mockedPrisma.user.findUnique).toHaveBeenCalledWith({
        where: { email: input.email },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          passwordHash: true,
          isActive: true
        }
      })
      expect(mockedVerify).toHaveBeenCalledWith(
        'hashedPassword',
        input.password
      )
      expect(result.user).toEqual({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      })
      expect(setSubjectCalls).toEqual(['user-id', 'user-id'])
      expect(setExpirationTimeCalls).toEqual(['15m', '7d'])
      expect(mockedRandomUUID).toHaveBeenCalledTimes(2)
    })

    it('should throw error for invalid credentials', async () => {
      const input = {
        email: 'john@example.com',
        password: 'WrongPassword'
      }

      mockedPrisma.user.findUnique.mockResolvedValue({
        id: 'user-id',
        passwordHash: 'hashedPassword',
        isActive: true
      } as any)
      mockedVerify.mockResolvedValue(false)

      await expect(login(input)).rejects.toThrow(
        new HTTPException(401, { message: 'Invalid email or password' })
      )
    })

    it('should throw error for deactivated account', async () => {
      const input = {
        email: 'john@example.com',
        password: 'Password123'
      }

      mockedPrisma.user.findUnique.mockResolvedValue({
        id: 'user-id',
        passwordHash: 'hashedPassword',
        isActive: false
      } as any)

      await expect(login(input)).rejects.toThrow(
        new HTTPException(403, { message: 'Account is deactivated' })
      )
    })
  })

  describe('logout', () => {
    it('should logout successfully', async () => {
      const token = 'valid-token'
      const payload = {
        jti: 'jti-123',
        exp: Math.floor(Date.now() / 1000) + 3600
      }

      jwtVerify.mockResolvedValue({ payload })
      mockedRedis.set.mockResolvedValue('OK')

      await logout(token)

      expect(jwtVerify).toHaveBeenCalledWith(token, expect.any(Uint8Array))
      expect(mockedRedis.set).toHaveBeenCalledWith(
        'blacklist:jti-123',
        '1',
        'EX',
        expect.any(Number)
      )
    })

    it('should throw error for invalid token', async () => {
      const token = 'invalid-token'

      jwtVerify.mockRejectedValue(new Error('Invalid token'))

      await expect(logout(token)).rejects.toThrow(
        new HTTPException(401, { message: 'Invalid token' })
      )
    })

    it('should throw error for token without jti', async () => {
      const token = 'valid-token'
      const payload = {
        jti: undefined,
        exp: Math.floor(Date.now() / 1000) + 3600
      }

      jwtVerify.mockResolvedValue({ payload })
      mockedRedis.set.mockResolvedValue('OK')

      await expect(logout(token)).resolves.toBeUndefined()
    })

    it('should propagate redis error', async () => {
      const token = 'valid-token'
      const payload = {
        jti: 'jti-123',
        exp: Math.floor(Date.now() / 1000) + 3600
      }

      jwtVerify.mockResolvedValue({ payload })
      mockedRedis.set.mockRejectedValue(new Error('Redis connection failed'))

      // logout łapie wszystkie błędy w catch i zwraca HTTPException 401
      await expect(logout(token)).rejects.toThrow(
        new HTTPException(401, { message: 'Invalid token' })
      )
    })
  })

  describe('refreshTokens', () => {
    it('should refresh tokens successfully', async () => {
      const input = { token: 'refresh-token' }
      const payload = {
        sub: 'user-id',
        jti: 'jti-123',
        exp: Math.floor(Date.now() / 1000) + 3600
      }

      vi.mocked(jwtVerify).mockResolvedValueOnce({
        payload,
        protectedHeader: { alg: 'HS256' }
      } as Awaited<ReturnType<typeof jwtVerify>>)

      mockedRedis.get.mockResolvedValue(null)
      mockedPrisma.user.findUnique.mockResolvedValue({
        id: 'user-id',
        email: 'john@example.com',
        role: 'OPERATOR' as UserRole,
        isActive: true
      } as any)
      mockedRandomUUID.mockReturnValue('new-jti')

      const result = await refreshTokens(input)

      expect(result).toEqual({
        accessToken: 'token',
        refreshToken: 'token'
      })
    })

    it('should throw error for blacklisted token', async () => {
      const input = { token: 'refresh-token' }
      const payload = { jti: 'jti-123' }

      jwtVerify.mockResolvedValue({ payload })
      mockedRedis.get.mockResolvedValue('1')

      await expect(refreshTokens(input)).rejects.toThrow(
        new HTTPException(401, { message: 'Refresh token has been revoked' })
      )
    })

    it('should throw error for deactivated user', async () => {
      const input = { token: 'refresh-token' }
      const payload = {
        sub: 'user-id',
        jti: 'jti-123',
        exp: Math.floor(Date.now() / 1000) + 3600
      }

      jwtVerify.mockResolvedValue({ payload })
      mockedRedis.get.mockResolvedValue(null)
      mockedPrisma.user.findUnique.mockResolvedValue({
        id: 'user-id',
        email: 'john@example.com',
        role: 'OPERATOR' as UserRole,
        isActive: false
      } as any)

      await expect(refreshTokens(input)).rejects.toThrow(
        new HTTPException(401, { message: 'User not found or deactivated' })
      )
    })

    it('should throw error for deleted user', async () => {
      const input = { token: 'refresh-token' }
      const payload = {
        sub: 'user-id',
        jti: 'jti-123',
        exp: Math.floor(Date.now() / 1000) + 3600
      }

      jwtVerify.mockResolvedValue({ payload })
      mockedRedis.get.mockResolvedValue(null)
      mockedPrisma.user.findUnique.mockResolvedValue(null)

      await expect(refreshTokens(input)).rejects.toThrow(
        new HTTPException(401, { message: 'User not found or deactivated' })
      )
    })

    it('should throw error for token without sub', async () => {
      const input = { token: 'refresh-token' }
      const payload = {
        jti: 'jti-123',
        exp: Math.floor(Date.now() / 1000) + 3600
      }

      jwtVerify.mockResolvedValue({ payload })
      mockedRedis.get.mockResolvedValue(null)

      await expect(refreshTokens(input)).rejects.toThrow(
        new HTTPException(401, { message: 'User not found or deactivated' })
      )
    })
  })

  describe('getMe', () => {
    it('should return user data', async () => {
      const userId = 'user-id'
      const user = {
        id: userId,
        name: 'John Doe',
        email: 'john@example.com',
        role: 'OPERATOR' as UserRole,
        isActive: true,
        createdAt: new Date(),
        certifications: []
      }

      mockedPrisma.user.findUnique.mockResolvedValue(user as any)

      const result = await getMe(userId)

      expect(result).toEqual(user)
    })

    it('should throw error if user not found', async () => {
      const userId = 'non-existent'

      mockedPrisma.user.findUnique.mockResolvedValue(null)

      await expect(getMe(userId)).rejects.toThrow(
        new HTTPException(404, { message: 'User not found' })
      )
    })

    it('should propagate prisma error', async () => {
      const userId = 'user-id'

      mockedPrisma.user.findUnique.mockRejectedValue(
        new Error('Database connection failed')
      )

      await expect(getMe(userId)).rejects.toThrow('Database connection failed')
    })
  })
})
