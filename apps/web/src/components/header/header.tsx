'use client'
import { useState } from 'react'
import styles from './header.module.scss'
import Navbar from '../navbar/index'
import AuthBtn from '../authBtn/index'
import Sidebar from '../sidebar/sidebar'
import Link from 'next/link'
import { useAuth } from '../../context/AuthContext'

export default function Header() {
  const { user, isLoading } = useAuth()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  if (isLoading) {
    return <header className={styles.HeaderLoggedOut}></header>
  }

  const isLoggedIn = !!user
  const headerClass = isLoggedIn ? styles.HeaderLoggedIn : styles.HeaderLoggedOut

  const hasDashboardAccess = user?.role === 'ADMIN' || user?.role === 'MANAGER'

  const logoHref = hasDashboardAccess ? '/dashboard' : '/'


  const userRole = user?.role?.toLowerCase() || 'user';

  return (
    <header className={headerClass}>
      {isLoggedIn ? (
        <>
          <div className={styles.leftSection}>
            <div className={styles.burgerWrapper} onClick={() => setIsSidebarOpen(true)}>
              <span></span><span></span><span></span>
            </div>
          </div>
          <div className={styles.logo}>
            <Link className={styles.homeLink} href={logoHref}>
              <h1>CMMS</h1>
            </Link>
          </div>
          <div className={styles.rightSection}><AuthBtn/></div>
        </>
      ) : (
        <>
          <div className={styles.logo}>
            <Link className={styles.homeLink} href="/">
              <h1>CMMS</h1>
            </Link>
          </div>
          <div className={styles.navWrapper}><Navbar /></div>
          <div className={styles.rightSection}><AuthBtn/></div>
        </>
      )}

      {isLoggedIn && (
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          role={userRole}
        />
      )}
    </header>
  )
}