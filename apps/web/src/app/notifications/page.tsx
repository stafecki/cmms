'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import styles from './notifications.module.scss'
import { Notification, NotificationType } from './types'
import {
  fetchMyNotifications,
  fetchAllNotifications,
  markAsRead,
  markAllAsRead,
  deleteNotification,
  createNotification,
  createAnnouncement,
} from './notifications.api'
import { fetchUsers } from '../users/users.api'

const TYPE_LABELS: Record<NotificationType, string> = {
  CRITICAL_FAILURE: 'Awaria krytyczna',
  REORDER_ALERT: 'Alert magazynowy',
  PREVENTIVE_DUE: 'Przegląd do wykonania',
  CERT_EXPIRING: 'Wygasający certyfikat',
  WORK_ORDER_ASSIGNED: 'Przypisanie zlecenia',
  ANNOUNCEMENT: 'Ogłoszenie',
}

export default function NotificationsPage() {
  const { user, isLoading: isAuthLoading } = useAuth()

  const [notifications, setNotifications] = useState<Notification[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<'MY' | 'ALL'>('MY')

  const [isComposeOpen, setIsComposeOpen] = useState(false)
  const [composeMode, setComposeMode] = useState<'user' | 'announcement'>('user')
  const [composeUserId, setComposeUserId] = useState('')
  const [composeType, setComposeType] = useState<NotificationType>('ANNOUNCEMENT')
  const [composeTitle, setComposeTitle] = useState('')
  const [composeMessage, setComposeMessage] = useState('')
  const [isSending, setIsSending] = useState(false)
  const [usersList, setUsersList] = useState<{ id: string; name: string }[]>([])

  const canSeeAll = user?.role === 'ADMIN'
  const canCompose = user?.role === 'ADMIN' || user?.role === 'MANAGER'

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

  const openCompose = async () => {
    if (!isComposeOpen && usersList.length === 0) {
      try {
        const data = await fetchUsers(100)
        setUsersList(data.data)
      } catch {}
    }
    setIsComposeOpen(!isComposeOpen)
  }

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSending(true)
    try {
      if (composeMode === 'announcement') {
        await createAnnouncement({ title: composeTitle, message: composeMessage })
      } else {
        await createNotification({ userId: composeUserId, type: composeType, title: composeTitle, message: composeMessage })
      }
      setComposeTitle('')
      setComposeMessage('')
      setComposeUserId('')
      setIsComposeOpen(false)
    } catch (err: any) {
      alert(err.message || 'Nie udało się wysłać.')
    } finally {
      setIsSending(false)
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

        <div className={styles.headerActions}>
          {activeTab === 'MY' && notifications.some(n => !n.isRead) && (
            <button className={styles.markAllBtn} onClick={handleMarkAllAsRead}>
              Oznacz wszystkie jako przeczytane
            </button>
          )}
          {canCompose && (
            <button className={styles.composeBtn} onClick={openCompose}>
              {isComposeOpen ? '✕ Zamknij' : '+ Nowe powiadomienie'}
            </button>
          )}
        </div>
      </div>

      {isComposeOpen && canCompose && (
        <div className={styles.composePanel}>
          {canSeeAll && (
            <div className={styles.composeTabs}>
              <button
                className={composeMode === 'user' ? styles.active : ''}
                onClick={() => setComposeMode('user')}
              >
                Do użytkownika
              </button>
              <button
                className={composeMode === 'announcement' ? styles.active : ''}
                onClick={() => setComposeMode('announcement')}
              >
                Ogłoszenie do wszystkich
              </button>
            </div>
          )}

          <form onSubmit={handleSend} className={styles.composeForm}>
            {composeMode === 'user' && (
              <>
                <div className={styles.composeField}>
                  <label>Odbiorca</label>
                  <select value={composeUserId} onChange={e => setComposeUserId(e.target.value)} required>
                    <option value="">Wybierz użytkownika...</option>
                    {usersList.map(u => (
                      <option key={u.id} value={u.id}>{u.name}</option>
                    ))}
                  </select>
                </div>
                <div className={styles.composeField}>
                  <label>Typ</label>
                  <select value={composeType} onChange={e => setComposeType(e.target.value as NotificationType)}>
                    {(Object.keys(TYPE_LABELS) as NotificationType[]).map(t => (
                      <option key={t} value={t}>{TYPE_LABELS[t]}</option>
                    ))}
                  </select>
                </div>
              </>
            )}
            <div className={styles.composeField}>
              <label>Tytuł</label>
              <input
                type="text"
                value={composeTitle}
                onChange={e => setComposeTitle(e.target.value)}
                placeholder="Tytuł powiadomienia..."
                minLength={3}
                required
              />
            </div>
            <div className={styles.composeField}>
              <label>Treść</label>
              <textarea
                value={composeMessage}
                onChange={e => setComposeMessage(e.target.value)}
                placeholder="Treść wiadomości..."
                minLength={3}
                required
                rows={3}
              />
            </div>
            <div className={styles.composeActions}>
              <button type="button" onClick={() => setIsComposeOpen(false)} className={styles.cancelComposeBtn}>
                Anuluj
              </button>
              <button type="submit" className={styles.sendBtn} disabled={isSending}>
                {isSending ? 'Wysyłanie...' : composeMode === 'announcement' ? 'Wyślij ogłoszenie' : 'Wyślij powiadomienie'}
              </button>
            </div>
          </form>
        </div>
      )}

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