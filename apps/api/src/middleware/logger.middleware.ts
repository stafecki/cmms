import { createMiddleware } from 'hono/factory'
import type { Context, Next } from 'hono'
import type { BlankEnv } from 'hono/types'
import { RequestLog } from '../models/request-log.model.js'
import { ErrorLog } from '../models/error-log.model.js'
import type { AuthVariables } from './auth.middleware.js'

export const requestLoggerMiddleware = createMiddleware<AuthVariables>(
  async (c: Context<AuthVariables>, next: Next): Promise<void> => {
    const start = Date.now()

    await next()

    const duration = Date.now() - start
    const statusCode = c.res.status
    const user = c.get('user')

    const shouldLog =
      statusCode >= 400 || duration > 1000 || c.req.url.includes('/auth/login')

    if (shouldLog) {
      try {
        await RequestLog.create({
          method: c.req.method,
          url: c.req.url,
          statusCode,
          duration,
          userId: user?.sub,
          userRole: user?.role,
          ip: c.req.header('x-forwarded-for') ?? 'unknown',
          userAgent: c.req.header('user-agent') ?? 'unknown'
        })
      } catch (error) {
        console.error('Failed to save request log:', error)
      }
    }
  }
)

export const errorLoggerMiddleware = async (
  err: Error & { status?: number },
  c: Context<BlankEnv>
): Promise<Response> => {
  const statusCode = err.status ?? 500

  try {
    await ErrorLog.create({
      message: err.message,
      stack: err.stack,
      statusCode,
      method: c.req.method,
      url: c.req.url
    })
  } catch (logError) {
    console.error('Failed to save error log:', logError)
  }

  return c.json(
    { message: err.message ?? 'Internal Server Error' },
    statusCode as any
  )
}
