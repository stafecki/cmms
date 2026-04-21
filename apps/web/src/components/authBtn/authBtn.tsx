'use client'
import Link from 'next/link'
import styles from './authBtn.module.scss'
import { useEffect, useState } from 'react'
import Cookies from 'js-cookie'

export default function AuthBtn(){
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const token = Cookies.get('refreshToken')
    setIsLoggedIn(!!token)
  }, [])
  return(
    <>
      {isLoggedIn ? (
      <Link href='/auth/logout' className={styles.logoutBtn}>
        Wyloguj
      </Link>
    ): (
      <Link href='/auth/login' className={styles.loginBtn}>
        Zaloguj
      </Link>
    )}
    </>

  )
}