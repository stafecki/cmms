'use client'

import { useState, useEffect } from 'react'
import styles from './editMachineModal.module.scss'
import { updateMachine } from '../machines.api'
import { Machine } from '../types'

interface EditMachineModalProps {
  isOpen: boolean
  onClose: () => void
  machine: Machine | null
  onSuccess: (updatedMachine: Machine) => void
}

export default function EditMachineModal({ isOpen, onClose, machine, onSuccess }: EditMachineModalProps) {
  const [name, setName] = useState('')
  const [serialNumber, setSerialNumber] = useState('')
  const [isActive, setIsActive] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (machine) {
      setName(machine.name)
      setSerialNumber(machine.serialNumber)
      setIsActive(machine.isActive)
      setError(null)
    }
  }, [machine, isOpen])

  if (!isOpen || !machine) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const updatedData = await updateMachine(machine.id, {
        name,
        serialNumber,
        isActive
      })
      onSuccess(updatedData)
      onClose()
    } catch (err: any) {
      setError(err.message || 'Wystąpił błąd podczas edycji maszyny.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2>Edytuj Maszynę</h2>
          <button className={styles.closeBtn} onClick={onClose}>&times;</button>
        </div>

        {error && <div className={styles.error}>{error}</div>}

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="name">Nazwa maszyny</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="serialNumber">Numer Seryjny</label>
            <input
              id="serialNumber"
              type="text"
              value={serialNumber}
              onChange={(e) => setSerialNumber(e.target.value)}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="status">Status</label>
            <select
              id="status"
              value={isActive ? "1" : "0"}
              onChange={(e) => setIsActive(e.target.value === '1')}
            >
              <option value="1">Aktywna</option>
              <option value="0">Nieaktywna</option>
            </select>
          </div>

          <div className={styles.actions}>
            <button type="button" className={styles.cancelBtn} onClick={onClose} disabled={isLoading}>
              Anuluj
            </button>
            <button type="submit" className={styles.saveBtn} disabled={isLoading}>
              {isLoading ? 'Zapisywanie...' : 'Zapisz zmiany'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}