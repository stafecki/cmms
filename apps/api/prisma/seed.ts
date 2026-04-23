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
// CERTYFIKATY
// =============================================================
const seedCertifications = async (users: any[]) => {
  console.log('🌱 Seeding certifications...')

  const tech1 = users.find((u) => u.email === 'tech1@cmms.com')
  const tech2 = users.find((u) => u.email === 'tech2@cmms.com')

  await prisma.certification.createMany({
    skipDuplicates: true,
    data: [
      {
        userId: tech1.id,
        type: CertificationType.SEP,
        issuedAt: new Date('2023-01-15'),
        expiresAt: new Date('2026-01-15'),
        isValid: true
      },
      {
        userId: tech1.id,
        type: CertificationType.HEIGHT_WORK,
        issuedAt: new Date('2023-06-01'),
        expiresAt: new Date('2025-06-01'),
        isValid: true
      },
      {
        userId: tech2.id,
        type: CertificationType.FORKLIFT,
        issuedAt: new Date('2022-03-10'),
        expiresAt: new Date('2027-03-10'),
        isValid: true
      },
      {
        userId: tech2.id,
        type: CertificationType.WELDING,
        issuedAt: new Date('2021-09-20'),
        expiresAt: new Date('2024-09-20'),
        isValid: false
      }
    ]
  })

  console.log('✅ Seeded certifications')
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

  await prisma.location.upsert({
    where: { id: 'seed-station-001' },
    update: {},
    create: {
      id: 'seed-station-001',
      name: 'Stanowisko CNC',
      type: LocationType.STATION,
      parentId: line1.id
    }
  })

  await prisma.location.upsert({
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
  return { line1, line2, line3 }
}

// =============================================================
// MASZYNY
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
        locationId: locations.line1.id,
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
        locationId: locations.line2.id,
        operatingHours: 2100,
        purchaseDate: new Date('2022-01-10'),
        purchasePrice: 28000
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
// KATEGORIE I CZĘŚCI
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
    prisma.part.upsert({
      where: { qrCode: 'QR-006' },
      update: {},
      create: {
        categoryId: filters.id,
        name: 'Filtr oleju hydraulicznego HF35',
        stockQuantity: 3,
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
// ZLECENIA NAPRAWCZE
// =============================================================
const seedWorkOrders = async (users: any[], machines: any[], parts: any[]) => {
  console.log('🌱 Seeding work orders...')

  const admin = users.find((u) => u.role === 'ADMIN')
  const manager = users.find((u) => u.role === 'MANAGER')
  const tech1 = users.find((u) => u.email === 'tech1@cmms.com')
  const tech2 = users.find((u) => u.email === 'tech2@cmms.com')
  const operator = users.find((u) => u.role === 'OPERATOR')

  const cnc = machines.find((m) => m.serialNumber === 'SN-CNC-001')
  const press = machines.find((m) => m.serialNumber === 'SN-PRESS-001')
  const conveyor = machines.find((m) => m.serialNumber === 'SN-CONV-001')
  const compressor = machines.find((m) => m.serialNumber === 'SN-COMP-001')

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
      }
    ]
  })

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

  await prisma.workOrderMessage.create({
    data: {
      workOrderId: wo3.id,
      userId: tech1.id,
      content:
        'Przystępuję do wymiany paska. Przenośnik odłączony od zasilania.',
      sentAt: new Date('2026-04-01T08:20:00')
    }
  })

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

  console.log('✅ Seeded 6 work orders')
  return [wo1, wo2, wo3, wo4, wo5, wo6]
}

// =============================================================
// PLANY PREWENCYJNE
// =============================================================
const seedPreventivePlans = async (machines: any[]) => {
  console.log('🌱 Seeding preventive plans...')

  const cnc = machines.find((m) => m.serialNumber === 'SN-CNC-001')
  const press = machines.find((m) => m.serialNumber === 'SN-PRESS-001')
  const compressor = machines.find((m) => m.serialNumber === 'SN-COMP-001')

  await Promise.all([
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
        nextRunAt: new Date('2026-05-01')
      }
    }),
    prisma.preventivePlan.create({
      data: {
        machineId: cnc.id,
        name: 'Przegląd 500h CNC',
        intervalHours: 500,
        advanceDays: 14,
        checklist: [
          { step: 1, label: 'Wymień olej w głowicy wrzeciona', done: false },
          {
            step: 2,
            label: 'Sprawdź i wyreguluj napięcie pasków',
            done: false
          },
          { step: 3, label: 'Sprawdź łożyska wrzeciona', done: false }
        ],
        nextRunAt: new Date('2026-04-25')
      }
    }),
    prisma.preventivePlan.create({
      data: {
        machineId: press.id,
        name: 'Przegląd układu hydraulicznego',
        intervalDays: 90,
        advanceDays: 14,
        checklist: [
          {
            step: 1,
            label: 'Sprawdź poziom oleju hydraulicznego',
            done: false
          },
          { step: 2, label: 'Wymień filtr hydrauliczny', done: false },
          { step: 3, label: 'Sprawdź ciśnienie robocze układu', done: false },
          {
            step: 4,
            label: 'Sprawdź szczelność wszystkich połączeń',
            done: false
          }
        ],
        nextRunAt: new Date('2026-04-22')
      }
    }),
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
          {
            step: 6,
            label: 'Sprawdź łożyska silnika elektrycznego',
            done: false
          }
        ],
        nextRunAt: new Date('2026-05-10')
      }
    })
  ])

  console.log('✅ Seeded 4 preventive plans')
}

