import { HTTPException } from "hono/http-exception"
import prisma from "../../lib/prisma.js"
import type {
    WorkOrder,
    WorkOrderMessage,
    WorkOrderPart,
    Prisma
} from "../../../generated/prisma/client.js"
import { WorkOrderStatus, UserRole } from "../../../generated/prisma/client.js"
import type {
    CreateWorkOrderInput,
    UpdateWorkOrderInput,
    UpdateStatusInput,
    AssignTechnicianInput,
    AddMessageInput,
    AddPartInput
} from "./work-orders.schema.js"

type WorkOrderWithRelations = Prisma.WorkOrderGetPayload<{
    include: {
        machine: true
        reportedBy: { select: { id: true; name: true; email: true; role: true } }
        assignedTo: { select: { id: true; name: true; email: true; role: true } }
        parts: { include: { part: true } }
    }
}>

const LABOR_RATE_PER_HOUR = 100

export const getWorkOrders = async (): Promise<WorkOrderWithRelations[]> => {
    return prisma.workOrder.findMany({
        include: {
            machine: true,
            reportedBy: { select: { id: true, name: true, email: true, role: true } },
            assignedTo: { select: { id: true, name: true, email: true, role: true } },
            parts: { include: { part: true } }
        },
        orderBy: { createdAt: "desc" }
    })
}

export const getWorkOrderById = async (id: string): Promise<WorkOrderWithRelations> => {
    const workOrder = await prisma.workOrder.findUnique({
        where: { id },
        include: {
            machine: true,
            reportedBy: { select: { id: true, name: true, email: true, role: true } },
            assignedTo: { select: { id: true, name: true, email: true, role: true } },
            parts: { include: { part: true } }
        }
    })

    if (!workOrder) {
        throw new HTTPException(404, { message: "Work order not found" })
    }

    return workOrder
}

export const createWorkOrder = async (
    input: CreateWorkOrderInput,
    reportedById: string
): Promise<WorkOrder> => {
    const machine = await prisma.machine.findUnique({
        where: { id: input.machineId }
    })

    if (!machine || !machine.isActive) {
        throw new HTTPException(404, { message: "Machine not found" })
    }

    return prisma.workOrder.create({
        data: {
            machineId: input.machineId,
            reportedById,
            title: input.title,
            description: input.description,
            priority: input.priority,
            status: WorkOrderStatus.NEW
        }
    })
}

export const updateWorkOrder = async (
    id: string,
    input: UpdateWorkOrderInput
): Promise<WorkOrder> => {
    const workOrder = await prisma.workOrder.findUnique({ where: { id } })

    if (!workOrder) {
        throw new HTTPException(404, { message: "Work order not found" })
    }

    if (workOrder.status === WorkOrderStatus.COMPLETED || workOrder.status === WorkOrderStatus.CANCELLED) {
        throw new HTTPException(400, { message: "Cannot update a closed work order" })
    }

    return prisma.workOrder.update({
        where: { id },
        data: input
    })
}

export const updateWorkOrderStatus = async (
    id: string,
    input: UpdateStatusInput
): Promise<WorkOrder> => {
    const workOrder = await prisma.workOrder.findUnique({ where: { id } })

    if (!workOrder) {
        throw new HTTPException(404, { message: "Work order not found" })
    }

    const validTransitions: Record<WorkOrderStatus, WorkOrderStatus[]> = {
        [WorkOrderStatus.NEW]: [WorkOrderStatus.IN_PROGRESS, WorkOrderStatus.CANCELLED],
        [WorkOrderStatus.IN_PROGRESS]: [WorkOrderStatus.WAITING_FOR_PARTS, WorkOrderStatus.COMPLETED, WorkOrderStatus.CANCELLED],
        [WorkOrderStatus.WAITING_FOR_PARTS]: [WorkOrderStatus.IN_PROGRESS, WorkOrderStatus.CANCELLED],
        [WorkOrderStatus.COMPLETED]: [],
        [WorkOrderStatus.CANCELLED]: []
    }

    if (!validTransitions[workOrder.status].includes(input.status)) {
        throw new HTTPException(400, {
            message: `Cannot transition from ${workOrder.status} to ${input.status}`
        })
    }

    if (input.status === WorkOrderStatus.IN_PROGRESS && !workOrder.bhpConfirmed) {
        throw new HTTPException(400, {
            message: "BHP confirmation required before starting work"
        })
    }

    const data: Prisma.WorkOrderUpdateInput = { status: input.status }

    if (input.status === WorkOrderStatus.IN_PROGRESS && !workOrder.startedAt) {
        data.startedAt = new Date()
    }

    if (input.status === WorkOrderStatus.COMPLETED) {
        data.closedAt = new Date()

        if (workOrder.startedAt) {
            const hours = (Date.now() - workOrder.startedAt.getTime()) / 1000 / 3600
            data.laborCost = Math.round(hours * LABOR_RATE_PER_HOUR * 100) / 100
        }
    }

    return prisma.workOrder.update({ where: { id }, data })
}

