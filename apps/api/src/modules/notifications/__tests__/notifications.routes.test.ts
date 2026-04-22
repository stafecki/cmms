import { describe, it, expect, vi, beforeAll, beforeEach } from 'vitest'
import { Hono } from 'hono'
import { testClient } from 'hono/testing'
import { HTTPException } from 'hono/http-exception'
import notifications from '../notifications.routes.js'
import * as notificationsService from '../notifications.service.js'
import {
  NotificationType,
  UserRole
} from '../../../../generated/prisma/client.js'
import { authMiddleware } from '../../../middleware/auth.middleware.js'
import { requireRoles } from '../../../middleware/roles.middleware.js'

const { rolesMiddleware } = vi.hoisted(() => ({
  rolesMiddleware: vi.fn(async (_c: unknown, next: () => Promise<void>) => {
    await next()
  })
}))

vi.mock('../notifications.service.js', () => ({
  getNotifications: vi.fn(),
  getUnreadCount: vi.fn(),
  markAsRead: vi.fn(),
  markAllAsRead: vi.fn(),
  deleteNotification: vi.fn(),
  createNotification: vi.fn(),
  createAnnouncement: vi.fn(),
  getAllNotifications: vi.fn()
}))

vi.mock('../../../middleware/auth.middleware.js', () => ({
  authMiddleware: vi.fn(async (c, next) => {
    c.set('user', {
      sub: USER_ID,
      role: UserRole.ADMIN,
      email: 'admin@example.com',
      jti: 'jti-123',
      exp: Math.floor(Date.now() / 1000) + 3600
    })
    await next()
  })
}))

vi.mock('../../../middleware/roles.middleware.js', () => ({
  requireRoles: vi.fn((..._roles: string[]) => rolesMiddleware)
}))

vi.mock('../../../lib/redis.js', () => ({
  default: { get: vi.fn(), set: vi.fn() }
}))

const USER_ID = 'a0000000-0000-4000-8000-000000000099'
const NOTIFICATION_ID = 'a0000000-0000-4000-8000-000000000001'

const mockedService = vi.mocked(notificationsService)

const makeNotification = (overrides = {}) => ({
  id: NOTIFICATION_ID,
  userId: USER_ID,
  type: NotificationType.WORK_ORDER_ASSIGNED,
  title: 'Test notification',
  message: 'This is a test message',
  isRead: false,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  ...overrides
})

type AppEnv = {
  Variables: {
    user: {
      sub: string
      role: string
      email: string
      jti: string
      exp: number
    }
  }
}

const app = new Hono<AppEnv>()
app.route('/notifications', notifications)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const client = testClient(app) as any

