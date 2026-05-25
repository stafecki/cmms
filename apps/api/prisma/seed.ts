import 'dotenv/config'
import { PrismaMariaDb } from '@prisma/adapter-mariadb'
import {
  PrismaClient,
  UserRole,
  LocationType,
  CertificationType,
  WorkOrderStatus,
  Priority,
  NotificationType
} from '../generated/prisma/client.js'
import { hash } from '@node-rs/argon2'

const adapter = new PrismaMariaDb({
  host: process.env.DATABASE_HOST || 'localhost',
  user: process.env.DATABASE_USER || 'cmms_user',
  password: process.env.DATABASE_PASSWORD || 'cmms_password',
  database: process.env.DATABASE_NAME || 'cmms_db',
  port: Number(process.env.DATABASE_PORT) || 3306,
  allowPublicKeyRetrieval: true,
  connectionLimit: 5
})

const prisma = new PrismaClient({ adapter })

// =============================================================
// UŻYTKOWNICY
// =============================================================
const seedUsers = async () => {
  console.log('🌱 Seeding users...')

  const users = await Promise.all([
    prisma.user.upsert({
      where: { email: 'admin@cmms.com' },
      update: {},
      create: {
        name: 'Adam Kowalski',
        email: 'admin@cmms.com',
        passwordHash: await hash('Admin1234'),
        role: UserRole.ADMIN
      }
    }),
    prisma.user.upsert({
      where: { email: 'manager@cmms.com' },
      update: {},
      create: {
        name: 'Jan Nowak',
        email: 'manager@cmms.com',
        passwordHash: await hash('Manager1234'),
        role: UserRole.MANAGER
      }
    }),
    prisma.user.upsert({
      where: { email: 'tech1@cmms.com' },
      update: {},
      create: {
        name: 'Piotr Wiśniewski',
        email: 'tech1@cmms.com',
        passwordHash: await hash('Tech1234'),
        role: UserRole.TECHNICIAN
      }
    }),
    prisma.user.upsert({
      where: { email: 'tech2@cmms.com' },
      update: {},
      create: {
        name: 'Marek Wójcik',
        email: 'tech2@cmms.com',
        passwordHash: await hash('Tech1234'),
        role: UserRole.TECHNICIAN
      }
    }),
    prisma.user.upsert({
      where: { email: 'warehouse@cmms.com' },
      update: {},
      create: {
        name: 'Tomasz Kowalczyk',
        email: 'warehouse@cmms.com',
        passwordHash: await hash('Warehouse1234'),
        role: UserRole.WAREHOUSE
      }
    }),
    prisma.user.upsert({
      where: { email: 'operator@cmms.com' },
      update: {},
      create: {
        name: 'Anna Kamińska',
        email: 'operator@cmms.com',
        passwordHash: await hash('Operator1234'),
        role: UserRole.OPERATOR
      }
    })
  ])

  console.log(`✅ Seeded ${users.length} users`)
  return users
}

// =============================================================
// CERTYFIKATY — każdy technik ma mix ważnych i wygasłych
// =============================================================
const seedCertifications = async (users: any[]) => {
  console.log('🌱 Seeding certifications...')

  const tech1 = users.find((u) => u.email === 'tech1@cmms.com')
  const tech2 = users.find((u) => u.email === 'tech2@cmms.com')

  await prisma.certification.createMany({
    skipDuplicates: true,
    data: [
      // tech1 – SEP wygasło w 2026-01 (nie odnowione na czas)
      {
        userId: tech1.id,
        type: CertificationType.SEP,
        issuedAt: new Date('2023-01-15'),
        expiresAt: new Date('2026-01-15'),
        isValid: false
      },
      // tech1 – HEIGHT_WORK ważne do 2027
      {
        userId: tech1.id,
        type: CertificationType.HEIGHT_WORK,
        issuedAt: new Date('2024-06-01'),
        expiresAt: new Date('2027-06-01'),
        isValid: true
      },
      // tech1 – GAS wygasa za ~5 tygodni (wyzwala CERT_EXPIRING)
      {
        userId: tech1.id,
        type: CertificationType.GAS,
        issuedAt: new Date('2023-07-01'),
        expiresAt: new Date('2026-07-01'),
        isValid: true
      },
      // tech2 – FORKLIFT ważne do 2027
      {
        userId: tech2.id,
        type: CertificationType.FORKLIFT,
        issuedAt: new Date('2022-03-10'),
        expiresAt: new Date('2027-03-10'),
        isValid: true
      },
      // tech2 – WELDING wygasło w 2024
      {
        userId: tech2.id,
        type: CertificationType.WELDING,
        issuedAt: new Date('2021-09-20'),
        expiresAt: new Date('2024-09-20'),
        isValid: false
      },
      // tech2 – WELDING odnowione w 2025
      {
        userId: tech2.id,
        type: CertificationType.WELDING,
        issuedAt: new Date('2025-01-10'),
        expiresAt: new Date('2028-01-10'),
        isValid: true
      },
      // tech2 – SEP nowe
      {
        userId: tech2.id,
        type: CertificationType.SEP,
        issuedAt: new Date('2025-06-01'),
        expiresAt: new Date('2028-06-01'),
        isValid: true
      }
    ]
  })

  console.log('✅ Seeded 7 certifications')
}

