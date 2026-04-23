import { describe, it, expect, vi, beforeEach } from 'vitest'
import {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  getCertifications,
  createCertification,
  deleteCertification
} from '../users.service.js'
import prisma from '../../../lib/prisma.js'
import {
  UserRole,
  CertificationType
} from '../../../../generated/prisma/client.js'

vi.mock('../../../lib/prisma.js', () => ({
  default: {
    user: {
      findMany: vi.fn(),
      findUnique: vi.fn(),
      count: vi.fn(),
      update: vi.fn()
    },
    certification: {
      findMany: vi.fn(),
      findUnique: vi.fn(),
      findFirst: vi.fn(),
      create: vi.fn(),
      delete: vi.fn()
    }
  }
}))

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mockedPrisma = vi.mocked(prisma) as any

const USER_ID = 'a0000000-0000-4000-8000-000000000099'
const OTHER_USER_ID = 'a0000000-0000-4000-8000-000000000088'
const CERT_ID = 'a0000000-0000-4000-8000-000000000011'

const makeUser = (overrides: Record<string, unknown> = {}) => ({
  id: USER_ID,
  name: 'John Doe',
  email: 'john@example.com',
  role: UserRole.TECHNICIAN,
  isActive: true,
  createdAt: new Date(),
  certifications: [],
  ...overrides
})

const makeCertification = (overrides: Record<string, unknown> = {}) => ({
  id: CERT_ID,
  userId: USER_ID,
  type: CertificationType.SEP,
  issuedAt: new Date('2024-01-01'),
  expiresAt: new Date('2026-01-01'),
  isValid: true,
  createdAt: new Date(),
  ...overrides
})

