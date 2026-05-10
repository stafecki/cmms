'use client'

import { useState } from 'react'
import LogsTable from './Logstable'
import StatsBar from './Statsbar'
import { FilterPanel, FilterGroup } from '@/components/filterPanel/FilterPanel'
import styles from './MonitoringDashboard.module.scss'

export type LogType = 'requests' | 'errors'

export interface LogFilters {
  from?: string
  to?: string
  userId?: string
  statusCode?: string
  limit: number
  offset: number
}

const DEFAULT_FILTERS: LogFilters = {
  limit: 50,
  offset: 0,
}

export default function MonitoringDashboard() {
  const [activeTab, setActiveTab] = useState<LogType>('requests')
  const [filters, setFilters] = useState<LogFilters>(DEFAULT_FILTERS)

  const handleFilterChange = (patch: Partial<LogFilters>) => {
    setFilters(prev => ({ ...prev, ...patch, offset: 0 }))
  }

  const handleReset = () => {
    setFilters(DEFAULT_FILTERS)
  }

  const handleTabChange = (tab: LogType) => {
    setActiveTab(tab)
    setFilters(DEFAULT_FILTERS)
  }

  return (
    <div className={styles.dashboard}>
      <div className={styles.header}>
        <div className={styles.titleBlock}>
          <div>
            <h1>Monitoring systemu</h1>
            <p>Logi żądań i błędów aplikacji CMMS</p>
          </div>
        </div>

        <div className={styles.tabs}>
          <button
            className={`${styles.tab} ${activeTab === 'requests' ? styles.active : ''}`}
            onClick={() => handleTabChange('requests')}
          >
            Żądania HTTP
          </button>
          <button
            className={`${styles.tab} ${activeTab === 'errors' ? styles.active : ''}`}
            onClick={() => handleTabChange('errors')}
          >
            Błędy
          </button>
        </div>
      </div>

      <StatsBar type={activeTab} filters={filters} />

      <div className={styles.filtersWrapper}>
        <FilterPanel onReset={handleReset}>
          <FilterGroup label="Data od">
            <input
              type="datetime-local"
              value={filters.from ?? ''}
              onChange={e => handleFilterChange({ from: e.target.value || undefined })}
            />
          </FilterGroup>

          <FilterGroup label="Data do">
            <input
              type="datetime-local"
              value={filters.to ?? ''}
              onChange={e => handleFilterChange({ to: e.target.value || undefined })}
            />
          </FilterGroup>

          <FilterGroup label="ID użytkownika">
            <input
              type="text"
              placeholder="np. clx1abc..."
              value={filters.userId ?? ''}
              onChange={e => handleFilterChange({ userId: e.target.value || undefined })}
            />
          </FilterGroup>

          <FilterGroup label="Kod statusu">
            <input
              type="number"
              placeholder="np. 500"
              value={filters.statusCode ?? ''}
              onChange={e => handleFilterChange({ statusCode: e.target.value || undefined })}
            />
          </FilterGroup>

          <FilterGroup label="Wierszy na stronę">
            <select
              value={filters.limit}
              onChange={e => handleFilterChange({ limit: Number(e.target.value) })}
            >
              {[10, 25, 50, 100].map(v => (
                <option key={v} value={v}>{v}</option>
              ))}
            </select>
          </FilterGroup>
        </FilterPanel>
      </div>

      <LogsTable
        type={activeTab}
        filters={filters}
        onPageChange={offset => setFilters(prev => ({ ...prev, offset }))}
      />
    </div>
  )
}