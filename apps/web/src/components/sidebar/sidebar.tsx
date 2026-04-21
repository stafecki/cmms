'use client'

import Link from 'next/link'
import { useEffect } from 'react'
import styles from './sidebar.module.scss'

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  const menuItems = [
    { name: 'Panel główny', href: '/dashboard'},
    { name: 'Maszyny', href: '/machines' },
    { name: 'Lokalizacje', href: '/locations' },
    { name: 'Zlecenia pracy', href: '/work-orders' },
    { name: 'Magazyn', href: '/inventory' },
    { name: 'Przeglądy', href: '/preventive' },
    { name: 'Powiadomienia', href: '/notifications' },
    { name: 'Monitoring', href: '/monitoring' },
    { name: 'Mój profil', href: '/me' },
    { name: 'Użytkownicy', href: '/users' },
  ];

  return (
    <>
      <div
        className={`${styles.overlay} ${isOpen ? styles.show : ''}`}
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
      />

      <aside className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
        <div className={styles.sidebarHeader}>
          <h2>Menu </h2>
          <button className={styles.closeBtn} onClick={onClose}>&times;</button>
        </div>

        <nav className={styles.navLinks}>
          <ul>
            {menuItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href} onClick={onClose}>
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.sidebarFooter}>
          <p>System CMMS v1.0</p>
        </div>
      </aside>
    </>
  )
}