// =============================================================
// LOKALIZACJE
// =============================================================
const seedLocations = async () => {
  console.log('🌱 Seeding locations...')

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
      name: 'Hala A – Produkcja',
      type: LocationType.HALL,
      parentId: plant.id
    }
  })

  const hallB = await prisma.location.upsert({
    where: { id: 'seed-hall-002' },
    update: {},
    create: {
      id: 'seed-hall-002',
      name: 'Hala B – Montaż',
      type: LocationType.HALL,
      parentId: plant.id
    }
  })

  const line1 = await prisma.location.upsert({
    where: { id: 'seed-line-001' },
    update: {},
    create: {
      id: 'seed-line-001',
      name: 'Linia produkcyjna 1',
      type: LocationType.LINE,
      parentId: hallA.id
    }
  })

  const line2 = await prisma.location.upsert({
    where: { id: 'seed-line-002' },
    update: {},
    create: {
      id: 'seed-line-002',
      name: 'Linia produkcyjna 2',
      type: LocationType.LINE,
      parentId: hallA.id
    }
  })

  const line3 = await prisma.location.upsert({
    where: { id: 'seed-line-003' },
    update: {},
    create: {
      id: 'seed-line-003',
      name: 'Linia montażowa 1',
      type: LocationType.LINE,
      parentId: hallB.id
    }
  })

  const stationCnc = await prisma.location.upsert({
    where: { id: 'seed-station-001' },
    update: {},
    create: {
      id: 'seed-station-001',
      name: 'Stanowisko CNC',
      type: LocationType.STATION,
      parentId: line1.id
    }
  })

  const stationWeld = await prisma.location.upsert({
    where: { id: 'seed-station-002' },
    update: {},
    create: {
      id: 'seed-station-002',
      name: 'Stanowisko spawalnicze',
      type: LocationType.STATION,
      parentId: line2.id
    }
  })

  console.log('✅ Seeded locations')
  return { line1, line2, line3, stationCnc, stationWeld }
}

// =============================================================
// MASZYNY — 6 maszyn pokrywających wszystkie lokalizacje
// =============================================================
const seedMachines = async (locations: any) => {
  console.log('🌱 Seeding machines...')

  const machines = await Promise.all([
    prisma.machine.upsert({
      where: { serialNumber: 'SN-CNC-001' },
      update: {},
      create: {
        name: 'CNC Fanuc 30i',
        serialNumber: 'SN-CNC-001',
        locationId: locations.stationCnc.id,
        operatingHours: 4250,
        purchaseDate: new Date('2020-03-15'),
        purchasePrice: 185000
      }
    }),
    prisma.machine.upsert({
      where: { serialNumber: 'SN-PRESS-001' },
      update: {},
      create: {
        name: 'Prasa hydrauliczna H200',
        serialNumber: 'SN-PRESS-001',
        locationId: locations.line1.id,
        operatingHours: 6800,
        purchaseDate: new Date('2018-06-01'),
        purchasePrice: 95000
      }
    }),
    prisma.machine.upsert({
      where: { serialNumber: 'SN-WELD-001' },
      update: {},
      create: {
        name: 'Spawarka MIG/MAG Lincoln',
        serialNumber: 'SN-WELD-001',
        locationId: locations.stationWeld.id,
        operatingHours: 2100,
        purchaseDate: new Date('2022-01-10'),
        purchasePrice: 28000
      }
    }),
    prisma.machine.upsert({
      where: { serialNumber: 'SN-ROBOT-001' },
      update: {},
      create: {
        name: 'Robot spawalniczy KUKA KR6',
        serialNumber: 'SN-ROBOT-001',
        locationId: locations.line2.id,
        operatingHours: 1540,
        purchaseDate: new Date('2023-09-01'),
        purchasePrice: 320000
      }
    }),
    prisma.machine.upsert({
      where: { serialNumber: 'SN-CONV-001' },
      update: {},
      create: {
        name: 'Przenośnik taśmowy PT-50',
        serialNumber: 'SN-CONV-001',
        locationId: locations.line3.id,
        operatingHours: 9200,
        purchaseDate: new Date('2016-08-20'),
        purchasePrice: 45000
      }
    }),
    prisma.machine.upsert({
      where: { serialNumber: 'SN-COMP-001' },
      update: {},
      create: {
        name: 'Kompresor Atlas Copco GA22',
        serialNumber: 'SN-COMP-001',
        locationId: locations.line1.id,
        operatingHours: 11500,
        purchaseDate: new Date('2015-04-12'),
        purchasePrice: 62000
      }
    })
  ])

  console.log(`✅ Seeded ${machines.length} machines`)
  return machines
}

// =============================================================
// DOKUMENTY MASZYN
// =============================================================
const seedMachineDocuments = async (users: any[], machines: any[]) => {
  console.log('🌱 Seeding machine documents...')

  const admin = users.find((u) => u.role === UserRole.ADMIN)
  const manager = users.find((u) => u.role === UserRole.MANAGER)

  const cnc = machines.find((m) => m.serialNumber === 'SN-CNC-001')
  const press = machines.find((m) => m.serialNumber === 'SN-PRESS-001')
  const robot = machines.find((m) => m.serialNumber === 'SN-ROBOT-001')
  const compressor = machines.find((m) => m.serialNumber === 'SN-COMP-001')

  await prisma.machineDocument.createMany({
    skipDuplicates: true,
    data: [
      // CNC – instrukcja obsługi (starsza wersja)
      {
        machineId: cnc.id,
        uploadedById: admin.id,
        filename: 'instrukcja-obslugi-fanuc-30i-v1.pdf',
        filePath: `uploads/machines/${cnc.id}/20240101-instrukcja-obslugi-fanuc-30i-v1.pdf`,
        version: 1,
        isLatest: false,
        uploadedAt: new Date('2024-01-01T09:00:00')
      },
      // CNC – instrukcja obsługi (aktualna wersja)
      {
        machineId: cnc.id,
        uploadedById: manager.id,
        filename: 'instrukcja-obslugi-fanuc-30i-v2.pdf',
        filePath: `uploads/machines/${cnc.id}/20250301-instrukcja-obslugi-fanuc-30i-v2.pdf`,
        version: 2,
        isLatest: true,
        uploadedAt: new Date('2025-03-01T10:00:00')
      },
      // CNC – protokół przeglądu 2026-03
      {
        machineId: cnc.id,
        uploadedById: manager.id,
        filename: 'protokol-przegladu-2026-03.pdf',
        filePath: `uploads/machines/${cnc.id}/20260310-protokol-przegladu-2026-03.pdf`,
        version: 1,
        isLatest: true,
        uploadedAt: new Date('2026-03-10T13:00:00')
      },
      // Prasa – schemat hydrauliczny
      {
        machineId: press.id,
        uploadedById: admin.id,
        filename: 'schemat-hydrauliczny-H200.pdf',
        filePath: `uploads/machines/${press.id}/20230601-schemat-hydrauliczny-H200.pdf`,
        version: 1,
        isLatest: true,
        uploadedAt: new Date('2023-06-01T08:00:00')
      },
      // Robot – instrukcja bezpieczeństwa
      {
        machineId: robot.id,
        uploadedById: admin.id,
        filename: 'instrukcja-bezpieczenstwa-kuka-kr6.pdf',
        filePath: `uploads/machines/${robot.id}/20231001-instrukcja-bezpieczenstwa-kuka-kr6.pdf`,
        version: 1,
        isLatest: true,
        uploadedAt: new Date('2023-10-01T09:00:00')
      },
      // Kompresor – karta techniczna
      {
        machineId: compressor.id,
        uploadedById: admin.id,
        filename: 'karta-techniczna-atlas-copco-ga22.pdf',
        filePath: `uploads/machines/${compressor.id}/20150501-karta-techniczna-atlas-copco-ga22.pdf`,
        version: 1,
        isLatest: true,
        uploadedAt: new Date('2015-05-01T09:00:00')
      }
    ]
  })

  console.log('✅ Seeded 6 machine documents')
}