export const assignTechnician = async (
    id: string,
    input: AssignTechnicianInput
): Promise<WorkOrder> => {
    const workOrder = await prisma.workOrder.findUnique({ where: { id } })

    if (!workOrder) {
        throw new HTTPException(404, { message: "Work order not found" })
    }

    const technician = await prisma.user.findUnique({
        where: { id: input.technicianId },
        include: {
            certifications: {
                where: {
                    isValid: true,
                    expiresAt: { gt: new Date() }
                }
            }
        }
    })

    if (!technician) {
        throw new HTTPException(404, { message: "Technician not found" })
    }

    if (technician.role !== UserRole.TECHNICIAN && technician.role !== UserRole.MANAGER) {
        throw new HTTPException(400, { message: "User is not a technician" })
    }

    return prisma.workOrder.update({
        where: { id },
        data: { assignedToId: input.technicianId }
    })
}

export const confirmBhp = async (id: string, userId: string): Promise<WorkOrder> => {
    const workOrder = await prisma.workOrder.findUnique({ where: { id } })

    if (!workOrder) {
        throw new HTTPException(404, { message: "Work order not found" })
    }

    if (workOrder.assignedToId !== userId) {
        throw new HTTPException(403, { message: "Only assigned technician can confirm BHP" })
    }

    if (workOrder.bhpConfirmed) {
        throw new HTTPException(400, { message: "BHP already confirmed" })
    }

    return prisma.workOrder.update({
        where: { id },
        data: { bhpConfirmed: true }
    })
}

export const getMessages = async (workOrderId: string): Promise<WorkOrderMessage[]> => {
    const workOrder = await prisma.workOrder.findUnique({ where: { id: workOrderId } })

    if (!workOrder) {
        throw new HTTPException(404, { message: "Work order not found" })
    }

    return prisma.workOrderMessage.findMany({
        where: { workOrderId },
        include: {
            user: { select: { id: true, name: true, role: true } }
        },
        orderBy: { sentAt: "asc" }
    })
}

export const addMessage = async (
    workOrderId: string,
    userId: string,
    input: AddMessageInput
): Promise<WorkOrderMessage> => {
    const workOrder = await prisma.workOrder.findUnique({ where: { id: workOrderId } })

    if (!workOrder) {
        throw new HTTPException(404, { message: "Work order not found" })
    }

    if (workOrder.status === WorkOrderStatus.COMPLETED || workOrder.status === WorkOrderStatus.CANCELLED) {
        throw new HTTPException(400, { message: "Cannot add message to a closed work order" })
    }

    return prisma.workOrderMessage.create({
        data: {
            workOrderId,
            userId,
            content: input.content
        }
    })
}

export const getWorkOrderParts = async (workOrderId: string): Promise<WorkOrderPart[]> => {
    const workOrder = await prisma.workOrder.findUnique({ where: { id: workOrderId } })

    if (!workOrder) {
        throw new HTTPException(404, { message: "Work order not found" })
    }

    return prisma.workOrderPart.findMany({
        where: { workOrderId },
        include: { part: true }
    })
}

export const addPart = async (
    workOrderId: string,
    input: AddPartInput
): Promise<WorkOrderPart> => {
    const workOrder = await prisma.workOrder.findUnique({ where: { id: workOrderId } })

    if (!workOrder) {
        throw new HTTPException(404, { message: "Work order not found" })
    }

    if (workOrder.status === WorkOrderStatus.COMPLETED || workOrder.status === WorkOrderStatus.CANCELLED) {
        throw new HTTPException(400, { message: "Cannot add parts to a closed work order" })
    }

    const part = await prisma.part.findUnique({ where: { id: input.partId } })

    if (!part) {
        throw new HTTPException(404, { message: "Part not found" })
    }

    if (part.stockQuantity < input.quantity) {
        throw new HTTPException(400, {
            message: `Insufficient stock. Available: ${part.stockQuantity}`
        })
    }

    const existingEntry = await prisma.workOrderPart.findUnique({
        where: { workOrderId_partId: { workOrderId, partId: input.partId } }
    })

    const workOrderPart = existingEntry
        ? await prisma.workOrderPart.update({
            where: { workOrderId_partId: { workOrderId, partId: input.partId } },
            data: { quantity: existingEntry.quantity + input.quantity }
        })
        : await prisma.workOrderPart.create({
            data: { workOrderId, partId: input.partId, quantity: input.quantity }
        })

    await prisma.part.update({
        where: { id: input.partId },
        data: { stockQuantity: { decrement: input.quantity } }
    })

    const totalPartsCost = await prisma.workOrderPart.aggregate({
        where: { workOrderId },
        _sum: { quantity: true }
    })

    const allParts = await prisma.workOrderPart.findMany({
        where: { workOrderId },
        include: { part: true }
    })

    const newPartsCost = allParts.reduce(
        (sum, wp) => sum + Number(wp.part.unitPrice) * wp.quantity,
        0
    )

    await prisma.workOrder.update({
        where: { id: workOrderId },
        data: { partsCost: newPartsCost }
    })

    return workOrderPart
}
