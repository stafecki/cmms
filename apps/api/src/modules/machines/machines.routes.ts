import { Hono } from 'hono'
import { zValidator } from '@hono/zod-validator'
import {
  authMiddleware,
  type AuthVariables
} from '../../middleware/auth.middleware.js'
import { requireRoles } from '../../middleware/roles.middleware.js'
import { UserRole } from '../../../generated/prisma/client.js'
import {
  createMachineSchema,
  updateMachineSchema,
  updateOperatingHoursSchema,
  machineIdSchema
} from './machines.schema.js'
import {
  getMachines,
  getMachineById,
  createMachine,
  updateMachine,
  deleteMachine,
  updateOperatingHours,
  getMachineDocuments,
  uploadMachineDocument,
  getMachineTco
} from './machines.service.js'

const machines = new Hono<{ Variables: AuthVariables['Variables'] }>()

machines.use('/*', authMiddleware)

machines.get('/', async (c) => {
  const result = await getMachines()
  return c.json(result, 200)
})

machines.get('/:id', zValidator('param', machineIdSchema), async (c) => {
  const { id } = c.req.valid('param')
  const result = await getMachineById(id)
  return c.json(result, 200)
})

machines.post(
  '/',
  requireRoles(UserRole.ADMIN, UserRole.MANAGER),
  zValidator('json', createMachineSchema),
  async (c) => {
    const input = c.req.valid('json')
    const result = await createMachine(input)
    return c.json(result, 201)
  }
)

machines.patch(
  '/:id',
  requireRoles(UserRole.ADMIN, UserRole.MANAGER),
  zValidator('param', machineIdSchema),
  zValidator('json', updateMachineSchema),
  async (c) => {
    const { id } = c.req.valid('param')
    const input = c.req.valid('json')
    const result = await updateMachine(id, input)
    return c.json(result, 200)
  }
)

machines.delete(
  '/:id',
  requireRoles(UserRole.ADMIN),
  zValidator('param', machineIdSchema),
  async (c) => {
    const { id } = c.req.valid('param')
    await deleteMachine(id)
    return c.json({ message: 'Machine deleted successfully' }, 200)
  }
)

machines.patch(
  '/:id/operating-hours',
  requireRoles(UserRole.ADMIN, UserRole.MANAGER, UserRole.TECHNICIAN),
  zValidator('param', machineIdSchema),
  zValidator('json', updateOperatingHoursSchema),
  async (c) => {
    const { id } = c.req.valid('param')
    const input = c.req.valid('json')
    const result = await updateOperatingHours(id, input)
    return c.json(result, 200)
  }
)

machines.get(
  '/:id/documents',
  zValidator('param', machineIdSchema),
  async (c) => {
    const { id } = c.req.valid('param')
    const result = await getMachineDocuments(id)
    return c.json(result, 200)
  }
)

machines.post(
  '/:id/documents',
  requireRoles(UserRole.ADMIN, UserRole.MANAGER),
  zValidator('param', machineIdSchema),
  async (c) => {
    const { id } = c.req.valid('param')
    const user = c.get('user')
    const body = await c.req.parseBody()

    const file = body['file']
    if (!file || typeof file === 'string') {
      return c.json({ message: 'File is required' }, 400)
    }

    const filename = file.name
    const filePath = `uploads/machines/${id}/${Date.now()}-${filename}`

    const result = await uploadMachineDocument(id, user.sub, filename, filePath)
    return c.json(result, 201)
  }
)

machines.get(
  '/:id/tco',
  requireRoles(UserRole.ADMIN, UserRole.MANAGER),
  zValidator('param', machineIdSchema),
  async (c) => {
    const { id } = c.req.valid('param')
    const result = await getMachineTco(id)
    return c.json(result, 200)
  }
)

export default machines
