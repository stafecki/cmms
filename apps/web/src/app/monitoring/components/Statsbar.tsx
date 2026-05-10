'use client'

import { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import type { LogType, LogFilters } from './MonitoringDashboard'
import styles from './Statsbar.module.scss'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'

interface StatsBarProps {
  type: LogType
  filters: LogFilters
}

interface StatsData {
  total: number
  recentCount: number   // last hour — derived from a separate quick fetch
  errorRate?: number
}

export default function StatsBar({ type, filters }: StatsBarProps) {
  const [stats, setStats] = useState<StatsData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true)
      const token = Cookies.get('accessToken')

      try {
        const params = new URLSearchParams({ limit: '1', offset: '0' })
        const res = await fetch(`${API_URL}/monitoring/${type}?${params}`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        if (!res.ok) throw new Error()
        const data = await res.json()

        // fetch last-hour count
        const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString()
        const recentParams = new URLSearchParams({ limit: '1', offset: '0', from: oneHourAgo })
        const recentRes = await fetch(`${API_URL}/monitoring/${type}?${recentParams}`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        const recentData = recentRes.ok ? await recentRes.json() : { total: 0 }

        let errorRate: number | undefined
        if (type === 'requests') {
          const errParams = new URLSearchParams({ limit: '1', offset: '0' })
          const errRes = await fetch(`${API_URL}/monitoring/errors?${errParams}`, {
            headers: { Authorization: `Bearer ${token}` }
          })
          if (errRes.ok) {
            const errData = await errRes.json()
            errorRate = data.total > 0 ? Math.round((errData.total / data.total) * 100) : 0
          }
        }

        setStats({ total: data.total, recentCount: recentData.total, errorRate })
      } catch {
        setStats(null)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [type, filters.from, filters.to, filters.userId, filters.statusCode])

  const cards = [
    {
      label: 'Łącznie w bazie',
      value: loading ? null : stats?.total ?? '—',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <ellipse cx="12" cy="5" rx="9" ry="3" />
          <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
          <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
        </svg>
      ),
      accent: '#63b3ed'
    },
    {
      label: 'Ostatnia godzina',
      value: loading ? null : stats?.recentCount ?? '—',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      ),
      accent: '#68d391'
    },
    ...(type === 'requests'
      ? [{
        label: 'Wskaźnik błędów',
        value: loading ? null : stats?.errorRate != null ? `${stats.errorRate}%` : '—',
        icon: (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        ),
        accent: stats?.errorRate != null && stats.errorRate > 5 ? '#fc8181' : '#68d391'
      }]
      : []),
  ]

  return (
    <div className={styles.statsBar}>
      {cards.map((card, i) => (
        <div key={i} className={styles.card} style={{ '--accent': card.accent } as React.CSSProperties}>
          <div className={styles.cardIcon}>{card.icon}</div>
          <div className={styles.cardContent}>
            <div className={styles.cardValue}>
              {loading ? <span className={styles.skeleton} /> : card.value}
            </div>
            <div className={styles.cardLabel}>{card.label}</div>
          </div>
        </div>
      ))}
    </div>
  )
}