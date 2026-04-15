import { z } from 'zod'

const basePreventivePlanSchema = z.object({
    machineId: z.uuid('Invalid machine ID'),
    name: z
        .string()
        .min(3, 'Name must be at least 3 characters')
        .max(200, 'Name must be at most 200 characters'),
    intervalHours: z.number().int().min(1, 'Interval hours must be at least 1').optional(),
    intervalDays: z.number().int().min(1, 'Interval days must be at least 1').optional(),
    advanceDays: z.number().int().min(1, 'Advance days must be at least 1').default(7),
    checklist: z
        .array(
            z.object({
                step: z.number().int().min(1),
                label: z.string().min(3, 'Step label must be at least 3 characters')
            })
        )
        .min(1, 'Checklist must have at least one step')
})

export const createPreventivePlanSchema = basePreventivePlanSchema.refine(
    (data) => data.intervalHours !== undefined || data.intervalDays !== undefined,
    { message: 'Either intervalHours or intervalDays must be provided' }
)

export const updatePreventivePlanSchema = basePreventivePlanSchema.partial()

export const preventivePlanIdSchema = z.object({
    id: z.uuid('Invalid preventive plan ID')
})

export type CreatePreventivePlanInput = z.infer<typeof createPreventivePlanSchema>
export type UpdatePreventivePlanInput = z.infer<typeof updatePreventivePlanSchema>
export type PreventivePlanIdParam = z.infer<typeof preventivePlanIdSchema>
