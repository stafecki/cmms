import { describe, it, expect, vi, beforeEach } from 'vitest'
import {
  getNotifications,
  getUnreadCount,
  markAsRead,
  markAllAsRead,
  deleteNotification,
  createNotification,
  createAnnouncement,
  notifyManagers,
  getAllNotifications
} from '../notifications.service.js'
import prisma from '../../../lib/prisma.js'
import { NotificationType } from '../../../../generated/prisma/client.js'

vi.mock('../../../lib/prisma.js', () => ({
  default: {
    notification: {
      findMany: vi.fn(),
      findUnique: vi.fn(),
      count: vi.fn(),
      create: vi.fn(),
      createMany: vi.fn(),
      update: vi.fn(),
      updateMany: vi.fn(),
      delete: vi.fn()
    },
    user: {
      findUnique: vi.fn(),
      findMany: vi.fn()
    }
  }
}))

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mockedPrisma = vi.mocked(prisma) as any

const USER_ID = 'a0000000-0000-4000-8000-000000000099'
const OTHER_USER_ID = 'a0000000-0000-4000-8000-000000000088'
const NOTIFICATION_ID = 'a0000000-0000-4000-8000-000000000001'

const makeNotification = (overrides: Record<string, unknown> = {}) => ({
  id: NOTIFICATION_ID,
  userId: USER_ID,
  type: NotificationType.WORK_ORDER_ASSIGNED,
  title: 'Work order assigned',
  message: 'You have been assigned to work order #42',
  isRead: false,
  createdAt: new Date(),
  updatedAt: new Date(),
  ...overrides
})

const makeUser = (overrides: Record<string, unknown> = {}) => ({
  id: USER_ID,
  name: 'Test User',
  email: 'test@example.com',
  isActive: true,
  ...overrides
})

