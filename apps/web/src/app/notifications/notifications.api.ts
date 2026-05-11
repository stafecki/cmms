import Cookies from 'js-cookie'
import { Notification } from './types'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'

async function refreshSession() {
  const refreshToken = Cookies.get('refreshToken')
  if (!refreshToken) return null

  try {
    const res = await fetch(`${API_URL}/auth/refresh`, {
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

// Wewnętrzny wrapper na fetch automatycznie zarządzający tokenami
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
    console.warn('Token wygasł lub jest nieobecny, próbuję odświeżyć sesję...')
    const newToken = await refreshSession()

    if (newToken) {
      headers['Authorization'] = `Bearer ${newToken}`
      response = await fetch(`${API_URL}${endpoint}`, { ...options, headers })
    }
  }

  return response
}

// === METODY API ===

export async function fetchMyNotifications(): Promise<Notification[]> {
  const res = await fetchWithAuth('/notifications')
  if (!res.ok) throw new Error('Nie udało się pobrać powiadomień')
  return res.json()
}

export async function fetchAllNotifications(): Promise<Notification[]> {
  const res = await fetchWithAuth('/notifications/all')
  if (!res.ok) throw new Error('Nie udało się pobrać wszystkich powiadomień')
  return res.json()
}

export async function markAsRead(id: string): Promise<Notification> {
  const res = await fetchWithAuth(`/notifications/${id}/read`, { method: 'PATCH' })
  if (!res.ok) throw new Error('Nie udało się oznaczyć jako przeczytane')
  return res.json()
}

export async function markAllAsRead(): Promise<void> {
  const res = await fetchWithAuth(`/notifications/read-all`, { method: 'PATCH' })
  if (!res.ok) throw new Error('Nie udało się oznaczyć wszystkich')
}

export async function deleteNotification(id: string): Promise<void> {
  const res = await fetchWithAuth(`/notifications/${id}`, { method: 'DELETE' })
  if (!res.ok) throw new Error('Nie udało się usunąć powiadomienia')
}