'use client'

import { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import Link from 'next/link'
import styles from './auth-layout.module.scss'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const token = Cookies.get('refreshToken')
    if (token) {
      setIsLoggedIn(true)
    }
    setIsLoading(false)
  }, [])

  if (isLoading) {
    return (
      <div className={styles.centered}>
        <p>Sprawdzanie autoryzacji...</p>
      </div>
    )
  }

  if (isLoggedIn) {
    return (
      <div className={styles.alreadyLoggedIn}>
        <div className={styles.messageBox}>
          <h1>Jesteś już zalogowany</h1>
          <p>Wygląda na to, że masz już aktywną sesję.</p>

          <div className={styles.actions}>
            <Link href="/dashboard" className={styles.primaryBtn}>
              Przejdź do panelu
            </Link>

            <Link href="/auth/logout" className={styles.secondaryBtn}>
              Wyloguj się
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return <>{children}</>
}