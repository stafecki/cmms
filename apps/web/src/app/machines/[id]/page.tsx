'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { fetchMachineById, fetchMachineTco } from '../machines.api'
import { Machine, TcoReport } from '../types'
import DocumentTable from '../components/documentTable'

import styles from './machineDetails.module.scss'

export default function MachineDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const id = params.id as string

  const [machine, setMachine] = useState<Machine | null>(null)
  const [tco, setTco] = useState<TcoReport | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true)
        setError(null)

        const [machineData, tcoData] = await Promise.all([
          fetchMachineById(id),
          fetchMachineTco(id).catch((err) => {
            console.warn('Nie udało się pobrać TCO (możliwy brak uprawnień):', err)
            return null
          })
        ])

        setMachine(machineData)
        setTco(tcoData)
      } catch (err) {
        console.error('Błąd ładowania szczegółów', err)
        setError('Nie udało się pobrać danych maszyny.')
      } finally {
        setIsLoading(false)
      }
    }

    if (id) {
      loadData()
    }
  }, [id])

  if (isLoading) {
    return <div className={styles.loading}>Ładowanie szczegółów maszyny...</div>
  }

  if (error || !machine) {
    return (
      <div className={styles.errorState}>
        <p>{error || 'Nie znaleziono maszyny.'}</p>
        <button onClick={() => router.back()} className={styles.backBtn} style={{ marginTop: '1rem' }}>
          Wróć
        </button>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <button
        onClick={() => router.back()}
        className={styles.backBtn}
      >
        &larr; Powrót do listy
      </button>

      <div className={styles.header}>
        <h1>{machine.name}</h1>
        <p className={styles.serialText}>
          SN: {machine.serialNumber}
        </p>
      </div>

      <div className={styles.cardsContainer}>

        <div className={styles.infoCard}>
          <h3>Informacje podstawowe</h3>

          <div className={styles.dataRow}>
            <span className={styles.label}>Lokalizacja</span>
            <span className={styles.value}>{machine.location?.name || 'Brak przypisania'}</span>
          </div>
          <div className={styles.dataRow}>
            <span className={styles.label}>Status</span>
            <span className={machine.isActive ? styles.statusActive : styles.statusInactive}>
              {machine.isActive ? 'Aktywna' : 'Nieaktywna'}
            </span>
          </div>
          <div className={styles.dataRow}>
            <span className={styles.label}>Roboczogodziny</span>
            <span className={styles.value}>{machine.operatingHours} h</span>
          </div>
          <div className={styles.dataRow}>
            <span className={styles.label}>Data zakupu</span>
            <span className={styles.value}>{new Date(machine.purchaseDate).toLocaleDateString()}</span>
          </div>
          <div className={styles.dataRow}>
            <span className={styles.label}>Cena zakupu</span>
            <span className={styles.value}>{Number(machine.purchasePrice).toFixed(2)} PLN</span>
          </div>
        </div>

        {/* Raport TCO (Jeśli dostępny dla roli użytkownika) */}
        {tco && (
          <div className={styles.infoCard}>
            <h3>Raport TCO <span style={{ fontSize: '0.8rem', fontWeight: 'normal', color: 'rgba(240, 237, 229, 0.6)' }}>(Total Cost of Ownership)</span></h3>

            <div className={styles.dataRow}>
              <span className={styles.label}>Ilość zleceń (Work Orders)</span>
              <span className={styles.value}>{tco.workOrdersCount}</span>
            </div>
            <div className={styles.dataRow}>
              <span className={styles.label}>Koszty części</span>
              <span className={styles.value}>{tco.totalPartsCost.toFixed(2)} PLN</span>
            </div>
            <div className={styles.dataRow}>
              <span className={styles.label}>Koszty robocizny</span>
              <span className={styles.value}>{tco.totalLaborCost.toFixed(2)} PLN</span>
            </div>

            <div className={styles.tcoTotal}>
              <span className={styles.label}>Całkowity koszt</span>
              <span className={styles.value}>{tco.totalCost.toFixed(2)} PLN</span>
            </div>
          </div>
        )}
      </div>

      <div style={{ marginTop: '2rem' }}>
        <h2 className={styles.sectionTitle}>Dokumenty techniczne</h2>
        <DocumentTable documents={machine.documents} />
      </div>

    </div>
  )
}