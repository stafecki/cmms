import { HTTPException } from 'hono/http-exception'
import prisma from '../../lib/prisma.js'
import type { User, Certification, Prisma } from '../../../generated/prisma/client.js'
import type {
    UpdateUserInput,
    CreateCertificationInput,
    GetUsersQuery
} from './users.schema.js'

type UserWithCertifications = Prisma.UserGetPayload<{
    select: {
        id: true
        name: true
        email: true
        role: true
        isActive: true
        createdAt: true
        certifications: true
    }
}>

type PaginatedUsers = {
    data: UserWithCertifications[]
    total: number
    limit: number
    offset: number
}

export const getUsers = async (query: GetUsersQuery): Promise<PaginatedUsers> => {
    const where: Prisma.UserWhereInput = {
        ...(query.role ? { role: query.role } : {}),
        ...(query.isActive !== undefined ? { isActive: query.isActive } : {})
    }

    const [data, total] = await Promise.all([
        prisma.user.findMany({
            where,
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                isActive: true,
                createdAt: true,
                certifications: true
            },
            orderBy: { createdAt: 'desc' },
            take: query.limit,
            skip: query.offset
        }),
        prisma.user.count({ where })
    ])

    return { data, total, limit: query.limit, offset: query.offset }
}

export const getUserById = async (id: string): Promise<UserWithCertifications> => {
    const user = await prisma.user.findUnique({
        where: { id },
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            isActive: true,
            createdAt: true,
            certifications: true
        }
    })

    if (!user) {
        throw new HTTPException(404, { message: 'User not found' })
    }

    return user
}

export const updateUser = async (
    id: string,
    input: UpdateUserInput
): Promise<User> => {
    const user = await prisma.user.findUnique({ where: { id } })

    if (!user) {
        throw new HTTPException(404, { message: 'User not found' })
    }

    return prisma.user.update({
        where: { id },
        data: input
    })
}

export const deleteUser = async (id: string): Promise<void> => {
    const user = await prisma.user.findUnique({ where: { id } })

    if (!user) {
        throw new HTTPException(404, { message: 'User not found' })
    }

    if (user.role === 'ADMIN') {
        const adminCount = await prisma.user.count({
            where: { role: 'ADMIN', isActive: true }
        })
        if (adminCount <= 1) {
            throw new HTTPException(400, { message: 'Cannot deactivate the last admin account' })
        }
    }

    await prisma.user.update({
        where: { id },
        data: { isActive: false }
    })
}

export const getCertifications = async (userId: string): Promise<Certification[]> => {
    const user = await prisma.user.findUnique({ where: { id: userId } })

    if (!user) {
        throw new HTTPException(404, { message: 'User not found' })
    }

    return prisma.certification.findMany({
        where: { userId },
        orderBy: { expiresAt: 'asc' }
    })
}

export const createCertification = async (
    userId: string,
    input: CreateCertificationInput
): Promise<Certification> => {
    const user = await prisma.user.findUnique({ where: { id: userId } })

    if (!user) {
        throw new HTTPException(404, { message: 'User not found' })
    }

    const existing = await prisma.certification.findFirst({
        where: {
            userId,
            type: input.type,
            isValid: true,
            expiresAt: { gt: new Date() }
        }
    })

    if (existing) {
        throw new HTTPException(409, {
            message: 'User already has a valid certification of this type'
        })
    }

    return prisma.certification.create({
        data: {
            userId,
            type: input.type,
            issuedAt: input.issuedAt,
            expiresAt: input.expiresAt,
            isValid: true
        }
    })
}

export const deleteCertification = async (
    userId: string,
    certId: string
): Promise<void> => {
    const certification = await prisma.certification.findUnique({
        where: { id: certId }
    })

    if (!certification) {
        throw new HTTPException(404, { message: 'Certification not found' })
    }

    if (certification.userId !== userId) {
        throw new HTTPException(403, { message: 'Certification does not belong to this user' })
    }

    await prisma.certification.delete({ where: { id: certId } })
}