// =============================================================
// KATEGORIE I CZĘŚCI — różnorodne stany magazynowe
// =============================================================
const seedInventory = async () => {
  console.log('🌱 Seeding inventory...')

  const categories = await Promise.all([
    prisma.partCategory.upsert({
      where: { name: 'Łożyska' },
      update: {},
      create: { name: 'Łożyska' }
    }),
    prisma.partCategory.upsert({
      where: { name: 'Uszczelnienia' },
      update: {},
      create: { name: 'Uszczelnienia' }
    }),
    prisma.partCategory.upsert({
      where: { name: 'Paski i łańcuchy' },
      update: {},
      create: { name: 'Paski i łańcuchy' }
    }),
    prisma.partCategory.upsert({
      where: { name: 'Filtry' },
      update: {},
      create: { name: 'Filtry' }
    }),
    prisma.partCategory.upsert({
      where: { name: 'Elektronika' },
      update: {},
      create: { name: 'Elektronika' }
    }),
    prisma.partCategory.upsert({
      where: { name: 'Narzędzia' },
      update: {},
      create: { name: 'Narzędzia' }
    })
  ])

  const [bearings, seals, belts, filters, electronics, tools] = categories

  const parts = await Promise.all([
    prisma.part.upsert({
      where: { qrCode: 'QR-001' },
      update: {},
      create: {
        categoryId: bearings.id,
        name: 'Łożysko SKF 6205',
        stockQuantity: 15,
        reorderPoint: 5,
        unitPrice: 45.99,
        qrCode: 'QR-001'
      }
    }),
    prisma.part.upsert({
      where: { qrCode: 'QR-002' },
      update: {},
      create: {
        categoryId: bearings.id,
        name: 'Łożysko FAG 6308',
        stockQuantity: 8,
        reorderPoint: 3,
        unitPrice: 89.5,
        qrCode: 'QR-002'
      }
    }),
    prisma.part.upsert({
      where: { qrCode: 'QR-003' },
      update: {},
      create: {
        categoryId: seals.id,
        name: 'Uszczelnienie simmering 30x52x10',
        stockQuantity: 20,
        reorderPoint: 8,
        unitPrice: 12.5,
        qrCode: 'QR-003'
      }
    }),
    // Poniżej punktu zamówienia – alert magazynowy
    prisma.part.upsert({
      where: { qrCode: 'QR-004' },
      update: {},
      create: {
        categoryId: seals.id,
        name: 'O-ring NBR 50x3',
        stockQuantity: 2,
        reorderPoint: 10,
        unitPrice: 2.3,
        qrCode: 'QR-004'
      }
    }),
    prisma.part.upsert({
      where: { qrCode: 'QR-005' },
      update: {},
      create: {
        categoryId: belts.id,
        name: 'Pasek klinowy SPB-1800',
        stockQuantity: 6,
        reorderPoint: 2,
        unitPrice: 35.0,
        qrCode: 'QR-005'
      }
    }),
    // Poniżej punktu zamówienia – alert magazynowy
    prisma.part.upsert({
      where: { qrCode: 'QR-006' },
      update: {},
      create: {
        categoryId: filters.id,
        name: 'Filtr oleju hydraulicznego HF35',
        stockQuantity: 1,
        reorderPoint: 3,
        unitPrice: 78.0,
        qrCode: 'QR-006'
      }
    }),
    prisma.part.upsert({
      where: { qrCode: 'QR-007' },
      update: {},
      create: {
        categoryId: filters.id,
        name: 'Filtr powietrza AF25',
        stockQuantity: 12,
        reorderPoint: 4,
        unitPrice: 42.0,
        qrCode: 'QR-007'
      }
    }),
    prisma.part.upsert({
      where: { qrCode: 'QR-008' },
      update: {},
      create: {
        categoryId: electronics.id,
        name: 'Czujnik indukcyjny PNP M12',
        stockQuantity: 5,
        reorderPoint: 2,
        unitPrice: 125.0,
        qrCode: 'QR-008'
      }
    }),
    prisma.part.upsert({
      where: { qrCode: 'QR-009' },
      update: {},
      create: {
        categoryId: electronics.id,
        name: 'Przekaźnik Schneider RXM4AB1P7',
        stockQuantity: 10,
        reorderPoint: 3,
        unitPrice: 65.0,
        qrCode: 'QR-009'
      }
    }),
    prisma.part.upsert({
      where: { qrCode: 'QR-010' },
      update: {},
      create: {
        categoryId: tools.id,
        name: 'Klucz dynamometryczny 40-200Nm',
        stockQuantity: 3,
        reorderPoint: 1,
        unitPrice: 320.0,
        qrCode: 'QR-010'
      }
    })
  ])

  console.log(
    `✅ Seeded ${categories.length} categories and ${parts.length} parts`
  )
  return parts
}

