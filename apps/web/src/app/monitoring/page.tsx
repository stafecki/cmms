'use client'

import { useAuth } from '@/context/AuthContext'
import MonitoringDashboard from './components/MonitoringDashboard'
import styles from './monitoring.module.scss'

export default function MonitoringPage() {
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className={styles.loadingWrapper}>
        <div className={styles.spinner} />
        <p>Ładowanie...</p>
      </div>
    )
  }

  if (!user || user.role !== 'ADMIN') {
    return (
      <div className={styles.accessDenied}>
        <div className={styles.accessDeniedCard}>
          <h2>Brak dostępu</h2>
          <p>Panel monitoringu jest dostępny wyłącznie dla administratorów systemu.</p>
          <span className={styles.roleBadge}>
            Twoja rola: <strong>{user?.role ?? 'Niezalogowany'}</strong>
          </span>
        </div>
      </div>
    )
  }

  return <MonitoringDashboard />
}