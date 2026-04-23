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
  const token = Cookies.get('accessToken')

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await fetch(`http://localhost:3000/locations/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        if (res.ok) {
          const data = await res.json()
          setLocation(data)
        } else {
          router.push('/locations')
        }
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchDetails()
  }, [id, token, router])

  if (loading) return <div className={styles.loading}>Pobieranie detali...</div>
  if (!location) return null

  return (
    <div className={styles.container}>
      <button onClick={() => router.back()} className={styles.backBtn}>
        ← Powrót do listy
      </button>

      <header className={styles.detailHeader}>
        <div className={styles.badge}>{location.type}</div>
        <h1>{location.name}</h1>
        <p className={styles.idText}>ID: {location.id}</p>
      </header>

      <div className={styles.detailsGrid}>
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

        <section className={styles.infoSection}>
          <h2>Maszyny i urządzenia</h2>
          <div className={styles.machineList}>
            <p className={styles.emptyText}>
              Brak przypisanych urządzeń w tej lokalizacji.
            </p>
          </div>
        </section>
      </div>
    </div>
  )
}