// =============================================================
// ZLECENIA NAPRAWCZE — wszystkie statusy, wszystkie maszyny
// =============================================================
const seedWorkOrders = async (users: any[], machines: any[], parts: any[]) => {
  console.log('🌱 Seeding work orders...')

  const admin = users.find((u) => u.role === UserRole.ADMIN)
  const manager = users.find((u) => u.role === UserRole.MANAGER)
  const tech1 = users.find((u) => u.email === 'tech1@cmms.com')
  const tech2 = users.find((u) => u.email === 'tech2@cmms.com')
  const operator = users.find((u) => u.role === UserRole.OPERATOR)

  const cnc = machines.find((m) => m.serialNumber === 'SN-CNC-001')
  const press = machines.find((m) => m.serialNumber === 'SN-PRESS-001')
  const welder = machines.find((m) => m.serialNumber === 'SN-WELD-001')
  const robot = machines.find((m) => m.serialNumber === 'SN-ROBOT-001')
  const conveyor = machines.find((m) => m.serialNumber === 'SN-CONV-001')
  const compressor = machines.find((m) => m.serialNumber === 'SN-COMP-001')

  // --- WO1: CNC – COMPLETED (marzec, tech1) ---
  const wo1 = await prisma.workOrder.create({
    data: {
      machineId: cnc.id,
      reportedById: operator.id,
      assignedToId: tech1.id,
      title: 'Wymiana łożyska wrzeciona',
      description:
        'Wrzeciono wydaje głośny dźwięk podczas pracy. Konieczna wymiana łożyska.',
      priority: Priority.HIGH,
      status: WorkOrderStatus.COMPLETED,
      bhpConfirmed: true,
      laborCost: 450.0,
      partsCost: 89.5,
      startedAt: new Date('2026-03-10T08:00:00'),
      closedAt: new Date('2026-03-10T12:30:00'),
      createdAt: new Date('2026-03-09T14:00:00')
    }
  })

  await prisma.workOrderPart.create({
    data: {
      workOrderId: wo1.id,
      partId: parts.find((p) => p.qrCode === 'QR-002').id,
      quantity: 1
    }
  })

  await prisma.workOrderMessage.createMany({
    data: [
      {
        workOrderId: wo1.id,
        userId: tech1.id,
        content: 'Rozpoczynam diagnostykę wrzeciona.',
        sentAt: new Date('2026-03-10T08:15:00')
      },
      {
        workOrderId: wo1.id,
        userId: tech1.id,
        content: 'Łożysko FAG 6308 wymienione. Maszyna działa poprawnie.',
        sentAt: new Date('2026-03-10T12:20:00')
      },
      {
        workOrderId: wo1.id,
        userId: manager.id,
        content: 'Zlecenie zatwierdzone. Dobra robota.',
        sentAt: new Date('2026-03-10T12:45:00')
      }
    ]
  })

  // --- WO2: Prasa – COMPLETED (marzec, tech2) ---
  const wo2 = await prisma.workOrder.create({
    data: {
      machineId: press.id,
      reportedById: operator.id,
      assignedToId: tech2.id,
      title: 'Wymiana uszczelnień siłownika hydraulicznego',
      description:
        'Zauważono wyciek oleju hydraulicznego z siłownika głównego.',
      priority: Priority.CRITICAL,
      status: WorkOrderStatus.COMPLETED,
      bhpConfirmed: true,
      laborCost: 320.0,
      partsCost: 37.5,
      startedAt: new Date('2026-03-15T09:00:00'),
      closedAt: new Date('2026-03-15T14:00:00'),
      createdAt: new Date('2026-03-15T07:30:00')
    }
  })

  await prisma.workOrderPart.createMany({
    data: [
      {
        workOrderId: wo2.id,
        partId: parts.find((p) => p.qrCode === 'QR-003').id,
        quantity: 2
      },
      {
        workOrderId: wo2.id,
        partId: parts.find((p) => p.qrCode === 'QR-004').id,
        quantity: 5
      }
    ]
  })

  await prisma.workOrderMessage.createMany({
    data: [
      {
        workOrderId: wo2.id,
        userId: tech2.id,
        content: 'Wyciek potwierdzony. Zamawiamy uszczelnienia.',
        sentAt: new Date('2026-03-15T09:30:00')
      },
      {
        workOrderId: wo2.id,
        userId: tech2.id,
        content: 'Uszczelnienia wymienione. Brak wycieku.',
        sentAt: new Date('2026-03-15T13:45:00')
      },
      {
        workOrderId: wo2.id,
        userId: manager.id,
        content: 'Zlecenie zamknięte. Stan na magazynie O-ringów krytyczny.',
        sentAt: new Date('2026-03-15T14:15:00')
      }
    ]
  })

  // --- WO3: Przenośnik – IN_PROGRESS (kwiecień, tech1) ---
  const wo3 = await prisma.workOrder.create({
    data: {
      machineId: conveyor.id,
      reportedById: operator.id,
      assignedToId: tech1.id,
      title: 'Wymiana paska napędowego',
      description: 'Pasek napędowy pęknięty, przenośnik zatrzymany.',
      priority: Priority.HIGH,
      status: WorkOrderStatus.IN_PROGRESS,
      bhpConfirmed: true,
      startedAt: new Date('2026-04-01T08:00:00'),
      createdAt: new Date('2026-04-01T07:00:00')
    }
  })

  await prisma.workOrderPart.create({
    data: {
      workOrderId: wo3.id,
      partId: parts.find((p) => p.qrCode === 'QR-005').id,
      quantity: 2
    }
  })

  await prisma.workOrderMessage.createMany({
    data: [
      {
        workOrderId: wo3.id,
        userId: tech1.id,
        content:
          'Przystępuję do wymiany paska. Przenośnik odłączony od zasilania.',
        sentAt: new Date('2026-04-01T08:20:00')
      },
      {
        workOrderId: wo3.id,
        userId: tech1.id,
        content:
          'Pasek zdjęty. Czekam na dostarczenie nowego z magazynu – ma dojść dziś po południu.',
        sentAt: new Date('2026-04-01T10:00:00')
      }
    ]
  })

  // --- WO4: Kompresor – NEW (kwiecień, bez technika) ---
  const wo4 = await prisma.workOrder.create({
    data: {
      machineId: compressor.id,
      reportedById: operator.id,
      title: 'Wymiana filtra powietrza i oleju',
      description:
        'Minął termin okresowej wymiany filtrów. Filtr powietrza mocno zabrudzony.',
      priority: Priority.MEDIUM,
      status: WorkOrderStatus.NEW,
      createdAt: new Date('2026-04-10T10:00:00')
    }
  })

  // --- WO5: CNC – NEW CRITICAL (kwiecień, bez technika) ---
  const wo5 = await prisma.workOrder.create({
    data: {
      machineId: cnc.id,
      reportedById: operator.id,
      title: 'Awaria czujnika pozycji osi X',
      description:
        'Maszyna zgłasza błąd E001 – brak sygnału z czujnika pozycji osi X.',
      priority: Priority.CRITICAL,
      status: WorkOrderStatus.NEW,
      createdAt: new Date('2026-04-15T13:30:00')
    }
  })

  // --- WO6: Prasa – WAITING_FOR_PARTS (kwiecień, tech2) ---
  const wo6 = await prisma.workOrder.create({
    data: {
      machineId: press.id,
      reportedById: manager.id,
      assignedToId: tech2.id,
      title: 'Przegląd układu hydraulicznego',
      description:
        'Planowy przegląd układu hydraulicznego po 500 godzinach pracy.',
      priority: Priority.LOW,
      status: WorkOrderStatus.WAITING_FOR_PARTS,
      bhpConfirmed: true,
      startedAt: new Date('2026-04-18T08:00:00'),
      createdAt: new Date('2026-04-17T15:00:00')
    }
  })

  await prisma.workOrderMessage.createMany({
    data: [
      {
        workOrderId: wo6.id,
        userId: tech2.id,
        content:
          'Przegląd rozpoczęty. Filtr hydrauliczny HF35 do wymiany – stan magazynowy krytyczny.',
        sentAt: new Date('2026-04-18T08:30:00')
      },
      {
        workOrderId: wo6.id,
        userId: manager.id,
        content: 'Zamówiłem filtr. Dostawa przewidywana na 2026-04-24.',
        sentAt: new Date('2026-04-18T09:00:00')
      }
    ]
  })

  // --- WO7: Spawarka – COMPLETED (styczeń, tech2) ---
  const wo7 = await prisma.workOrder.create({
    data: {
      machineId: welder.id,
      reportedById: tech2.id,
      assignedToId: tech2.id,
      title: 'Wymiana dyszy i elektrody spawarki',
      description:
        'Dysza i elektroda spawarki wyeksploatowane. Jakość spoiny pogorszona. Konieczna natychmiastowa wymiana.',
      priority: Priority.MEDIUM,
      status: WorkOrderStatus.COMPLETED,
      bhpConfirmed: true,
      laborCost: 180.0,
      partsCost: 45.0,
      startedAt: new Date('2026-01-15T09:00:00'),
      closedAt: new Date('2026-01-15T11:30:00'),
      createdAt: new Date('2026-01-15T08:00:00')
    }
  })

  await prisma.workOrderMessage.createMany({
    data: [
      {
        workOrderId: wo7.id,
        userId: tech2.id,
        content: 'Dysza i elektroda wymienione. Spoina poprawna – test zakończony.',
        sentAt: new Date('2026-01-15T11:15:00')
      },
      {
        workOrderId: wo7.id,
        userId: manager.id,
        content: 'Zatwierdzone. Dokumentacja uzupełniona.',
        sentAt: new Date('2026-01-15T12:00:00')
      }
    ]
  })

  // --- WO8: Spawarka – IN_PROGRESS (maj, tech1) ---
  const wo8 = await prisma.workOrder.create({
    data: {
      machineId: welder.id,
      reportedById: operator.id,
      assignedToId: tech1.id,
      title: 'Usterka podajnika drutu spawalniczego',
      description:
        'Podajnik drutu zacina się co 5-10 minut. Praca spawarki niestabilna. Wymaga przeglądu mechanizmu podawania.',
      priority: Priority.HIGH,
      status: WorkOrderStatus.IN_PROGRESS,
      bhpConfirmed: true,
      startedAt: new Date('2026-05-20T08:00:00'),
      createdAt: new Date('2026-05-19T16:00:00')
    }
  })

  await prisma.workOrderPart.create({
    data: {
      workOrderId: wo8.id,
      partId: parts.find((p) => p.qrCode === 'QR-009').id,
      quantity: 2
    }
  })

  await prisma.workOrderMessage.createMany({
    data: [
      {
        workOrderId: wo8.id,
        userId: tech1.id,
        content: 'Diagnozuję mechanizm podajnika. Widoczne zużycie rolek prowadzących.',
        sentAt: new Date('2026-05-20T08:30:00')
      },
      {
        workOrderId: wo8.id,
        userId: tech1.id,
        content: 'Wymieniam rolki. Czekam na przekaźniki sterujące z magazynu.',
        sentAt: new Date('2026-05-20T11:00:00')
      }
    ]
  })

  // --- WO9: Robot – NEW CRITICAL (maj, bez technika) ---
  const wo9 = await prisma.workOrder.create({
    data: {
      machineId: robot.id,
      reportedById: operator.id,
      title: 'Błąd kalibracji osi robota – zatrzymanie awaryjne',
      description:
        'Robot zgłosił błąd E-STOP podczas cyklu produkcyjnego. Kontroler wyświetla kod 0x03A2 – błąd enkodera osi 3. Linia 2 wstrzymana.',
      priority: Priority.CRITICAL,
      status: WorkOrderStatus.NEW,
      createdAt: new Date('2026-05-23T14:15:00')
    }
  })

  // --- WO10: Kompresor – CANCELLED (luty, fałszywy alarm) ---
  const wo10 = await prisma.workOrder.create({
    data: {
      machineId: compressor.id,
      reportedById: operator.id,
      assignedToId: tech1.id,
      title: 'Podejrzenie wycieku oleju sprężarki',
      description:
        'Operator zgłosił plamy oleju pod kompresorem. Po inspekcji okazało się to być wyciek z górnej instalacji (nie z maszyny).',
      priority: Priority.HIGH,
      status: WorkOrderStatus.CANCELLED,
      bhpConfirmed: false,
      startedAt: new Date('2026-02-10T10:00:00'),
      closedAt: new Date('2026-02-10T11:00:00'),
      createdAt: new Date('2026-02-10T09:30:00')
    }
  })

  await prisma.workOrderMessage.createMany({
    data: [
      {
        workOrderId: wo10.id,
        userId: tech1.id,
        content: 'Inspekcja zakończona. Wyciek pochodzi z rury instalacji wodnej nad maszyną, nie z kompresora. Zlecam hydraulika budynkowego.',
        sentAt: new Date('2026-02-10T10:45:00')
      },
      {
        workOrderId: wo10.id,
        userId: manager.id,
        content: 'Zlecenie anulowane – fałszywy alarm. Hydraulik budynkowy podjął interwencję.',
        sentAt: new Date('2026-02-10T11:00:00')
      }
    ]
  })

  console.log('✅ Seeded 10 work orders')
  return [wo1, wo2, wo3, wo4, wo5, wo6, wo7, wo8, wo9, wo10]
}