// =============================================================
// POWIADOMIENIA
// =============================================================
const seedNotifications = async (users: any[]) => {
  console.log('🌱 Seeding notifications...')

  const admin = users.find((u) => u.role === 'ADMIN')
  const manager = users.find((u) => u.role === 'MANAGER')
  const tech1 = users.find((u) => u.email === 'tech1@cmms.com')

  await prisma.notification.createMany({
    data: [
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
        title: 'Niski stan magazynowy',
        message:
          'Część "O-ring NBR 50x3" spadła poniżej punktu zamówienia. Aktualny stan: 2 szt.',
        isRead: false,
        createdAt: new Date('2026-04-10T10:00:00')
      },
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
        title: 'Zbliżający się przegląd',
        message:
          'Za 7 dni upływa termin przeglądu układu hydraulicznego prasy H200.',
        isRead: false,
        createdAt: new Date('2026-04-15T06:00:00')
      },
      {
        userId: tech1.id,
        type: NotificationType.WORK_ORDER_ASSIGNED,
        title: 'Nowe zlecenie naprawcze',
        message:
          'Przypisano Ci zlecenie: "Wymiana paska napędowego" – przenośnik PT-50.',
        isRead: true,
        createdAt: new Date('2026-04-01T07:05:00')
      },
      {
        userId: tech1.id,
        type: NotificationType.CERT_EXPIRING,
        title: 'Wygasający certyfikat',
        message:
          'Certyfikat HEIGHT_WORK wygasa 2025-06-01. Skontaktuj się z działem HR.',
        isRead: false,
        createdAt: new Date('2026-04-15T06:00:00')
      }
    ]
  })

  console.log('✅ Seeded notifications')
}

// =============================================================
// WYPOŻYCZENIA NARZĘDZI
// =============================================================
const seedToolLoans = async (users: any[], parts: any[]) => {
  console.log('🌱 Seeding tool loans...')

  const tech1 = users.find((u) => u.email === 'tech1@cmms.com')
  const tool = parts.find((p) => p.qrCode === 'QR-010')

  await prisma.toolLoan.create({
    data: {
      partId: tool.id,
      userId: tech1.id,
      loanedAt: new Date('2026-04-01T08:00:00'),
      returnedAt: null
    }
  })

  await prisma.part.update({
    where: { id: tool.id },
    data: { stockQuantity: { decrement: 1 } }
  })

  console.log('✅ Seeded tool loans')
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
    const parts = await seedInventory()
    await seedWorkOrders(users, machines, parts)
    await seedPreventivePlans(machines)
    await seedNotifications(users)
    await seedToolLoans(users, parts)

    console.log('\n🎉 Seeding complete!')
    console.log('\n📋 Konta testowe:')
    console.log('   admin@cmms.com     → Admin1234')
    console.log('   manager@cmms.com   → Manager1234')
    console.log('   tech1@cmms.com     → Tech1234')
    console.log('   tech2@cmms.com     → Tech1234')
    console.log('   warehouse@cmms.com → Warehouse1234')
    console.log('   operator@cmms.com  → Operator1234')
  } catch (error) {
    console.error('❌ Seeding failed:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

main()
