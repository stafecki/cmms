import { Hono } from 'hono'
import { zValidator } from '@hono/zod-validator'
import { z } from 'zod'
import { authMiddleware, type AuthVariables } from '../../middleware/auth.middleware.js'
import { requireRoles } from '../../middleware/roles.middleware.js'
import { UserRole } from '../../../generated/prisma/client.js'
import { RequestLog } from '../../models/request-log.model.js'
import { ErrorLog } from '../../models/error-log.model.js'

const logsQuerySchema = z.object({
    limit: z.coerce.number().int().min(1).max(100).default(50),
    offset: z.coerce.number().int().min(0).default(0),
    from: z.coerce.date().optional(),
    to: z.coerce.date().optional(),
    userId: z.string().optional(),
    statusCode: z.coerce.number().int().optional()
})

const monitoring = new Hono<{ Variables: AuthVariables['Variables'] }>()

monitoring.use('/*', authMiddleware)
monitoring.use('/*', requireRoles(UserRole.ADMIN))

monitoring.get('/requests', zValidator('query', logsQuerySchema), async (c) => {
    const query = c.req.valid('query')

    const filter: Record<string, unknown> = {}
    if (query.userId) filter.userId = query.userId
    if (query.statusCode) filter.statusCode = query.statusCode
    if (query.from || query.to) {
        filter.createdAt = {
            ...(query.from ? { $gte: query.from } : {}),
            ...(query.to ? { $lte: query.to } : {})
        }
    }

    const [data, total] = await Promise.all([
        RequestLog.find(filter)
            .sort({ createdAt: -1 })
            .skip(query.offset)
            .limit(query.limit)
            .lean(),
        RequestLog.countDocuments(filter)
    ])

    return c.json({ data, total, limit: query.limit, offset: query.offset }, 200)
})

monitoring.get('/errors', zValidator('query', logsQuerySchema), async (c) => {
    const query = c.req.valid('query')

    const filter: Record<string, unknown> = {}
    if (query.userId) filter.userId = query.userId
    if (query.statusCode) filter.statusCode = query.statusCode
    if (query.from || query.to) {
        filter.createdAt = {
            ...(query.from ? { $gte: query.from } : {}),
            ...(query.to ? { $lte: query.to } : {})
        }
    }

    const [data, total] = await Promise.all([
        ErrorLog.find(filter)
            .sort({ createdAt: -1 })
            .skip(query.offset)
            .limit(query.limit)
            .lean(),
        ErrorLog.countDocuments(filter)
    ])

    return c.json({ data, total, limit: query.limit, offset: query.offset }, 200)
})

export default monitoring
