import { describe, it, expect, vi, beforeEach } from 'vitest'
import {
  getLocations,
  getLocationById,
  createLocation,
  updateLocation,
  deleteLocation
} from '../locations.service.js'
import prisma from '../../../lib/prisma.js'
import { LocationType } from '../../../../generated/prisma/client.js'

vi.mock('../../../lib/prisma.js', () => ({
  default: {
    location: {
      findMany: vi.fn(),
      findUnique: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
      delete: vi.fn()
    }
  }
}))

const mockedPrisma = vi.mocked(prisma)

const LOCATION_ID = '00000000-0000-0000-0000-000000000001'
const PARENT_ID = '00000000-0000-0000-0000-000000000002'

const makeLocation = (overrides: Record<string, unknown> = {}) => ({
  id: LOCATION_ID,
  name: 'Main Hall',
  type: LocationType.HALL,
  parentId: null,
  createdAt: new Date(),
  updatedAt: new Date(),
  ...overrides
})

const makeLocationWithChildren = (overrides: Record<string, unknown> = {}) => ({
  ...makeLocation(),
  children: [],
  ...overrides
})

describe('Locations Service', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  // ─── getLocations ────────────────────────────────────────────────────────────

  describe('getLocations', () => {
    it('should return top-level locations with children, ordered by name', async () => {
      const locations = [makeLocationWithChildren()]
      mockedPrisma.location.findMany.mockResolvedValue(locations)

      const result = await getLocations()

      expect(result).toEqual(locations)
      expect(mockedPrisma.location.findMany).toHaveBeenCalledWith({
        where: { parentId: null },
        include: { children: true },
        orderBy: { name: 'asc' }
      })
    })

    it('should return empty array when no locations exist', async () => {
      mockedPrisma.location.findMany.mockResolvedValue([])

      const result = await getLocations()

      expect(result).toEqual([])
    })
  })

  // ─── getLocationById ─────────────────────────────────────────────────────────

  describe('getLocationById', () => {
    it('should return location with children included', async () => {
      const location = makeLocationWithChildren({
        children: [makeLocation({ id: 'child-1' })]
      })
      mockedPrisma.location.findUnique.mockResolvedValue(location)

      const result = await getLocationById(LOCATION_ID)

      expect(result).toEqual(location)
      expect(mockedPrisma.location.findUnique).toHaveBeenCalledWith({
        where: { id: LOCATION_ID },
        include: { children: true }
      })
    })

    it('should throw 404 when location not found', async () => {
      mockedPrisma.location.findUnique.mockResolvedValue(null)

      await expect(getLocationById(LOCATION_ID)).rejects.toMatchObject({
        status: 404
      })
    })
  })

  // ─── createLocation ──────────────────────────────────────────────────────────

  describe('createLocation', () => {
    it('should create and return location without parentId', async () => {
      const location = makeLocation()
      mockedPrisma.location.create.mockResolvedValue(location)

      const result = await createLocation({
        name: 'Main Hall',
        type: LocationType.HALL
      })

      expect(result).toEqual(location)
      expect(mockedPrisma.location.create).toHaveBeenCalledWith({
        data: {
          name: 'Main Hall',
          type: LocationType.HALL,
          parentId: undefined
        }
      })
    })

    it('should create location with parentId when parent exists', async () => {
      const parent = makeLocation({ id: PARENT_ID, type: LocationType.PLANT })
      mockedPrisma.location.findUnique.mockResolvedValue(parent)
      const location = makeLocation({ parentId: PARENT_ID })
      mockedPrisma.location.create.mockResolvedValue(location)

      const result = await createLocation({
        name: 'Main Hall',
        type: LocationType.HALL,
        parentId: PARENT_ID
      })

      expect(result).toEqual(location)
      expect(mockedPrisma.location.create).toHaveBeenCalledWith({
        data: {
          name: 'Main Hall',
          type: LocationType.HALL,
          parentId: PARENT_ID
        }
      })
    })

    it('should throw 404 when parentId is provided but parent does not exist', async () => {
      mockedPrisma.location.findUnique.mockResolvedValue(null)

      await expect(
        createLocation({
          name: 'Main Hall',
          type: LocationType.HALL,
          parentId: PARENT_ID
        })
      ).rejects.toMatchObject({ status: 404 })
      expect(mockedPrisma.location.create).not.toHaveBeenCalled()
    })

    it('should not check parent when parentId is not provided', async () => {
      mockedPrisma.location.create.mockResolvedValue(makeLocation())

      await createLocation({ name: 'Main Hall', type: LocationType.HALL })

      expect(mockedPrisma.location.findUnique).not.toHaveBeenCalled()
    })
  })

  // ─── updateLocation ──────────────────────────────────────────────────────────

  describe('updateLocation', () => {
    it('should update and return location', async () => {
      mockedPrisma.location.findUnique.mockResolvedValue(makeLocation())
      const updated = makeLocation({ name: 'Updated Hall' })
      mockedPrisma.location.update.mockResolvedValue(updated)

      const result = await updateLocation(LOCATION_ID, { name: 'Updated Hall' })

      expect(result).toEqual(updated)
      expect(mockedPrisma.location.update).toHaveBeenCalledWith({
        where: { id: LOCATION_ID },
        data: { name: 'Updated Hall' }
      })
    })

    it('should throw 404 when location not found', async () => {
      mockedPrisma.location.findUnique.mockResolvedValue(null)

      await expect(
        updateLocation(LOCATION_ID, { name: 'Updated Hall' })
      ).rejects.toMatchObject({ status: 404 })
    })

    it('should throw 400 when parentId is set to its own id', async () => {
      mockedPrisma.location.findUnique.mockResolvedValue(makeLocation())

      await expect(
        updateLocation(LOCATION_ID, { parentId: LOCATION_ID })
      ).rejects.toMatchObject({ status: 400 })
      expect(mockedPrisma.location.update).not.toHaveBeenCalled()
    })

    it('should throw 404 when new parentId does not exist', async () => {
      mockedPrisma.location.findUnique
        .mockResolvedValueOnce(makeLocation()) // location itself
        .mockResolvedValueOnce(null) // parent not found

      await expect(
        updateLocation(LOCATION_ID, { parentId: PARENT_ID })
      ).rejects.toMatchObject({ status: 404 })
      expect(mockedPrisma.location.update).not.toHaveBeenCalled()
    })

    it('should update when parentId exists', async () => {
      mockedPrisma.location.findUnique
        .mockResolvedValueOnce(makeLocation()) // location itself
        .mockResolvedValueOnce(makeLocation({ id: PARENT_ID })) // parent found
      mockedPrisma.location.update.mockResolvedValue(
        makeLocation({ parentId: PARENT_ID })
      )

      await updateLocation(LOCATION_ID, { parentId: PARENT_ID })

      expect(mockedPrisma.location.update).toHaveBeenCalled()
    })

    it('should not check parent when parentId is not in input', async () => {
      mockedPrisma.location.findUnique.mockResolvedValue(makeLocation())
      mockedPrisma.location.update.mockResolvedValue(
        makeLocation({ name: 'New Name' })
      )

      await updateLocation(LOCATION_ID, { name: 'New Name' })

      expect(mockedPrisma.location.findUnique).toHaveBeenCalledOnce()
    })
  })

  // ─── deleteLocation ──────────────────────────────────────────────────────────

  describe('deleteLocation', () => {
    it('should delete location with no children and no machines', async () => {
      mockedPrisma.location.findUnique.mockResolvedValue(
        makeLocationWithChildren({ children: [], machines: [] })
      )
      mockedPrisma.location.delete.mockResolvedValue(makeLocation())

      await deleteLocation(LOCATION_ID)

      expect(mockedPrisma.location.delete).toHaveBeenCalledWith({
        where: { id: LOCATION_ID }
      })
    })

    it('should throw 404 when location not found', async () => {
      mockedPrisma.location.findUnique.mockResolvedValue(null)

      await expect(deleteLocation(LOCATION_ID)).rejects.toMatchObject({
        status: 404
      })
    })

    it('should throw 400 when location has children', async () => {
      mockedPrisma.location.findUnique.mockResolvedValue(
        makeLocationWithChildren({
          children: [makeLocation({ id: 'child-1' })],
          machines: []
        })
      )

      await expect(deleteLocation(LOCATION_ID)).rejects.toMatchObject({
        status: 400
      })
      expect(mockedPrisma.location.delete).not.toHaveBeenCalled()
    })

    it('should throw 400 when location has assigned machines', async () => {
      mockedPrisma.location.findUnique.mockResolvedValue(
        makeLocationWithChildren({
          children: [],
          machines: [{ id: 'machine-1', name: 'Lathe' }]
        })
      )

      await expect(deleteLocation(LOCATION_ID)).rejects.toMatchObject({
        status: 400
      })
      expect(mockedPrisma.location.delete).not.toHaveBeenCalled()
    })

    it('should fetch location with children and machines included', async () => {
      mockedPrisma.location.findUnique.mockResolvedValue(
        makeLocationWithChildren({ children: [], machines: [] })
      )
      mockedPrisma.location.delete.mockResolvedValue(makeLocation())

      await deleteLocation(LOCATION_ID)

      expect(mockedPrisma.location.findUnique).toHaveBeenCalledWith({
        where: { id: LOCATION_ID },
        include: { children: true, machines: true }
      })
    })
  })
})
