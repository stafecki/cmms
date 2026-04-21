'use client'
import { useEffect, useState } from 'react'
import styles from './navbar.module.scss'
import Cookies from 'js-cookie'
import LoggedInView from './loggedInView'
import LoggedOutView from './loggedOutView'
import Sidebar from '../sidebar/sidebar'

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  useEffect(() => {
    const token = Cookies.get('refreshToken')
    setIsLoggedIn(!!token)
  }, [])

  return (
    <>
      <nav className={styles.navbar}>
        <ul>
          {isLoggedIn ? (
            <LoggedInView onOpenSidebar={() => setIsSidebarOpen(true)} />
          ) : (
            <LoggedOutView/>
          )}
        </ul>
      </nav>

      {}
      {isLoggedIn && (
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
      )}
    </>
  )
}