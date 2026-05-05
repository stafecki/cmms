'use client'

import React, { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Cookies from 'js-cookie'
import styles from '../locations.module.scss'

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

  // Stany dla edycji
  const [isEditing, setIsEditing] = useState(false)
  const [editName, setEditName] = useState('')

  const token = Cookies.get('accessToken')

  const fetchDetails = async () => {
    try {
      const res = await fetch(`http://localhost:3000/locations/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      if (res.ok) {
        const data = await res.json()
        setLocation(data)
        setEditName(data.name) // Inicjalizacja pola edycji
      } else {
        router.push('/locations')
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDetails()
  }, [id, token])

  // Obsługa usuwania
  const handleDelete = async () => {
    if (!window.confirm('Czy na pewno chcesz usunąć tę lokalizację?')) return

    try {
      const res = await fetch(`http://localhost:3000/locations/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      })

      if (res.ok) {
        router.push('/locations')
        router.refresh()
      } else {
        const error = await res.json()
        alert(`Błąd: ${error.message || 'Nie udało się usunąć lokalizacji'}`)
      }
    } catch (err) {
      console.error('Delete error:', err)
    }
  }

  // Obsługa edycji (PATCH)
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await fetch(`http://localhost:3000/locations/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ name: editName })
      })

      if (res.ok) {
        setIsEditing(false)
        fetchDetails() // Odświeżamy dane
      } else {
        alert('Błąd podczas aktualizacji')
      }
    } catch (err) {
      console.error('Update error:', err)
    }
  }

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
        {/* ... reszta Twojego kodu (sekcje children i machines) ... */}
        <section className={styles.infoSection}>
          <h2>Struktura podrzędna</h2>
          <div className={styles.subList}>
            {location.children.length > 0 ? (
              location.children.map((child) => (
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
              <p className={styles.emptyText}>Brak jednostek podrzędnych.</p>
            )}
          </div>
        </section>
      </div>
    </div>
  )
}