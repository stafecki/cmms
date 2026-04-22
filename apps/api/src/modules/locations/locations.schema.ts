import { z } from 'zod'
import { LocationType } from '../../../generated/prisma/client.js'

export const createLocationSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be at most 100 characters'),
  type: z.enum(
    Object.values(LocationType) as [LocationType, ...LocationType[]]
  ),
  parentId: z.uuid('Invalid parent location ID').optional()
})

export const updateLocationSchema = createLocationSchema.partial()

export const locationIdSchema = z.object({
  id: z.uuid('Invalid location ID')
})

export type CreateLocationInput = z.infer<typeof createLocationSchema>
export type UpdateLocationInput = z.infer<typeof updateLocationSchema>
export type LocationIdParam = z.infer<typeof locationIdSchema>
