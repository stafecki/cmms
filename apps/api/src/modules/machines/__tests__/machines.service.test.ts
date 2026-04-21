import { describe, it, expect, vi, beforeEach } from 'vitest'
import {
  getMachines,
  getMachineById,
  createMachine,
  updateMachine,
  deleteMachine,
  updateOperatingHours,
  getMachineDocuments,
  uploadMachineDocument,
  getMachineTco
} from '../machines.service.js'
import prisma from '../../../lib/prisma.js'

vi.mock('../../../lib/prisma.js', () => ({
  default: {
    machine: {
      findMany: vi.fn(),
      findUnique: vi.fn(),
      create: vi.fn(),
      update: vi.fn()
    },
    machineDocument: {
      findMany: vi.fn(),
      findFirst: vi.fn(),
      create: vi.fn(),
      update: vi.fn()
    },
    location: {
      findUnique: vi.fn()
    }
  }
}))

const mockedPrisma = vi.mocked(prisma)

const MACHINE_ID = '00000000-0000-0000-0000-000000000001'
const LOCATION_ID = '00000000-0000-0000-0000-000000000002'
const DOCUMENT_ID = '00000000-0000-0000-0000-000000000003'
const USER_ID = '00000000-0000-0000-0000-000000000004'

const makeMachine = (overrides: Record<string, unknown> = {}) => ({
  id: MACHINE_ID,
  name: 'CNC Lathe',
  serialNumber: 'SN-001',
  locationId: LOCATION_ID,
  operatingHours: 100,
  purchaseDate: new Date('2022-01-01'),
  purchasePrice: 50000,
  isActive: true,
  createdAt: new Date(),
  updatedAt: new Date(),
  ...overrides
})

const makeMachineWithRelations = (overrides: Record<string, unknown> = {}) => ({
  ...makeMachine(),
  location: { id: LOCATION_ID, name: 'Main Hall' },
  documents: [],
  ...overrides
})

const makeDocument = (overrides: Record<string, unknown> = {}) => ({
  id: DOCUMENT_ID,
  machineId: MACHINE_ID,
  uploadedById: USER_ID,
  filename: 'manual.pdf',
  filePath: `uploads/machines/${MACHINE_ID}/manual.pdf`,
  version: 1,
  isLatest: true,
  uploadedAt: new Date(),
  ...overrides
})

