import Cookies from 'js-cookie'
import { Machine, TcoReport } from './types'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'

const getHeaders = () => {
  const token = Cookies.get('accessToken')
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  }
}

export async function fetchMachines(): Promise<Machine[]> {
  const res = await fetch(`${API_URL}/machines`, {
    headers: getHeaders(),
  })
  if (!res.ok) throw new Error('Nie udało się pobrać maszyn')
  return res.json()
}

export async function fetchMachineById(id: string): Promise<Machine> {
  const res = await fetch(`${API_URL}/machines/${id}`, {
    headers: getHeaders(),
  })
  if (!res.ok) throw new Error('Nie udało się pobrać szczegółów maszyny')
  return res.json()
}

export async function fetchMachineTco(id: string): Promise<TcoReport> {
  const res = await fetch(`${API_URL}/machines/${id}/tco`, {
    headers: getHeaders(),
  })
  if (!res.ok) throw new Error('Nie udało się pobrać raportu TCO')
  return res.json()
}

export async function deleteMachine(id: string): Promise<void> {
  const res = await fetch(`${API_URL}/machines/${id}`, {
    method: 'DELETE',
    headers: getHeaders(),
  })
  if (!res.ok) throw new Error('Nie udało się usunąć maszyny')
}

export async function updateMachine(id: string, data: Partial<Machine>): Promise<Machine> {
  const res = await fetch(`${API_URL}/machines/${id}`, {
    method: 'PATCH',
    headers: getHeaders(),
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error('Nie udało się zaktualizować maszyny')
  return res.json()
}

export async function createMachine(data: {
  name: string
  serialNumber: string
  locationId: string
  purchaseDate: string
  purchasePrice: number
  operatingHours?: number
  isActive?: boolean
}): Promise<Machine> {
  const res = await fetch(`${API_URL}/machines`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error('Nie udało się utworzyć maszyny')
  return res.json()
}

export async function updateOperatingHours(id: string, operatingHours: number): Promise<Machine> {
  const res = await fetch(`${API_URL}/machines/${id}/operating-hours`, {
    method: 'PATCH',
    headers: getHeaders(),
    body: JSON.stringify({ operatingHours }),
  })
  if (!res.ok) throw new Error('Nie udało się zaktualizować godzin pracy')
  return res.json()
}