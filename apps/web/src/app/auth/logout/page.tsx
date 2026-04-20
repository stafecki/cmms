'use client'

import { useEffect } from 'react'
import Cookies from 'js-cookie'
import styles from './logout.module.scss'

export default function LogoutPage() {
  useEffect(() => {
    const performLogout = async () => {
      try {
        const accessToken = Cookies.get('accessToken')

        // 1. Opcjonalne powiadomienie backendu
        if (accessToken) {
          await fetch('http://localhost:3000/auth/logout', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${accessToken}`,
            },
          })
        }
      } catch (error) {
        console.error('Błąd wylogowania w API:', error)
      } finally {
        // 2. Czyścimy dane lokalne
        Cookies.remove('accessToken')
        Cookies.remove('refreshToken')
        localStorage.removeItem('user')

        // 3. WYMUSZAMY PEŁNE PRZEŁADOWANIE I PRZEKIEROWANIE
        // Używamy window.location, aby zresetować cały stan Reacta
        window.location.href = '/auth/login'
      }
    }

    performLogout()
  }, [])

  return (
    <div className={styles.container}>
      <p>Wylogowywanie...</p>
    </div>
  )
}