// =============================================================
// PLANY PREWENCYJNE — wszystkie maszyny, mix dat
// =============================================================
const seedPreventivePlans = async (machines: any[]) => {
  console.log('🌱 Seeding preventive plans...')

  const cnc = machines.find((m) => m.serialNumber === 'SN-CNC-001')
  const press = machines.find((m) => m.serialNumber === 'SN-PRESS-001')
  const welder = machines.find((m) => m.serialNumber === 'SN-WELD-001')
  const robot = machines.find((m) => m.serialNumber === 'SN-ROBOT-001')
  const conveyor = machines.find((m) => m.serialNumber === 'SN-CONV-001')
  const compressor = machines.find((m) => m.serialNumber === 'SN-COMP-001')

  await Promise.all([
    // CNC – miesięczny (termin nadchodzi za tydzień)
    prisma.preventivePlan.create({
      data: {
        machineId: cnc.id,
        name: 'Przegląd miesięczny CNC',
        intervalDays: 30,
        advanceDays: 7,
        checklist: [
          { step: 1, label: 'Sprawdź poziom oleju smarującego', done: false },
          { step: 2, label: 'Wyczyść filtry układu chłodzenia', done: false },
          { step: 3, label: 'Sprawdź luzy prowadnic liniowych', done: false },
          { step: 4, label: 'Skalibruj narzędzia pomiarowe', done: false },
          { step: 5, label: 'Sprawdź stan elektrycznych połączeń', done: false }
        ],
        lastRunAt: new Date('2026-05-01'),
        nextRunAt: new Date('2026-06-01')
      }
    }),
    // CNC – co 500h (przeterminowany od maja)
    prisma.preventivePlan.create({
      data: {
        machineId: cnc.id,
        name: 'Przegląd 500h CNC',
        intervalHours: 500,
        advanceDays: 14,
        checklist: [
          { step: 1, label: 'Wymień olej w głowicy wrzeciona', done: false },
          { step: 2, label: 'Sprawdź i wyreguluj napięcie pasków', done: false },
          { step: 3, label: 'Sprawdź łożyska wrzeciona', done: false }
        ],
        lastRunAt: new Date('2026-01-25'),
        nextRunAt: new Date('2026-04-25')
      }
    }),
    // Prasa – hydraulika (przeterminowany)
    prisma.preventivePlan.create({
      data: {
        machineId: press.id,
        name: 'Przegląd układu hydraulicznego',
        intervalDays: 90,
        advanceDays: 14,
        checklist: [
          { step: 1, label: 'Sprawdź poziom oleju hydraulicznego', done: false },
          { step: 2, label: 'Wymień filtr hydrauliczny', done: false },
          { step: 3, label: 'Sprawdź ciśnienie robocze układu', done: false },
          { step: 4, label: 'Sprawdź szczelność wszystkich połączeń', done: false }
        ],
        lastRunAt: new Date('2026-01-22'),
        nextRunAt: new Date('2026-04-22')
      }
    }),
    // Kompresor – półroczny serwis (przeterminowany)
    prisma.preventivePlan.create({
      data: {
        machineId: compressor.id,
        name: 'Serwis kompresora',
        intervalDays: 180,
        advanceDays: 21,
        checklist: [
          { step: 1, label: 'Wymień olej sprężarkowy', done: false },
          { step: 2, label: 'Wymień filtr powietrza', done: false },
          { step: 3, label: 'Wymień filtr oleju', done: false },
          { step: 4, label: 'Sprawdź zawór bezpieczeństwa', done: false },
          { step: 5, label: 'Sprawdź paski napędowe', done: false },
          { step: 6, label: 'Sprawdź łożyska silnika elektrycznego', done: false }
        ],
        lastRunAt: new Date('2025-11-10'),
        nextRunAt: new Date('2026-05-10')
      }
    }),
    // Spawarka – kwartalny (termin za ~5 tygodni)
    prisma.preventivePlan.create({
      data: {
        machineId: welder.id,
        name: 'Przegląd kwartalny spawarki',
        intervalDays: 90,
        advanceDays: 10,
        checklist: [
          { step: 1, label: 'Sprawdź stan uchwytu spawalniczego', done: false },
          { step: 2, label: 'Wyczyść kanały gazowe', done: false },
          { step: 3, label: 'Sprawdź kalibrację napięcia łuku', done: false },
          { step: 4, label: 'Skontroluj przewody i złącza', done: false }
        ],
        lastRunAt: new Date('2026-04-01'),
        nextRunAt: new Date('2026-07-01')
      }
    }),
    // Przenośnik – miesięczny przegląd taśmy (za 3 dni)
    prisma.preventivePlan.create({
      data: {
        machineId: conveyor.id,
        name: 'Przegląd miesięczny przenośnika',
        intervalDays: 30,
        advanceDays: 5,
        checklist: [
          { step: 1, label: 'Sprawdź napięcie taśmy przenośnika', done: false },
          { step: 2, label: 'Sprawdź stan rolek podporowych', done: false },
          { step: 3, label: 'Posmaruj łożyska rolek', done: false },
          { step: 4, label: 'Sprawdź stan napędowego bębna', done: false }
        ],
        lastRunAt: new Date('2026-04-28'),
        nextRunAt: new Date('2026-05-28')
      }
    }),
    // Robot – co 60 dni (termin za 3 tygodnie)
    prisma.preventivePlan.create({
      data: {
        machineId: robot.id,
        name: 'Przegląd dwumiesięczny robota',
        intervalDays: 60,
        advanceDays: 14,
        checklist: [
          { step: 1, label: 'Sprawdź kalibrację osi 1-6', done: false },
          { step: 2, label: 'Wymień smar w przekładniach', done: false },
          { step: 3, label: 'Sprawdź przewody okablowania', done: false },
          { step: 4, label: 'Zaktualizuj backup programów robota', done: false },
          { step: 5, label: 'Test bezpieczeństwa strefy pracy', done: false }
        ],
        lastRunAt: new Date('2026-04-15'),
        nextRunAt: new Date('2026-06-15')
      }
    })
  ])

  console.log('✅ Seeded 7 preventive plans')
}

