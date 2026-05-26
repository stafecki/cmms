'use client'

import { useEffect, useState, useMemo } from 'react'
import Link from 'next/link'
import { fetchMachines, deleteMachine } from './machines.api'
import { Machine } from './types'

import { FilterPanel, FilterGroup } from '../../components/filterPanel/FilterPanel'
import { SearchBar } from '../../components/searchBar/SearchBar'
import styles from './machines.module.scss'
import { useAuth } from '../../context/AuthContext'
import AddMachineModal from './components/AddMachineModal'

export default function MachinesPage() {
  const { user } = useAuth()
  const [machines, setMachines] = useState<Machine[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [searchQuery, setSearchQuery] = useState('')
  const [locationFilter, setLocationFilter] = useState('')
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)

  const canAddMachine = user?.role === 'ADMIN' || user?.role === 'MANAGER'
  const canDeleteMachine = user?.role === 'ADMIN'

  useEffect(() => {
    loadMachines()
  }, [])

  const loadMachines = async () => {
    try {
      setIsLoading(true)
      const data = await fetchMachines()
      setMachines(data)
    } catch (err: any) {
      if (err.message?.includes('401')) {
        console.error('Błąd autoryzacji: Sesja wygasła.')
      }
      setError('Wystąpił błąd podczas ładowania maszyn.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!window.confirm('Czy na pewno chcesz usunąć tę maszynę?')) return

    try {
      await deleteMachine(id)
      setMachines(machines.filter(m => m.id !== id))
    } catch (err) {
      alert('Nie udało się usunąć maszyny. Brak uprawnień lub błąd serwera.')
    }
  }

  const handleResetFilters = () => {
    setSearchQuery('')
    setLocationFilter('')
  }

  const uniqueLocations = useMemo(() => {
    const locations = new Map<string, string>()
    machines.forEach(m => {
      if (m.location) {
        locations.set(m.location.id, m.location.name)
      }
    })
    return Array.from(locations.entries())
  }, [machines])

  const filteredMachines = useMemo(() => {
    return machines.filter(machine => {
      const searchLower = searchQuery.toLowerCase()
      const matchesSearch =
        machine.name.toLowerCase().includes(searchLower) ||
        machine.serialNumber.toLowerCase().includes(searchLower)

      const matchesLocation = locationFilter ? machine.locationId === locationFilter : true

      return matchesSearch && matchesLocation
    })
  }, [machines, searchQuery, locationFilter])


  if (isLoading) return <div className={styles.loading}>Ładowanie maszyn...</div>
  if (error) return <div className={styles.error}>{error}</div>

  return (
    <div className={styles.container}>

      <div className={styles.header}>
        <div className={styles.titleSection}>
          <h1>Zarządzanie <span>Maszynami</span></h1>
        </div>

        {canAddMachine && (
          <button className={styles.addBtn} onClick={() => setIsAddModalOpen(true)}>
            + Dodaj maszynę
          </button>
        )}
      </div>

      <div className={styles.filtersWrapper}>
        <FilterPanel onReset={handleResetFilters}>
          <FilterGroup label="Wyszukaj">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Szukaj nazwy lub nr seryjnego..."
            />
          </FilterGroup>

          <FilterGroup label="Lokalizacja">
            <select
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
            >
              <option value="">Wszystkie lokalizacje</option>
              {uniqueLocations.map(([id, name]) => (
                <option key={id} value={id}>{name}</option>
              ))}
            </select>
          </FilterGroup>
        </FilterPanel>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
          <tr>
            <th>Status</th>
            <th>Nazwa</th>
            <th>Numer Seryjny</th>
            <th>Lokalizacja</th>
            <th>Roboczogodziny</th>
            <th>Akcje</th>
          </tr>
          </thead>
          <tbody>
          {filteredMachines.map((machine) => (
            <tr key={machine.id}>
              <td>
                 <span className={styles.statusIndicator} title={machine.isActive ? 'Aktywna' : 'Nieaktywna'}>
                    {machine.isActive ? '🟢' : '🔴'}
                  </span>
              </td>
              <td className={styles.machineName}>{machine.name}</td>
              <td className={styles.serialNumber}>{machine.serialNumber}</td>
              <td className={styles.locationName}>{machine.location?.name || 'Brak'}</td>
              <td>{machine.operatingHours} h</td>
              <td className={styles.actionCell}>
                <Link href={`/machines/${machine.id}`} className={styles.detailsLink}>
                  Szczegóły
                </Link>

                {canDeleteMachine && (
                  <button
                    onClick={() => handleDelete(machine.id)}
                    className={styles.deleteIcon}
                  >
                    Usuń
                  </button>
                )}
              </td>
            </tr>
          ))}
          {filteredMachines.length === 0 && (
            <tr>
              <td colSpan={6} className={styles.emptyText}>
                Brak maszyn spełniających kryteria wyszukiwania.
              </td>
            </tr>
          )}
          </tbody>
        </table>
      </div>

      <AddMachineModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSuccess={(newMachine) => setMachines([newMachine, ...machines])}
      />

    </div>
  )
}