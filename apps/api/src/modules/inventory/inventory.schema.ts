import { z } from "zod"

export const createPartCategorySchema = z.object({
    name: z
        .string()
        .min(2, "Name must be at least 2 characters")
        .max(100, "Name must be at most 100 characters")
})

export const createPartSchema = z.object({
    categoryId: z.uuid("Invalid category ID"),
    name: z
        .string()
        .min(2, "Name must be at least 2 characters")
        .max(200, "Name must be at most 200 characters"),
    stockQuantity: z.number().int().min(0, "Stock quantity must be a positive number").default(0),
    reorderPoint: z.number().int().min(0, "Reorder point must be a positive number").default(5),
    unitPrice: z
        .number()
        .min(0, "Unit price must be a positive number")
        .multipleOf(0.01, "Unit price must have at most 2 decimal places")
})

export const updatePartSchema = createPartSchema.partial()

export const adjustStockSchema = z.object({
    quantity: z.number().int(),
    reason: z.string().min(3, "Reason must be at least 3 characters")
})

export const createToolLoanSchema = z.object({
    partId: z.uuid("Invalid part ID"),
    workOrderId: z.uuid("Invalid work order ID").optional()
})

export const returnToolSchema = z.object({
    loanId: z.uuid("Invalid loan ID")
})

export const partIdSchema = z.object({
    id: z.uuid("Invalid part ID")
})

export const categoryIdSchema = z.object({
    id: z.uuid("Invalid category ID")
})

export type CreatePartCategoryInput = z.infer<typeof createPartCategorySchema>
export type CreatePartInput = z.infer<typeof createPartSchema>
export type UpdatePartInput = z.infer<typeof updatePartSchema>
export type AdjustStockInput = z.infer<typeof adjustStockSchema>
export type CreateToolLoanInput = z.infer<typeof createToolLoanSchema>
export type ReturnToolInput = z.infer<typeof returnToolSchema>
export type PartIdParam = z.infer<typeof partIdSchema>
export type CategoryIdParam = z.infer<typeof categoryIdSchema>