describe('Notifications Service', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  // ─── getNotifications ─────────────────────────────────────────────────────────

  describe('getNotifications', () => {
    it('should return notifications for the given user ordered by createdAt desc', async () => {
      const notifications = [
        makeNotification(),
        makeNotification({ id: 'n2', isRead: true })
      ]
      mockedPrisma.notification.findMany.mockResolvedValue(notifications)

      const result = await getNotifications(USER_ID)

      expect(result).toEqual(notifications)
      expect(mockedPrisma.notification.findMany).toHaveBeenCalledWith({
        where: { userId: USER_ID },
        orderBy: { createdAt: 'desc' }
      })
    })

    it('should return empty array when user has no notifications', async () => {
      mockedPrisma.notification.findMany.mockResolvedValue([])

      const result = await getNotifications(USER_ID)

      expect(result).toEqual([])
    })
  })

  // ─── getUnreadCount ───────────────────────────────────────────────────────────

  describe('getUnreadCount', () => {
    it('should return count of unread notifications for the given user', async () => {
      mockedPrisma.notification.count.mockResolvedValue(5)

      const result = await getUnreadCount(USER_ID)

      expect(result).toBe(5)
      expect(mockedPrisma.notification.count).toHaveBeenCalledWith({
        where: { userId: USER_ID, isRead: false }
      })
    })

    it('should return 0 when all notifications are read', async () => {
      mockedPrisma.notification.count.mockResolvedValue(0)

      const result = await getUnreadCount(USER_ID)

      expect(result).toBe(0)
    })
  })

  // ─── markAsRead ───────────────────────────────────────────────────────────────

  describe('markAsRead', () => {
    it('should mark notification as read and return updated notification', async () => {
      const notification = makeNotification()
      const updated = makeNotification({ isRead: true })
      mockedPrisma.notification.findUnique.mockResolvedValue(notification)
      mockedPrisma.notification.update.mockResolvedValue(updated)

      const result = await markAsRead(NOTIFICATION_ID, USER_ID)

      expect(result).toEqual(updated)
      expect(mockedPrisma.notification.update).toHaveBeenCalledWith({
        where: { id: NOTIFICATION_ID },
        data: { isRead: true }
      })
    })

    it('should throw 404 when notification does not exist', async () => {
      mockedPrisma.notification.findUnique.mockResolvedValue(null)

      await expect(markAsRead(NOTIFICATION_ID, USER_ID)).rejects.toMatchObject({
        status: 404
      })
      expect(mockedPrisma.notification.update).not.toHaveBeenCalled()
    })

    it('should throw 403 when notification belongs to another user', async () => {
      mockedPrisma.notification.findUnique.mockResolvedValue(
        makeNotification({ userId: OTHER_USER_ID })
      )

      await expect(markAsRead(NOTIFICATION_ID, USER_ID)).rejects.toMatchObject({
        status: 403
      })
      expect(mockedPrisma.notification.update).not.toHaveBeenCalled()
    })

    it('should look up notification by id', async () => {
      mockedPrisma.notification.findUnique.mockResolvedValue(makeNotification())
      mockedPrisma.notification.update.mockResolvedValue(
        makeNotification({ isRead: true })
      )

      await markAsRead(NOTIFICATION_ID, USER_ID)

      expect(mockedPrisma.notification.findUnique).toHaveBeenCalledWith({
        where: { id: NOTIFICATION_ID }
      })
    })
  })

  // ─── markAllAsRead ────────────────────────────────────────────────────────────

  describe('markAllAsRead', () => {
    it('should mark all unread notifications as read and return count', async () => {
      mockedPrisma.notification.updateMany.mockResolvedValue({ count: 7 })

      const result = await markAllAsRead(USER_ID)

      expect(result).toBe(7)
      expect(mockedPrisma.notification.updateMany).toHaveBeenCalledWith({
        where: { userId: USER_ID, isRead: false },
        data: { isRead: true }
      })
    })

    it('should return 0 when there are no unread notifications', async () => {
      mockedPrisma.notification.updateMany.mockResolvedValue({ count: 0 })

      const result = await markAllAsRead(USER_ID)

      expect(result).toBe(0)
    })
  })

  // ─── deleteNotification ───────────────────────────────────────────────────────

  describe('deleteNotification', () => {
    it('should delete notification when it belongs to the user', async () => {
      mockedPrisma.notification.findUnique.mockResolvedValue(makeNotification())
      mockedPrisma.notification.delete.mockResolvedValue(makeNotification())

      await deleteNotification(NOTIFICATION_ID, USER_ID)

      expect(mockedPrisma.notification.delete).toHaveBeenCalledWith({
        where: { id: NOTIFICATION_ID }
      })
    })

    it('should throw 404 when notification does not exist', async () => {
      mockedPrisma.notification.findUnique.mockResolvedValue(null)

      await expect(
        deleteNotification(NOTIFICATION_ID, USER_ID)
      ).rejects.toMatchObject({ status: 404 })
      expect(mockedPrisma.notification.delete).not.toHaveBeenCalled()
    })

    it('should throw 403 when notification belongs to another user', async () => {
      mockedPrisma.notification.findUnique.mockResolvedValue(
        makeNotification({ userId: OTHER_USER_ID })
      )

      await expect(
        deleteNotification(NOTIFICATION_ID, USER_ID)
      ).rejects.toMatchObject({ status: 403 })
      expect(mockedPrisma.notification.delete).not.toHaveBeenCalled()
    })

    it('should return void on success', async () => {
      mockedPrisma.notification.findUnique.mockResolvedValue(makeNotification())
      mockedPrisma.notification.delete.mockResolvedValue(makeNotification())

      const result = await deleteNotification(NOTIFICATION_ID, USER_ID)

      expect(result).toBeUndefined()
    })
  })

  // ─── createNotification ───────────────────────────────────────────────────────

  describe('createNotification', () => {
    const input = {
      userId: USER_ID,
      type: NotificationType.WORK_ORDER_ASSIGNED,
      title: 'Work order assigned',
      message: 'You have been assigned to work order #42'
    }

    it('should create and return notification', async () => {
      mockedPrisma.user.findUnique.mockResolvedValue(makeUser())
      const notification = makeNotification()
      mockedPrisma.notification.create.mockResolvedValue(notification)

      const result = await createNotification(input)

      expect(result).toEqual(notification)
      expect(mockedPrisma.notification.create).toHaveBeenCalledWith({
        data: {
          userId: input.userId,
          type: input.type,
          title: input.title,
          message: input.message
        }
      })
    })

    it('should throw 404 when target user does not exist', async () => {
      mockedPrisma.user.findUnique.mockResolvedValue(null)

      await expect(createNotification(input)).rejects.toMatchObject({
        status: 404
      })
      expect(mockedPrisma.notification.create).not.toHaveBeenCalled()
    })

    it('should look up user by userId before creating', async () => {
      mockedPrisma.user.findUnique.mockResolvedValue(makeUser())
      mockedPrisma.notification.create.mockResolvedValue(makeNotification())

      await createNotification(input)

      expect(mockedPrisma.user.findUnique).toHaveBeenCalledWith({
        where: { id: input.userId }
      })
    })
  })

  // ─── createAnnouncement ───────────────────────────────────────────────────────

  describe('createAnnouncement', () => {
    const input = {
      title: 'System maintenance',
      message: 'The system will be down tonight'
    }

    it('should create announcement for all active users and return count', async () => {
      const users = [{ id: USER_ID }, { id: OTHER_USER_ID }]
      mockedPrisma.user.findMany.mockResolvedValue(users as never)
      mockedPrisma.notification.createMany.mockResolvedValue({ count: 2 })

      const result = await createAnnouncement(input)

      expect(result).toBe(2)
      expect(mockedPrisma.notification.createMany).toHaveBeenCalledWith({
        data: users.map((user) => ({
          userId: user.id,
          type: NotificationType.ANNOUNCEMENT,
          title: input.title,
          message: input.message
        }))
      })
    })

    it('should only fetch active users', async () => {
      mockedPrisma.user.findMany.mockResolvedValue([])
      mockedPrisma.notification.createMany.mockResolvedValue({ count: 0 })

      await createAnnouncement(input)

      expect(mockedPrisma.user.findMany).toHaveBeenCalledWith({
        where: { isActive: true },
        select: { id: true }
      })
    })

    it('should return 0 when there are no active users', async () => {
      mockedPrisma.user.findMany.mockResolvedValue([])
      mockedPrisma.notification.createMany.mockResolvedValue({ count: 0 })

      const result = await createAnnouncement(input)

      expect(result).toBe(0)
    })

    it('should always use ANNOUNCEMENT type for all created notifications', async () => {
      const users = [{ id: USER_ID }]
      mockedPrisma.user.findMany.mockResolvedValue(users as never)
      mockedPrisma.notification.createMany.mockResolvedValue({ count: 1 })

      await createAnnouncement(input)

      const callData =
        mockedPrisma.notification.createMany.mock.calls[0][0].data
      expect(
        callData.every(
          (n: { type: string }) => n.type === NotificationType.ANNOUNCEMENT
        )
      ).toBe(true)
    })
  })

  // ─── notifyManagers ───────────────────────────────────────────────────────────

  describe('notifyManagers', () => {
    it('should send notification to all active admins and managers', async () => {
      const managers = [{ id: USER_ID }, { id: OTHER_USER_ID }]
      mockedPrisma.user.findMany.mockResolvedValue(managers as never)
      mockedPrisma.notification.createMany.mockResolvedValue({ count: 2 })

      await notifyManagers(
        NotificationType.CRITICAL_FAILURE,
        'Critical failure',
        'Machine A has failed'
      )

      expect(mockedPrisma.notification.createMany).toHaveBeenCalledWith({
        data: managers.map((m) => ({
          userId: m.id,
          type: NotificationType.CRITICAL_FAILURE,
          title: 'Critical failure',
          message: 'Machine A has failed'
        }))
      })
    })

    it('should only fetch active ADMIN and MANAGER users', async () => {
      mockedPrisma.user.findMany.mockResolvedValue([])
      mockedPrisma.notification.createMany.mockResolvedValue({ count: 0 })

      await notifyManagers(
        NotificationType.CRITICAL_FAILURE,
        'Title',
        'Message'
      )

      expect(mockedPrisma.user.findMany).toHaveBeenCalledWith({
        where: {
          isActive: true,
          role: { in: ['ADMIN', 'MANAGER'] }
        },
        select: { id: true }
      })
    })

    it('should do nothing when no managers are active', async () => {
      mockedPrisma.user.findMany.mockResolvedValue([])
      mockedPrisma.notification.createMany.mockResolvedValue({ count: 0 })

      await notifyManagers(
        NotificationType.CRITICAL_FAILURE,
        'Title',
        'Message'
      )

      expect(mockedPrisma.notification.createMany).toHaveBeenCalledWith({
        data: []
      })
    })

    it('should return void', async () => {
      mockedPrisma.user.findMany.mockResolvedValue([{ id: USER_ID }] as never)
      mockedPrisma.notification.createMany.mockResolvedValue({ count: 1 })

      const result = await notifyManagers(
        NotificationType.PREVENTIVE_DUE,
        'Preventive maintenance due',
        'Machine B requires service'
      )

      expect(result).toBeUndefined()
    })
  })

  // ─── getAllNotifications ──────────────────────────────────────────────────────

  describe('getAllNotifications', () => {
    it('should return all notifications with user data ordered by createdAt desc', async () => {
      const notifications = [
        makeNotification({
          user: {
            id: USER_ID,
            name: 'Admin',
            email: 'admin@example.com'
          }
        })
      ]
      mockedPrisma.notification.findMany.mockResolvedValue(notifications)

      const result = await getAllNotifications()

      expect(result).toEqual(notifications)
      expect(mockedPrisma.notification.findMany).toHaveBeenCalledWith({
        include: {
          user: { select: { id: true, name: true, email: true } }
        },
        orderBy: { createdAt: 'desc' },
        take: 100
      })
    })

    it('should limit results to 100', async () => {
      mockedPrisma.notification.findMany.mockResolvedValue([])

      await getAllNotifications()

      expect(mockedPrisma.notification.findMany).toHaveBeenCalledWith(
        expect.objectContaining({ take: 100 })
      )
    })

    it('should return empty array when no notifications exist', async () => {
      mockedPrisma.notification.findMany.mockResolvedValue([])

      const result = await getAllNotifications()

      expect(result).toEqual([])
    })
  })
})
