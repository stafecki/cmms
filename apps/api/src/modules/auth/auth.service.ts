import { SignJWT, jwtVerify, type JWTPayload } from 'jose'
import { HTTPException } from 'hono/http-exception'
import { hash, verify } from '@node-rs/argon2'
import { randomUUID } from 'crypto'
import prisma from '../../lib/prisma.js'
import redis from '../../lib/redis.js'
import type { UserRole } from '../../../generated/prisma/client.js'
import type {
  RegisterInput,
  LoginInput,
  RefreshTokenInput
} from './auth.schema.js'
import type { JwtPayload } from '../../middleware/auth.middleware.js'

type TokenPair = {
  accessToken: string
  refreshToken: string
}

type AuthResponse = {
  user: {
    id: string
    name: string
    email: string
    role: UserRole
  }
  tokens: TokenPair
}

const ACCESS_TOKEN_EXPIRY = '15m'
const REFRESH_TOKEN_EXPIRY = '7d'

const getJwtSecret = (): Uint8Array => {
  const secret = process.env.JWT_SECRET
  if (!secret) throw new Error('JWT_SECRET is not defined')
  return new TextEncoder().encode(secret)
}

const generateAccessToken = async (
  userId: string,
  email: string,
  role: UserRole
): Promise<string> => {
  return new SignJWT({ email, role })
    .setProtectedHeader({ alg: 'HS256' })
    .setSubject(userId)
    .setJti(randomUUID())
    .setIssuedAt()
    .setExpirationTime(ACCESS_TOKEN_EXPIRY)
    .sign(getJwtSecret())
}

const generateRefreshToken = async (userId: string): Promise<string> => {
  return new SignJWT({})
    .setProtectedHeader({ alg: 'HS256' })
    .setSubject(userId)
    .setJti(randomUUID())
    .setIssuedAt()
    .setExpirationTime(REFRESH_TOKEN_EXPIRY)
    .sign(getJwtSecret())
}

export const register = async (input: RegisterInput): Promise<AuthResponse> => {
  const existingUser = await prisma.user.findUnique({
    where: { email: input.email }
  })

  if (existingUser) {
    throw new HTTPException(409, {
      message: 'User with this email already exists'
    })
  }

  const passwordHash = await hash(input.password)

  const user = await prisma.user.create({
    data: {
      name: input.name,
      email: input.email,
      passwordHash,
      role: input.role as UserRole
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true
    }
  })

  const [accessToken, refreshToken] = await Promise.all([
    generateAccessToken(user.id, user.email, user.role),
    generateRefreshToken(user.id)
  ])

  return {
    user,
    tokens: { accessToken, refreshToken }
  }
}

export const login = async (input: LoginInput): Promise<AuthResponse> => {
  const user = await prisma.user.findUnique({
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

  if (!user) {
    throw new HTTPException(401, { message: 'Invalid email or password' })
  }

  if (!user.isActive) {
    throw new HTTPException(403, { message: 'Account is deactivated' })
  }

  const isPasswordValid = await verify(user.passwordHash, input.password)

  if (!isPasswordValid) {
    throw new HTTPException(401, { message: 'Invalid email or password' })
  }

  const [accessToken, refreshToken] = await Promise.all([
    generateAccessToken(user.id, user.email, user.role),
    generateRefreshToken(user.id)
  ])

  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    },
    tokens: { accessToken, refreshToken }
  }
}

export const logout = async (token: string): Promise<void> => {
  try {
    const { payload } = await jwtVerify(token, getJwtSecret())
    const jwtPayload = payload as JwtPayload

    const ttl = jwtPayload.exp - Math.floor(Date.now() / 1000)

    if (ttl > 0) {
      await redis.set(`blacklist:${jwtPayload.jti}`, '1', 'EX', ttl)
    }
  } catch {
    throw new HTTPException(401, { message: 'Invalid token' })
  }
}

export const refreshTokens = async (
  input: RefreshTokenInput
): Promise<TokenPair> => {
  try {
    const { payload } = await jwtVerify(input.token, getJwtSecret())
    const jwtPayload = payload as JWTPayload & {
      sub: string
      jti: string
      exp: number
    }

    const isBlacklisted = await redis.get(`blacklist:${jwtPayload.jti}`)
    if (isBlacklisted) {
      throw new HTTPException(401, {
        message: 'Refresh token has been revoked'
      })
    }

    const user = await prisma.user.findUnique({
      where: { id: jwtPayload.sub },
      select: { id: true, email: true, role: true, isActive: true }
    })

    if (!user || !user.isActive) {
      throw new HTTPException(401, { message: 'User not found or deactivated' })
    }

    const ttl = jwtPayload.exp - Math.floor(Date.now() / 1000)
    if (ttl > 0) {
      await redis.set(`blacklist:${jwtPayload.jti}`, '1', 'EX', ttl)
    }

    const [newAccessToken, newRefreshToken] = await Promise.all([
      generateAccessToken(user.id, user.email, user.role),
      generateRefreshToken(user.id)
    ])

    return {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken
    }
  } catch (error) {
    if (error instanceof HTTPException) throw error
    throw new HTTPException(401, {
      message: 'Invalid or expired refresh token'
    })
  }
}

export const getMe = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      isActive: true,
      createdAt: true,
      certifications: {
        select: {
          id: true,
          type: true,
          expiresAt: true,
          isValid: true
        }
      }
    }
  })

  if (!user) {
    throw new HTTPException(404, { message: 'User not found' })
  }

  return user
}
