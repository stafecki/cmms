import { describe, it, expect, vi, beforeEach } from 'vitest'
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
} from '../inventory.service.js'
import prisma from '../../../lib/prisma.js'

vi.mock('../../../lib/prisma.js', () => ({
  default: {
    partCategory: {
      findMany: vi.fn(),
      findUnique: vi.fn(),
      create: vi.fn(),
      delete: vi.fn()
    },
    part: {
      findMany: vi.fn(),
      findUnique: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
      deleteMany: vi.fn(),
      count: vi.fn(),
      fields: { reorderPoint: Symbol('reorderPoint') }
    },
    toolLoan: {
      findMany: vi.fn(),
      findUnique: vi.fn(),
      findFirst: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
      deleteMany: vi.fn()
    },
    workOrderPart: {
      deleteMany: vi.fn()
    },
    user: {
      findFirst: vi.fn()
    },
    notification: {
      create: vi.fn()
    }
  }
}))

const mockedPrisma = vi.mocked(prisma)

const CATEGORY_ID = '00000000-0000-0000-0000-000000000001'
const PART_ID = '00000000-0000-0000-0000-000000000002'
const LOAN_ID = '00000000-0000-0000-0000-000000000003'
const USER_ID = '00000000-0000-0000-0000-000000000004'

const makeCategory = (overrides = {}) => ({
  id: CATEGORY_ID,
  name: 'Electronics',
  ...overrides
})

const makePart = (overrides: Record<string, unknown> = {}) => ({
  id: PART_ID,
  categoryId: CATEGORY_ID,
  name: 'Resistor 10kΩ',
  stockQuantity: 10,
  reorderPoint: 5,
  unitPrice: 1.99,
  isActive: true,
  createdAt: new Date(),
  updatedAt: new Date(),
  ...overrides
})

const makeToolLoan = (overrides: Record<string, unknown> = {}) => ({
  id: LOAN_ID,
  partId: PART_ID,
  userId: USER_ID,
  workOrderId: null,
  loanedAt: new Date(),
  returnedAt: null,
  ...overrides
})

