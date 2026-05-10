'use client'

import { useEffect } from 'react'
import type { LogType } from './MonitoringDashboard'
import styles from './LogDetailModal.module.scss'

interface LogDetailModalProps {
  entry: Record<string, unknown>
  type: LogType
  onClose: () => void
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleString('pl-PL', {
    year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', second: '2-digit',
    fractionalSecondDigits: 3
  })
}

function getStatusClass(code?: number): string {
  if (!code) return styles.statusUnknown
  if (code < 300) return styles.status2xx
  if (code < 400) return styles.status3xx
  if (code < 500) return styles.status4xx
  return styles.status5xx
}

function Field({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className={styles.field}>
      <span className={styles.fieldLabel}>{label}</span>
      <span className={styles.fieldValue}>{value ?? <span className={styles.null}>—</span>}</span>
    </div>
  )
}

export default function LogDetailModal({ entry, type, onClose }: LogDetailModalProps) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onClose])

  const statusCode = entry.statusCode as number | undefined
  const methodStr = (entry.method as string) ?? ''

  // @ts-ignore
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <div className={styles.modalTitle}>
            <div className={styles.titleIcon}>
              {type === 'requests' ? (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
                  <polyline points="13 2 13 9 20 9" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
              )}
            </div>
            <div>
              <h3>{type === 'requests' ? 'Szczegóły żądania' : 'Szczegóły błędu'}</h3>
              <code className={styles.entryId}>{String(entry._id)}</code>
            </div>
          </div>
          <button className={styles.closeBtn} onClick={onClose} title="Zamknij (Esc)">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className={styles.modalBody}>
          <div className={styles.mainRow}>
            {methodStr && (
              <span className={`${styles.methodBadge} ${styles[methodStr.toLowerCase()]}`}>
                {methodStr}
              </span>
            )}
            {statusCode && (
              <span className={`${styles.statusBadge} ${getStatusClass(statusCode)}`}>
                {statusCode}
              </span>
            )}
            {entry.duration != null && (
              <span className={styles.durationBadge}>{String(entry.duration)}ms</span>
            )}
          </div>

          <div className={styles.section}>
            <div className={styles.sectionTitle}>Podstawowe informacje</div>
            <div className={styles.fields}>
              <Field label="Data / czas" value={entry.createdAt ? formatDate(String(entry.createdAt)) : null} />
              {entry.url && <Field label="URL" value={<code>{String(entry.url)}</code>} />}
              {entry.method && <Field label="Metoda" value={String(entry.method)} />}
              {entry.statusCode != null && <Field label="Kod statusu" value={String(entry.statusCode)} />}
              {entry.duration != null && <Field label="Czas odpowiedzi" value={`${String(entry.duration)} ms`} />}
              {entry.ip && <Field label="IP klienta" value={<code>{String(entry.ip)}</code>} />}
              {entry.userId && <Field label="ID użytkownika" value={<code>{String(entry.userId)}</code>} />}
            </div>
          </div>

          {type === 'errors' && entry.message && (
            <div className={styles.section}>
              <div className={styles.sectionTitle}>Komunikat błędu</div>
              <div className={styles.messageBlock}>{String(entry.message)}</div>
            </div>
          )}

          {type === 'errors' && entry.stack && (
            <div className={styles.section}>
              <div className={styles.sectionTitle}>Stack trace</div>
              <pre className={styles.stackTrace}>{String(entry.stack)}</pre>
            </div>
          )}

          {entry.userAgent && (
            <div className={styles.section}>
              <div className={styles.sectionTitle}>User Agent</div>
              <code className={styles.userAgent}>{String(entry.userAgent)}</code>
            </div>
          )}

          <div className={styles.section}>
            <div className={styles.sectionTitle}>Surowe dane (JSON)</div>
            <pre className={styles.rawJson}>{JSON.stringify(entry, null, 2)}</pre>
          </div>
        </div>
      </div>
    </div>
  )
}