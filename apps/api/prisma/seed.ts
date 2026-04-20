import 'dotenv/config'
import { PrismaMariaDb } from '@prisma/adapter-mariadb'
import {
  PrismaClient,
  UserRole,
  LocationType
} from '../generated/prisma/client.js'
import { hash } from '@node-rs/argon2'

const adapter = new PrismaMariaDb({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  port: Number(process.env.DATABASE_PORT),
  allowPublicKeyRetrieval: true,
  connectionLimit: 5
})

const prisma = new PrismaClient({ adapter })

const seedUsers = async (): Promise<void> => {
  console.log('Seeding users...')

  const adminPassword = await hash('Admin1234')
  const managerPassword = await hash('Manager1234')
  const techPassword = await hash('Tech1234')

  await prisma.user.upsert({
    where: { email: 'admin@cmms.com' },
    update: {},
    create: {
      name: 'Admin CMMS',
      email: 'admin@cmms.com',
      passwordHash: adminPassword,
      role: UserRole.ADMIN
    }
  })

  await prisma.user.upsert({
    where: { email: 'manager@cmms.com' },
    update: {},
    create: {
      name: 'Jan Kowalski',
      email: 'manager@cmms.com',
      passwordHash: managerPassword,
      role: UserRole.MANAGER
    }
  })

  await prisma.user.upsert({
    where: { email: 'tech@cmms.com' },
    update: {},
    create: {
      name: 'Piotr Nowak',
      email: 'tech@cmms.com',
      passwordHash: techPassword,
      role: UserRole.TECHNICIAN
    }
  })

  console.log('Users seeded')
}

const seedLocations = async (): Promise<void> => {
  console.log('Seeding locations...')

  const plant = await prisma.location.upsert({
    where: { id: 'seed-plant-001' },
    update: {},
    create: {
      id: 'seed-plant-001',
      name: 'Zakład Główny',
      type: LocationType.PLANT
    }
  })

  const hallA = await prisma.location.upsert({
    where: { id: 'seed-hall-001' },
    update: {},
    create: {
      id: 'seed-hall-001',
      name: 'Hala A',
      type: LocationType.HALL,
      parentId: plant.id
    }
  })

  await prisma.location.upsert({
    where: { id: 'seed-line-001' },
    update: {},
    create: {
      id: 'seed-line-001',
      name: 'Linia produkcyjna 1',
      type: LocationType.LINE,
      parentId: hallA.id
    }
  })

  console.log('Locations seeded')
}

const seedMachines = async (): Promise<void> => {
  console.log('Seeding machines...')

  await prisma.machine.upsert({
    where: { serialNumber: 'SN-CNC-001' },
    update: {},
    create: {
      name: 'CNC Fanuc 30i',
      serialNumber: 'SN-CNC-001',
      locationId: 'seed-line-001',
      operatingHours: 1250,
      purchaseDate: new Date('2022-03-15'),
      purchasePrice: 150000
    }
  })

  await prisma.machine.upsert({
    where: { serialNumber: 'SN-PRESS-001' },
    update: {},
    create: {
      name: 'Prasa hydrauliczna H200',
      serialNumber: 'SN-PRESS-001',
      locationId: 'seed-line-001',
      operatingHours: 3400,
      purchaseDate: new Date('2020-06-01'),
      purchasePrice: 85000
    }
  })

  console.log('Machines seeded')
}

const main = async (): Promise<void> => {
  try {
    await seedUsers()
    await seedLocations()
    await seedMachines()
    console.log('Seeding complete!')
  } catch (error) {
    console.error('Seeding failed:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

main()
