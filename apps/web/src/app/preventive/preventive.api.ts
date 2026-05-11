import Cookies from 'js-cookie'
import { PreventivePlan } from './types'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'

async function refreshSession() {
  const refreshToken = Cookies.get('refreshToken')

  if (!refreshToken) return null

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: refreshToken })
    })

    const data = await res.json()

    if (res.ok) {
      Cookies.set('accessToken', data.accessToken, {
        expires: 1 / 96,
        secure: true,
        sameSite: 'strict'
      })

      Cookies.set('refreshToken', data.refreshToken, {
        expires: 7,
        secure: true,
        sameSite: 'strict'
      })

      if (typeof window !== 'undefined') {
        window.location.reload()
      }

      return data.accessToken
    } else {
      throw new Error('Refresh token expired')
    }
  } catch (e) {
    Cookies.remove('accessToken')
    Cookies.remove('refreshToken')
    localStorage.removeItem('user')

    if (typeof window !== 'undefined') {
      window.location.href = '/auth/login'
    }
  }

  return null
}

async function fetchWithAuth(endpoint: string, options: RequestInit = {}) {
  let token = Cookies.get('accessToken')

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...options.headers,
  }

  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }

  let response = await fetch(`${API_URL}${endpoint}`, { ...options, headers })

  if (response.status === 401) {
    console.warn('Token wygasł, próbuję odświeżyć sesję...')
    const newToken = await refreshSession()

    if (newToken) {
      headers['Authorization'] = `Bearer ${newToken}`
      response = await fetch(`${API_URL}${endpoint}`, { ...options, headers })
    }
  }

  return response
}

// === Endpoints ===

export async function fetchPreventivePlans(): Promise<PreventivePlan[]> {
  const res = await fetchWithAuth('/preventive')
  if (!res.ok) throw new Error('Nie udało się pobrać planów prewencyjnych')
  return res.json()
}

export async function fetchUpcomingPlans(days: number = 7): Promise<PreventivePlan[]> {
  const res = await fetchWithAuth(`/preventive/upcoming?days=${days}`)
  if (!res.ok) throw new Error('Nie udało się pobrać nadchodzących planów')
  return res.json()
}

export async function triggerPlan(id: string): Promise<void> {
  const res = await fetchWithAuth(`/preventive/${id}/trigger`, { method: 'POST' })
  if (!res.ok) throw new Error('Nie udało się wygenerować zlecenia')
}

export async function checkAndCreateOrders(): Promise<{ message: string }> {
  const res = await fetchWithAuth('/preventive/check')
  if (!res.ok) throw new Error('Błąd podczas sprawdzania planów')
  return res.json()
}

export async function deletePlan(id: string): Promise<void> {
  const res = await fetchWithAuth(`/preventive/${id}`, { method: 'DELETE' })
  if (!res.ok) throw new Error('Nie udało się usunąć planu')
}

export async function createPlan(data: any): Promise<void> {
  const res = await fetchWithAuth(`/preventive`, {
    method: 'POST',
    body: JSON.stringify(data)
  })
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}))
    throw new Error(errorData.message || 'Nie udało się utworzyć planu prewencyjnego')
  }
}

export async function fetchAllMachinesForSelect(): Promise<{id: string, name: string, serialNumber: string}[]> {
  const res = await fetchWithAuth('/machines')
  if (!res.ok) throw new Error('Nie udało się pobrać maszyn')
  return res.json()
}

export async function fetchPlanById(id: string): Promise<PreventivePlan> {
  const res = await fetchWithAuth(`/preventive/${id}`)
  if (!res.ok) throw new Error('Nie udało się pobrać szczegółów planu')
  return res.json()
}

export async function updatePlan(id: string, data: any): Promise<PreventivePlan> {
  const res = await fetchWithAuth(`/preventive/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(data)
  })
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}))
    throw new Error(errorData.message || 'Nie udało się zaktualizować planu')
  }
  return res.json()
}