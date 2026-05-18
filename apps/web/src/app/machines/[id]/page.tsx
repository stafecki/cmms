'use client'

import { useEffect, useState, use } from 'react'
import Link from 'next/link'
import styles from './machineDetails.module.scss'
import { fetchMachineById, updateOperatingHours } from '../machines.api'
import { Machine } from '../types'
import { useAuth } from '../../../context/AuthContext'
import EditMachineModal from '../components/EditMachineModal'

interface PageProps {
  params: Promise<{ id: string }>
}

export default function MachineDetailsPage({ params }: PageProps) {
  const { user } = useAuth()
  const resolvedParams = use(params)
  const id = resolvedParams.id

  const [machine, setMachine] = useState<Machine | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)

  const [hoursInput, setHoursInput] = useState('')
  const [isUpdatingHours, setIsUpdatingHours] = useState(false)

  const canEditMachine = user?.role === 'ADMIN' || user?.role === 'MANAGER'
  const canUpdateHours = user?.role === 'ADMIN' || user?.role === 'MANAGER' || user?.role === 'TECHNICIAN'

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

  const handleUpdateHours = async (e: React.FormEvent) => {
    e.preventDefault()
    const hours = parseInt(hoursInput)
    if (isNaN(hours) || hours < 0) return
    setIsUpdatingHours(true)
    try {
      const updated = await updateOperatingHours(id, hours)
      setMachine(updated)
      setHoursInput('')
    } catch (err: any) {
      alert(err.message || 'Nie udało się zaktualizować godzin pracy.')
    } finally {
      setIsUpdatingHours(false)
    }
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

        {canUpdateHours && (
          <div className={styles.infoCard}>
            <h3>Aktualizacja godzin pracy</h3>
            <form onSubmit={handleUpdateHours} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-end' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                <label style={{ fontSize: '0.85rem', color: 'rgba(240,237,229,0.6)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Nowa wartość (h)
                </label>
                <input
                  type="number"
                  min="0"
                  value={hoursInput}
                  onChange={(e) => setHoursInput(e.target.value)}
                  placeholder={String(machine.operatingHours)}
                  required
                  style={{
                    background: 'rgba(240,237,229,0.05)',
                    border: '1px solid rgba(240,237,229,0.1)',
                    borderRadius: '8px',
                    color: '#F0EDE5',
                    padding: '0.7rem 1rem',
                    fontSize: '1rem',
                    width: '160px',
                    outline: 'none',
                  }}
                />
              </div>
              <button
                type="submit"
                disabled={isUpdatingHours}
                style={{
                  padding: '0.7rem 1.4rem',
                  background: '#F0EDE5',
                  color: '#060D0C',
                  border: '1px solid #F0EDE5',
                  borderRadius: '8px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  opacity: isUpdatingHours ? 0.5 : 1,
                }}
              >
                {isUpdatingHours ? 'Zapisywanie...' : 'Zaktualizuj'}
              </button>
            </form>
          </div>
        )}
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