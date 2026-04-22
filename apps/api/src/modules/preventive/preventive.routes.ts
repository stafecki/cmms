import { Hono } from 'hono'
import { zValidator } from '@hono/zod-validator'
import {
  authMiddleware,
  type AuthVariables
} from '../../middleware/auth.middleware.js'
import { requireRoles } from '../../middleware/roles.middleware.js'
import { UserRole } from '../../../generated/prisma/client.js'
import {
  createPreventivePlanSchema,
  updatePreventivePlanSchema,
  preventivePlanIdSchema
} from './preventive.schema.js'
import {
  getPreventivePlans,
  getPreventivePlanById,
  createPreventivePlan,
  updatePreventivePlan,
  deletePreventivePlan,
  getUpcomingPlans,
  triggerPreventiveWorkOrder,
  checkAndCreatePreventiveOrders
} from './preventive.service.js'

const preventive = new Hono<{ Variables: AuthVariables['Variables'] }>()

preventive.use('/*', authMiddleware)

preventive.get('/', async (c) => {
  const result = await getPreventivePlans()
  return c.json(result, 200)
})

preventive.get('/upcoming', async (c) => {
  const days = Number(c.req.query('days')) || 7
  const result = await getUpcomingPlans(days)
  return c.json(result, 200)
})

preventive.get('/check', requireRoles(UserRole.ADMIN), async (c) => {
  const created = await checkAndCreatePreventiveOrders()
  return c.json({ message: `Created ${created} preventive work orders` }, 200)
})

preventive.get(
  '/:id',
  zValidator('param', preventivePlanIdSchema),
  async (c) => {
    const { id } = c.req.valid('param')
    const result = await getPreventivePlanById(id)
    return c.json(result, 200)
  }
)

preventive.post(
  '/',
  requireRoles(UserRole.ADMIN, UserRole.MANAGER),
  zValidator('json', createPreventivePlanSchema),
  async (c) => {
    const input = c.req.valid('json')
    const result = await createPreventivePlan(input)
    return c.json(result, 201)
  }
)

preventive.patch(
  '/:id',
  requireRoles(UserRole.ADMIN, UserRole.MANAGER),
  zValidator('param', preventivePlanIdSchema),
  zValidator('json', updatePreventivePlanSchema),
  async (c) => {
    const { id } = c.req.valid('param')
    const input = c.req.valid('json')
    const result = await updatePreventivePlan(id, input)
    return c.json(result, 200)
  }
)

preventive.delete(
  '/:id',
  requireRoles(UserRole.ADMIN),
  zValidator('param', preventivePlanIdSchema),
  async (c) => {
    const { id } = c.req.valid('param')
    await deletePreventivePlan(id)
    return c.json({ message: 'Preventive plan deleted successfully' }, 200)
  }
)

preventive.post(
  '/:id/trigger',
  requireRoles(UserRole.ADMIN, UserRole.MANAGER),
  zValidator('param', preventivePlanIdSchema),
  async (c) => {
    const { id } = c.req.valid('param')
    const user = c.get('user')
    const result = await triggerPreventiveWorkOrder(id, user.sub)
    return c.json(result, 201)
  }
)

export default preventive