describe('Users Service', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  // ─── getUsers ─────────────────────────────────────────────────────────────────

  describe('getUsers', () => {
    const defaultQuery = { limit: 50, offset: 0 }

    it('should return paginated users with total count', async () => {
      const userList = [makeUser()]
      mockedPrisma.user.findMany.mockResolvedValue(userList)
      mockedPrisma.user.count.mockResolvedValue(1)

      const result = await getUsers(defaultQuery)

      expect(result).toEqual({
        data: userList,
        total: 1,
        limit: 50,
        offset: 0
      })
    })

    it('should apply limit and offset', async () => {
      mockedPrisma.user.findMany.mockResolvedValue([])
      mockedPrisma.user.count.mockResolvedValue(0)

      await getUsers({ limit: 10, offset: 20 })

      expect(mockedPrisma.user.findMany).toHaveBeenCalledWith(
        expect.objectContaining({ take: 10, skip: 20 })
      )
    })

    it('should filter by role when provided', async () => {
      mockedPrisma.user.findMany.mockResolvedValue([])
      mockedPrisma.user.count.mockResolvedValue(0)

      await getUsers({ ...defaultQuery, role: UserRole.MANAGER })

      expect(mockedPrisma.user.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({ role: UserRole.MANAGER })
        })
      )
    })

    it('should filter by isActive when provided', async () => {
      mockedPrisma.user.findMany.mockResolvedValue([])
      mockedPrisma.user.count.mockResolvedValue(0)

      await getUsers({ ...defaultQuery, isActive: false })

      expect(mockedPrisma.user.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({ isActive: false })
        })
      )
    })

    it('should not include role in where when not provided', async () => {
      mockedPrisma.user.findMany.mockResolvedValue([])
      mockedPrisma.user.count.mockResolvedValue(0)

      await getUsers(defaultQuery)

      const callArg = mockedPrisma.user.findMany.mock.calls[0][0]
      expect(callArg.where).not.toHaveProperty('role')
    })

    it('should not include isActive in where when not provided', async () => {
      mockedPrisma.user.findMany.mockResolvedValue([])
      mockedPrisma.user.count.mockResolvedValue(0)

      await getUsers(defaultQuery)

      const callArg = mockedPrisma.user.findMany.mock.calls[0][0]
      expect(callArg.where).not.toHaveProperty('isActive')
    })

    it('should select only allowed fields', async () => {
      mockedPrisma.user.findMany.mockResolvedValue([])
      mockedPrisma.user.count.mockResolvedValue(0)

      await getUsers(defaultQuery)

      expect(mockedPrisma.user.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          select: expect.objectContaining({
            id: true,
            name: true,
            email: true,
            role: true,
            isActive: true,
            createdAt: true,
            certifications: true
          })
        })
      )
    })

    it('should order results by createdAt descending', async () => {
      mockedPrisma.user.findMany.mockResolvedValue([])
      mockedPrisma.user.count.mockResolvedValue(0)

      await getUsers(defaultQuery)

      expect(mockedPrisma.user.findMany).toHaveBeenCalledWith(
        expect.objectContaining({ orderBy: { createdAt: 'desc' } })
      )
    })

    it('should return empty array when no users match', async () => {
      mockedPrisma.user.findMany.mockResolvedValue([])
      mockedPrisma.user.count.mockResolvedValue(0)

      const result = await getUsers(defaultQuery)

      expect(result.data).toEqual([])
      expect(result.total).toBe(0)
    })
  })

  // ─── getUserById ──────────────────────────────────────────────────────────────

  describe('getUserById', () => {
    it('should return user with certifications', async () => {
      const user = makeUser()
      mockedPrisma.user.findUnique.mockResolvedValue(user)

      const result = await getUserById(USER_ID)

      expect(result).toEqual(user)
      expect(mockedPrisma.user.findUnique).toHaveBeenCalledWith({
        where: { id: USER_ID },
        select: expect.objectContaining({
          id: true,
          certifications: true
        })
      })
    })

    it('should throw 404 when user does not exist', async () => {
      mockedPrisma.user.findUnique.mockResolvedValue(null)

      await expect(getUserById(USER_ID)).rejects.toMatchObject({ status: 404 })
    })
  })

  // ─── updateUser ───────────────────────────────────────────────────────────────

  describe('updateUser', () => {
    it('should update and return user', async () => {
      mockedPrisma.user.findUnique.mockResolvedValue(makeUser())
      const updated = makeUser({ name: 'Jane Doe' })
      mockedPrisma.user.update.mockResolvedValue(updated)

      const result = await updateUser(USER_ID, { name: 'Jane Doe' })

      expect(result).toEqual(updated)
      expect(mockedPrisma.user.update).toHaveBeenCalledWith({
        where: { id: USER_ID },
        data: { name: 'Jane Doe' }
      })
    })

    it('should throw 404 when user does not exist', async () => {
      mockedPrisma.user.findUnique.mockResolvedValue(null)

      await expect(
        updateUser(USER_ID, { name: 'Jane Doe' })
      ).rejects.toMatchObject({ status: 404 })
      expect(mockedPrisma.user.update).not.toHaveBeenCalled()
    })

    it('should allow updating role', async () => {
      mockedPrisma.user.findUnique.mockResolvedValue(makeUser())
      mockedPrisma.user.update.mockResolvedValue(
        makeUser({ role: UserRole.MANAGER })
      )

      await updateUser(USER_ID, { role: UserRole.MANAGER })

      expect(mockedPrisma.user.update).toHaveBeenCalledWith({
        where: { id: USER_ID },
        data: { role: UserRole.MANAGER }
      })
    })

    it('should allow deactivating user', async () => {
      mockedPrisma.user.findUnique.mockResolvedValue(makeUser())
      mockedPrisma.user.update.mockResolvedValue(makeUser({ isActive: false }))

      await updateUser(USER_ID, { isActive: false })

      expect(mockedPrisma.user.update).toHaveBeenCalledWith({
        where: { id: USER_ID },
        data: { isActive: false }
      })
    })
  })

  // ─── deleteUser ───────────────────────────────────────────────────────────────

  describe('deleteUser', () => {
    it('should soft-delete user by setting isActive to false', async () => {
      mockedPrisma.user.findUnique.mockResolvedValue(
        makeUser({ role: UserRole.TECHNICIAN })
      )
      mockedPrisma.user.update.mockResolvedValue(makeUser({ isActive: false }))

      await deleteUser(USER_ID)

      expect(mockedPrisma.user.update).toHaveBeenCalledWith({
        where: { id: USER_ID },
        data: { isActive: false }
      })
    })

    it('should throw 404 when user does not exist', async () => {
      mockedPrisma.user.findUnique.mockResolvedValue(null)

      await expect(deleteUser(USER_ID)).rejects.toMatchObject({ status: 404 })
      expect(mockedPrisma.user.update).not.toHaveBeenCalled()
    })

    it('should throw 400 when deleting the last active admin', async () => {
      mockedPrisma.user.findUnique.mockResolvedValue(
        makeUser({ role: UserRole.ADMIN })
      )
      mockedPrisma.user.count.mockResolvedValue(1)

      await expect(deleteUser(USER_ID)).rejects.toMatchObject({ status: 400 })
      expect(mockedPrisma.user.update).not.toHaveBeenCalled()
    })

    it('should allow deleting an admin when more than one exists', async () => {
      mockedPrisma.user.findUnique.mockResolvedValue(
        makeUser({ role: UserRole.ADMIN })
      )
      mockedPrisma.user.count.mockResolvedValue(2)
      mockedPrisma.user.update.mockResolvedValue(makeUser({ isActive: false }))

      await deleteUser(USER_ID)

      expect(mockedPrisma.user.update).toHaveBeenCalledWith({
        where: { id: USER_ID },
        data: { isActive: false }
      })
    })

    it('should not check admin count for non-admin users', async () => {
      mockedPrisma.user.findUnique.mockResolvedValue(
        makeUser({ role: UserRole.TECHNICIAN })
      )
      mockedPrisma.user.update.mockResolvedValue(makeUser({ isActive: false }))

      await deleteUser(USER_ID)

      expect(mockedPrisma.user.count).not.toHaveBeenCalled()
    })

    it('should count only active admins when checking last admin guard', async () => {
      mockedPrisma.user.findUnique.mockResolvedValue(
        makeUser({ role: UserRole.ADMIN })
      )
      mockedPrisma.user.count.mockResolvedValue(2)
      mockedPrisma.user.update.mockResolvedValue(makeUser({ isActive: false }))

      await deleteUser(USER_ID)

      expect(mockedPrisma.user.count).toHaveBeenCalledWith({
        where: { role: 'ADMIN', isActive: true }
      })
    })

    it('should return void on success', async () => {
      mockedPrisma.user.findUnique.mockResolvedValue(
        makeUser({ role: UserRole.TECHNICIAN })
      )
      mockedPrisma.user.update.mockResolvedValue(makeUser({ isActive: false }))

      const result = await deleteUser(USER_ID)

      expect(result).toBeUndefined()
    })
  })

  // ─── getCertifications ────────────────────────────────────────────────────────

  describe('getCertifications', () => {
    it('should return certifications ordered by expiresAt ascending', async () => {
      mockedPrisma.user.findUnique.mockResolvedValue(makeUser())
      const certs = [makeCertification()]
      mockedPrisma.certification.findMany.mockResolvedValue(certs)

      const result = await getCertifications(USER_ID)

      expect(result).toEqual(certs)
      expect(mockedPrisma.certification.findMany).toHaveBeenCalledWith({
        where: { userId: USER_ID },
        orderBy: { expiresAt: 'asc' }
      })
    })

    it('should throw 404 when user does not exist', async () => {
      mockedPrisma.user.findUnique.mockResolvedValue(null)

      await expect(getCertifications(USER_ID)).rejects.toMatchObject({
        status: 404
      })
      expect(mockedPrisma.certification.findMany).not.toHaveBeenCalled()
    })

    it('should return empty array when user has no certifications', async () => {
      mockedPrisma.user.findUnique.mockResolvedValue(makeUser())
      mockedPrisma.certification.findMany.mockResolvedValue([])

      const result = await getCertifications(USER_ID)

      expect(result).toEqual([])
    })
  })

  // ─── createCertification ──────────────────────────────────────────────────────

  describe('createCertification', () => {
    const input = {
      type: CertificationType.SEP,
      issuedAt: new Date('2024-01-01'),
      expiresAt: new Date('2026-01-01')
    }

    it('should create and return certification with isValid set to true', async () => {
      mockedPrisma.user.findUnique.mockResolvedValue(makeUser())
      mockedPrisma.certification.findFirst.mockResolvedValue(null)
      const cert = makeCertification()
      mockedPrisma.certification.create.mockResolvedValue(cert)

      const result = await createCertification(USER_ID, input)

      expect(result).toEqual(cert)
      expect(mockedPrisma.certification.create).toHaveBeenCalledWith({
        data: {
          userId: USER_ID,
          type: input.type,
          issuedAt: input.issuedAt,
          expiresAt: input.expiresAt,
          isValid: true
        }
      })
    })

    it('should throw 404 when user does not exist', async () => {
      mockedPrisma.user.findUnique.mockResolvedValue(null)

      await expect(createCertification(USER_ID, input)).rejects.toMatchObject({
        status: 404
      })
      expect(mockedPrisma.certification.create).not.toHaveBeenCalled()
    })

    it('should throw 409 when valid certification of same type already exists', async () => {
      mockedPrisma.user.findUnique.mockResolvedValue(makeUser())
      mockedPrisma.certification.findFirst.mockResolvedValue(
        makeCertification()
      )

      await expect(createCertification(USER_ID, input)).rejects.toMatchObject({
        status: 409
      })
      expect(mockedPrisma.certification.create).not.toHaveBeenCalled()
    })

    it('should check for existing valid non-expired certification of same type', async () => {
      mockedPrisma.user.findUnique.mockResolvedValue(makeUser())
      mockedPrisma.certification.findFirst.mockResolvedValue(null)
      mockedPrisma.certification.create.mockResolvedValue(makeCertification())

      await createCertification(USER_ID, input)

      expect(mockedPrisma.certification.findFirst).toHaveBeenCalledWith({
        where: {
          userId: USER_ID,
          type: input.type,
          isValid: true,
          expiresAt: { gt: expect.any(Date) }
        }
      })
    })
  })

  // ─── deleteCertification ──────────────────────────────────────────────────────

  describe('deleteCertification', () => {
    it('should delete certification when it belongs to the user', async () => {
      mockedPrisma.certification.findUnique.mockResolvedValue(
        makeCertification()
      )
      mockedPrisma.certification.delete.mockResolvedValue(makeCertification())

      await deleteCertification(USER_ID, CERT_ID)

      expect(mockedPrisma.certification.delete).toHaveBeenCalledWith({
        where: { id: CERT_ID }
      })
    })

    it('should throw 404 when certification does not exist', async () => {
      mockedPrisma.certification.findUnique.mockResolvedValue(null)

      await expect(deleteCertification(USER_ID, CERT_ID)).rejects.toMatchObject(
        { status: 404 }
      )
      expect(mockedPrisma.certification.delete).not.toHaveBeenCalled()
    })

    it('should throw 403 when certification belongs to another user', async () => {
      mockedPrisma.certification.findUnique.mockResolvedValue(
        makeCertification({ userId: OTHER_USER_ID })
      )

      await expect(deleteCertification(USER_ID, CERT_ID)).rejects.toMatchObject(
        { status: 403 }
      )
      expect(mockedPrisma.certification.delete).not.toHaveBeenCalled()
    })

    it('should look up certification by certId', async () => {
      mockedPrisma.certification.findUnique.mockResolvedValue(
        makeCertification()
      )
      mockedPrisma.certification.delete.mockResolvedValue(makeCertification())

      await deleteCertification(USER_ID, CERT_ID)

      expect(mockedPrisma.certification.findUnique).toHaveBeenCalledWith({
        where: { id: CERT_ID }
      })
    })

    it('should return void on success', async () => {
      mockedPrisma.certification.findUnique.mockResolvedValue(
        makeCertification()
      )
      mockedPrisma.certification.delete.mockResolvedValue(makeCertification())

      const result = await deleteCertification(USER_ID, CERT_ID)

      expect(result).toBeUndefined()
    })
  })
})
