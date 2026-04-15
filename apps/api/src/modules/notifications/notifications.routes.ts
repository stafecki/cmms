import { Hono } from "hono"
import { zValidator } from "@hono/zod-validator"
import { authMiddleware, type AuthVariables } from "../../middleware/auth.middleware.js"
import { requireRoles } from "../../middleware/roles.middleware.js"
import { UserRole } from "../../../generated/prisma/client.js"
import {
    createNotificationSchema,
    createAnnouncementSchema,
    notificationIdSchema
} from "./notifications.schema.js"
import {
    getNotifications,
    getUnreadCount,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    createNotification,
    createAnnouncement,
    getAllNotifications
} from "./notifications.service.js"

const notifications = new Hono<{ Variables: AuthVariables["Variables"] }>()

notifications.use("/*", authMiddleware)

notifications.get("/", async (c) => {
    const user = c.get("user")
    const result = await getNotifications(user.sub)
    return c.json(result, 200)
})

notifications.get("/unread-count", async (c) => {
    const user = c.get("user")
    const count = await getUnreadCount(user.sub)
    return c.json({ count }, 200)
})

notifications.get(
    "/all",
    requireRoles(UserRole.ADMIN),
    async (c) => {
        const result = await getAllNotifications()
        return c.json(result, 200)
    }
)

notifications.patch(
    "/:id/read",
    zValidator("param", notificationIdSchema),
    async (c) => {
        const { id } = c.req.valid("param")
        const user = c.get("user")
        const result = await markAsRead(id, user.sub)
        return c.json(result, 200)
    }
)

notifications.patch("/read-all", async (c) => {
    const user = c.get("user")
    const count = await markAllAsRead(user.sub)
    return c.json({ message: `Marked ${count} notifications as read` }, 200)
})

notifications.delete(
    "/:id",
    zValidator("param", notificationIdSchema),
    async (c) => {
        const { id } = c.req.valid("param")
        const user = c.get("user")
        await deleteNotification(id, user.sub)
        return c.json({ message: "Notification deleted successfully" }, 200)
    }
)

notifications.post(
    "/",
    requireRoles(UserRole.ADMIN, UserRole.MANAGER),
    zValidator("json", createNotificationSchema),
    async (c) => {
        const input = c.req.valid("json")
        const result = await createNotification(input)
        return c.json(result, 201)
    }
)

notifications.post(
    "/announcement",
    requireRoles(UserRole.ADMIN),
    zValidator("json", createAnnouncementSchema),
    async (c) => {
        const input = c.req.valid("json")
        const count = await createAnnouncement(input)
        return c.json({ message: `Announcement sent to ${count} users` }, 201)
    }
)

export default notifications
