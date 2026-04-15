import { HTTPException } from "hono/http-exception"
import prisma from "../../lib/prisma.js"
import type { Notification, Prisma } from "../../../generated/prisma/client.js"
import { NotificationType } from "../../../generated/prisma/client.js"
import type { CreateNotificationInput, CreateAnnouncementInput } from "./notifications.schema.js"

type NotificationWithUser = Prisma.NotificationGetPayload<{
    include: {
        user: { select: { id: true; name: true; email: true } }
    }
}>

export const getNotifications = async (userId: string): Promise<Notification[]> => {
    return prisma.notification.findMany({
        where: { userId },
        orderBy: { createdAt: "desc" }
    })
}

export const getUnreadCount = async (userId: string): Promise<number> => {
    return prisma.notification.count({
        where: { userId, isRead: false }
    })
}

export const markAsRead = async (
    id: string,
    userId: string
): Promise<Notification> => {
    const notification = await prisma.notification.findUnique({ where: { id } })

    if (!notification) {
        throw new HTTPException(404, { message: "Notification not found" })
    }

    if (notification.userId !== userId) {
        throw new HTTPException(403, { message: "Access denied" })
    }

    return prisma.notification.update({
        where: { id },
        data: { isRead: true }
    })
}

export const markAllAsRead = async (userId: string): Promise<number> => {
    const result = await prisma.notification.updateMany({
        where: { userId, isRead: false },
        data: { isRead: true }
    })

    return result.count
}

export const deleteNotification = async (
    id: string,
    userId: string
): Promise<void> => {
    const notification = await prisma.notification.findUnique({ where: { id } })

    if (!notification) {
        throw new HTTPException(404, { message: "Notification not found" })
    }

    if (notification.userId !== userId) {
        throw new HTTPException(403, { message: "Access denied" })
    }

    await prisma.notification.delete({ where: { id } })
}

export const createNotification = async (
    input: CreateNotificationInput
): Promise<Notification> => {
    const user = await prisma.user.findUnique({ where: { id: input.userId } })

    if (!user) {
        throw new HTTPException(404, { message: "User not found" })
    }

    return prisma.notification.create({
        data: {
            userId: input.userId,
            type: input.type,
            title: input.title,
            message: input.message
        }
    })
}

export const createAnnouncement = async (
    input: CreateAnnouncementInput
): Promise<number> => {
    const users = await prisma.user.findMany({
        where: { isActive: true },
        select: { id: true }
    })

    const result = await prisma.notification.createMany({
        data: users.map((user) => ({
            userId: user.id,
            type: NotificationType.ANNOUNCEMENT,
            title: input.title,
            message: input.message
        }))
    })

    return result.count
}

export const notifyManagers = async (
    type: NotificationType,
    title: string,
    message: string
): Promise<void> => {
    const managers = await prisma.user.findMany({
        where: {
            isActive: true,
            role: { in: ["ADMIN", "MANAGER"] }
        },
        select: { id: true }
    })

    await prisma.notification.createMany({
        data: managers.map((manager) => ({
            userId: manager.id,
            type,
            title,
            message
        }))
    })
}

export const getAllNotifications = async (): Promise<NotificationWithUser[]> => {
    return prisma.notification.findMany({
        include: {
            user: { select: { id: true, name: true, email: true } }
        },
        orderBy: { createdAt: "desc" },
        take: 100
    })
}
