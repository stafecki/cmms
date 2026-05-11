'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import styles from './notifications.module.scss'
import { Notification } from './types'
import {
  fetchMyNotifications,
  fetchAllNotifications,
  markAsRead,
  markAllAsRead,
  deleteNotification
} from './notifications.api'

export default function NotificationsPage() {
  const { user, isLoading: isAuthLoading } = useAuth()

  const [notifications, setNotifications] = useState<Notification[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<'MY' | 'ALL'>('MY')

  const canSeeAll = user?.role === 'ADMIN'

  useEffect(() => {
    if (!isAuthLoading && user) {
      loadData()
    } else if (!isAuthLoading && !user) {
      setError('Brak autoryzacji. Zaloguj się ponownie.')
      setIsLoading(false)
    }
  }, [activeTab, isAuthLoading, user])

  const loadData = async () => {
    setIsLoading(true)
    setError(null)
    try {
      if (activeTab === 'MY') {
        const data = await fetchMyNotifications()
        setNotifications(data)
      } else if (activeTab === 'ALL' && canSeeAll) {
        const data = await fetchAllNotifications()
        setNotifications(data)
      }
    } catch (err: any) {
      setError('Nie udało się pobrać powiadomień.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleMarkAsRead = async (id: string) => {
    try {
      await markAsRead(id)
      setNotifications(prev =>
        prev.map(n => n.id === id ? { ...n, isRead: true } : n)
      )
    } catch (err) {
      alert('Błąd podczas oznaczania powiadomienia.')
    }
  }

  const handleMarkAllAsRead = async () => {
    try {
      await markAllAsRead()
      setNotifications(prev => prev.map(n => ({ ...n, isRead: true })))
    } catch (err) {
      alert('Błąd podczas oznaczania wszystkich.')
    }
  }

  const handleDelete = async (id: string) => {
    if (!window.confirm('Usunąć to powiadomienie?')) return
    try {
      await deleteNotification(id)
      setNotifications(prev => prev.filter(n => n.id !== id))
    } catch (err) {
      alert('Błąd podczas usuwania.')
    }
  }

  if (isAuthLoading) {
    return <div className={styles.container}><div className={styles.loading}>Weryfikacja sesji...</div></div>
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Twoje <span>Powiadomienia</span></h1>

        {activeTab === 'MY' && notifications.some(n => !n.isRead) && (
          <button className={styles.markAllBtn} onClick={handleMarkAllAsRead}>
            Oznacz wszystkie jako przeczytane
          </button>
        )}
      </div>

      {canSeeAll && (
        <div className={styles.tabs}>
          <button
            className={`${styles.tabBtn} ${activeTab === 'MY' ? styles.active : ''}`}
            onClick={() => setActiveTab('MY')}
          >
            Moje powiadomienia
          </button>
          <button
            className={`${styles.tabBtn} ${activeTab === 'ALL' ? styles.active : ''}`}
            onClick={() => setActiveTab('ALL')}
          >
            Wszystkie powiadomienia (Admin)
          </button>
        </div>
      )}

      {isLoading ? (
        <div className={styles.loading}>Ładowanie powiadomień...</div>
      ) : error ? (
        <div className={styles.error}>{error}</div>
      ) : notifications.length === 0 ? (
        <div className={styles.empty}>Brak powiadomień.</div>
      ) : (
        <div className={styles.list}>
          {notifications.map(notif => (
            <div key={notif.id} className={`${styles.card} ${!notif.isRead ? styles.unread : ''}`}>

              <div className={styles.cardHeader}>
                <div className={styles.typeTag} data-type={notif.type}>
                  {notif.type}
                </div>
                <div className={styles.date}>
                  {new Date(notif.createdAt).toLocaleString('pl-PL')}
                </div>
              </div>

              <h3>{notif.title}</h3>
              <p>{notif.message}</p>

              {activeTab === 'ALL' && notif.user && (
                <div className={styles.userInfo}>
                  Do: <strong>{notif.user.name}</strong> ({notif.user.email})
                </div>
              )}

              <div className={styles.actions}>
                {activeTab === 'MY' && !notif.isRead && (
                  <button onClick={() => handleMarkAsRead(notif.id)} className={styles.actionBtn}>
                    ✓ Przeczytane
                  </button>
                )}
                {activeTab === 'MY' && (
                  <button onClick={() => handleDelete(notif.id)} className={`${styles.actionBtn} ${styles.deleteBtn}`}>
                    Usuń
                  </button>
                )}
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  )
}