'use client'

import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"

interface User {
  id: string
  name: string
  email: string
  role: 'ADMIN' | 'MANAGER' | 'WAREHOUSE' | 'OPERATOR'
}

const AuthContext = createContext<{ user: User | null; isLoading: boolean; logout: () => void }>({
  user: null,
  isLoading: true,
  logout: () => {}
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const logout = useCallback(() => {
    Cookies.remove('accessToken')
    Cookies.remove('refreshToken')
    localStorage.removeItem('user')
    setUser(null)
    router.push('/auth/login')
  }, [router])

  const fetchUser = useCallback(async () => {
    let accessToken = Cookies.get('accessToken')
    const refreshToken = Cookies.get('refreshToken')

    if (!accessToken) {
      if (refreshToken) {
        try {
          const res = await fetch(`${API_URL}/auth/refresh`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token: refreshToken })
          })

          if (res.ok) {
            const data = await res.json()
            Cookies.set('accessToken', data.accessToken, { expires: 1 / 96, secure: true, sameSite: 'strict' })
            Cookies.set('refreshToken', data.refreshToken, { expires: 7, secure: true, sameSite: 'strict' })

            accessToken = data.accessToken
          } else {
            throw new Error('Refresh token expired or invalid')
          }
        } catch (error) {
          console.warn("Nie udało się odświeżyć sesji:", error)
          logout()
          setIsLoading(false)
          return
        }
      } else {
        setIsLoading(false)
        return
      }
    }

    try {
      const response = await fetch(`${API_URL}/auth/me`, {
        headers: { 'Authorization': `Bearer ${accessToken}` }
      })

      if (response.ok) {
        const userData = await response.json()
        setUser(userData)
      } else {
        logout()
      }
    } catch (error) {
      console.error("Błąd sieci podczas autoryzacji:", error)
    } finally {
      setIsLoading(false)
    }
  }, [logout])

  useEffect(() => {
    fetchUser()
  }, [fetchUser])

  return (
    <AuthContext.Provider value={{ user, isLoading, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)