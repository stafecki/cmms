'use client'

import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import Link from 'next/link'
import styles from './locations.module.scss'

interface Location {
  id: string
  name: string
  type: string
  parentId: string | null
  children?: Location[]
}

export default function LocationsPage() {
  const [locations, setLocations] = useState<Location[]>([])
  const [loading, setLoading] = useState(true)
  const token = Cookies.get('accessToken')

  const fetchLocations = async () => {
    try {
      const res = await fetch(`http://localhost:3000/locations`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })

      if (res.ok) {
        const data = await res.json()
        setLocations(data)
      }
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

    const confirmed = window.confirm('Czy na pewno chcesz usunąć tę lokalizację? Operacja jest nieodwracalna.')
    if (!confirmed) return

    try {
      const res = await fetch(`http://localhost:3000/locations/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })

      if (res.ok) {
        fetchLocations()
      } else {
        const errData = await res.json()
        alert(`Nie można usunąć: ${errData.message || 'Błąd serwera'}`)
      }
    } catch (err) {
      console.error('Błąd sieciowy:', err)
      alert('Wystąpił błąd podczas połączenia z serwerem.')
    }
  }

  if (loading) return <div className={styles.loading}>Wczytywanie struktury...</div>

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.titleSection}>
          <h1>Struktura <span>Lokalizacji</span></h1>
          <p className={styles.helperText}>Zarządzaj obszarami, regałami i punktami składowania.</p>
        </div>
        <button className={styles.addBtn}>+ Dodaj obszar</button>
      </header>

      <div className={styles.content}>
        <div className={styles.locationGrid}>
          {locations.map((loc) => (
            <Link
              href={`/locations/${loc.id}`}
              key={loc.id}
              className={styles.cardLink}
            >
              <div className={styles.locationCard}>
                <div className={styles.cardHeader}>
                  <span className={styles.typeTag}>{loc.type}</span>
                  <div className={styles.actions}>
                    <button
                      onClick={(e) => handleDelete(e, loc.id)}
                      className={styles.deleteIcon}
                      title="Usuń lokalizację"
                    >
                      usuń
                    </button>
                  </div>
                </div>
                <h3>{loc.name}</h3>

                {loc.children && loc.children.length > 0 && (
                  <div className={styles.subLocations}>
                    <h4>Podlokalizacje:</h4>
                    <ul>
                      {loc.children.map((child) => (
                        <li key={child.id}>
                          <span>{child.name}</span>
                          <small>{child.type}</small>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}