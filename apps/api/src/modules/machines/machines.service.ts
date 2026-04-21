import { HTTPException } from 'hono/http-exception'
import prisma from '../../lib/prisma.js'
import { Prisma } from '../../../generated/prisma/client.js'
import type {
  CreateMachineInput,
  UpdateMachineInput,
  UpdateOperatingHoursInput
} from './machines.schema.js'
import type {
  Machine,
  MachineDocument
} from '../../../generated/prisma/client.js'

type MachineWithRelations = Prisma.MachineGetPayload<{
  include: {
    location: true
    documents: {
      where: { isLatest: true }
    }
  }
}>

type TcoReport = {
  machineId: string
  machineName: string
  purchasePrice: number
  totalPartsCost: number
  totalLaborCost: number
  totalCost: number
  workOrdersCount: number
}

export const getMachines = async (): Promise<MachineWithRelations[]> => {
  return prisma.machine.findMany({
    where: { isActive: true },
    include: {
      location: true,
      documents: {
        where: { isLatest: true }
      }
    },
    orderBy: { createdAt: 'desc' }
  })
}

export const getMachineById = async (
  id: string
): Promise<MachineWithRelations> => {
  const machine = await prisma.machine.findUnique({
    where: { id },
    include: {
      location: true,
      documents: {
        where: { isLatest: true }
      }
    }
  })

  if (!machine) {
    throw new HTTPException(404, { message: 'Machine not found' })
  }

  return machine
}

export const createMachine = async (
  input: CreateMachineInput
): Promise<Machine> => {
  const location = await prisma.location.findUnique({
    where: { id: input.locationId }
  })

  if (!location) {
    throw new HTTPException(404, { message: 'Location not found' })
  }

  const existingMachine = await prisma.machine.findUnique({
    where: { serialNumber: input.serialNumber }
  })

  if (existingMachine) {
    throw new HTTPException(409, {
      message: 'Machine with this serial number already exists'
    })
  }

  return prisma.machine.create({
    data: {
      name: input.name,
      serialNumber: input.serialNumber,
      locationId: input.locationId,
      operatingHours: input.operatingHours,
      purchaseDate: input.purchaseDate,
      purchasePrice: input.purchasePrice
    }
  })
}

export const updateMachine = async (
  id: string,
  input: UpdateMachineInput
): Promise<Machine> => {
  const machine = await prisma.machine.findUnique({ where: { id } })

  if (!machine) {
    throw new HTTPException(404, { message: 'Machine not found' })
  }

  if (input.locationId) {
    const location = await prisma.location.findUnique({
      where: { id: input.locationId }
    })
    if (!location) {
      throw new HTTPException(404, { message: 'Location not found' })
    }
  }

  if (input.serialNumber && input.serialNumber !== machine.serialNumber) {
    const existingMachine = await prisma.machine.findUnique({
      where: { serialNumber: input.serialNumber }
    })
    if (existingMachine) {
      throw new HTTPException(409, {
        message: 'Machine with this serial number already exists'
      })
    }
  }

  return prisma.machine.update({
    where: { id },
    data: {
      ...input,
      purchasePrice:
        input.purchasePrice !== undefined
          ? new Prisma.Decimal(input.purchasePrice)
          : undefined
    }
  })
}

export const deleteMachine = async (id: string): Promise<void> => {
  const machine = await prisma.machine.findUnique({ where: { id } })

  if (!machine) {
    throw new HTTPException(404, { message: 'Machine not found' })
  }

  await prisma.machine.update({
    where: { id },
    data: { isActive: false }
  })
}

export const updateOperatingHours = async (
  id: string,
  input: UpdateOperatingHoursInput
): Promise<Machine> => {
  const machine = await prisma.machine.findUnique({ where: { id } })

  if (!machine) {
    throw new HTTPException(404, { message: 'Machine not found' })
  }

  return prisma.machine.update({
    where: { id },
    data: { operatingHours: input.operatingHours }
  })
}

export const getMachineDocuments = async (
  machineId: string
): Promise<MachineDocument[]> => {
  const machine = await prisma.machine.findUnique({ where: { id: machineId } })

  if (!machine) {
    throw new HTTPException(404, { message: 'Machine not found' })
  }

  return prisma.machineDocument.findMany({
    where: { machineId },
    orderBy: [{ version: 'desc' }]
  })
}

export const uploadMachineDocument = async (
  machineId: string,
  uploadedById: string,
  filename: string,
  filePath: string
): Promise<MachineDocument> => {
  const machine = await prisma.machine.findUnique({ where: { id: machineId } })

  if (!machine) {
    throw new HTTPException(404, { message: 'Machine not found' })
  }

  const latestDocument = await prisma.machineDocument.findFirst({
    where: { machineId, isLatest: true },
    orderBy: { version: 'desc' }
  })

  const newVersion = latestDocument ? latestDocument.version + 1 : 1

  if (latestDocument) {
    await prisma.machineDocument.update({
      where: { id: latestDocument.id },
      data: { isLatest: false }
    })
  }

  return prisma.machineDocument.create({
    data: {
      machineId,
      uploadedById,
      filename,
      filePath,
      version: newVersion,
      isLatest: true
    }
  })
}

export const getMachineTco = async (machineId: string): Promise<TcoReport> => {
  const machine = await prisma.machine.findUnique({
    where: { id: machineId },
    include: {
      workOrders: {
        where: { status: 'COMPLETED' },
        select: {
          laborCost: true,
          partsCost: true
        }
      }
    }
  })

  if (!machine) {
    throw new HTTPException(404, { message: 'Machine not found' })
  }

  const totalLaborCost = machine.workOrders.reduce(
    (sum, order) => sum + Number(order.laborCost),
    0
  )

  const totalPartsCost = machine.workOrders.reduce(
    (sum, order) => sum + Number(order.partsCost),
    0
  )

  const purchasePrice = Number(machine.purchasePrice)

  return {
    machineId: machine.id,
    machineName: machine.name,
    purchasePrice,
    totalPartsCost,
    totalLaborCost,
    totalCost: purchasePrice + totalPartsCost + totalLaborCost,
    workOrdersCount: machine.workOrders.length
  }
}
