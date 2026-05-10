'use client'

import { useEffect, useState, useCallback } from 'react'
import Cookies from 'js-cookie'
import type { LogType, LogFilters } from './MonitoringDashboard'
import LogDetailModal from './Logdetailmodal'
import styles from './LogsTable.module.scss'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'

interface RequestLogEntry {
  _id: string
  method: string
  url: string
  statusCode: number
  userId?: string
  duration?: number
  ip?: string
  userAgent?: string
  createdAt: string
}

interface ErrorLogEntry {
  _id: string
  message: string
  stack?: string
  statusCode?: number
  userId?: string
  url?: string
  method?: string
  ip?: string
  createdAt: string
}

type LogEntry = RequestLogEntry | ErrorLogEntry

interface LogsResponse {
  data: LogEntry[]
  total: number
  limit: number
  offset: number
}

interface LogsTableProps {
  type: LogType
  filters: LogFilters
  onPageChange: (offset: number) => void
}

function getStatusClass(code?: number): string {
  if (!code) return styles.statusUnknown
  if (code < 300) return styles.status2xx
  if (code < 400) return styles.status3xx
  if (code < 500) return styles.status4xx
  return styles.status5xx
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr)
  return d.toLocaleString('pl-PL', {
    year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', second: '2-digit'
  })
}

function truncate(str: string | undefined | null, max: number): string {
  if (!str) return '—'
  return str.length > max ? str.slice(0, max) + '…' : str
}

