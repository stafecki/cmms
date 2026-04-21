import { HTTPException } from 'hono/http-exception'
import prisma from '../../lib/prisma.js'
import type { Location, Prisma } from '../../../generated/prisma/client.js'
import type {
  CreateLocationInput,
  UpdateLocationInput
} from './locations.schema.js'

type LocationWithChildren = Prisma.LocationGetPayload<{
  include: { children: true }
}>

export const getLocations = async (): Promise<LocationWithChildren[]> => {
  return prisma.location.findMany({
    where: { parentId: null },
    include: { children: true },
    orderBy: { name: 'asc' }
  })
}

export const getLocationById = async (
  id: string
): Promise<LocationWithChildren> => {
  const location = await prisma.location.findUnique({
    where: { id },
    include: { children: true }
  })

  if (!location) {
    throw new HTTPException(404, { message: 'Location not found' })
  }

  return location
}

export const createLocation = async (
  input: CreateLocationInput
): Promise<Location> => {
  if (input.parentId) {
    const parent = await prisma.location.findUnique({
      where: { id: input.parentId }
    })
    if (!parent) {
      throw new HTTPException(404, { message: 'Parent location not found' })
    }
  }

  return prisma.location.create({
    data: {
      name: input.name,
      type: input.type,
      parentId: input.parentId
    }
  })
}

export const updateLocation = async (
  id: string,
  input: UpdateLocationInput
): Promise<Location> => {
  const location = await prisma.location.findUnique({ where: { id } })

  if (!location) {
    throw new HTTPException(404, { message: 'Location not found' })
  }

  if (input.parentId) {
    if (input.parentId === id) {
      throw new HTTPException(400, {
        message: 'Location cannot be its own parent'
      })
    }
    const parent = await prisma.location.findUnique({
      where: { id: input.parentId }
    })
    if (!parent) {
      throw new HTTPException(404, { message: 'Parent location not found' })
    }
  }

  return prisma.location.update({
    where: { id },
    data: input
  })
}

export const deleteLocation = async (id: string): Promise<void> => {
  const location = await prisma.location.findUnique({
    where: { id },
    include: { children: true, machines: true }
  })

  if (!location) {
    throw new HTTPException(404, { message: 'Location not found' })
  }

  if (location.children.length > 0) {
    throw new HTTPException(400, {
      message: 'Cannot delete location with children'
    })
  }

  if (location.machines.length > 0) {
    throw new HTTPException(400, {
      message: 'Cannot delete location with assigned machines'
    })
  }

  await prisma.location.delete({ where: { id } })
}
