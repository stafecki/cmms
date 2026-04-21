import { describe, it, expect, vi, beforeAll, beforeEach } from 'vitest'
import { Hono } from 'hono'
import { testClient } from 'hono/testing'
import { HTTPException } from 'hono/http-exception'
import inventory from '../inventory.routes.js'
import * as inventoryService from '../inventory.service.js'
import { UserRole } from '../../../../generated/prisma/client.js'
import { authMiddleware } from '../../../middleware/auth.middleware.js'
import { requireRoles } from '../../../middleware/roles.middleware.js'

// requireRoles jest wywoływany 6x przy rejestracji routy. Zwracamy jeden wspólny vi.fn()
// żeby móc kontrolować jego zachowanie per-test przez mockImplementationOnce.
const { rolesMiddleware } = vi.hoisted(() => ({
  rolesMiddleware: vi.fn(async (_c: unknown, next: () => Promise<void>) => {
    await next()
  })
}))

vi.mock('../inventory.service.js', () => ({
  getCategories: vi.fn(),
  createCategory: vi.fn(),
  deleteCategory: vi.fn(),
  getParts: vi.fn(),
  getPartById: vi.fn(),
  createPart: vi.fn(),
  updatePart: vi.fn(),
  deletePart: vi.fn(),
  adjustStock: vi.fn(),
  getLowStockParts: vi.fn(),
  getToolLoans: vi.fn(),
  createToolLoan: vi.fn(),
  returnToolLoan: vi.fn()
}))

vi.mock('../../../middleware/auth.middleware.js', () => ({
  authMiddleware: vi.fn(async (c, next) => {
    c.set('user', {
      sub: USER_ID,
      role: UserRole.ADMIN,
      email: 'admin@example.com',
      jti: 'jti-123',
      exp: Math.floor(Date.now() / 1000) + 3600
    })
    await next()
  })
}))

vi.mock('../../../middleware/roles.middleware.js', () => ({
  requireRoles: vi.fn((..._roles: string[]) => rolesMiddleware)
}))

vi.mock('../../../lib/redis.js', () => ({
  default: { get: vi.fn(), set: vi.fn() }
}))

// USER_ID musi być zdefiniowane przed vi.mock (vi.hoisted gwarantuje dostęp wewnątrz factory)
const USER_ID = 'a0000000-0000-4000-8000-000000000004'
const CATEGORY_ID = 'a0000000-0000-4000-8000-000000000001'
const PART_ID = 'a0000000-0000-4000-8000-000000000002'
const LOAN_ID = 'a0000000-0000-4000-8000-000000000003'

const mockedService = vi.mocked(inventoryService)

const makeCategory = (overrides = {}) => ({
  id: CATEGORY_ID,
  name: 'Electronics',
  ...overrides
})

const makePart = (overrides = {}) => ({
  id: PART_ID,
  categoryId: CATEGORY_ID,
  name: 'Resistor 10kΩ',
  stockQuantity: 10,
  reorderPoint: 5,
  unitPrice: 1.99,
  qrCode: null,
  isActive: true,
  category: makeCategory(),
  createdAt: new Date(),
  updatedAt: new Date(),
  ...overrides
})

const makeToolLoan = (overrides = {}) => ({
  id: LOAN_ID,
  partId: PART_ID,
  userId: USER_ID,
  workOrderId: null,
  loanedAt: new Date(),
  returnedAt: null,
  part: makePart(),
  user: { id: USER_ID, name: 'Admin User', email: 'admin@example.com' },
  workOrder: null,
  ...overrides
})

type AppEnv = {
  Variables: {
    user: {
      sub: string
      role: string
      email: string
      jti: string
      exp: number
    }
  }
}

const app = new Hono<AppEnv>()
app.route('/inventory', inventory)
const client = testClient(app)

