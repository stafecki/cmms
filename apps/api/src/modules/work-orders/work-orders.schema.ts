import { z } from "zod"
import { WorkOrderStatus, Priority } from "../../../generated/prisma/client.js"

export const createWorkOrderSchema = z.object({
    machineId: z.uuid("Invalid machine ID"),
    title: z
        .string()
        .min(3, "Title must be at least 3 characters")
        .max(200, "Title must be at most 200 characters"),
    description: z
        .string()
        .min(10, "Description must be at least 10 characters"),
    priority: z
        .enum(Object.values(Priority) as [Priority, ...Priority[]])
        .default(Priority.MEDIUM)
})

export const updateWorkOrderSchema = z.object({
    title: z
        .string()
        .min(3, "Title must be at least 3 characters")
        .max(200, "Title must be at most 200 characters")
        .optional(),
    description: z.string().min(10, "Description must be at least 10 characters").optional(),
    priority: z
        .enum(Object.values(Priority) as [Priority, ...Priority[]])
        .optional()
})

export const updateStatusSchema = z.object({
    status: z.enum(Object.values(WorkOrderStatus) as [WorkOrderStatus, ...WorkOrderStatus[]])
})

export const assignTechnicianSchema = z.object({
    technicianId: z.uuid("Invalid technician ID")
})

export const addMessageSchema = z.object({
    content: z
        .string()
        .min(1, "Message cannot be empty")
        .max(2000, "Message must be at most 2000 characters")
})

export const addPartSchema = z.object({
    partId: z.uuid("Invalid part ID"),
    quantity: z.number().int().min(1, "Quantity must be at least 1")
})

export const workOrderIdSchema = z.object({
    id: z.uuid("Invalid work order ID")
})

export type CreateWorkOrderInput = z.infer<typeof createWorkOrderSchema>
export type UpdateWorkOrderInput = z.infer<typeof updateWorkOrderSchema>
export type UpdateStatusInput = z.infer<typeof updateStatusSchema>
export type AssignTechnicianInput = z.infer<typeof assignTechnicianSchema>
export type AddMessageInput = z.infer<typeof addMessageSchema>
export type AddPartInput = z.infer<typeof addPartSchema>
export type WorkOrderIdParam = z.infer<typeof workOrderIdSchema>
