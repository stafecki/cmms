'use client'

import { useState } from 'react'
import styles from './navbar.module.scss'
import LoggedInView from './loggedInView'
import LoggedOutView from './loggedOutView'
import Sidebar from '../sidebar/sidebar'
import { useAuth } from '../../context/AuthContext'

export default function Navbar() {
  const { user, isLoading } = useAuth()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)


  if (isLoading) {
    return <nav className={styles.navbar}></nav>
  }

  const isLoggedIn = !!user

  return (
    <>
      <nav className={styles.navbar}>
        <ul>
          {isLoggedIn ? (
            <LoggedInView onOpenSidebar={() => setIsSidebarOpen(true)} />
          ) : (
            <LoggedOutView />
          )}
        </ul>
      </nav>

      {isLoggedIn && (
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
      )}
    </>
  )
}