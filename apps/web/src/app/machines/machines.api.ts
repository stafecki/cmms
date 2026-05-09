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