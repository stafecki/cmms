import { Hono } from 'hono'
import { zValidator } from '@hono/zod-validator'
import {
  authMiddleware,
  type AuthVariables
} from '../../middleware/auth.middleware.js'
import { requireRoles } from '../../middleware/roles.middleware.js'
import { UserRole } from '../../../generated/prisma/client.js'
import {
  createLocationSchema,
  updateLocationSchema,
  locationIdSchema
} from './locations.schema.js'
import {
  getLocations,
  getLocationById,
  createLocation,
  updateLocation,
  deleteLocation
} from './locations.service.js'

const locations = new Hono<{ Variables: AuthVariables['Variables'] }>()

locations.use('/*', authMiddleware)

locations.get('/', async (c) => {
  const result = await getLocations()
  return c.json(result, 200)
})

locations.get('/:id', zValidator('param', locationIdSchema), async (c) => {
  const { id } = c.req.valid('param')
  const result = await getLocationById(id)
  return c.json(result, 200)
})

locations.post(
  '/',
  requireRoles(UserRole.ADMIN, UserRole.MANAGER),
  zValidator('json', createLocationSchema),
  async (c) => {
    const input = c.req.valid('json')
    const result = await createLocation(input)
    return c.json(result, 201)
  }
)

locations.patch(
  '/:id',
  requireRoles(UserRole.ADMIN, UserRole.MANAGER),
  zValidator('param', locationIdSchema),
  zValidator('json', updateLocationSchema),
  async (c) => {
    const { id } = c.req.valid('param')
    const input = c.req.valid('json')
    const result = await updateLocation(id, input)
    return c.json(result, 200)
  }
)

locations.delete(
  '/:id',
  requireRoles(UserRole.ADMIN),
  zValidator('param', locationIdSchema),
  async (c) => {
    const { id } = c.req.valid('param')
    await deleteLocation(id)
    return c.json({ message: 'Location deleted successfully' }, 200)
  }
)

export default locations
