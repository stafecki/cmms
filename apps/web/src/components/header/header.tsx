'use client'
import { useState, useEffect } from 'react'
import Cookies from 'js-cookie'
import styles from './header.module.scss'
import Navbar from '../navbar/index'
import AuthBtn from '../authBtn/index'
import Sidebar from '../sidebar/sidebar'
import Link from 'next/link'

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  useEffect(() => {
    setIsLoggedIn(!!Cookies.get('refreshToken'))
  }, [])

  const headerClass = isLoggedIn ? styles.HeaderLoggedIn : styles.HeaderLoggedOut

  return (
    <header className={headerClass}>
      {isLoggedIn ? (
        <>
          <div className={styles.leftSection}>
            <div className={styles.burgerWrapper} onClick={() => setIsSidebarOpen(true)}>
              <span></span><span></span><span></span>
            </div>
          </div>
          <div className={styles.logo}><Link className={styles.homeLink} href="/dashboard"><h1>CMMS</h1></Link></div>
          <div className={styles.rightSection}><AuthBtn/></div>
        </>
      ) : (
        <>
          <div className={styles.logo}><h1>CMMS</h1></div>
          <div className={styles.navWrapper}><Navbar /></div>
          <div className={styles.rightSection}><AuthBtn/></div>
        </>
      )}

      {isLoggedIn && (
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      )}
    </header>
  )
}