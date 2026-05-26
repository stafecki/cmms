'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import styles from './locations.module.scss'
import { AddLocationModal } from './components/AddLocationModal'
import { locationsApi } from './locations.api'
import { useAuth } from '@/context/AuthContext'

import { SearchBar } from '@/components/searchBar'
import { FilterPanel, FilterGroup } from '@/components/filterPanel'

interface Location {
  id: string
  name: string
  type: string
  parentId: string | null
  children?: Location[]
}

export default function LocationsPage() {
  const { user } = useAuth() // Pobieramy zalogowanego użytkownika

  const [locations, setLocations] = useState<Location[]>([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const [searchQuery, setSearchQuery] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [filterType, setFilterType] = useState('')

  const canAddLocation = user?.role === 'ADMIN' || user?.role === 'MANAGER'
  const canDeleteLocation = user?.role === 'ADMIN'

  const fetchLocations = async () => {
    try {
      const data = await locationsApi.getAll()
      setLocations(data)
    } catch (err) {
      console.error('Błąd pobierania lokalizacji:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchLocations()
  }, [])

  const handleDelete = async (e: React.MouseEvent, id: string) => {
    e.preventDefault()
    e.stopPropagation()

    if (!canDeleteLocation) {
      alert('Nie masz uprawnień do usuwania lokalizacji.')
      return
    }

    if (!window.confirm('Czy na pewno chcesz usunąć tę lokalizację?')) return

    try {
      await locationsApi.delete(id)
      fetchLocations()
    } catch (err: any) {
     const errorMessage = err.response?.data?.message || err.message || 'Wystąpił błąd podczas usuwania.'
      alert(`Nie można usunąć: ${errorMessage}`)
    }
  }

  const filteredLocations = locations.filter(loc => {
    const matchSearch = loc.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchType = filterType ? loc.type === filterType : true;
    return matchSearch && matchType;
  });

  if (loading) return <div className={styles.loading}>Wczytywanie struktury...</div>

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.titleSection}>
          <h1>Struktura <span>Lokalizacji</span></h1>
          <p className={styles.helperText}>Zarządzaj obszarami, regałami i punktami składowania.</p>
        </div>

        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            showFilterToggle={true}
            isFilterActive={showFilters}
            onToggleFilters={() => setShowFilters(!showFilters)}
            placeholder="Szukaj lokalizacji..."
          />

          {canAddLocation && (
            <button
              className={styles.addBtn}
              onClick={() => setIsModalOpen(true)}
            >
              + Dodaj
            </button>
          )}
        </div>
      </header>

      {showFilters && (
        <FilterPanel onReset={() => {
          setSearchQuery('');
          setFilterType('');
        }}>
          <FilterGroup label="Typ lokalizacji">
            <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
              <option value="">Wszystkie typy</option>
              <option value="PLANT">Zakład / Fabryka</option>
              <option value="HALL">Hala produkcyjna</option>
              <option value="LINE">Linia / Sekcja</option>
              <option value="STATION">Stacja robocza</option>
            </select>
          </FilterGroup>
        </FilterPanel>
      )}

      <div className={styles.content}>
        <div className={styles.locationGrid}>
          {filteredLocations.length === 0 ? (
            <p className={styles.emptyText}>Brak wyników do wyświetlenia.</p>
          ) : (
            filteredLocations.map((loc) => (
              <Link
                href={`/locations/${loc.id}`}
                key={loc.id}
                className={styles.cardLink}
              >
                <div className={styles.locationCard}>
                  <div className={styles.cardHeader}>
                    <span className={styles.typeTag}>{loc.type}</span>
                    <div className={styles.actions}>
                      {canDeleteLocation && (
                        <button
                          onClick={(e) => handleDelete(e, loc.id)}
                          className={styles.deleteIcon}
                          title="Usuń lokalizację"
                        >
                          usuń
                        </button>
                      )}
                    </div>
                  </div>
                  <h3>{loc.name}</h3>

                  {loc.children && loc.children.length > 0 && (
                    <div className={styles.subLocations}>
                      <h4>Podlokalizacje ({loc.children.length}):</h4>
                      <ul>
                        {loc.children.slice(0, 3).map((child) => (
                          <li key={child.id}>
                            <span>{child.name}</span>
                          </li>
                        ))}
                        {loc.children.length > 3 && <li>... i więcej</li>}
                      </ul>
                    </div>
                  )}
                </div>
              </Link>
            ))
          )}
        </div>
      </div>

      {canAddLocation && (
        <AddLocationModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSuccess={fetchLocations}
        />
      )}
    </div>
  )
}