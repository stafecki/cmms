'use client'

import Link from 'next/link'
import styles from './authBtn.module.scss'
import { useAuth } from '@/context/AuthContext'

export default function AuthBtn() {
  const { user, isLoading, logout } = useAuth()

  if (isLoading) {
    return <div style={{ width: '80px' }}></div>
  }

  return (
    <>
      {user ? (
        <button onClick={logout} className={styles.logoutBtn}>
          Wyloguj
        </button>
      ) : (
        <Link href='/auth/login' className={styles.loginBtn}>
          Zaloguj
        </Link>
      )}
    </>
  )
}