// =============================================================
// POWIADOMIENIA — wszyscy użytkownicy mają powiadomienia
// =============================================================
const seedNotifications = async (users: any[]) => {
  console.log('🌱 Seeding notifications...')

  const admin = users.find((u) => u.role === UserRole.ADMIN)
  const manager = users.find((u) => u.role === UserRole.MANAGER)
  const tech1 = users.find((u) => u.email === 'tech1@cmms.com')
  const tech2 = users.find((u) => u.email === 'tech2@cmms.com')
  const warehouse = users.find((u) => u.role === UserRole.WAREHOUSE)
  const operator = users.find((u) => u.role === UserRole.OPERATOR)

  await prisma.notification.createMany({
    data: [
      // ADMIN – 3 powiadomienia
      {
        userId: admin.id,
        type: NotificationType.ANNOUNCEMENT,
        title: 'Witaj w systemie CMMS',
        message:
          'System CMMS został pomyślnie uruchomiony. Możesz rozpocząć pracę.',
        isRead: true,
        createdAt: new Date('2026-03-01T08:00:00')
      },
      {
        userId: admin.id,
        type: NotificationType.REORDER_ALERT,
        title: 'Niski stan magazynowy – O-ring NBR 50x3',
        message:
          'Część "O-ring NBR 50x3" spadła poniżej punktu zamówienia. Stan: 2 szt., minimum: 10 szt.',
        isRead: false,
        createdAt: new Date('2026-04-10T10:00:00')
      },
      {
        userId: admin.id,
        type: NotificationType.REORDER_ALERT,
        title: 'Niski stan magazynowy – Filtr hydrauliczny HF35',
        message:
          'Część "Filtr oleju hydraulicznego HF35" poniżej punktu zamówienia. Stan: 1 szt., minimum: 3 szt.',
        isRead: false,
        createdAt: new Date('2026-04-18T09:05:00')
      },

      // MANAGER – 3 powiadomienia
      {
        userId: manager.id,
        type: NotificationType.CRITICAL_FAILURE,
        title: 'Awaria krytyczna – CNC Fanuc 30i',
        message:
          'Zgłoszono awarię krytyczną maszyny CNC Fanuc 30i. Czujnik pozycji osi X nie odpowiada.',
        isRead: false,
        createdAt: new Date('2026-04-15T13:35:00')
      },
      {
        userId: manager.id,
        type: NotificationType.PREVENTIVE_DUE,
        title: 'Przeterminowany przegląd – Prasa H200',
        message:
          'Termin przeglądu układu hydraulicznego prasy H200 minął 2026-04-22. Wymagana natychmiastowa akcja.',
        isRead: false,
        createdAt: new Date('2026-04-22T06:00:00')
      },
      {
        userId: manager.id,
        type: NotificationType.CRITICAL_FAILURE,
        title: 'Awaria krytyczna – Robot KUKA KR6',
        message:
          'Robot spawalniczy KUKA KR6 zatrzymał się awaryjnie (błąd enkodera osi 3). Linia 2 wstrzymana.',
        isRead: false,
        createdAt: new Date('2026-05-23T14:20:00')
      },

      // TECH1 – 2 powiadomienia
      {
        userId: tech1.id,
        type: NotificationType.WORK_ORDER_ASSIGNED,
        title: 'Nowe zlecenie – Przenośnik PT-50',
        message:
          'Przypisano Ci zlecenie: "Wymiana paska napędowego" – przenośnik PT-50. Priorytet: WYSOKI.',
        isRead: true,
        createdAt: new Date('2026-04-01T07:05:00')
      },
      {
        userId: tech1.id,
        type: NotificationType.CERT_EXPIRING,
        title: 'Wygasający certyfikat GAS',
        message:
          'Certyfikat GAS wygasa 2026-07-01 (za ~5 tygodni). Skontaktuj się z działem HR w sprawie odnowienia.',
        isRead: false,
        createdAt: new Date('2026-05-20T06:00:00')
      },

      // TECH2 – 2 powiadomienia
      {
        userId: tech2.id,
        type: NotificationType.WORK_ORDER_ASSIGNED,
        title: 'Nowe zlecenie – Prasa H200',
        message:
          'Przypisano Ci zlecenie: "Przegląd układu hydraulicznego" – Prasa H200. Oczekiwanie na części.',
        isRead: true,
        createdAt: new Date('2026-04-17T15:05:00')
      },
      {
        userId: tech2.id,
        type: NotificationType.PREVENTIVE_DUE,
        title: 'Przegląd kompresora przeterminowany',
        message:
          'Serwis kompresora Atlas Copco GA22 był zaplanowany na 2026-05-10. Wymagane niezwłoczne wykonanie.',
        isRead: false,
        createdAt: new Date('2026-05-10T06:00:00')
      },

      // WAREHOUSE – 2 powiadomienia
      {
        userId: warehouse.id,
        type: NotificationType.REORDER_ALERT,
        title: 'PILNE: Krytyczny stan magazynowy',
        message:
          'Dwie pozycje poniżej punktu zamówienia: "O-ring NBR 50x3" (2/10) oraz "Filtr hydrauliczny HF35" (1/3). Prosimy o natychmiastowe zamówienie.',
        isRead: false,
        createdAt: new Date('2026-04-18T09:10:00')
      },
      {
        userId: warehouse.id,
        type: NotificationType.ANNOUNCEMENT,
        title: 'Inwentaryzacja magazynu – 2026-05-31',
        message:
          'Przypomnienie: inwentaryzacja roczna magazynu zaplanowana na 2026-05-31. Prosimy o aktualizację stanów.',
        isRead: false,
        createdAt: new Date('2026-05-15T08:00:00')
      },

      // OPERATOR – 1 powiadomienie
      {
        userId: operator.id,
        type: NotificationType.ANNOUNCEMENT,
        title: 'Planowe wyłączenie Linii 2 – 2026-05-28',
        message:
          'Informujemy o planowym wyłączeniu Linii 2 (Hala A) w dniu 2026-05-28 (środa) od 06:00 do 14:00 w celu przeprowadzenia przeglądu prewencyjnego robota i spawarki.',
        isRead: false,
        createdAt: new Date('2026-05-22T10:00:00')
      }
    ]
  })

  console.log('✅ Seeded 13 notifications (all users covered)')
}

