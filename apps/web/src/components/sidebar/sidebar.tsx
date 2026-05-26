'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import styles from './sidebar.module.scss'
import { useAuth } from '../../context/AuthContext'
import { getUnreadCount } from '../../app/notifications/notifications.api'

// Definiujemy możliwe role dla jasności kodu
type UserRole = 'admin' | 'manager' | 'user';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  role?: UserRole | string;
}

export default function Sidebar({ isOpen, onClose, role }: SidebarProps) {
  const { user } = useAuth()
  const [unreadCount, setUnreadCount] = useState(0)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  useEffect(() => {
    if (!user) return
    const fetchCount = () => getUnreadCount().then(setUnreadCount).catch(() => {})
    fetchCount()
    const interval = setInterval(fetchCount, 30000)
    return () => clearInterval(interval)
  }, [user])

  const effectiveRole = role ?? user?.role?.toLowerCase() ?? ''

  const menuItems = [
    { name: 'Panel główny', href: '/dashboard'},
    { name: 'Maszyny', href: '/machines' },
    { name: 'Lokalizacje', href: '/locations' },
    { name: 'Zlecenia pracy', href: '/work-orders' },
    { name: 'Magazyn', href: '/inventory' },
    { name: 'Przeglądy', href: '/preventive' },
    { name: 'Powiadomienia', href: '/notifications' },
    { name: 'Logi', href: '/monitoring' },
    { name: 'Użytkownicy', href: '/users' },
  ];

  const visibleMenuItems = menuItems.filter((item) => {
    if (effectiveRole === 'admin') {
      return true;
    }

    if (effectiveRole === 'manager') {
      return item.href !== '/monitoring';
    }

    const restrictedPaths = ['/monitoring', '/dashboard', '/users'];
    return !restrictedPaths.includes(item.href);
  });

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
            {visibleMenuItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href} onClick={onClose} className={styles.navLink}>
                  {item.name}
                  {item.href === '/notifications' && unreadCount > 0 && (
                    <span className={styles.badge}>{unreadCount > 99 ? '99+' : unreadCount}</span>
                  )}
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