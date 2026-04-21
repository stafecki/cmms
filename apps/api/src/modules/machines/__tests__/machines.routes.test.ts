import { describe, it, expect, vi, beforeAll, beforeEach } from 'vitest'
import { Hono } from 'hono'
import { testClient } from 'hono/testing'
import { HTTPException } from 'hono/http-exception'
import machines from '../machines.routes.js'
import * as machinesService from '../machines.service.js'
import { UserRole } from '../../../../generated/prisma/client.js'
import { authMiddleware } from '../../../middleware/auth.middleware.js'
import { requireRoles } from '../../../middleware/roles.middleware.js'

const { rolesMiddleware } = vi.hoisted(() => ({
  rolesMiddleware: vi.fn(async (_c: unknown, next: () => Promise<void>) => {
    await next()
  })
}))

vi.mock('../machines.service.js', () => ({
  getMachines: vi.fn(),
  getMachineById: vi.fn(),
  createMachine: vi.fn(),
  updateMachine: vi.fn(),
  deleteMachine: vi.fn(),
  updateOperatingHours: vi.fn(),
  getMachineDocuments: vi.fn(),
  uploadMachineDocument: vi.fn(),
  getMachineTco: vi.fn()
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
const MACHINE_ID = 'a0000000-0000-4000-8000-000000000001'
const LOCATION_ID = 'a0000000-0000-4000-8000-000000000002'

const mockedService = vi.mocked(machinesService)

const makeMachine = (overrides = {}) => ({
  id: MACHINE_ID,
  name: 'CNC Lathe',
  serialNumber: 'SN-001',
  locationId: LOCATION_ID,
  operatingHours: 100,
  purchaseDate: new Date('2022-01-01').toISOString(),
  purchasePrice: 50000,
  isActive: true,
  location: { id: LOCATION_ID, name: 'Main Hall' },
  documents: [],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  ...overrides
})

const makeDocument = (overrides = {}) => ({
  id: 'a0000000-0000-4000-8000-000000000003',
  machineId: MACHINE_ID,
  uploadedById: USER_ID,
  filename: 'manual.pdf',
  filePath: `uploads/machines/${MACHINE_ID}/manual.pdf`,
  version: 1,
  isLatest: true,
  uploadedAt: new Date().toISOString(),
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
app.route('/machines', machines)
const client = testClient(app)

describe('Machines Routes', () => {
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

  // ─── GET /machines ───────────────────────────────────────────────────────────

  describe('GET /', () => {
    it('should return 200 with list of machines', async () => {
      mockedService.getMachines.mockResolvedValue([makeMachine()])

      const res = await client.machines.$get({})

      expect(res.status).toBe(200)
      expect(mockedService.getMachines).toHaveBeenCalledOnce()
    })

    it('should return 401 when auth middleware rejects', async () => {
      vi.mocked(authMiddleware).mockImplementationOnce(async (_c, _next) => {
        throw new HTTPException(401, { message: 'Unauthorized' })
      })

      const res = await client.machines.$get({})

      expect(res.status).toBe(401)
      expect(mockedService.getMachines).not.toHaveBeenCalled()
    })
  })

  // ─── GET /machines/:id ───────────────────────────────────────────────────────

  describe('GET /:id', () => {
    it('should return 200 with machine data', async () => {
      mockedService.getMachineById.mockResolvedValue(makeMachine())

      const res = await client.machines[':id'].$get({
        param: { id: MACHINE_ID }
      })

      expect(res.status).toBe(200)
      expect(mockedService.getMachineById).toHaveBeenCalledWith(MACHINE_ID)
    })

    it('should return 400 when id is not a valid UUID', async () => {
      const res = await client.machines[':id'].$get({
        param: { id: 'bad-id' }
      })

      expect(res.status).toBe(400)
      expect(mockedService.getMachineById).not.toHaveBeenCalled()
    })

    it('should return 404 when service throws HTTPException 404', async () => {
      mockedService.getMachineById.mockRejectedValue(
        new HTTPException(404, { message: 'Machine not found' })
      )

      const res = await client.machines[':id'].$get({
        param: { id: MACHINE_ID }
      })

      expect(res.status).toBe(404)
    })
  })

  // ─── POST /machines ──────────────────────────────────────────────────────────

  describe('POST /', () => {
    const validBody = {
      name: 'CNC Lathe',
      serialNumber: 'SN-001',
      locationId: LOCATION_ID,
      operatingHours: 0,
      purchaseDate: '2022-01-01',
      purchasePrice: 50000
    }

    it('should return 201 with created machine', async () => {
      mockedService.createMachine.mockResolvedValue(makeMachine())

      const res = await client.machines.$post({ json: validBody })

      expect(res.status).toBe(201)
      expect(mockedService.createMachine).toHaveBeenCalledOnce()
    })

    it('should return 400 when name is missing', async () => {
      const res = await client.machines.$post({
        json: { ...validBody, name: undefined } as typeof validBody
      })

      expect(res.status).toBe(400)
      expect(mockedService.createMachine).not.toHaveBeenCalled()
    })

    it('should return 400 when name is shorter than 2 characters', async () => {
      const res = await client.machines.$post({
        json: { ...validBody, name: 'X' }
      })

      expect(res.status).toBe(400)
    })

    it('should return 400 when serialNumber is empty', async () => {
      const res = await client.machines.$post({
        json: { ...validBody, serialNumber: '' }
      })

      expect(res.status).toBe(400)
    })

    it('should return 400 when locationId is not a valid UUID', async () => {
      const res = await client.machines.$post({
        json: { ...validBody, locationId: 'not-a-uuid' }
      })

      expect(res.status).toBe(400)
      expect(mockedService.createMachine).not.toHaveBeenCalled()
    })

    it('should return 400 when operatingHours is negative', async () => {
      const res = await client.machines.$post({
        json: { ...validBody, operatingHours: -1 }
      })

      expect(res.status).toBe(400)
    })

    it('should return 400 when purchasePrice is negative', async () => {
      const res = await client.machines.$post({
        json: { ...validBody, purchasePrice: -100 }
      })

      expect(res.status).toBe(400)
    })

    it('should return 403 when user lacks required role', async () => {
      rolesMiddleware.mockImplementationOnce(
        async (_c: unknown, _next: () => Promise<void>) => {
          throw new HTTPException(403, { message: 'Insufficient permissions' })
        }
      )

      const res = await client.machines.$post({ json: validBody })

      expect(res.status).toBe(403)
      expect(mockedService.createMachine).not.toHaveBeenCalled()
    })

    it('should return 409 when service throws HTTPException 409', async () => {
      mockedService.createMachine.mockRejectedValue(
        new HTTPException(409, { message: 'Serial number already exists' })
      )

      const res = await client.machines.$post({ json: validBody })

      expect(res.status).toBe(409)
    })

    it('should require ADMIN or MANAGER role', () => {
      expect(initialRequireRolesCalls).toContainEqual([
        UserRole.ADMIN,
        UserRole.MANAGER
      ])
    })
  })

  // ─── PATCH /machines/:id ─────────────────────────────────────────────────────

  describe('PATCH /:id', () => {
    it('should return 200 with updated machine', async () => {
      mockedService.updateMachine.mockResolvedValue(
        makeMachine({ name: 'Updated Lathe' })
      )

      const res = await client.machines[':id'].$patch({
        param: { id: MACHINE_ID },
        json: { name: 'Updated Lathe' }
      })

      expect(res.status).toBe(200)
      expect(mockedService.updateMachine).toHaveBeenCalledWith(MACHINE_ID, {
        name: 'Updated Lathe',
        operatingHours: 0
      })
    })

    it('should return 400 when id is not a valid UUID', async () => {
      const res = await client.machines[':id'].$patch({
        param: { id: 'bad-id' },
        json: { name: 'Updated' }
      })

      expect(res.status).toBe(400)
    })

    it('should return 400 when locationId is not a valid UUID', async () => {
      const res = await client.machines[':id'].$patch({
        param: { id: MACHINE_ID },
        json: { locationId: 'not-a-uuid' }
      })

      expect(res.status).toBe(400)
    })

    it('should return 403 when user lacks required role', async () => {
      rolesMiddleware.mockImplementationOnce(
        async (_c: unknown, _next: () => Promise<void>) => {
          throw new HTTPException(403, { message: 'Insufficient permissions' })
        }
      )

      const res = await client.machines[':id'].$patch({
        param: { id: MACHINE_ID },
        json: { name: 'Updated' }
      })

      expect(res.status).toBe(403)
    })
  })

  // ─── DELETE /machines/:id ────────────────────────────────────────────────────

  describe('DELETE /:id', () => {
    it('should return 200 on successful delete', async () => {
      mockedService.deleteMachine.mockResolvedValue(undefined)

      const res = await client.machines[':id'].$delete({
        param: { id: MACHINE_ID }
      })

      expect(res.status).toBe(200)
      expect(mockedService.deleteMachine).toHaveBeenCalledWith(MACHINE_ID)
    })

    it('should return 400 when id is not a valid UUID', async () => {
      const res = await client.machines[':id'].$delete({
        param: { id: 'bad-id' }
      })

      expect(res.status).toBe(400)
    })

    it('should return 403 when user lacks required role', async () => {
      rolesMiddleware.mockImplementationOnce(
        async (_c: unknown, _next: () => Promise<void>) => {
          throw new HTTPException(403, { message: 'Insufficient permissions' })
        }
      )

      const res = await client.machines[':id'].$delete({
        param: { id: MACHINE_ID }
      })

      expect(res.status).toBe(403)
    })

    it('should require ADMIN role', () => {
      expect(initialRequireRolesCalls).toContainEqual([UserRole.ADMIN])
    })
  })

  // ─── PATCH /machines/:id/operating-hours ─────────────────────────────────────

  describe('PATCH /:id/operating-hours', () => {
    it('should return 200 with updated machine', async () => {
      mockedService.updateOperatingHours.mockResolvedValue(
        makeMachine({ operatingHours: 250 })
      )

      const res = await client.machines[':id']['operating-hours'].$patch({
        param: { id: MACHINE_ID },
        json: { operatingHours: 250 }
      })

      expect(res.status).toBe(200)
      expect(mockedService.updateOperatingHours).toHaveBeenCalledWith(
        MACHINE_ID,
        { operatingHours: 250 }
      )
    })

    it('should return 400 when operatingHours is negative', async () => {
      const res = await client.machines[':id']['operating-hours'].$patch({
        param: { id: MACHINE_ID },
        json: { operatingHours: -1 }
      })

      expect(res.status).toBe(400)
    })

    it('should return 400 when id is not a valid UUID', async () => {
      const res = await client.machines[':id']['operating-hours'].$patch({
        param: { id: 'bad-id' },
        json: { operatingHours: 100 }
      })

      expect(res.status).toBe(400)
    })

    it('should return 403 when user lacks required role', async () => {
      rolesMiddleware.mockImplementationOnce(
        async (_c: unknown, _next: () => Promise<void>) => {
          throw new HTTPException(403, { message: 'Insufficient permissions' })
        }
      )

      const res = await client.machines[':id']['operating-hours'].$patch({
        param: { id: MACHINE_ID },
        json: { operatingHours: 250 }
      })

      expect(res.status).toBe(403)
    })

    it('should require ADMIN, MANAGER or TECHNICIAN role', () => {
      expect(initialRequireRolesCalls).toContainEqual([
        UserRole.ADMIN,
        UserRole.MANAGER,
        UserRole.TECHNICIAN
      ])
    })
  })

  // ─── GET /machines/:id/documents ─────────────────────────────────────────────

  describe('GET /:id/documents', () => {
    it('should return 200 with list of documents', async () => {
      mockedService.getMachineDocuments.mockResolvedValue([makeDocument()])

      const res = await client.machines[':id'].documents.$get({
        param: { id: MACHINE_ID }
      })

      expect(res.status).toBe(200)
      expect(mockedService.getMachineDocuments).toHaveBeenCalledWith(MACHINE_ID)
    })

    it('should return 400 when id is not a valid UUID', async () => {
      const res = await client.machines[':id'].documents.$get({
        param: { id: 'bad-id' }
      })

      expect(res.status).toBe(400)
    })
  })

  // ─── POST /machines/:id/documents ────────────────────────────────────────────

  describe('POST /:id/documents', () => {
    it('should return 400 when no file is provided', async () => {
      // Endpoint używa parseBody() zamiast zValidator — brak pliku zwraca 400 z kodu routy
      const formData = new FormData()

      const res = await client.machines[':id'].documents.$post({
        param: { id: MACHINE_ID },
        form: formData as never
      })

      expect(res.status).toBe(400)
      expect(mockedService.uploadMachineDocument).not.toHaveBeenCalled()
    })

    it('should return 400 when id is not a valid UUID', async () => {
      const formData = new FormData()
      formData.append(
        'file',
        new Blob(['content'], { type: 'application/pdf' }),
        'manual.pdf'
      )

      const res = await client.machines[':id'].documents.$post({
        param: { id: 'bad-id' },
        form: formData as never
      })

      expect(res.status).toBe(400)
    })

    it('should return 403 when user lacks required role', async () => {
      rolesMiddleware.mockImplementationOnce(
        async (_c: unknown, _next: () => Promise<void>) => {
          throw new HTTPException(403, { message: 'Insufficient permissions' })
        }
      )

      const formData = new FormData()
      formData.append(
        'file',
        new Blob(['content'], { type: 'application/pdf' }),
        'manual.pdf'
      )

      const res = await client.machines[':id'].documents.$post({
        param: { id: MACHINE_ID },
        form: formData as never
      })

      expect(res.status).toBe(403)
    })
  })

  // ─── GET /machines/:id/tco ───────────────────────────────────────────────────

  describe('GET /:id/tco', () => {
    it('should return 200 with TCO report', async () => {
      mockedService.getMachineTco.mockResolvedValue({
        machineId: MACHINE_ID,
        machineName: 'CNC Lathe',
        purchasePrice: 50000,
        totalLaborCost: 3000,
        totalPartsCost: 1250,
        totalCost: 54250,
        workOrdersCount: 2
      })

      const res = await client.machines[':id'].tco.$get({
        param: { id: MACHINE_ID }
      })

      expect(res.status).toBe(200)
      expect(mockedService.getMachineTco).toHaveBeenCalledWith(MACHINE_ID)
    })

    it('should return 400 when id is not a valid UUID', async () => {
      const res = await client.machines[':id'].tco.$get({
        param: { id: 'bad-id' }
      })

      expect(res.status).toBe(400)
    })

    it('should return 403 when user lacks required role', async () => {
      rolesMiddleware.mockImplementationOnce(
        async (_c: unknown, _next: () => Promise<void>) => {
          throw new HTTPException(403, { message: 'Insufficient permissions' })
        }
      )

      const res = await client.machines[':id'].tco.$get({
        param: { id: MACHINE_ID }
      })

      expect(res.status).toBe(403)
    })
  })

  // ─── Error propagation ───────────────────────────────────────────────────────

  describe('error propagation', () => {
    it('should return 404 when service throws HTTPException 404', async () => {
      mockedService.getMachineById.mockRejectedValue(
        new HTTPException(404, { message: 'Machine not found' })
      )

      const res = await client.machines[':id'].$get({
        param: { id: MACHINE_ID }
      })

      expect(res.status).toBe(404)
    })

    it('should return 500 when service throws unexpected error', async () => {
      mockedService.getMachines.mockRejectedValue(
        new Error('Database connection failed')
      )

      const res = await client.machines.$get({})

      expect(res.status).toBe(500)
    })
  })
})