// =============================================================
// WYPOŻYCZENIA NARZĘDZI
// =============================================================
const seedToolLoans = async (
  users: any[],
  parts: any[],
  workOrders: any[]
) => {
  console.log('🌱 Seeding tool loans...')

  const tech1 = users.find((u) => u.email === 'tech1@cmms.com')
  const tech2 = users.find((u) => u.email === 'tech2@cmms.com')

  const wrench = parts.find((p) => p.qrCode === 'QR-010') // klucz dynamometryczny
  const sensor = parts.find((p) => p.qrCode === 'QR-008') // czujnik indukcyjny

  const wo7 = workOrders[6] // Spawarka COMPLETED (styczeń)
  const wo8 = workOrders[7] // Spawarka IN_PROGRESS (maj)

  // tech1 – klucz dynamometryczny (aktywne wypożyczenie, bez zlecenia)
  await prisma.toolLoan.create({
    data: {
      partId: wrench.id,
      userId: tech1.id,
      loanedAt: new Date('2026-04-01T08:00:00'),
      returnedAt: null
    }
  })

  // tech2 – czujnik indukcyjny przy naprawie spawarki (zwrócony)
  await prisma.toolLoan.create({
    data: {
      partId: sensor.id,
      userId: tech2.id,
      workOrderId: wo7.id,
      loanedAt: new Date('2026-01-15T09:00:00'),
      returnedAt: new Date('2026-01-15T11:30:00')
    }
  })

  // tech1 – czujnik indukcyjny przy bieżącej naprawie spawarki (aktywne)
  await prisma.toolLoan.create({
    data: {
      partId: sensor.id,
      userId: tech1.id,
      workOrderId: wo8.id,
      loanedAt: new Date('2026-05-20T08:00:00'),
      returnedAt: null
    }
  })

  // Zmniejsz stany magazynowe o aktywne wypożyczenia
  await prisma.part.update({
    where: { id: wrench.id },
    data: { stockQuantity: { decrement: 1 } }
  })
  await prisma.part.update({
    where: { id: sensor.id },
    data: { stockQuantity: { decrement: 1 } }
  })

  console.log('✅ Seeded 3 tool loans')
}

