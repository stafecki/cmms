'use client'

import { useEffect, useState, useMemo } from 'react'
import { useAuth } from '../../context/AuthContext'
import styles from './preventive.module.scss'
import { PreventivePlan } from './types'
import Link from 'next/link'
import {
  fetchPreventivePlans,
  fetchUpcomingPlans,
  triggerPlan,
  deletePlan,
  checkAndCreateOrders
} from './preventive.api'

import { SearchBar } from '../../components/searchBar/SearchBar'
import { FilterPanel, FilterGroup } from '../../components/filterPanel/FilterPanel'

import { PreventiveModal } from './components/PreventiveModal'

export default function PreventivePage() {
  const { user, isLoading: isAuthLoading } = useAuth()

  const [plans, setPlans] = useState<PreventivePlan[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<'ALL' | 'UPCOMING'>('ALL')

  // Stany dla filtrów i modala
  const [showFilters, setShowFilters] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [machineFilter, setMachineFilter] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Uprawnienia z backendu
  const canManage = user?.role === 'ADMIN' || user?.role === 'MANAGER'
  const canDelete = user?.role === 'ADMIN'
  const canRunCheck = user?.role === 'ADMIN'

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
      if (activeTab === 'ALL') {
        const data = await fetchPreventivePlans()
        setPlans(data)
      } else {
        const data = await fetchUpcomingPlans(7)
        setPlans(data)
      }
    } catch (err: any) {
      setError(err.message || 'Wystąpił błąd podczas ładowania planów.')
    } finally {
      setIsLoading(false)
    }
  }

  // Akcje
  const handleTrigger = async (id: string) => {
    if (!window.confirm('Czy na pewno chcesz ręcznie wygenerować zlecenie pracy dla tego planu?')) return
    try {
      await triggerPlan(id)
      alert('Zlecenie zostało pomyślnie wygenerowane!')
      loadData()
    } catch (err) {
      alert('Błąd podczas generowania zlecenia.')
    }
  }

  const handleDelete = async (id: string) => {
    if (!window.confirm('Czy usunąć ten plan prewencyjny? (Zostanie on zarchiwizowany)')) return
    try {
      await deletePlan(id)
      setPlans(prev => prev.filter(p => p.id !== id))
    } catch (err) {
      alert('Błąd podczas usuwania planu.')
    }
  }

  const handleRunCheck = async () => {
    try {
      const res = await checkAndCreateOrders()
      alert(res.message)
      loadData()
    } catch (err) {
      alert('Nie udało się uruchomić weryfikacji.')
    }
  }

  // --- LOGIKA FILTROWANIA ---

  const handleResetFilters = () => {
    setSearchQuery('')
    setMachineFilter('')
  }

  const uniqueMachines = useMemo(() => {
    const machinesMap = new Map<string, string>()
    plans.forEach(plan => {
      if (plan.machine) {
        machinesMap.set(plan.machine.id, plan.machine.name)
      }
    })
    return Array.from(machinesMap.entries())
  }, [plans])

  const filteredPlans = useMemo(() => {
    return plans.filter(plan => {
      const matchesSearch = plan.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (plan.machine?.name.toLowerCase() || '').includes(searchQuery.toLowerCase())

      const matchesMachine = machineFilter ? plan.machine?.id === machineFilter : true

      return matchesSearch && matchesMachine
    })
  }, [plans, searchQuery, machineFilter])


  const getStatusColor = (nextRunAt?: string | null) => {
    if (!nextRunAt) return styles.statusNormal
    const date = new Date(nextRunAt)
    const now = new Date()
    if (date < now) return styles.statusOverdue

    const warningDate = new Date()
    warningDate.setDate(now.getDate() + 7)
    if (date < warningDate) return styles.statusWarning

    return styles.statusNormal
  }

  if (isAuthLoading) {
    return <div className={styles.container}><div className={styles.loading}>Weryfikacja sesji...</div></div>
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.titleSection}>
          <h1>Plany <span>Prewencyjne</span></h1>
        </div>

        <div className={styles.headerActions}>
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Szukaj planu lub maszyny..."
            showFilterToggle={true}
            isFilterActive={showFilters}
            onToggleFilters={() => setShowFilters(!showFilters)}
          />

          {canRunCheck && (
            <button className={styles.checkBtn} onClick={handleRunCheck}>
              Wymuś weryfikację
            </button>
          )}

          {canManage && (
            <button className={styles.addBtn} onClick={() => setIsModalOpen(true)}>
              + Nowy Plan
            </button>
          )}
        </div>
      </div>

      <div className={styles.tabs}>
        <button
          className={`${styles.tabBtn} ${activeTab === 'ALL' ? styles.active : ''}`}
          onClick={() => setActiveTab('ALL')}
        >
          Wszystkie plany ({activeTab === 'ALL' ? filteredPlans.length : '...'})
        </button>
        <button
          className={`${styles.tabBtn} ${activeTab === 'UPCOMING' ? styles.active : ''}`}
          onClick={() => setActiveTab('UPCOMING')}
        >
          Zbliżające się (7 dni) ({activeTab === 'UPCOMING' ? filteredPlans.length : '...'})
        </button>
      </div>

      {showFilters && (
        <div style={{ marginBottom: '2rem' }}>
          <FilterPanel onReset={handleResetFilters}>
            <FilterGroup label="Maszyna">
              <select
                value={machineFilter}
                onChange={(e) => setMachineFilter(e.target.value)}
              >
                <option value="">Wszystkie maszyny</option>
                {uniqueMachines.map(([id, name]) => (
                  <option key={id} value={id}>{name}</option>
                ))}
              </select>
            </FilterGroup>
          </FilterPanel>
        </div>
      )}

      {isLoading ? (
        <div className={styles.loading}>Ładowanie danych...</div>
      ) : error ? (
        <div className={styles.error}>{error}</div>
      ) : filteredPlans.length === 0 ? (
        <div className={styles.empty}>Brak planów prewencyjnych spełniających kryteria.</div>
      ) : (
        <div className={styles.grid}>
          {filteredPlans.map(plan => (
            <div key={plan.id} className={styles.card}>
              <div className={styles.cardHeader}>
                <h3>{plan.name}</h3>
                <span className={styles.machineTag}>{plan.machine?.name || 'Brak powiązania'}</span>
              </div>

              <div className={styles.details}>
                <div className={styles.infoRow}>
                  <span className={styles.label}>Interwał:</span>
                  <span className={styles.value}>
                    {plan.intervalDays ? `co ${plan.intervalDays} dni` : ''}
                    {plan.intervalHours ? ` co ${plan.intervalHours} h pracy` : ''}
                  </span>
                </div>

                <div className={styles.infoRow}>
                  <span className={styles.label}>Ostatni przegląd:</span>
                  <span className={styles.value}>
                    {plan.lastRunAt ? new Date(plan.lastRunAt).toLocaleDateString() : 'Nigdy'}
                  </span>
                </div>

                <div className={styles.infoRow}>
                  <span className={styles.label}>Następny przegląd:</span>
                  <span className={`${styles.value} ${getStatusColor(plan.nextRunAt)}`}>
                    {plan.nextRunAt ? new Date(plan.nextRunAt).toLocaleString('pl-PL') : 'Brak danych'}
                  </span>
                </div>

                <div className={styles.checklistPreview}>
                  <span className={styles.label}>Zadania kontrolne:</span>
                  <span className={styles.value}>{plan.checklist?.length || 0} kroków</span>
                </div>
              </div>

              <div className={styles.actions}>
                <Link className={styles.detailsLink} href={`/preventive/${plan.id}`} >
                  Szczegóły
                </Link>

                {canManage && (
                  <button onClick={() => handleTrigger(plan.id)} className={styles.triggerBtn}>
                    Generuj Zlecenie
                  </button>
                )}
                {canDelete && (
                  <button onClick={() => handleDelete(plan.id)} className={styles.deleteBtn}>
                    Usuń
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {isModalOpen && (
        <PreventiveModal
          onClose={() => setIsModalOpen(false)}
          onSuccess={() => {
            setIsModalOpen(false)
            loadData()
          }}
        />
      )}
    </div>
  )
}