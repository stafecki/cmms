import { Hono } from "hono"
import { zValidator } from "@hono/zod-validator"
import { authMiddleware, type AuthVariables } from "../../middleware/auth.middleware.js"
import { requireRoles } from "../../middleware/roles.middleware.js"
import { UserRole } from "../../../generated/prisma/client.js"
import {
    createWorkOrderSchema,
    updateWorkOrderSchema,
    updateStatusSchema,
    assignTechnicianSchema,
    addMessageSchema,
    addPartSchema,
    workOrderIdSchema
} from "./work-orders.schema.js"
import {
    getWorkOrders,
    getWorkOrderById,
    createWorkOrder,
    updateWorkOrder,
    updateWorkOrderStatus,
    assignTechnician,
    confirmBhp,
    getMessages,
    addMessage,
    getWorkOrderParts,
    addPart
} from "./work-orders.service.js"

const workOrders = new Hono<{ Variables: AuthVariables["Variables"] }>()

workOrders.use("/*", authMiddleware)

workOrders.get("/", async (c) => {
    const result = await getWorkOrders()
    return c.json(result, 200)
})

workOrders.get("/:id", zValidator("param", workOrderIdSchema), async (c) => {
    const { id } = c.req.valid("param")
    const result = await getWorkOrderById(id)
    return c.json(result, 200)
})

workOrders.post(
    "/",
    zValidator("json", createWorkOrderSchema),
    async (c) => {
        const input = c.req.valid("json")
        const user = c.get("user")
        const result = await createWorkOrder(input, user.sub)
        return c.json(result, 201)
    }
)

workOrders.patch(
    "/:id",
    requireRoles(UserRole.ADMIN, UserRole.MANAGER),
    zValidator("param", workOrderIdSchema),
    zValidator("json", updateWorkOrderSchema),
    async (c) => {
        const { id } = c.req.valid("param")
        const input = c.req.valid("json")
        const result = await updateWorkOrder(id, input)
        return c.json(result, 200)
    }
)

workOrders.patch(
    "/:id/status",
    requireRoles(UserRole.ADMIN, UserRole.MANAGER, UserRole.TECHNICIAN),
    zValidator("param", workOrderIdSchema),
    zValidator("json", updateStatusSchema),
    async (c) => {
        const { id } = c.req.valid("param")
        const input = c.req.valid("json")
        const result = await updateWorkOrderStatus(id, input)
        return c.json(result, 200)
    }
)

workOrders.patch(
    "/:id/assign",
    requireRoles(UserRole.ADMIN, UserRole.MANAGER),
    zValidator("param", workOrderIdSchema),
    zValidator("json", assignTechnicianSchema),
    async (c) => {
        const { id } = c.req.valid("param")
        const input = c.req.valid("json")
        const result = await assignTechnician(id, input)
        return c.json(result, 200)
    }
)

workOrders.post(
    "/:id/bhp-confirm",
    requireRoles(UserRole.TECHNICIAN),
    zValidator("param", workOrderIdSchema),
    async (c) => {
        const { id } = c.req.valid("param")
        const user = c.get("user")
        const result = await confirmBhp(id, user.sub)
        return c.json(result, 200)
    }
)

workOrders.get(
    "/:id/messages",
    zValidator("param", workOrderIdSchema),
    async (c) => {
        const { id } = c.req.valid("param")
        const result = await getMessages(id)
        return c.json(result, 200)
    }
)

workOrders.post(
    "/:id/messages",
    zValidator("param", workOrderIdSchema),
    zValidator("json", addMessageSchema),
    async (c) => {
        const { id } = c.req.valid("param")
        const input = c.req.valid("json")
        const user = c.get("user")
        const result = await addMessage(id, user.sub, input)
        return c.json(result, 201)
    }
)

workOrders.get(
    "/:id/parts",
    zValidator("param", workOrderIdSchema),
    async (c) => {
        const { id } = c.req.valid("param")
        const result = await getWorkOrderParts(id)
        return c.json(result, 200)
    }
)

workOrders.post(
    "/:id/parts",
    requireRoles(UserRole.ADMIN, UserRole.MANAGER, UserRole.TECHNICIAN),
    zValidator("param", workOrderIdSchema),
    zValidator("json", addPartSchema),
    async (c) => {
        const { id } = c.req.valid("param")
        const input = c.req.valid("json")
        const result = await addPart(id, input)
        return c.json(result, 201)
    }
)

export default workOrders
