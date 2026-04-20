import { Hono } from 'hono'
import { zValidator } from '@hono/zod-validator'
import {
  authMiddleware,
  type AuthVariables
} from '../../middleware/auth.middleware.js'
import { requireRoles } from '../../middleware/roles.middleware.js'
import { UserRole } from '../../../generated/prisma/client.js'
import {
  createPartCategorySchema,
  createPartSchema,
  updatePartSchema,
  adjustStockSchema,
  createToolLoanSchema,
  partIdSchema,
  categoryIdSchema
} from './inventory.schema.js'
import {
  getCategories,
  createCategory,
  deleteCategory,
  getParts,
  getPartById,
  createPart,
  updatePart,
  deletePart,
  adjustStock,
  getLowStockParts,
  getToolLoans,
  createToolLoan,
  returnToolLoan
} from './inventory.service.js'

const inventory = new Hono<{ Variables: AuthVariables['Variables'] }>()

inventory.use('/*', authMiddleware)

inventory.get('/categories', async (c) => {
  const result = await getCategories()
  return c.json(result, 200)
})

inventory.post(
  '/categories',
  requireRoles(UserRole.ADMIN, UserRole.MANAGER),
  zValidator('json', createPartCategorySchema),
  async (c) => {
    const input = c.req.valid('json')
    const result = await createCategory(input)
    return c.json(result, 201)
  }
)

inventory.delete(
  '/categories/:id',
  requireRoles(UserRole.ADMIN),
  zValidator('param', categoryIdSchema),
  async (c) => {
    const { id } = c.req.valid('param')
    await deleteCategory(id)
    return c.json({ message: 'Category deleted successfully' }, 200)
  }
)

inventory.get('/parts', async (c) => {
  const categoryId = c.req.query('categoryId')
  const result = await getParts(categoryId)
  return c.json(result, 200)
})

inventory.get('/parts/low-stock', async (c) => {
  const result = await getLowStockParts()
  return c.json(result, 200)
})

inventory.get('/parts/:id', zValidator('param', partIdSchema), async (c) => {
  const { id } = c.req.valid('param')
  const result = await getPartById(id)
  return c.json(result, 200)
})

inventory.post(
  '/parts',
  requireRoles(UserRole.ADMIN, UserRole.MANAGER, UserRole.WAREHOUSE),
  zValidator('json', createPartSchema),
  async (c) => {
    const input = c.req.valid('json')
    const result = await createPart(input)
    return c.json(result, 201)
  }
)

inventory.patch(
  '/parts/:id',
  requireRoles(UserRole.ADMIN, UserRole.MANAGER, UserRole.WAREHOUSE),
  zValidator('param', partIdSchema),
  zValidator('json', updatePartSchema),
  async (c) => {
    const { id } = c.req.valid('param')
    const input = c.req.valid('json')
    const result = await updatePart(id, input)
    return c.json(result, 200)
  }
)

inventory.delete(
  '/parts/:id',
  requireRoles(UserRole.ADMIN),
  zValidator('param', partIdSchema),
  async (c) => {
    const { id } = c.req.valid('param')
    await deletePart(id)
    return c.json({ message: 'Part deleted successfully' }, 200)
  }
)

inventory.patch(
  '/parts/:id/stock',
  requireRoles(UserRole.ADMIN, UserRole.MANAGER, UserRole.WAREHOUSE),
  zValidator('param', partIdSchema),
  zValidator('json', adjustStockSchema),
  async (c) => {
    const { id } = c.req.valid('param')
    const input = c.req.valid('json')
    const result = await adjustStock(id, input)
    return c.json(result, 200)
  }
)

inventory.get('/loans', async (c) => {
  const result = await getToolLoans()
  return c.json(result, 200)
})

inventory.get('/loans/my', async (c) => {
  const user = c.get('user')
  const result = await getToolLoans(user.sub)
  return c.json(result, 200)
})

inventory.post(
  '/loans',
  zValidator('json', createToolLoanSchema),
  async (c) => {
    const input = c.req.valid('json')
    const user = c.get('user')
    const result = await createToolLoan(input, user.sub)
    return c.json(result, 201)
  }
)

inventory.patch(
  '/loans/:id/return',
  zValidator('param', partIdSchema),
  async (c) => {
    const { id } = c.req.valid('param')
    const user = c.get('user')
    const result = await returnToolLoan(id, user.sub)
    return c.json(result, 200)
  }
)

export default inventory
