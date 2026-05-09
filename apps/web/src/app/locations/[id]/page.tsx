'use client'

import React, { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import styles from '../locations.module.scss'
import { AddLocationModal } from '../components/AddLocationModal'
import { locationsApi } from '../locations.api' // <-- Używamy API zamiast surowego fetch

// Importy naszych współdzielonych komponentów
import { SearchBar } from '@/components/searchBar'
import { FilterPanel, FilterGroup } from '@/components/filterPanel'

interface DetailedLocation {
  id: string
  name: string
  type: string
  parentId: string | null
  children: any[]
  machines: any[]
}

export default function LocationDetailsPage() {
  const { id } = useParams()
  const router = useRouter()
  const [location, setLocation] = useState<DetailedLocation | null>(null)
  const [loading, setLoading] = useState(true)

  const [isEditing, setIsEditing] = useState(false)
  const [editName, setEditName] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)

  // --- STANY DLA WYSZUKIWARKI I FILTRÓW ---
  const [searchQuery, setSearchQuery] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [filterType, setFilterType] = useState('')

  const fetchDetails = async () => {
    try {
      const data = await locationsApi.getById(id as string)
      setLocation(data)
      setEditName(data.name)
    } catch (err) {
      console.error(err)
      router.push('/locations')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDetails()
  }, [id])

  const handleDelete = async () => {
    if (!window.confirm('Czy na pewno chcesz usunąć tę lokalizację?')) return

    try {
      await locationsApi.delete(id as string)
      router.push('/locations')
      router.refresh()
    } catch (err: any) {
      alert(`Błąd: ${err.message || 'Nie udało się usunąć lokalizacji'}`)
    }
  }

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await locationsApi.update(id as string, { name: editName })
      setIsEditing(false)
      fetchDetails()
    } catch (err: any) {
      alert(`Błąd: ${err.message || 'Błąd podczas aktualizacji'}`)
    }
  }

  // --- LOGIKA FILTROWANIA JEDNOSTEK PODRZĘDNYCH ---
  const filteredChildren = location?.children.filter((child) => {
    const matchSearch = child.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchType = filterType ? child.type === filterType : true
    return matchSearch && matchType
  }) || []

  if (loading) return <div className={styles.loading}>Pobieranie detali...</div>
  if (!location) return null

  return (
    <div className={styles.container}>
      <div className={styles.topBar}>
        <button onClick={() => router.back()} className={styles.backBtn}>
          ← Powrót
        </button>

        <div className={styles.actionGroup}>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className={styles.editBtn}
          >
            {isEditing ? 'Anuluj' : 'Edytuj'}
          </button>
          <button onClick={handleDelete} className={styles.deleteBtn}>
            Usuń
          </button>
        </div>
      </div>

      <header className={styles.detailHeader}>
        <div className={styles.badge}>{location.type}</div>

        {isEditing ? (
          <form onSubmit={handleUpdate} className={styles.editForm}>
            <input
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              className={styles.editInput}
              autoFocus
            />
            <button type="submit" className={styles.saveBtn}>Zapisz</button>
          </form>
        ) : (
          <h1>{location.name}</h1>
        )}

        <p className={styles.idText}>ID: {location.id}</p>
      </header>

      <div className={styles.detailsGrid}>
        <section className={styles.infoSection}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid rgba(244, 238, 224, 0.1)', paddingBottom: '0.5rem' }}>
            <h2 style={{ borderBottom: 'none', margin: 0, padding: 0 }}>Struktura podrzędna</h2>
            <button
              className={styles.addBtn}
              style={{ padding: '0.4rem 0.8rem', fontSize: '0.9rem' }}
              onClick={() => setIsModalOpen(true)}
            >
              + Dodaj
            </button>
          </div>

          {/* --- KOMPONENTY WYSZUKIWARKI I FILTRÓW --- */}
          {location.children.length > 0 && (
            <div style={{ marginBottom: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <SearchBar
                value={searchQuery}
                onChange={setSearchQuery}
                showFilterToggle={true}
                isFilterActive={showFilters}
                onToggleFilters={() => setShowFilters(!showFilters)}
                placeholder="Szukaj w strukturze..."
              />

              {showFilters && (
                <FilterPanel onReset={() => {
                  setSearchQuery('');
                  setFilterType('');
                }}>
                  <FilterGroup label="Typ podlokalizacji">
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
            </div>
          )}

          <div className={styles.subList}>
            {filteredChildren.length > 0 ? (
              filteredChildren.map((child) => (
                <div
                  key={child.id}
                  className={styles.subItem}
                  onClick={() => router.push(`/locations/${child.id}`)}
                >
                  <span>{child.name}</span>
                  <small>{child.type}</small>
                </div>
              ))
            ) : (
              <p className={styles.emptyText}>Brak jednostek podrzędnych spełniających kryteria.</p>
            )}
          </div>
        </section>
      </div>

      <AddLocationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={fetchDetails}
        parentId={id as string}
      />
    </div>
  )
}