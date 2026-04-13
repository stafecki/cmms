import { z } from "zod"

export const createMachineSchema = z.object({
    name: z
        .string()
        .min(2, "Name must be at least 2 characters")
        .max(100, "Name must be at most 100 characters"),
    serialNumber: z
        .string()
        .min(1, "Serial number is required")
        .max(100, "Serial number must be at most 100 characters"),
    locationId: z.uuid("Invalid location ID"),
    operatingHours: z.number().min(0, "Operating hours must be a positive number").default(0),
    purchaseDate: z.coerce.date(),
    purchasePrice: z
        .number()
        .min(0, "Purchase price must be a positive number")
        .multipleOf(0.01, "Purchase price must have at most 2 decimal places")
})

export const updateMachineSchema = createMachineSchema.partial()

export const updateOperatingHoursSchema = z.object({
    operatingHours: z.number().min(0, "Operating hours must be a positive number")
})

export const machineIdSchema = z.object({
    id: z.uuid("Invalid machine ID")
})

export type CreateMachineInput = z.infer<typeof createMachineSchema>
export type UpdateMachineInput = z.infer<typeof updateMachineSchema>
export type UpdateOperatingHoursInput = z.infer<typeof updateOperatingHoursSchema>
export type MachineIdParam = z.infer<typeof machineIdSchema>
