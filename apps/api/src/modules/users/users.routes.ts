import { Hono } from 'hono'
import { zValidator } from '@hono/zod-validator'
import {
  authMiddleware,
  type AuthVariables
} from '../../middleware/auth.middleware.js'
import { requireRoles } from '../../middleware/roles.middleware.js'
import { UserRole } from '../../../generated/prisma/client.js'
import {
  updateUserSchema,
  createCertificationSchema,
  userIdSchema,
  certificationIdSchema,
  getUsersQuerySchema
} from './users.schema.js'
import {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  getCertifications,
  createCertification,
  deleteCertification
} from './users.service.js'

const users = new Hono<{ Variables: AuthVariables['Variables'] }>()

users.use('/*', authMiddleware)

users.get(
  '/',
  requireRoles(UserRole.ADMIN, UserRole.MANAGER),
  zValidator('query', getUsersQuerySchema),
  async (c) => {
    const query = c.req.valid('query')
    const result = await getUsers(query)
    return c.json(result, 200)
  }
)

users.get(
  '/:id',
  requireRoles(UserRole.ADMIN, UserRole.MANAGER),
  zValidator('param', userIdSchema),
  async (c) => {
    const { id } = c.req.valid('param')
    const result = await getUserById(id)
    return c.json(result, 200)
  }
)

users.patch(
  '/:id',
  requireRoles(UserRole.ADMIN),
  zValidator('param', userIdSchema),
  zValidator('json', updateUserSchema),
  async (c) => {
    const { id } = c.req.valid('param')
    const input = c.req.valid('json')
    const result = await updateUser(id, input)
    return c.json(result, 200)
  }
)

users.delete(
  '/:id',
  requireRoles(UserRole.ADMIN),
  zValidator('param', userIdSchema),
  async (c) => {
    const { id } = c.req.valid('param')
    await deleteUser(id)
    return c.json({ message: 'User deactivated successfully' }, 200)
  }
)

users.get(
  '/:id/certifications',
  requireRoles(UserRole.ADMIN, UserRole.MANAGER),
  zValidator('param', userIdSchema),
  async (c) => {
    const { id } = c.req.valid('param')
    const result = await getCertifications(id)
    return c.json(result, 200)
  }
)

users.post(
  '/:id/certifications',
  requireRoles(UserRole.ADMIN),
  zValidator('param', userIdSchema),
  zValidator('json', createCertificationSchema),
  async (c) => {
    const { id } = c.req.valid('param')
    const input = c.req.valid('json')
    const result = await createCertification(id, input)
    return c.json(result, 201)
  }
)

users.delete(
  '/:id/certifications/:certId',
  requireRoles(UserRole.ADMIN),
  zValidator('param', certificationIdSchema),
  async (c) => {
    const { id, certId } = c.req.valid('param')
    await deleteCertification(id, certId)
    return c.json({ message: 'Certification deleted successfully' }, 200)
  }
)

export default users
