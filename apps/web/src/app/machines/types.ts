// src/app/machines/types.ts

export type LocationType = 'PLANT' | 'HALL' | 'LINE' | 'STATION'

export interface Location {
  id: string
  name: string
  type: LocationType
  parentId: string | null
  parent?: Location
  children?: Location[]
}

export interface MachineDocument {
  id: string
  machineId: string
  uploadedById: string
  filename: string
  filePath: string
  version: number
  isLatest: boolean
  uploadedAt: string
}

export interface Machine {
  id: string
  name: string
  serialNumber: string
  locationId: string
  operatingHours: number
  purchaseDate: string
  purchasePrice: string | number
  isActive: boolean
  createdAt: string
  updatedAt: string

  location?: Location
  documents?: MachineDocument[]
}

export interface TcoReport {
  machineId: string
  machineName: string
  purchasePrice: number
  totalPartsCost: number
  totalLaborCost: number
  totalCost: number
  workOrdersCount: number
}