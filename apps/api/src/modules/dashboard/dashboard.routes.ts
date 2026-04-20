import { Hono } from 'hono'
import { z } from 'zod'
import { zValidator } from '@hono/zod-validator'
import { authMiddleware, type AuthVariables } from '../../middleware/auth.middleware.js'
import { requireRoles } from '../../middleware/roles.middleware.js'
import { UserRole } from '../../../generated/prisma/client.js'
import { getDashboard } from './dashboard.service.js'

const dashboardQuerySchema = z.object({
    period: z.enum(['week', 'month', 'year']).default('month')
})

const dashboard = new Hono<{ Variables: AuthVariables['Variables'] }>()

dashboard.use('/*', authMiddleware)

dashboard.get(
    '/',
    requireRoles(UserRole.ADMIN, UserRole.MANAGER),
    zValidator('query', dashboardQuerySchema),
    async (c) => {
        const { period } = c.req.valid('query')
        const result = await getDashboard(period)
        return c.json(result, 200)
    }
)

export default dashboard
