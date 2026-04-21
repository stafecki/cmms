import { HTTPException } from 'hono/http-exception'
import prisma from '../../lib/prisma.js'
import { Prisma } from '../../../generated/prisma/client.js'
import type {
  Part,
  PartCategory,
  ToolLoan
} from '../../../generated/prisma/client.js'
import type {
  CreatePartCategoryInput,
  CreatePartInput,
  UpdatePartInput,
  AdjustStockInput,
  CreateToolLoanInput
} from './inventory.schema.js'

type PartWithCategory = Prisma.PartGetPayload<{
  include: { category: true }
}>

type ToolLoanWithRelations = Prisma.ToolLoanGetPayload<{
  include: {
    part: true
    user: { select: { id: true; name: true; email: true } }
    workOrder: { select: { id: true; title: true } }
  }
}>

export const getCategories = async (): Promise<PartCategory[]> => {
  return prisma.partCategory.findMany({
    orderBy: { name: 'asc' }
  })
}

export const createCategory = async (
  input: CreatePartCategoryInput
): Promise<PartCategory> => {
  const existing = await prisma.partCategory.findUnique({
    where: { name: input.name }
  })

  if (existing) {
    throw new HTTPException(409, {
      message: 'Category with this name already exists'
    })
  }

  return prisma.partCategory.create({
    data: { name: input.name }
  })
}

export const deleteCategory = async (id: string): Promise<void> => {
  const category = await prisma.partCategory.findUnique({
    where: { id }
  })

  if (!category) {
    throw new HTTPException(404, { message: 'Category not found' })
  }

  const activeParts = await prisma.part.count({
    where: { categoryId: id, isActive: true }
  })

  if (activeParts > 0) {
    throw new HTTPException(400, {
      message: 'Cannot delete category with assigned parts'
    })
  }

  const inactiveParts = await prisma.part.findMany({
    where: { categoryId: id, isActive: false },
    select: { id: true }
  })

  const partIds = inactiveParts.map((p) => p.id)

  if (partIds.length > 0) {
    await prisma.toolLoan.deleteMany({ where: { partId: { in: partIds } } })
    await prisma.workOrderPart.deleteMany({
      where: { partId: { in: partIds } }
    })
    await prisma.part.deleteMany({ where: { id: { in: partIds } } })
  }

  await prisma.partCategory.delete({ where: { id } })
}

export const getParts = async (
  categoryId?: string
): Promise<PartWithCategory[]> => {
  return prisma.part.findMany({
    where: {
      isActive: true,
      ...(categoryId ? { categoryId } : {})
    },
    include: { category: true },
    orderBy: { name: 'asc' }
  })
}

export const getPartById = async (id: string): Promise<PartWithCategory> => {
  const part = await prisma.part.findUnique({
    where: { id },
    include: { category: true }
  })

  if (!part) {
    throw new HTTPException(404, { message: 'Part not found' })
  }

  return part
}

export const createPart = async (input: CreatePartInput): Promise<Part> => {
  const category = await prisma.partCategory.findUnique({
    where: { id: input.categoryId }
  })

  if (!category) {
    throw new HTTPException(404, { message: 'Category not found' })
  }

  return prisma.part.create({
    data: {
      categoryId: input.categoryId,
      name: input.name,
      stockQuantity: input.stockQuantity,
      reorderPoint: input.reorderPoint,
      unitPrice: input.unitPrice
    }
  })
}

export const updatePart = async (
  id: string,
  input: UpdatePartInput
): Promise<Part> => {
  const part = await prisma.part.findUnique({ where: { id } })

  if (!part) {
    throw new HTTPException(404, { message: 'Part not found' })
  }

  if (input.categoryId) {
    const category = await prisma.partCategory.findUnique({
      where: { id: input.categoryId }
    })
    if (!category) {
      throw new HTTPException(404, { message: 'Category not found' })
    }
  }

  return prisma.part.update({
    where: { id },
    data: {
      ...input,
      unitPrice:
        input.unitPrice !== undefined
          ? new Prisma.Decimal(input.unitPrice)
          : undefined
    }
  })
}