// =============================================================
// MAIN
// =============================================================
const main = async () => {
  console.log('🚀 Starting seed...\n')

  try {
    const users = await seedUsers()
    await seedCertifications(users)
    const locations = await seedLocations()
    const machines = await seedMachines(locations)
    await seedMachineDocuments(users, machines)
    const parts = await seedInventory()
    const workOrders = await seedWorkOrders(users, machines, parts)
    await seedPreventivePlans(machines)
    await seedNotifications(users)
    await seedToolLoans(users, parts, workOrders)

    console.log('\n🎉 Seeding complete!')
    console.log('\n📋 Konta testowe:')
    console.log('   admin@cmms.com     → Admin1234')
    console.log('   manager@cmms.com   → Manager1234')
    console.log('   tech1@cmms.com     → Tech1234')
    console.log('   tech2@cmms.com     → Tech1234')
    console.log('   warehouse@cmms.com → Warehouse1234')
    console.log('   operator@cmms.com  → Operator1234')
    console.log('\n📊 Dane:')
    console.log('   6 użytkowników | 7 certyfikatów | 8 lokalizacji')
    console.log('   6 maszyn | 6 dokumentów | 10 części | 6 kategorii')
    console.log('   10 zleceń | 7 planów prewencyjnych')
    console.log('   13 powiadomień | 3 wypożyczenia')
    console.log('\n⚠️  Stany poniżej punktu zamówienia:')
    console.log('   QR-004 O-ring NBR 50x3          → 2/10')
    console.log('   QR-006 Filtr hydrauliczny HF35  → 1/3')
    console.log('\n⏰  Przeterminowane plany prewencyjne:')
    console.log('   CNC 500h → 2026-04-25')
    console.log('   Prasa hydraulika → 2026-04-22')
    console.log('   Kompresor serwis → 2026-05-10')
  } catch (error) {
    console.error('❌ Seeding failed:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

main()
