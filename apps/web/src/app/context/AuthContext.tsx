'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'

const API_URL = "http://localhost:3000"

interface User {
  id: string
  name: string
  email: string
  role: 'ADMIN' | 'MANAGER' | 'WAREHOUSE' | 'OPERATOR'
}

const AuthContext = createContext<{ user: User | null; isLoading: boolean }>({
  user: null,
  isLoading: true
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchUser = async () => {
      const accessToken = Cookies.get('accessToken')
      if (!accessToken) {
        router.push('/auth/login')
        setIsLoading(false)
        return
      }

      try {
        const response = await fetch(`${API_URL}/auth/me`, {
          headers: { 'Authorization': `Bearer ${accessToken}` }
        })
        if (response.ok) {
          const userData = await response.json()
          setUser(userData)
        } else {
          Cookies.remove('accessToken')
          router.push('/auth/login')
        }
      } catch (error) {
        console.error("Błąd autoryzacji:", error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchUser()
  }, [router])

  return (
    <AuthContext.Provider value={{ user, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)