export const deletePart = async (id: string): Promise<void> => {
  const part = await prisma.part.findUnique({ where: { id } })

  if (!part) {
    throw new HTTPException(404, { message: 'Part not found' })
  }

  await prisma.part.update({
    where: { id },
    data: { isActive: false }
  })
}

export const adjustStock = async (
  id: string,
  input: AdjustStockInput
): Promise<Part> => {
  const part = await prisma.part.findUnique({ where: { id } })

  if (!part) {
    throw new HTTPException(404, { message: 'Part not found' })
  }

  const newQuantity = part.stockQuantity + input.quantity

  if (newQuantity < 0) {
    throw new HTTPException(400, {
      message: `Insufficient stock. Available: ${part.stockQuantity}`
    })
  }

  const updatedPart = await prisma.part.update({
    where: { id },
    data: { stockQuantity: newQuantity }
  })

  if (updatedPart.stockQuantity <= updatedPart.reorderPoint) {
    await prisma.notification.create({
      data: {
        userId: (await prisma.user.findFirst({
          where: { role: 'MANAGER' },
          select: { id: true }
        }))!.id,
        type: 'REORDER_ALERT',
        title: 'Low stock alert',
        message: `Part "${updatedPart.name}" is below reorder point. Current stock: ${updatedPart.stockQuantity}`
      }
    })
  }

  return updatedPart
}

export const getLowStockParts = async (): Promise<PartWithCategory[]> => {
  return prisma.part.findMany({
    where: {
      isActive: true,
      stockQuantity: { lte: prisma.part.fields.reorderPoint }
    },
    include: { category: true },
    orderBy: { stockQuantity: 'asc' }
  })
}

export const getToolLoans = async (
  userId?: string
): Promise<ToolLoanWithRelations[]> => {
  return prisma.toolLoan.findMany({
    where: {
      returnedAt: null,
      ...(userId ? { userId } : {})
    },
    include: {
      part: true,
      user: { select: { id: true, name: true, email: true } },
      workOrder: { select: { id: true, title: true } }
    },
    orderBy: { loanedAt: 'desc' }
  })
}

export const createToolLoan = async (
  input: CreateToolLoanInput,
  userId: string
): Promise<ToolLoan> => {
  const part = await prisma.part.findUnique({ where: { id: input.partId } })

  if (!part) {
    throw new HTTPException(404, { message: 'Part not found' })
  }

  if (part.stockQuantity < 1) {
    throw new HTTPException(400, { message: 'Part is out of stock' })
  }

  const existingLoan = await prisma.toolLoan.findFirst({
    where: { partId: input.partId, userId, returnedAt: null }
  })

  if (existingLoan) {
    throw new HTTPException(400, {
      message: 'You already have this tool on loan'
    })
  }

  const loan = await prisma.toolLoan.create({
    data: {
      partId: input.partId,
      userId,
      workOrderId: input.workOrderId
    }
  })

  await prisma.part.update({
    where: { id: input.partId },
    data: { stockQuantity: { decrement: 1 } }
  })

  return loan
}

export const returnToolLoan = async (
  loanId: string,
  userId: string
): Promise<ToolLoan> => {
  const loan = await prisma.toolLoan.findUnique({
    where: { id: loanId }
  })

  if (!loan) {
    throw new HTTPException(404, { message: 'Loan not found' })
  }

  if (loan.userId !== userId) {
    throw new HTTPException(403, {
      message: 'You can only return your own loans'
    })
  }

  if (loan.returnedAt) {
    throw new HTTPException(400, { message: 'Tool already returned' })
  }

  const returnedLoan = await prisma.toolLoan.update({
    where: { id: loanId },
    data: { returnedAt: new Date() }
  })

  await prisma.part.update({
    where: { id: loan.partId },
    data: { stockQuantity: { increment: 1 } }
  })

  return returnedLoan
}