describe('Inventory Service', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  // ─── getCategories ──────────────────────────────────────────────────────────

  describe('getCategories', () => {
    it('should return list of categories ordered by name', async () => {
      const categories = [
        makeCategory(),
        makeCategory({ id: 'other-id', name: 'Mechanical' })
      ]
      mockedPrisma.partCategory.findMany.mockResolvedValue(categories)

      const result = await getCategories()

      expect(result).toEqual(categories)
      expect(mockedPrisma.partCategory.findMany).toHaveBeenCalledWith({
        orderBy: { name: 'asc' }
      })
    })

    it('should return empty array when no categories exist', async () => {
      mockedPrisma.partCategory.findMany.mockResolvedValue([])

      const result = await getCategories()

      expect(result).toEqual([])
    })
  })

  // ─── createCategory ─────────────────────────────────────────────────────────

  describe('createCategory', () => {
    it('should create and return new category', async () => {
      mockedPrisma.partCategory.findUnique.mockResolvedValue(null)
      const category = makeCategory()
      mockedPrisma.partCategory.create.mockResolvedValue(category)

      const result = await createCategory({ name: 'Electronics' })

      expect(result).toEqual(category)
      expect(mockedPrisma.partCategory.create).toHaveBeenCalledWith({
        data: { name: 'Electronics' }
      })
    })

    it('should throw 409 when category with same name already exists', async () => {
      mockedPrisma.partCategory.findUnique.mockResolvedValue(makeCategory())

      await expect(
        createCategory({ name: 'Electronics' })
      ).rejects.toMatchObject({
        status: 409
      })
      expect(mockedPrisma.partCategory.create).not.toHaveBeenCalled()
    })
  })

  // ─── deleteCategory ─────────────────────────────────────────────────────────

  describe('deleteCategory', () => {
    it('should delete category when it has no parts', async () => {
      mockedPrisma.partCategory.findUnique.mockResolvedValue(makeCategory())
      mockedPrisma.part.count.mockResolvedValue(0)
      mockedPrisma.part.findMany.mockResolvedValue([])
      mockedPrisma.partCategory.delete.mockResolvedValue(makeCategory())

      await deleteCategory(CATEGORY_ID)

      expect(mockedPrisma.partCategory.delete).toHaveBeenCalledWith({
        where: { id: CATEGORY_ID }
      })
    })

    it('should throw 404 when category not found', async () => {
      mockedPrisma.partCategory.findUnique.mockResolvedValue(null)

      await expect(deleteCategory(CATEGORY_ID)).rejects.toMatchObject({
        status: 404
      })
    })

    it('should throw 400 when category has active parts', async () => {
      mockedPrisma.partCategory.findUnique.mockResolvedValue(makeCategory())
      mockedPrisma.part.count.mockResolvedValue(3)

      await expect(deleteCategory(CATEGORY_ID)).rejects.toMatchObject({
        status: 400
      })
      expect(mockedPrisma.partCategory.delete).not.toHaveBeenCalled()
    })

    it('should cascade-delete inactive part loans and workOrderParts before deleting category', async () => {
      mockedPrisma.partCategory.findUnique.mockResolvedValue(makeCategory())
      mockedPrisma.part.count.mockResolvedValue(0)
      mockedPrisma.part.findMany.mockResolvedValue([{ id: 'p1' }, { id: 'p2' }])
      mockedPrisma.toolLoan.deleteMany.mockResolvedValue({ count: 2 })
      mockedPrisma.workOrderPart.deleteMany.mockResolvedValue({ count: 1 })
      mockedPrisma.part.deleteMany.mockResolvedValue({ count: 2 })
      mockedPrisma.partCategory.delete.mockResolvedValue(makeCategory())

      await deleteCategory(CATEGORY_ID)

      expect(mockedPrisma.toolLoan.deleteMany).toHaveBeenCalledWith({
        where: { partId: { in: ['p1', 'p2'] } }
      })
      expect(mockedPrisma.workOrderPart.deleteMany).toHaveBeenCalledWith({
        where: { partId: { in: ['p1', 'p2'] } }
      })
      expect(mockedPrisma.part.deleteMany).toHaveBeenCalledWith({
        where: { id: { in: ['p1', 'p2'] } }
      })
      expect(mockedPrisma.partCategory.delete).toHaveBeenCalled()
    })

    it('should skip cascade when no inactive parts exist', async () => {
      mockedPrisma.partCategory.findUnique.mockResolvedValue(makeCategory())
      mockedPrisma.part.count.mockResolvedValue(0)
      mockedPrisma.part.findMany.mockResolvedValue([])
      mockedPrisma.partCategory.delete.mockResolvedValue(makeCategory())

      await deleteCategory(CATEGORY_ID)

      expect(mockedPrisma.toolLoan.deleteMany).not.toHaveBeenCalled()
      expect(mockedPrisma.part.deleteMany).not.toHaveBeenCalled()
    })
  })

  // ─── getParts ───────────────────────────────────────────────────────────────

  describe('getParts', () => {
    it('should return active parts ordered by name', async () => {
      const parts = [makePart()]
      mockedPrisma.part.findMany.mockResolvedValue(parts)

      const result = await getParts()

      expect(result).toEqual(parts)
      expect(mockedPrisma.part.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({ isActive: true }),
          orderBy: { name: 'asc' }
        })
      )
    })

    it('should filter by categoryId when provided', async () => {
      mockedPrisma.part.findMany.mockResolvedValue([])

      await getParts(CATEGORY_ID)

      const call = mockedPrisma.part.findMany.mock.calls[0][0]
      expect(call.where.categoryId).toBe(CATEGORY_ID)
    })

    it('should not include categoryId filter when not provided', async () => {
      mockedPrisma.part.findMany.mockResolvedValue([])

      await getParts()

      const call = mockedPrisma.part.findMany.mock.calls[0][0]
      expect(call.where.categoryId).toBeUndefined()
    })
  })

  // ─── getPartById ────────────────────────────────────────────────────────────

  describe('getPartById', () => {
    it('should return part with category included', async () => {
      const part = { ...makePart(), category: makeCategory() }
      mockedPrisma.part.findUnique.mockResolvedValue(part)

      const result = await getPartById(PART_ID)

      expect(result).toEqual(part)
      expect(mockedPrisma.part.findUnique).toHaveBeenCalledWith({
        where: { id: PART_ID },
        include: { category: true }
      })
    })

    it('should throw 404 when part not found', async () => {
      mockedPrisma.part.findUnique.mockResolvedValue(null)

      await expect(getPartById(PART_ID)).rejects.toMatchObject({ status: 404 })
    })
  })

  // ─── createPart ─────────────────────────────────────────────────────────────

  describe('createPart', () => {
    const input = {
      categoryId: CATEGORY_ID,
      name: 'New Part',
      stockQuantity: 10,
      reorderPoint: 5,
      unitPrice: 2.99
    }

    it('should create and return new part', async () => {
      mockedPrisma.partCategory.findUnique.mockResolvedValue(makeCategory())
      const part = makePart()
      mockedPrisma.part.create.mockResolvedValue(part)

      const result = await createPart(input)

      expect(result).toEqual(part)
      expect(mockedPrisma.part.create).toHaveBeenCalledWith({
        data: {
          categoryId: input.categoryId,
          name: input.name,
          stockQuantity: input.stockQuantity,
          reorderPoint: input.reorderPoint,
          unitPrice: input.unitPrice
        }
      })
    })

    it('should throw 404 when category not found', async () => {
      mockedPrisma.partCategory.findUnique.mockResolvedValue(null)

      await expect(createPart(input)).rejects.toMatchObject({ status: 404 })
      expect(mockedPrisma.part.create).not.toHaveBeenCalled()
    })
  })

  // ─── updatePart ─────────────────────────────────────────────────────────────

  describe('updatePart', () => {
    it('should update and return part', async () => {
      mockedPrisma.part.findUnique.mockResolvedValue(makePart())
      const updated = makePart({ name: 'Updated Name' })
      mockedPrisma.part.update.mockResolvedValue(updated)

      const result = await updatePart(PART_ID, { name: 'Updated Name' })

      expect(result).toEqual(updated)
    })

    it('should throw 404 when part not found', async () => {
      mockedPrisma.part.findUnique.mockResolvedValue(null)

      await expect(updatePart(PART_ID, { name: 'X' })).rejects.toMatchObject({
        status: 404
      })
    })

    it('should throw 404 when new categoryId does not exist', async () => {
      mockedPrisma.part.findUnique.mockResolvedValue(makePart())
      mockedPrisma.partCategory.findUnique.mockResolvedValue(null)

      await expect(
        updatePart(PART_ID, { categoryId: CATEGORY_ID })
      ).rejects.toMatchObject({ status: 404 })
      expect(mockedPrisma.part.update).not.toHaveBeenCalled()
    })

    it('should not check category when categoryId is not in input', async () => {
      mockedPrisma.part.findUnique.mockResolvedValue(makePart())
      mockedPrisma.part.update.mockResolvedValue(makePart({ name: 'New Name' }))

      await updatePart(PART_ID, { name: 'New Name' })

      expect(mockedPrisma.partCategory.findUnique).not.toHaveBeenCalled()
    })
  })

  // ─── deletePart ─────────────────────────────────────────────────────────────

  describe('deletePart', () => {
    it('should soft-delete part by setting isActive to false', async () => {
      mockedPrisma.part.findUnique.mockResolvedValue(makePart())
      mockedPrisma.part.update.mockResolvedValue(makePart({ isActive: false }))

      await deletePart(PART_ID)

      expect(mockedPrisma.part.update).toHaveBeenCalledWith({
        where: { id: PART_ID },
        data: { isActive: false }
      })
    })

    it('should throw 404 when part not found', async () => {
      mockedPrisma.part.findUnique.mockResolvedValue(null)

      await expect(deletePart(PART_ID)).rejects.toMatchObject({ status: 404 })
    })
  })

  // ─── adjustStock ────────────────────────────────────────────────────────────

  describe('adjustStock', () => {
    it('should increase stock by given quantity', async () => {
      mockedPrisma.part.findUnique.mockResolvedValue(
        makePart({ stockQuantity: 10, reorderPoint: 5 })
      )
      const updated = makePart({ stockQuantity: 15, reorderPoint: 5 })
      mockedPrisma.part.update.mockResolvedValue(updated)

      const result = await adjustStock(PART_ID, {
        quantity: 5,
        reason: 'Restock'
      })

      expect(mockedPrisma.part.update).toHaveBeenCalledWith({
        where: { id: PART_ID },
        data: { stockQuantity: 15 }
      })
      expect(result).toEqual(updated)
    })

    it('should decrease stock by given quantity', async () => {
      mockedPrisma.part.findUnique.mockResolvedValue(
        makePart({ stockQuantity: 10, reorderPoint: 5 })
      )
      const updated = makePart({ stockQuantity: 7, reorderPoint: 5 })
      mockedPrisma.part.update.mockResolvedValue(updated)

      await adjustStock(PART_ID, { quantity: -3, reason: 'Used in repair' })

      expect(mockedPrisma.part.update).toHaveBeenCalledWith({
        where: { id: PART_ID },
        data: { stockQuantity: 7 }
      })
    })

    it('should throw 400 when resulting quantity would be negative', async () => {
      mockedPrisma.part.findUnique.mockResolvedValue(
        makePart({ stockQuantity: 2 })
      )

      await expect(
        adjustStock(PART_ID, { quantity: -5, reason: 'Usage' })
      ).rejects.toMatchObject({ status: 400 })
      expect(mockedPrisma.part.update).not.toHaveBeenCalled()
    })

    it('should throw 404 when part not found', async () => {
      mockedPrisma.part.findUnique.mockResolvedValue(null)

      await expect(
        adjustStock(PART_ID, { quantity: 1, reason: 'Test' })
      ).rejects.toMatchObject({ status: 404 })
    })

    it('should create REORDER_ALERT notification when stock drops to or below reorderPoint', async () => {
      // 6 stock − 2 = 4, reorderPoint 5 → 4 <= 5 → alert
      mockedPrisma.part.findUnique.mockResolvedValue(
        makePart({ stockQuantity: 6, reorderPoint: 5 })
      )
      mockedPrisma.part.update.mockResolvedValue(
        makePart({ stockQuantity: 4, reorderPoint: 5, name: 'Low Part' })
      )
      mockedPrisma.user.findFirst.mockResolvedValue({ id: USER_ID })
      mockedPrisma.notification.create.mockResolvedValue({})

      await adjustStock(PART_ID, { quantity: -2, reason: 'Used in repair' })

      expect(mockedPrisma.notification.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            userId: USER_ID,
            type: 'REORDER_ALERT'
          })
        })
      )
    })

    it('should not create notification when stock stays above reorderPoint', async () => {
      mockedPrisma.part.findUnique.mockResolvedValue(
        makePart({ stockQuantity: 10, reorderPoint: 5 })
      )
      mockedPrisma.part.update.mockResolvedValue(
        makePart({ stockQuantity: 8, reorderPoint: 5 })
      )

      await adjustStock(PART_ID, { quantity: -2, reason: 'Usage' })

      expect(mockedPrisma.notification.create).not.toHaveBeenCalled()
    })
  })

  // ─── getLowStockParts ────────────────────────────────────────────────────────

  describe('getLowStockParts', () => {
    it('should return active parts at or below reorder point, ordered by stockQuantity asc', async () => {
      const parts = [
        makePart({ stockQuantity: 1 }),
        makePart({ stockQuantity: 3 })
      ]
      mockedPrisma.part.findMany.mockResolvedValue(parts)

      const result = await getLowStockParts()

      expect(result).toEqual(parts)
      expect(mockedPrisma.part.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({ isActive: true }),
          include: { category: true },
          orderBy: { stockQuantity: 'asc' }
        })
      )
    })
  })

  // ─── getToolLoans ────────────────────────────────────────────────────────────

  describe('getToolLoans', () => {
    it('should return all active loans when no userId given', async () => {
      const loans = [makeToolLoan()]
      mockedPrisma.toolLoan.findMany.mockResolvedValue(loans)

      const result = await getToolLoans()

      expect(result).toEqual(loans)
      const call = mockedPrisma.toolLoan.findMany.mock.calls[0][0]
      expect(call.where.returnedAt).toBeNull()
      expect(call.where.userId).toBeUndefined()
    })

    it('should filter by userId when provided', async () => {
      mockedPrisma.toolLoan.findMany.mockResolvedValue([])

      await getToolLoans(USER_ID)

      const call = mockedPrisma.toolLoan.findMany.mock.calls[0][0]
      expect(call.where.userId).toBe(USER_ID)
    })

    it('should always filter returnedAt: null regardless of userId', async () => {
      mockedPrisma.toolLoan.findMany.mockResolvedValue([])

      await getToolLoans(USER_ID)

      const call = mockedPrisma.toolLoan.findMany.mock.calls[0][0]
      expect(call.where.returnedAt).toBeNull()
    })
  })

  // ─── createToolLoan ──────────────────────────────────────────────────────────

  describe('createToolLoan', () => {
    const input = { partId: PART_ID }

    it('should create loan and decrement part stock by 1', async () => {
      mockedPrisma.part.findUnique.mockResolvedValue(
        makePart({ stockQuantity: 5 })
      )
      mockedPrisma.toolLoan.findFirst.mockResolvedValue(null)
      const loan = makeToolLoan()
      mockedPrisma.toolLoan.create.mockResolvedValue(loan)
      mockedPrisma.part.update.mockResolvedValue(makePart({ stockQuantity: 4 }))

      const result = await createToolLoan(input, USER_ID)

      expect(result).toEqual(loan)
      expect(mockedPrisma.toolLoan.create).toHaveBeenCalledWith({
        data: {
          partId: PART_ID,
          userId: USER_ID,
          workOrderId: undefined
        }
      })
      expect(mockedPrisma.part.update).toHaveBeenCalledWith({
        where: { id: PART_ID },
        data: { stockQuantity: { decrement: 1 } }
      })
    })

    it('should throw 404 when part not found', async () => {
      mockedPrisma.part.findUnique.mockResolvedValue(null)

      await expect(createToolLoan(input, USER_ID)).rejects.toMatchObject({
        status: 404
      })
    })

    it('should throw 400 when part is out of stock', async () => {
      mockedPrisma.part.findUnique.mockResolvedValue(
        makePart({ stockQuantity: 0 })
      )

      await expect(createToolLoan(input, USER_ID)).rejects.toMatchObject({
        status: 400
      })
      expect(mockedPrisma.toolLoan.create).not.toHaveBeenCalled()
    })

    it('should throw 400 when user already has an active loan for this part', async () => {
      mockedPrisma.part.findUnique.mockResolvedValue(
        makePart({ stockQuantity: 3 })
      )
      mockedPrisma.toolLoan.findFirst.mockResolvedValue(makeToolLoan())

      await expect(createToolLoan(input, USER_ID)).rejects.toMatchObject({
        status: 400
      })
      expect(mockedPrisma.toolLoan.create).not.toHaveBeenCalled()
    })
  })

  // ─── returnToolLoan ──────────────────────────────────────────────────────────

  describe('returnToolLoan', () => {
    it('should set returnedAt and increment part stock by 1', async () => {
      mockedPrisma.toolLoan.findUnique.mockResolvedValue(
        makeToolLoan({ userId: USER_ID })
      )
      const returned = makeToolLoan({ returnedAt: new Date() })
      mockedPrisma.toolLoan.update.mockResolvedValue(returned)
      mockedPrisma.part.update.mockResolvedValue(makePart())

      const result = await returnToolLoan(LOAN_ID, USER_ID)

      expect(result).toEqual(returned)
      expect(mockedPrisma.toolLoan.update).toHaveBeenCalledWith({
        where: { id: LOAN_ID },
        data: { returnedAt: expect.any(Date) }
      })
      expect(mockedPrisma.part.update).toHaveBeenCalledWith({
        where: { id: PART_ID },
        data: { stockQuantity: { increment: 1 } }
      })
    })

    it('should throw 404 when loan not found', async () => {
      mockedPrisma.toolLoan.findUnique.mockResolvedValue(null)

      await expect(returnToolLoan(LOAN_ID, USER_ID)).rejects.toMatchObject({
        status: 404
      })
    })

    it('should throw 403 when loan belongs to a different user', async () => {
      mockedPrisma.toolLoan.findUnique.mockResolvedValue(
        makeToolLoan({ userId: 'other-user-id' })
      )

      await expect(returnToolLoan(LOAN_ID, USER_ID)).rejects.toMatchObject({
        status: 403
      })
    })

    it('should throw 400 when tool has already been returned', async () => {
      mockedPrisma.toolLoan.findUnique.mockResolvedValue(
        makeToolLoan({ userId: USER_ID, returnedAt: new Date() })
      )

      await expect(returnToolLoan(LOAN_ID, USER_ID)).rejects.toMatchObject({
        status: 400
      })
    })
  })
})
