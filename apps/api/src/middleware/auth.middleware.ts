import { createMiddleware } from 'hono/factory'
import { HTTPException } from 'hono/http-exception'
import { jwtVerify, type JWTPayload } from 'jose'
import type { Context, Next } from 'hono'
import redis from '../lib/redis.js'
import type { UserRole } from '../../generated/prisma/client.js'

export type JwtPayload = JWTPayload & {
  sub: string
  email: string
  role: UserRole
  jti: string
  exp: number
}

export type AuthVariables = {
  Variables: {
    user: JwtPayload
  }
}

const getJwtSecret = (): Uint8Array => {
  const secret = process.env.JWT_SECRET
  if (!secret) {
    throw new Error('JWT_SECRET is not defined in environment variables')
  }
  return new TextEncoder().encode(secret)
}

const extractToken = (c: Context): string => {
  const authHeader = c.req.header('Authorization')
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new HTTPException(401, {
      message: 'Missing or invalid Authorization header'
    })
  }
  return authHeader.split(' ')[1]
}

const checkBlacklist = async (jti: string): Promise<void> => {
  const isBlacklisted = await redis.get(`blacklist:${jti}`)
  if (isBlacklisted) {
    throw new HTTPException(401, { message: 'Token has been revoked' })
  }
}

export const authMiddleware = createMiddleware<AuthVariables>(
  async (c: Context<AuthVariables>, next: Next): Promise<void> => {
    const token = extractToken(c)

    try {
      const { payload } = await jwtVerify(token, getJwtSecret())
      const jwtPayload = payload as JwtPayload

      await checkBlacklist(jwtPayload.jti)

      c.set('user', jwtPayload)
      await next()
    } catch (error) {
      if (error instanceof HTTPException) throw error
      throw new HTTPException(401, { message: 'Invalid or expired token' })
    }
  }
)
