import { z } from 'zod'
import {
  UserRole,
  CertificationType
} from '../../../generated/prisma/client.js'

export const updateUserSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be at most 100 characters')
    .optional(),
  role: z.enum(Object.values(UserRole) as [UserRole, ...UserRole[]]).optional(),
  isActive: z.boolean().optional()
})

export const createCertificationSchema = z
  .object({
    type: z.enum(
      Object.values(CertificationType) as [
        CertificationType,
        ...CertificationType[]
      ]
    ),
    issuedAt: z.coerce.date(),
    expiresAt: z.coerce.date()
  })
  .refine((data) => data.expiresAt > data.issuedAt, {
    message: 'Expiry date must be after issue date'
  })

export const userIdSchema = z.object({
  id: z.uuid('Invalid user ID')
})

export const certificationIdSchema = z.object({
  id: z.uuid('Invalid user ID'),
  certId: z.uuid('Invalid certification ID')
})

export const getUsersQuerySchema = z.object({
  role: z.enum(Object.values(UserRole) as [UserRole, ...UserRole[]]).optional(),
  isActive: z.coerce.boolean().optional(),
  limit: z.coerce.number().int().min(1).max(100).default(50),
  offset: z.coerce.number().int().min(0).default(0)
})

export type UpdateUserInput = z.infer<typeof updateUserSchema>
export type CreateCertificationInput = z.infer<typeof createCertificationSchema>
export type UserIdParam = z.infer<typeof userIdSchema>
export type CertificationIdParam = z.infer<typeof certificationIdSchema>
export type GetUsersQuery = z.infer<typeof getUsersQuerySchema>