describe('Notifications Routes', () => {
  let initialRequireRolesCalls: unknown[][]

  beforeAll(() => {
    initialRequireRolesCalls = vi
      .mocked(requireRoles)
      .mock.calls.map((call) => [...call])
  })

  beforeEach(() => {
    vi.clearAllMocks()
    rolesMiddleware.mockImplementation(
      async (_c: unknown, next: () => Promise<void>) => {
        await next()
      }
    )
  })

  // ─── GET / ────────────────────────────────────────────────────────────────────

  describe('GET /', () => {
    it('should return 200 with list of notifications for current user', async () => {
      mockedService.getNotifications.mockResolvedValue([
        makeNotification()
      ] as never)

      const res = await client.notifications.$get({})
      const body = await res.json()

      expect(res.status).toBe(200)
      expect(Array.isArray(body)).toBe(true)
      expect(mockedService.getNotifications).toHaveBeenCalledWith(USER_ID)
    })

    it('should return empty array when user has no notifications', async () => {
      mockedService.getNotifications.mockResolvedValue([] as never)

      const res = await client.notifications.$get({})
      const body = await res.json()

      expect(res.status).toBe(200)
      expect(body).toEqual([])
    })

    it('should return 401 when auth middleware rejects', async () => {
      vi.mocked(authMiddleware).mockImplementationOnce(async (_c, _next) => {
        throw new HTTPException(401, { message: 'Unauthorized' })
      })

      const res = await client.notifications.$get({})

      expect(res.status).toBe(401)
      expect(mockedService.getNotifications).not.toHaveBeenCalled()
    })

    it('should return 500 when service throws unexpected error', async () => {
      mockedService.getNotifications.mockRejectedValue(
        new Error('Database connection failed')
      )

      const res = await client.notifications.$get({})

      expect(res.status).toBe(500)
    })
  })

  // ─── GET /unread-count ────────────────────────────────────────────────────────

  describe('GET /unread-count', () => {
    it('should return 200 with unread count for current user', async () => {
      mockedService.getUnreadCount.mockResolvedValue(3)

      const res = await client.notifications['unread-count'].$get({})
      const body = await res.json()

      expect(res.status).toBe(200)
      expect(body).toEqual({ count: 3 })
      expect(mockedService.getUnreadCount).toHaveBeenCalledWith(USER_ID)
    })

    it('should return 0 when all notifications are read', async () => {
      mockedService.getUnreadCount.mockResolvedValue(0)

      const res = await client.notifications['unread-count'].$get({})
      const body = await res.json()

      expect(res.status).toBe(200)
      expect(body).toEqual({ count: 0 })
    })

    it('should return 401 when auth middleware rejects', async () => {
      vi.mocked(authMiddleware).mockImplementationOnce(async (_c, _next) => {
        throw new HTTPException(401, { message: 'Unauthorized' })
      })

      const res = await client.notifications['unread-count'].$get({})

      expect(res.status).toBe(401)
      expect(mockedService.getUnreadCount).not.toHaveBeenCalled()
    })
  })

  // ─── GET /all ─────────────────────────────────────────────────────────────────

  describe('GET /all', () => {
    it('should return 200 with all notifications including user data', async () => {
      mockedService.getAllNotifications.mockResolvedValue([
        makeNotification({
          user: { id: USER_ID, name: 'Admin', email: 'admin@example.com' }
        }) as never
      ])

      const res = await client.notifications.all.$get({})

      expect(res.status).toBe(200)
      expect(mockedService.getAllNotifications).toHaveBeenCalledOnce()
    })

    it('should return 403 when user lacks ADMIN role', async () => {
      rolesMiddleware.mockImplementationOnce(
        async (_c: unknown, _next: () => Promise<void>) => {
          throw new HTTPException(403, { message: 'Insufficient permissions' })
        }
      )

      const res = await client.notifications.all.$get({})

      expect(res.status).toBe(403)
      expect(mockedService.getAllNotifications).not.toHaveBeenCalled()
    })

    it('should require ADMIN role', () => {
      expect(initialRequireRolesCalls).toContainEqual([UserRole.ADMIN])
    })
  })

  // ─── PATCH /:id/read ──────────────────────────────────────────────────────────

  describe('PATCH /:id/read', () => {
    it('should return 200 with updated notification', async () => {
      mockedService.markAsRead.mockResolvedValue(
        makeNotification({ isRead: true }) as never
      )

      const res = await client.notifications[':id'].read.$patch({
        param: { id: NOTIFICATION_ID }
      })

      expect(res.status).toBe(200)
      expect(mockedService.markAsRead).toHaveBeenCalledWith(
        NOTIFICATION_ID,
        USER_ID
      )
    })

    it('should return 400 when id is not a valid UUID', async () => {
      const res = await client.notifications[':id'].read.$patch({
        param: { id: 'bad-id' }
      })

      expect(res.status).toBe(400)
      expect(mockedService.markAsRead).not.toHaveBeenCalled()
    })

    it('should return 404 when notification does not exist', async () => {
      mockedService.markAsRead.mockRejectedValue(
        new HTTPException(404, { message: 'Notification not found' })
      )

      const res = await client.notifications[':id'].read.$patch({
        param: { id: NOTIFICATION_ID }
      })

      expect(res.status).toBe(404)
    })

    it('should return 403 when notification belongs to another user', async () => {
      mockedService.markAsRead.mockRejectedValue(
        new HTTPException(403, { message: 'Access denied' })
      )

      const res = await client.notifications[':id'].read.$patch({
        param: { id: NOTIFICATION_ID }
      })

      expect(res.status).toBe(403)
    })

    it('should return 401 when auth middleware rejects', async () => {
      vi.mocked(authMiddleware).mockImplementationOnce(async (_c, _next) => {
        throw new HTTPException(401, { message: 'Unauthorized' })
      })

      const res = await client.notifications[':id'].read.$patch({
        param: { id: NOTIFICATION_ID }
      })

      expect(res.status).toBe(401)
      expect(mockedService.markAsRead).not.toHaveBeenCalled()
    })
  })

  // ─── PATCH /read-all ──────────────────────────────────────────────────────────

  describe('PATCH /read-all', () => {
    it('should return 200 with count of marked notifications', async () => {
      mockedService.markAllAsRead.mockResolvedValue(5)

      const res = await client.notifications['read-all'].$patch({})
      const body = await res.json()

      expect(res.status).toBe(200)
      expect(body).toEqual({ message: 'Marked 5 notifications as read' })
      expect(mockedService.markAllAsRead).toHaveBeenCalledWith(USER_ID)
    })

    it('should return 200 with 0 when no unread notifications exist', async () => {
      mockedService.markAllAsRead.mockResolvedValue(0)

      const res = await client.notifications['read-all'].$patch({})
      const body = await res.json()

      expect(res.status).toBe(200)
      expect(body).toEqual({ message: 'Marked 0 notifications as read' })
    })

    it('should return 401 when auth middleware rejects', async () => {
      vi.mocked(authMiddleware).mockImplementationOnce(async (_c, _next) => {
        throw new HTTPException(401, { message: 'Unauthorized' })
      })

      const res = await client.notifications['read-all'].$patch({})

      expect(res.status).toBe(401)
      expect(mockedService.markAllAsRead).not.toHaveBeenCalled()
    })
  })

  // ─── DELETE /:id ──────────────────────────────────────────────────────────────

  describe('DELETE /:id', () => {
    it('should return 200 on successful delete', async () => {
      mockedService.deleteNotification.mockResolvedValue(undefined)

      const res = await client.notifications[':id'].$delete({
        param: { id: NOTIFICATION_ID }
      })
      const body = await res.json()

      expect(res.status).toBe(200)
      expect(body).toEqual({ message: 'Notification deleted successfully' })
      expect(mockedService.deleteNotification).toHaveBeenCalledWith(
        NOTIFICATION_ID,
        USER_ID
      )
    })

    it('should return 400 when id is not a valid UUID', async () => {
      const res = await client.notifications[':id'].$delete({
        param: { id: 'bad-id' }
      })

      expect(res.status).toBe(400)
      expect(mockedService.deleteNotification).not.toHaveBeenCalled()
    })

    it('should return 404 when notification does not exist', async () => {
      mockedService.deleteNotification.mockRejectedValue(
        new HTTPException(404, { message: 'Notification not found' })
      )

      const res = await client.notifications[':id'].$delete({
        param: { id: NOTIFICATION_ID }
      })

      expect(res.status).toBe(404)
    })

    it('should return 403 when notification belongs to another user', async () => {
      mockedService.deleteNotification.mockRejectedValue(
        new HTTPException(403, { message: 'Access denied' })
      )

      const res = await client.notifications[':id'].$delete({
        param: { id: NOTIFICATION_ID }
      })

      expect(res.status).toBe(403)
    })

    it('should return 401 when auth middleware rejects', async () => {
      vi.mocked(authMiddleware).mockImplementationOnce(async (_c, _next) => {
        throw new HTTPException(401, { message: 'Unauthorized' })
      })

      const res = await client.notifications[':id'].$delete({
        param: { id: NOTIFICATION_ID }
      })

      expect(res.status).toBe(401)
      expect(mockedService.deleteNotification).not.toHaveBeenCalled()
    })
  })

  // ─── POST / ───────────────────────────────────────────────────────────────────

  describe('POST /', () => {
    const validBody = {
      userId: USER_ID,
      type: NotificationType.WORK_ORDER_ASSIGNED,
      title: 'Test notification',
      message: 'This is a test message'
    }

    it('should return 201 with created notification', async () => {
      mockedService.createNotification.mockResolvedValue(
        makeNotification() as never
      )

      const res = await client.notifications.$post({ json: validBody })

      expect(res.status).toBe(201)
      expect(mockedService.createNotification).toHaveBeenCalledWith(validBody)
    })

    it('should return 400 when userId is not a valid UUID', async () => {
      const res = await client.notifications.$post({
        json: { ...validBody, userId: 'not-a-uuid' }
      })

      expect(res.status).toBe(400)
      expect(mockedService.createNotification).not.toHaveBeenCalled()
    })

    it('should return 400 when type is invalid', async () => {
      const res = await client.notifications.$post({
        json: { ...validBody, type: 'INVALID' as NotificationType }
      })

      expect(res.status).toBe(400)
      expect(mockedService.createNotification).not.toHaveBeenCalled()
    })

    it('should return 400 when title is shorter than 3 characters', async () => {
      const res = await client.notifications.$post({
        json: { ...validBody, title: 'AB' }
      })

      expect(res.status).toBe(400)
      expect(mockedService.createNotification).not.toHaveBeenCalled()
    })

    it('should return 400 when title exceeds 200 characters', async () => {
      const res = await client.notifications.$post({
        json: { ...validBody, title: 'A'.repeat(201) }
      })

      expect(res.status).toBe(400)
      expect(mockedService.createNotification).not.toHaveBeenCalled()
    })

    it('should return 400 when message is shorter than 3 characters', async () => {
      const res = await client.notifications.$post({
        json: { ...validBody, message: 'AB' }
      })

      expect(res.status).toBe(400)
      expect(mockedService.createNotification).not.toHaveBeenCalled()
    })

    it('should return 400 when required fields are missing', async () => {
      const res = await client.notifications.$post({
        json: { type: NotificationType.WORK_ORDER_ASSIGNED } as typeof validBody
      })

      expect(res.status).toBe(400)
      expect(mockedService.createNotification).not.toHaveBeenCalled()
    })

    it('should return 403 when user lacks required role', async () => {
      rolesMiddleware.mockImplementationOnce(
        async (_c: unknown, _next: () => Promise<void>) => {
          throw new HTTPException(403, { message: 'Insufficient permissions' })
        }
      )

      const res = await client.notifications.$post({ json: validBody })

      expect(res.status).toBe(403)
      expect(mockedService.createNotification).not.toHaveBeenCalled()
    })

    it('should return 404 when target user does not exist', async () => {
      mockedService.createNotification.mockRejectedValue(
        new HTTPException(404, { message: 'User not found' })
      )

      const res = await client.notifications.$post({ json: validBody })

      expect(res.status).toBe(404)
    })

    it('should require ADMIN or MANAGER role', () => {
      expect(initialRequireRolesCalls).toContainEqual([
        UserRole.ADMIN,
        UserRole.MANAGER
      ])
    })
  })

  // ─── POST /announcement ───────────────────────────────────────────────────────

  describe('POST /announcement', () => {
    const validBody = {
      title: 'System maintenance',
      message: 'The system will be down for maintenance tonight'
    }

    it('should return 201 with count of notified users', async () => {
      mockedService.createAnnouncement.mockResolvedValue(42)

      const res = await client.notifications.announcement.$post({
        json: validBody
      })
      const body = await res.json()

      expect(res.status).toBe(201)
      expect(body).toEqual({ message: 'Announcement sent to 42 users' })
      expect(mockedService.createAnnouncement).toHaveBeenCalledWith(validBody)
    })

    it('should return 400 when title is shorter than 3 characters', async () => {
      const res = await client.notifications.announcement.$post({
        json: { ...validBody, title: 'AB' }
      })

      expect(res.status).toBe(400)
      expect(mockedService.createAnnouncement).not.toHaveBeenCalled()
    })

    it('should return 400 when title exceeds 200 characters', async () => {
      const res = await client.notifications.announcement.$post({
        json: { ...validBody, title: 'A'.repeat(201) }
      })

      expect(res.status).toBe(400)
      expect(mockedService.createAnnouncement).not.toHaveBeenCalled()
    })

    it('should return 400 when message is shorter than 3 characters', async () => {
      const res = await client.notifications.announcement.$post({
        json: { ...validBody, message: 'Hi' }
      })

      expect(res.status).toBe(400)
      expect(mockedService.createAnnouncement).not.toHaveBeenCalled()
    })

    it('should return 400 when required fields are missing', async () => {
      const res = await client.notifications.announcement.$post({
        json: { title: 'Only title' } as typeof validBody
      })

      expect(res.status).toBe(400)
      expect(mockedService.createAnnouncement).not.toHaveBeenCalled()
    })

    it('should return 403 when user lacks ADMIN role', async () => {
      rolesMiddleware.mockImplementationOnce(
        async (_c: unknown, _next: () => Promise<void>) => {
          throw new HTTPException(403, { message: 'Insufficient permissions' })
        }
      )

      const res = await client.notifications.announcement.$post({
        json: validBody
      })

      expect(res.status).toBe(403)
      expect(mockedService.createAnnouncement).not.toHaveBeenCalled()
    })

    it('should require ADMIN role', () => {
      expect(initialRequireRolesCalls).toContainEqual([UserRole.ADMIN])
    })
  })
})
