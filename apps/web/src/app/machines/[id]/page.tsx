'use client'

import { useEffect, useState, use } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import styles from './machineDetails.module.scss'
import { fetchMachineById } from '../machines.api'
import { Machine } from '../types'
import { useAuth } from '../../../context/AuthContext'
import EditMachineModal from '../components/EditMachineModal'

interface PageProps {
  params: Promise<{ id: string }>
}

export default function MachineDetailsPage({ params }: PageProps) {
  const { user } = useAuth()
  const router = useRouter()

  const resolvedParams = use(params)
  const id = resolvedParams.id

  const [machine, setMachine] = useState<Machine | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)

  const canEditMachine = user?.role === 'ADMIN' || user?.role === 'MANAGER'

  useEffect(() => {
    const loadMachine = async () => {
      try {
        setIsLoading(true)
        const data = await fetchMachineById(id)
        setMachine(data)
      } catch (err: any) {
        setError('Nie udało się załadować szczegółów maszyny.')
      } finally {
        setIsLoading(false)
      }
    }
    loadMachine()
  }, [id])

  const handleEditSuccess = (updatedMachine: Machine) => {
    setMachine(updatedMachine)
  }

  if (isLoading) return <div className={styles.loading}>Ładowanie...</div>
  if (error || !machine) return <div className={styles.error}>{error || 'Nie znaleziono maszyny'}</div>

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.titleSection}>
          <Link href="/machines" className={styles.backLink}>← Powrót do listy</Link>
          <h1>Szczegóły: <span>{machine.name}</span></h1>
        </div>

        {canEditMachine && (
          <button
            className={styles.editBtn}
            onClick={() => setIsEditModalOpen(true)}
          >
            Edytuj maszynę
          </button>
        )}
      </div>

      <div className={styles.content}>
        <div className={styles.infoCard}>
          <h3>Podstawowe informacje</h3>
          <div className={styles.grid}>
            <div className={styles.field}>
              <span className={styles.label}>Nazwa:</span>
              <span className={styles.value}>{machine.name}</span>
            </div>
            <div className={styles.field}>
              <span className={styles.label}>Numer seryjny:</span>
              <span className={styles.value}>{machine.serialNumber}</span>
            </div>
            <div className={styles.field}>
              <span className={styles.label}>Status:</span>
              <span className={styles.value}>
                {machine.isActive ? '🟢 Aktywna' : '🔴 Nieaktywna'}
              </span>
            </div>
            <div className={styles.field}>
              <span className={styles.label}>Roboczogodziny:</span>
              <span className={styles.value}>{machine.operatingHours} h</span>
            </div>
            <div className={styles.field}>
              <span className={styles.label}>Lokalizacja:</span>
              <span className={styles.value}>{machine.location?.name || 'Brak przypisanej lokalizacji'}</span>
            </div>
          </div>
        </div>
      </div>

      <EditMachineModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        machine={machine}
        onSuccess={handleEditSuccess}
      />
    </div>
  )
}