'use client'
import { useEffect, useState } from 'react'
import styles from './navbar.module.scss'
import Cookies from 'js-cookie'
import LoggedInView from './loggedInView'
import LoggedOutView from './loggedOutView'

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const token = Cookies.get('refreshToken')
    setIsLoggedIn(!!token)
  }, [])

  return (
    <nav className={styles.navbar}>
      <ul>
        {isLoggedIn ? (
          <LoggedInView />
        ) : (
          <LoggedOutView/>
        )}
      </ul>
    </nav>
  )
}
