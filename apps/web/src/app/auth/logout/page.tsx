'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'

export default function LogoutPage() {
  const router = useRouter()

  useEffect(() => {
    const performLogout = async () => {
      try {
        const accessToken = Cookies.get('accessToken')

        if (accessToken) {
          await fetch('http://localhost:3000/auth/logout', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${accessToken}`,
            },
          })
        }
      } catch (error) {
        console.error('Błąd podczas wylogowywania w backendzie:', error)
      } finally {
        Cookies.remove('accessToken')
        Cookies.remove('refreshToken')
        localStorage.removeItem('user')

        router.push('/login')
        router.refresh()
      }
    }

    performLogout()
  }, [router])

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <p>Wylogowywanie...</p>
    </div>
  )
}