describe('Inventory Routes', () => {
  // requireRoles jest wywoływany przy imporcie modułu routy, przed jakimkolwiek beforeEach.
  // Przechwytujemy argumenty przed clearAllMocks.
  let initialRequireRolesCalls: unknown[][]

  beforeAll(() => {
    initialRequireRolesCalls = vi
      .mocked(requireRoles)
      .mock.calls.map((call) => [...call])
  })

  beforeEach(() => {
    vi.clearAllMocks()
    rolesMiddleware.mockImplementation(
      async (_c: unknown, next: () => Promise<void>) => {
        await next()
      }
    )
  })

  // ─── GET /inventory/categories ──────────────────────────────────────────────

  describe('GET /categories', () => {
    it('should return 200 with list of categories', async () => {
      const categories = [makeCategory()]
      mockedService.getCategories.mockResolvedValue(categories)

      const res = await client.inventory.categories.$get({})

      expect(res.status).toBe(200)
      const data = await res.json()
      expect(data).toHaveLength(1)
      expect(mockedService.getCategories).toHaveBeenCalledOnce()
    })

    it('should return 401 when auth middleware rejects', async () => {
      vi.mocked(authMiddleware).mockImplementationOnce(async (_c, _next) => {
        throw new HTTPException(401, { message: 'Unauthorized' })
      })

      const res = await client.inventory.categories.$get({})

      expect(res.status).toBe(401)
      expect(mockedService.getCategories).not.toHaveBeenCalled()
    })
  })

  // ─── POST /inventory/categories ─────────────────────────────────────────────

  describe('POST /categories', () => {
    it('should return 201 with created category', async () => {
      const category = makeCategory()
      mockedService.createCategory.mockResolvedValue(category)

      const res = await client.inventory.categories.$post({
        json: { name: 'Electronics' }
      })

      expect(res.status).toBe(201)
      expect(mockedService.createCategory).toHaveBeenCalledWith({
        name: 'Electronics'
      })
    })

    it('should return 400 when name is missing', async () => {
      const res = await client.inventory.categories.$post({
        json: {} as { name: string }
      })

      expect(res.status).toBe(400)
      expect(mockedService.createCategory).not.toHaveBeenCalled()
    })

    it('should return 400 when name is shorter than 2 characters', async () => {
      const res = await client.inventory.categories.$post({
        json: { name: 'A' }
      })

      expect(res.status).toBe(400)
      expect(mockedService.createCategory).not.toHaveBeenCalled()
    })

    it('should return 403 when user lacks required role', async () => {
      rolesMiddleware.mockImplementationOnce(
        async (_c: unknown, _next: () => Promise<void>) => {
          throw new HTTPException(403, { message: 'Insufficient permissions' })
        }
      )

      const res = await client.inventory.categories.$post({
        json: { name: 'Electronics' }
      })

      expect(res.status).toBe(403)
      expect(mockedService.createCategory).not.toHaveBeenCalled()
    })

    it('should require ADMIN or MANAGER role', () => {
      expect(initialRequireRolesCalls).toContainEqual([
        UserRole.ADMIN,
        UserRole.MANAGER
      ])
    })
  })

  // ─── DELETE /inventory/categories/:id ───────────────────────────────────────

  describe('DELETE /categories/:id', () => {
    it('should return 200 on successful delete', async () => {
      mockedService.deleteCategory.mockResolvedValue(undefined)

      const res = await client.inventory.categories[':id'].$delete({
        param: { id: CATEGORY_ID }
      })

      expect(res.status).toBe(200)
      expect(mockedService.deleteCategory).toHaveBeenCalledWith(CATEGORY_ID)
    })

    it('should return 400 when id is not a valid UUID', async () => {
      const res = await client.inventory.categories[':id'].$delete({
        param: { id: 'not-a-uuid' }
      })

      expect(res.status).toBe(400)
      expect(mockedService.deleteCategory).not.toHaveBeenCalled()
    })

    it('should return 403 when user lacks required role', async () => {
      rolesMiddleware.mockImplementationOnce(
        async (_c: unknown, _next: () => Promise<void>) => {
          throw new HTTPException(403, { message: 'Insufficient permissions' })
        }
      )

      const res = await client.inventory.categories[':id'].$delete({
        param: { id: CATEGORY_ID }
      })

      expect(res.status).toBe(403)
    })

    it('should require ADMIN role', () => {
      expect(initialRequireRolesCalls).toContainEqual([UserRole.ADMIN])
    })
  })

  // ─── GET /inventory/parts ────────────────────────────────────────────────────

  describe('GET /parts', () => {
    it('should return 200 with list of parts', async () => {
      mockedService.getParts.mockResolvedValue([makePart()])

      const res = await client.inventory.parts.$get({})

      expect(res.status).toBe(200)
    })

    it('should pass categoryId query param to service when provided', async () => {
      mockedService.getParts.mockResolvedValue([])

      await client.inventory.parts.$get({ query: { categoryId: CATEGORY_ID } })

      expect(mockedService.getParts).toHaveBeenCalledWith(CATEGORY_ID)
    })

    it('should call service without categoryId when not in query', async () => {
      mockedService.getParts.mockResolvedValue([])

      await client.inventory.parts.$get({})

      expect(mockedService.getParts).toHaveBeenCalledWith(undefined)
    })
  })

  // ─── GET /inventory/parts/low-stock ─────────────────────────────────────────

  describe('GET /parts/low-stock', () => {
    it('should return 200 with low stock parts', async () => {
      mockedService.getLowStockParts.mockResolvedValue([
        makePart({ stockQuantity: 1 })
      ])

      const res = await client.inventory.parts['low-stock'].$get({})

      expect(res.status).toBe(200)
      expect(mockedService.getLowStockParts).toHaveBeenCalledOnce()
    })
  })

  // ─── GET /inventory/parts/:id ────────────────────────────────────────────────

  describe('GET /parts/:id', () => {
    it('should return 200 with part data', async () => {
      mockedService.getPartById.mockResolvedValue(makePart())

      const res = await client.inventory.parts[':id'].$get({
        param: { id: PART_ID }
      })

      expect(res.status).toBe(200)
      expect(mockedService.getPartById).toHaveBeenCalledWith(PART_ID)
    })

    it('should return 400 when id is not a valid UUID', async () => {
      const res = await client.inventory.parts[':id'].$get({
        param: { id: 'invalid-id' }
      })

      expect(res.status).toBe(400)
      expect(mockedService.getPartById).not.toHaveBeenCalled()
    })
  })

  // ─── POST /inventory/parts ───────────────────────────────────────────────────

  describe('POST /parts', () => {
    const validBody = {
      categoryId: CATEGORY_ID,
      name: 'New Part',
      stockQuantity: 10,
      reorderPoint: 5,
      unitPrice: 2.99
    }

    it('should return 201 with created part', async () => {
      mockedService.createPart.mockResolvedValue(makePart())

      const res = await client.inventory.parts.$post({ json: validBody })

      expect(res.status).toBe(201)
      expect(mockedService.createPart).toHaveBeenCalledWith(validBody)
    })

    it('should return 400 when categoryId is not a UUID', async () => {
      const res = await client.inventory.parts.$post({
        json: { ...validBody, categoryId: 'not-uuid' }
      })

      expect(res.status).toBe(400)
      expect(mockedService.createPart).not.toHaveBeenCalled()
    })

    it('should return 400 when name is too short', async () => {
      const res = await client.inventory.parts.$post({
        json: { ...validBody, name: 'A' }
      })

      expect(res.status).toBe(400)
    })

    it('should return 400 when stockQuantity is negative', async () => {
      const res = await client.inventory.parts.$post({
        json: { ...validBody, stockQuantity: -1 }
      })

      expect(res.status).toBe(400)
    })

    it('should return 403 when user lacks required role', async () => {
      rolesMiddleware.mockImplementationOnce(
        async (_c: unknown, _next: () => Promise<void>) => {
          throw new HTTPException(403, { message: 'Insufficient permissions' })
        }
      )

      const res = await client.inventory.parts.$post({ json: validBody })

      expect(res.status).toBe(403)
    })

    it('should require ADMIN, MANAGER or WAREHOUSE role', () => {
      expect(initialRequireRolesCalls).toContainEqual([
        UserRole.ADMIN,
        UserRole.MANAGER,
        UserRole.WAREHOUSE
      ])
    })
  })

  // ─── PATCH /inventory/parts/:id ──────────────────────────────────────────────

  describe('PATCH /parts/:id', () => {
    it('should return 200 with updated part', async () => {
      mockedService.updatePart.mockResolvedValue(makePart({ name: 'Updated' }))

      const res = await client.inventory.parts[':id'].$patch({
        param: { id: PART_ID },
        json: { name: 'Updated' }
      })

      expect(res.status).toBe(200)
      expect(mockedService.updatePart).toHaveBeenCalledWith(PART_ID, {
        name: 'Updated'
      })
    })

    it('should return 400 when id is not a valid UUID', async () => {
      const res = await client.inventory.parts[':id'].$patch({
        param: { id: 'bad-id' },
        json: { name: 'Updated' }
      })

      expect(res.status).toBe(400)
    })

    it('should return 400 when name is too short', async () => {
      const res = await client.inventory.parts[':id'].$patch({
        param: { id: PART_ID },
        json: { name: 'X' }
      })

      expect(res.status).toBe(400)
    })

    it('should return 403 when user lacks required role', async () => {
      rolesMiddleware.mockImplementationOnce(
        async (_c: unknown, _next: () => Promise<void>) => {
          throw new HTTPException(403, { message: 'Insufficient permissions' })
        }
      )

      const res = await client.inventory.parts[':id'].$patch({
        param: { id: PART_ID },
        json: { name: 'Updated' }
      })

      expect(res.status).toBe(403)
    })
  })

  // ─── DELETE /inventory/parts/:id ─────────────────────────────────────────────

  describe('DELETE /parts/:id', () => {
    it('should return 200 on successful delete', async () => {
      mockedService.deletePart.mockResolvedValue(undefined)

      const res = await client.inventory.parts[':id'].$delete({
        param: { id: PART_ID }
      })

      expect(res.status).toBe(200)
      expect(mockedService.deletePart).toHaveBeenCalledWith(PART_ID)
    })

    it('should return 400 when id is not a valid UUID', async () => {
      const res = await client.inventory.parts[':id'].$delete({
        param: { id: 'bad-id' }
      })

      expect(res.status).toBe(400)
    })

    it('should return 403 when user lacks required role', async () => {
      rolesMiddleware.mockImplementationOnce(
        async (_c: unknown, _next: () => Promise<void>) => {
          throw new HTTPException(403, { message: 'Insufficient permissions' })
        }
      )

      const res = await client.inventory.parts[':id'].$delete({
        param: { id: PART_ID }
      })

      expect(res.status).toBe(403)
    })
  })

  // ─── PATCH /inventory/parts/:id/stock ────────────────────────────────────────

  describe('PATCH /parts/:id/stock', () => {
    const validBody = { quantity: 5, reason: 'Restock' }

    it('should return 200 with updated part', async () => {
      mockedService.adjustStock.mockResolvedValue(
        makePart({ stockQuantity: 15 })
      )

      const res = await client.inventory.parts[':id'].stock.$patch({
        param: { id: PART_ID },
        json: validBody
      })

      expect(res.status).toBe(200)
      expect(mockedService.adjustStock).toHaveBeenCalledWith(PART_ID, validBody)
    })

    it('should return 400 when quantity is not an integer', async () => {
      const res = await client.inventory.parts[':id'].stock.$patch({
        param: { id: PART_ID },
        json: { quantity: 1.5, reason: 'Test' }
      })

      expect(res.status).toBe(400)
    })

    it('should return 400 when reason is too short', async () => {
      const res = await client.inventory.parts[':id'].stock.$patch({
        param: { id: PART_ID },
        json: { quantity: 1, reason: 'AB' }
      })

      expect(res.status).toBe(400)
    })

    it('should return 403 when user lacks required role', async () => {
      rolesMiddleware.mockImplementationOnce(
        async (_c: unknown, _next: () => Promise<void>) => {
          throw new HTTPException(403, { message: 'Insufficient permissions' })
        }
      )

      const res = await client.inventory.parts[':id'].stock.$patch({
        param: { id: PART_ID },
        json: validBody
      })

      expect(res.status).toBe(403)
    })
  })

  // ─── GET /inventory/loans ────────────────────────────────────────────────────

  describe('GET /loans', () => {
    it('should return 200 with all active loans', async () => {
      mockedService.getToolLoans.mockResolvedValue([makeToolLoan()])

      const res = await client.inventory.loans.$get({})

      expect(res.status).toBe(200)
      expect(mockedService.getToolLoans).toHaveBeenCalledWith()
    })
  })

  // ─── GET /inventory/loans/my ─────────────────────────────────────────────────

  describe('GET /loans/my', () => {
    it('should return 200 and pass user.sub to service', async () => {
      mockedService.getToolLoans.mockResolvedValue([makeToolLoan()])

      const res = await client.inventory.loans.my.$get({})

      expect(res.status).toBe(200)
      expect(mockedService.getToolLoans).toHaveBeenCalledWith(USER_ID)
    })
  })

  // ─── POST /inventory/loans ───────────────────────────────────────────────────

  describe('POST /loans', () => {
    it('should return 201 with created loan', async () => {
      mockedService.createToolLoan.mockResolvedValue(makeToolLoan())

      const res = await client.inventory.loans.$post({
        json: { partId: PART_ID }
      })

      expect(res.status).toBe(201)
      expect(mockedService.createToolLoan).toHaveBeenCalledWith(
        { partId: PART_ID },
        USER_ID
      )
    })

    it('should return 400 when partId is not a valid UUID', async () => {
      const res = await client.inventory.loans.$post({
        json: { partId: 'not-a-uuid' }
      })

      expect(res.status).toBe(400)
      expect(mockedService.createToolLoan).not.toHaveBeenCalled()
    })

    it('should return 400 when partId is missing', async () => {
      const res = await client.inventory.loans.$post({
        json: {} as { partId: string }
      })

      expect(res.status).toBe(400)
    })
  })

  // ─── PATCH /inventory/loans/:id/return ──────────────────────────────────────

  describe('PATCH /loans/:id/return', () => {
    it('should return 200 with returned loan', async () => {
      mockedService.returnToolLoan.mockResolvedValue(
        makeToolLoan({ returnedAt: new Date() })
      )

      const res = await client.inventory.loans[':id'].return.$patch({
        param: { id: LOAN_ID }
      })

      expect(res.status).toBe(200)
      expect(mockedService.returnToolLoan).toHaveBeenCalledWith(
        LOAN_ID,
        USER_ID
      )
    })

    it('should return 400 when id is not a valid UUID', async () => {
      const res = await client.inventory.loans[':id'].return.$patch({
        param: { id: 'bad-id' }
      })

      expect(res.status).toBe(400)
      expect(mockedService.returnToolLoan).not.toHaveBeenCalled()
    })
  })

  // ─── Error propagation ───────────────────────────────────────────────────────

  describe('error propagation', () => {
    it('should return 404 when service throws HTTPException 404', async () => {
      mockedService.getPartById.mockRejectedValue(
        new HTTPException(404, { message: 'Part not found' })
      )

      const res = await client.inventory.parts[':id'].$get({
        param: { id: PART_ID }
      })

      expect(res.status).toBe(404)
    })

    it('should return 409 when service throws HTTPException 409', async () => {
      mockedService.createCategory.mockRejectedValue(
        new HTTPException(409, { message: 'Category already exists' })
      )

      const res = await client.inventory.categories.$post({
        json: { name: 'Electronics' }
      })

      expect(res.status).toBe(409)
    })

    it('should return 500 when service throws unexpected error', async () => {
      mockedService.getParts.mockRejectedValue(
        new Error('Database connection failed')
      )

      const res = await client.inventory.parts.$get({})

      expect(res.status).toBe(500)
    })
  })
})
