import { z } from 'zod'
import { NotificationType } from '../../../generated/prisma/client.js'

export const createNotificationSchema = z.object({
  userId: z.uuid('Invalid user ID'),
  type: z.enum(
    Object.values(NotificationType) as [NotificationType, ...NotificationType[]]
  ),
  title: z
    .string()
    .min(3, 'Title must be at least 3 characters')
    .max(200, 'Title must be at most 200 characters'),
  message: z.string().min(3, 'Message must be at least 3 characters')
})

export const createAnnouncementSchema = z.object({
  title: z
    .string()
    .min(3, 'Title must be at least 3 characters')
    .max(200, 'Title must be at most 200 characters'),
  message: z.string().min(3, 'Message must be at least 3 characters')
})

export const notificationIdSchema = z.object({
  id: z.uuid('Invalid notification ID')
})

export type CreateNotificationInput = z.infer<typeof createNotificationSchema>
export type CreateAnnouncementInput = z.infer<typeof createAnnouncementSchema>
export type NotificationIdParam = z.infer<typeof notificationIdSchema>