describe('Machines Service', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  // ─── getMachines ─────────────────────────────────────────────────────────────

  describe('getMachines', () => {
    it('should return active machines with location and latest documents', async () => {
      const machines = [makeMachineWithRelations()]
      mockedPrisma.machine.findMany.mockResolvedValue(machines)

      const result = await getMachines()

      expect(result).toEqual(machines)
      expect(mockedPrisma.machine.findMany).toHaveBeenCalledWith({
        where: { isActive: true },
        include: {
          location: true,
          documents: { where: { isLatest: true } }
        },
        orderBy: { createdAt: 'desc' }
      })
    })

    it('should return empty array when no active machines', async () => {
      mockedPrisma.machine.findMany.mockResolvedValue([])

      const result = await getMachines()

      expect(result).toEqual([])
    })
  })

  // ─── getMachineById ──────────────────────────────────────────────────────────

  describe('getMachineById', () => {
    it('should return machine with location and latest documents', async () => {
      const machine = makeMachineWithRelations()
      mockedPrisma.machine.findUnique.mockResolvedValue(machine)

      const result = await getMachineById(MACHINE_ID)

      expect(result).toEqual(machine)
      expect(mockedPrisma.machine.findUnique).toHaveBeenCalledWith({
        where: { id: MACHINE_ID },
        include: {
          location: true,
          documents: { where: { isLatest: true } }
        }
      })
    })

    it('should throw 404 when machine not found', async () => {
      mockedPrisma.machine.findUnique.mockResolvedValue(null)

      await expect(getMachineById(MACHINE_ID)).rejects.toMatchObject({
        status: 404
      })
    })
  })

  // ─── createMachine ───────────────────────────────────────────────────────────

  describe('createMachine', () => {
    const input = {
      name: 'CNC Lathe',
      serialNumber: 'SN-001',
      locationId: LOCATION_ID,
      operatingHours: 0,
      purchaseDate: new Date('2022-01-01'),
      purchasePrice: 50000
    }

    it('should create and return machine', async () => {
      mockedPrisma.location.findUnique.mockResolvedValue({
        id: LOCATION_ID,
        name: 'Hall'
      })
      mockedPrisma.machine.findUnique.mockResolvedValue(null)
      const machine = makeMachine()
      mockedPrisma.machine.create.mockResolvedValue(machine)

      const result = await createMachine(input)

      expect(result).toEqual(machine)
      expect(mockedPrisma.machine.create).toHaveBeenCalledWith({
        data: {
          name: input.name,
          serialNumber: input.serialNumber,
          locationId: input.locationId,
          operatingHours: input.operatingHours,
          purchaseDate: input.purchaseDate,
          purchasePrice: input.purchasePrice
        }
      })
    })

    it('should throw 404 when location not found', async () => {
      mockedPrisma.location.findUnique.mockResolvedValue(null)

      await expect(createMachine(input)).rejects.toMatchObject({ status: 404 })
      expect(mockedPrisma.machine.create).not.toHaveBeenCalled()
    })

    it('should throw 409 when serial number already exists', async () => {
      mockedPrisma.location.findUnique.mockResolvedValue({
        id: LOCATION_ID,
        name: 'Hall'
      })
      mockedPrisma.machine.findUnique.mockResolvedValue(makeMachine())

      await expect(createMachine(input)).rejects.toMatchObject({ status: 409 })
      expect(mockedPrisma.machine.create).not.toHaveBeenCalled()
    })
  })

  // ─── updateMachine ───────────────────────────────────────────────────────────

  describe('updateMachine', () => {
    it('should update and return machine', async () => {
      mockedPrisma.machine.findUnique.mockResolvedValue(makeMachine())
      const updated = makeMachine({ name: 'Updated Lathe' })
      mockedPrisma.machine.update.mockResolvedValue(updated)

      const result = await updateMachine(MACHINE_ID, { name: 'Updated Lathe' })

      expect(result).toEqual(updated)
    })

    it('should throw 404 when machine not found', async () => {
      mockedPrisma.machine.findUnique.mockResolvedValue(null)

      await expect(
        updateMachine(MACHINE_ID, { name: 'Updated' })
      ).rejects.toMatchObject({ status: 404 })
    })

    it('should throw 404 when new locationId does not exist', async () => {
      mockedPrisma.machine.findUnique.mockResolvedValue(makeMachine())
      mockedPrisma.location.findUnique.mockResolvedValue(null)

      await expect(
        updateMachine(MACHINE_ID, { locationId: LOCATION_ID })
      ).rejects.toMatchObject({ status: 404 })
      expect(mockedPrisma.machine.update).not.toHaveBeenCalled()
    })

    it('should throw 409 when new serialNumber already belongs to another machine', async () => {
      mockedPrisma.machine.findUnique
        .mockResolvedValueOnce(makeMachine({ serialNumber: 'SN-001' }))
        .mockResolvedValueOnce(
          makeMachine({ id: 'other-id', serialNumber: 'SN-002' })
        )

      await expect(
        updateMachine(MACHINE_ID, { serialNumber: 'SN-002' })
      ).rejects.toMatchObject({ status: 409 })
      expect(mockedPrisma.machine.update).not.toHaveBeenCalled()
    })

    it('should not check serial number uniqueness when it is unchanged', async () => {
      mockedPrisma.machine.findUnique.mockResolvedValue(
        makeMachine({ serialNumber: 'SN-001' })
      )
      mockedPrisma.machine.update.mockResolvedValue(makeMachine())

      await updateMachine(MACHINE_ID, { serialNumber: 'SN-001' })

      expect(mockedPrisma.machine.findUnique).toHaveBeenCalledOnce()
    })

    it('should not check location when locationId is not in input', async () => {
      mockedPrisma.machine.findUnique.mockResolvedValue(makeMachine())
      mockedPrisma.machine.update.mockResolvedValue(
        makeMachine({ name: 'New Name' })
      )

      await updateMachine(MACHINE_ID, { name: 'New Name' })

      expect(mockedPrisma.location.findUnique).not.toHaveBeenCalled()
    })
  })

  // ─── deleteMachine ───────────────────────────────────────────────────────────

  describe('deleteMachine', () => {
    it('should soft-delete machine by setting isActive to false', async () => {
      mockedPrisma.machine.findUnique.mockResolvedValue(makeMachine())
      mockedPrisma.machine.update.mockResolvedValue(
        makeMachine({ isActive: false })
      )

      await deleteMachine(MACHINE_ID)

      expect(mockedPrisma.machine.update).toHaveBeenCalledWith({
        where: { id: MACHINE_ID },
        data: { isActive: false }
      })
    })

    it('should throw 404 when machine not found', async () => {
      mockedPrisma.machine.findUnique.mockResolvedValue(null)

      await expect(deleteMachine(MACHINE_ID)).rejects.toMatchObject({
        status: 404
      })
    })
  })

  // ─── updateOperatingHours ────────────────────────────────────────────────────

  describe('updateOperatingHours', () => {
    it('should update and return machine with new operating hours', async () => {
      mockedPrisma.machine.findUnique.mockResolvedValue(makeMachine())
      const updated = makeMachine({ operatingHours: 250 })
      mockedPrisma.machine.update.mockResolvedValue(updated)

      const result = await updateOperatingHours(MACHINE_ID, {
        operatingHours: 250
      })

      expect(result).toEqual(updated)
      expect(mockedPrisma.machine.update).toHaveBeenCalledWith({
        where: { id: MACHINE_ID },
        data: { operatingHours: 250 }
      })
    })

    it('should throw 404 when machine not found', async () => {
      mockedPrisma.machine.findUnique.mockResolvedValue(null)

      await expect(
        updateOperatingHours(MACHINE_ID, { operatingHours: 250 })
      ).rejects.toMatchObject({ status: 404 })
    })
  })

  // ─── getMachineDocuments ─────────────────────────────────────────────────────

  describe('getMachineDocuments', () => {
    it('should return all documents ordered by version desc', async () => {
      mockedPrisma.machine.findUnique.mockResolvedValue(makeMachine())
      const docs = [makeDocument({ version: 2 }), makeDocument({ version: 1 })]
      mockedPrisma.machineDocument.findMany.mockResolvedValue(docs)

      const result = await getMachineDocuments(MACHINE_ID)

      expect(result).toEqual(docs)
      expect(mockedPrisma.machineDocument.findMany).toHaveBeenCalledWith({
        where: { machineId: MACHINE_ID },
        orderBy: [{ version: 'desc' }]
      })
    })

    it('should throw 404 when machine not found', async () => {
      mockedPrisma.machine.findUnique.mockResolvedValue(null)

      await expect(getMachineDocuments(MACHINE_ID)).rejects.toMatchObject({
        status: 404
      })
    })
  })

  // ─── uploadMachineDocument ───────────────────────────────────────────────────

  describe('uploadMachineDocument', () => {
    it('should create first document with version 1 when no previous documents exist', async () => {
      mockedPrisma.machine.findUnique.mockResolvedValue(makeMachine())
      mockedPrisma.machineDocument.findFirst.mockResolvedValue(null)
      const doc = makeDocument({ version: 1 })
      mockedPrisma.machineDocument.create.mockResolvedValue(doc)

      const result = await uploadMachineDocument(
        MACHINE_ID,
        USER_ID,
        'manual.pdf',
        `uploads/machines/${MACHINE_ID}/manual.pdf`
      )

      expect(result).toEqual(doc)
      expect(mockedPrisma.machineDocument.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          machineId: MACHINE_ID,
          uploadedById: USER_ID,
          filename: 'manual.pdf',
          version: 1,
          isLatest: true
        })
      })
    })

    it('should increment version and set previous document isLatest to false', async () => {
      mockedPrisma.machine.findUnique.mockResolvedValue(makeMachine())
      const latestDoc = makeDocument({
        id: 'prev-doc',
        version: 2,
        isLatest: true
      })
      mockedPrisma.machineDocument.findFirst.mockResolvedValue(latestDoc)
      mockedPrisma.machineDocument.update.mockResolvedValue({
        ...latestDoc,
        isLatest: false
      })
      const newDoc = makeDocument({ version: 3, isLatest: true })
      mockedPrisma.machineDocument.create.mockResolvedValue(newDoc)

      const result = await uploadMachineDocument(
        MACHINE_ID,
        USER_ID,
        'manual-v3.pdf',
        `uploads/machines/${MACHINE_ID}/manual-v3.pdf`
      )

      expect(mockedPrisma.machineDocument.update).toHaveBeenCalledWith({
        where: { id: 'prev-doc' },
        data: { isLatest: false }
      })
      expect(mockedPrisma.machineDocument.create).toHaveBeenCalledWith({
        data: expect.objectContaining({ version: 3, isLatest: true })
      })
      expect(result.version).toBe(3)
    })

    it('should not update previous document when no prior documents exist', async () => {
      mockedPrisma.machine.findUnique.mockResolvedValue(makeMachine())
      mockedPrisma.machineDocument.findFirst.mockResolvedValue(null)
      mockedPrisma.machineDocument.create.mockResolvedValue(makeDocument())

      await uploadMachineDocument(
        MACHINE_ID,
        USER_ID,
        'manual.pdf',
        'path/manual.pdf'
      )

      expect(mockedPrisma.machineDocument.update).not.toHaveBeenCalled()
    })

    it('should throw 404 when machine not found', async () => {
      mockedPrisma.machine.findUnique.mockResolvedValue(null)

      await expect(
        uploadMachineDocument(
          MACHINE_ID,
          USER_ID,
          'manual.pdf',
          'path/manual.pdf'
        )
      ).rejects.toMatchObject({ status: 404 })
    })
  })

  // ─── getMachineTco ───────────────────────────────────────────────────────────

  describe('getMachineTco', () => {
    it('should return TCO report with summed costs', async () => {
      mockedPrisma.machine.findUnique.mockResolvedValue({
        ...makeMachine({ purchasePrice: 50000 }),
        workOrders: [
          { laborCost: 1000, partsCost: 500 },
          { laborCost: 2000, partsCost: 750 }
        ]
      })

      const result = await getMachineTco(MACHINE_ID)

      expect(result).toEqual({
        machineId: MACHINE_ID,
        machineName: 'CNC Lathe',
        purchasePrice: 50000,
        totalLaborCost: 3000,
        totalPartsCost: 1250,
        totalCost: 54250,
        workOrdersCount: 2
      })
    })

    it('should return zero costs when no completed work orders', async () => {
      mockedPrisma.machine.findUnique.mockResolvedValue({
        ...makeMachine({ purchasePrice: 10000 }),
        workOrders: []
      })

      const result = await getMachineTco(MACHINE_ID)

      expect(result.totalLaborCost).toBe(0)
      expect(result.totalPartsCost).toBe(0)
      expect(result.totalCost).toBe(10000)
      expect(result.workOrdersCount).toBe(0)
    })

    it('should query only COMPLETED work orders', async () => {
      mockedPrisma.machine.findUnique.mockResolvedValue({
        ...makeMachine(),
        workOrders: []
      })

      await getMachineTco(MACHINE_ID)

      const call = mockedPrisma.machine.findUnique.mock.calls[0][0]
      expect(call.include.workOrders.where.status).toBe('COMPLETED')
    })

    it('should throw 404 when machine not found', async () => {
      mockedPrisma.machine.findUnique.mockResolvedValue(null)

      await expect(getMachineTco(MACHINE_ID)).rejects.toMatchObject({
        status: 404
      })
    })
  })
})