export default function LogsTable({ type, filters, onPageChange }: LogsTableProps) {
  const [data, setData] = useState<LogEntry[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedEntry, setSelectedEntry] = useState<LogEntry | null>(null)

  const fetchLogs = useCallback(async () => {
    setLoading(true)
    setError(null)

    const token = Cookies.get('accessToken')
    const params = new URLSearchParams()
    params.set('limit', String(filters.limit))
    params.set('offset', String(filters.offset))
    if (filters.from) params.set('from', filters.from)
    if (filters.to) params.set('to', filters.to)
    if (filters.userId) params.set('userId', filters.userId)
    if (filters.statusCode) params.set('statusCode', filters.statusCode)

    try {
      const res = await fetch(`${API_URL}/monitoring/${type}?${params}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const json: LogsResponse = await res.json()
      setData(json.data)
      setTotal(json.total)
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Błąd pobierania danych')
    } finally {
      setLoading(false)
    }
  }, [type, filters])

  useEffect(() => {
    fetchLogs()
  }, [fetchLogs])

  const totalPages = Math.ceil(total / filters.limit)
  const currentPage = Math.floor(filters.offset / filters.limit) + 1

  // @ts-ignore
  // @ts-ignore
  return (
    <div className={styles.tableWrapper}>
      {loading && (
        <div className={styles.loadingOverlay}>
          <div className={styles.spinner} />
        </div>
      )}

      {error && (
        <div className={styles.errorBanner}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          {error}
          <button onClick={fetchLogs} className={styles.retryBtn}>Ponów</button>
        </div>
      )}

      {!error && (
        <>
          <div className={styles.tableScroll}>
            <table className={styles.table}>
              <thead>
              <tr>
                {type === 'requests' ? (
                  <>
                    <th>Czas</th>
                    <th>Metoda</th>
                    <th>URL</th>
                    <th>Status</th>
                    <th>Czas [ms]</th>
                    <th>Użytkownik</th>
                    <th>IP</th>
                  </>
                ) : (
                  <>
                    <th>Czas</th>
                    <th>Komunikat</th>
                    <th>Status</th>
                    <th>URL</th>
                    <th>Metoda</th>
                    <th>Użytkownik</th>
                    <th>IP</th>
                  </>
                )}
              </tr>
              </thead>
              <tbody>
              {!loading && data.length === 0 && (
                <tr>
                  <td colSpan={7} className={styles.emptyRow}>
                    <div className={styles.emptyState}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                        <circle cx="11" cy="11" r="8" />
                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                      </svg>
                      Brak wyników dla podanych filtrów
                    </div>
                  </td>
                </tr>
              )}

              {data.map(entry => (
                <tr
                  key={entry._id}
                  className={styles.row}
                  onClick={() => setSelectedEntry(entry)}
                >
                  {type === 'requests' ? (
                    <>
                      <td className={styles.dateCell}>{formatDate(entry.createdAt)}</td>
                      <td>
                          <span className={`${styles.methodBadge} ${styles[((entry as RequestLogEntry).method ?? 'GET').toLowerCase()]}`}>
                            {(entry as RequestLogEntry).method}
                          </span>
                      </td>
                      <td className={styles.urlCell}>{truncate((entry as RequestLogEntry).url, 60)}</td>
                      <td>
                          <span className={`${styles.statusBadge} ${getStatusClass((entry as RequestLogEntry).statusCode)}`}>
                            {(entry as RequestLogEntry).statusCode}
                          </span>
                      </td>
                      <td className={styles.durationCell}>
                        {(entry as RequestLogEntry).duration != null
                          ? `${(entry as RequestLogEntry).duration}ms`
                          : '—'}
                      </td>
                      <td className={styles.idCell}>
                        {(entry as RequestLogEntry).userId
                          ? truncate((entry as RequestLogEntry).userId!, 16)
                          : <span className={styles.anonymous}>—</span>}
                      </td>
                      <td className={styles.ipCell}>{(entry as RequestLogEntry).ip ?? '—'}</td>
                    </>
                  ) : (
                    <>
                      <td className={styles.dateCell}>{formatDate(entry.createdAt)}</td>
                      <td className={styles.messageCell}>{truncate((entry as ErrorLogEntry).message, 60)}</td>
                      <td>
                        {(entry as ErrorLogEntry).statusCode
                          ? <span className={`${styles.statusBadge} ${getStatusClass((entry as ErrorLogEntry).statusCode)}`}>
                                {(entry as ErrorLogEntry).statusCode}
                              </span>
                          : <span className={styles.anonymous}>—</span>}
                      </td>
                      <td className={styles.urlCell}>{(entry as ErrorLogEntry).url ? truncate((entry as ErrorLogEntry).url!, 40) : '—'}</td>
                      <td>
                        {(entry as ErrorLogEntry).method
                          ? <span className={`${styles.methodBadge} ${styles[((entry as ErrorLogEntry).method ?? 'GET').toLowerCase()]}`}>
                                {(entry as ErrorLogEntry).method}
                              </span>
                          : '—'}
                      </td>
                      <td className={styles.idCell}>
                        {(entry as ErrorLogEntry).userId
                          ? truncate((entry as ErrorLogEntry).userId!, 16)
                          : <span className={styles.anonymous}>—</span>}
                      </td>
                      <td className={styles.ipCell}>{(entry as ErrorLogEntry).ip ?? '—'}</td>
                    </>
                  )}
                </tr>
              ))}
              </tbody>
            </table>
          </div>

          <div className={styles.pagination}>
            <span className={styles.paginationInfo}>
              {total > 0
                ? `${filters.offset + 1}–${Math.min(filters.offset + filters.limit, total)} z ${total}`
                : '0 wyników'}
            </span>

            <div className={styles.paginationControls}>
              <button
                className={styles.pageBtn}
                disabled={currentPage === 1}
                onClick={() => onPageChange(0)}
                title="Pierwsza strona"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="11 17 6 12 11 7" />
                  <polyline points="18 17 13 12 18 7" />
                </svg>
              </button>
              <button
                className={styles.pageBtn}
                disabled={currentPage === 1}
                onClick={() => onPageChange(filters.offset - filters.limit)}
                title="Poprzednia strona"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>

              <span className={styles.pageNumbers}>
                {currentPage} / {Math.max(totalPages, 1)}
              </span>

              <button
                className={styles.pageBtn}
                disabled={currentPage >= totalPages}
                onClick={() => onPageChange(filters.offset + filters.limit)}
                title="Następna strona"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
              <button
                className={styles.pageBtn}
                disabled={currentPage >= totalPages}
                onClick={() => onPageChange((totalPages - 1) * filters.limit)}
                title="Ostatnia strona"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="13 17 18 12 13 7" />
                  <polyline points="6 17 11 12 6 7" />
                </svg>
              </button>
            </div>
          </div>
        </>
      )}

      {selectedEntry && (
        <LogDetailModal
          entry={selectedEntry}
          type={type}
          onClose={() => setSelectedEntry(null)}
        />
      )}
    </div>
  )
}