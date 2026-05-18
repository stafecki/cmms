'use client'

import { useState, useEffect } from 'react'
import styles from './editMachineModal.module.scss'
import { createMachine } from '../machines.api'
import { Machine } from '../types'
import { locationsApi } from '../../locations/locations.api'

interface Location {
  id: string
  name: string
}

interface AddMachineModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: (newMachine: Machine) => void
}

export default function AddMachineModal({ isOpen, onClose, onSuccess }: AddMachineModalProps) {
  const [name, setName] = useState('')
  const [serialNumber, setSerialNumber] = useState('')
  const [locationId, setLocationId] = useState('')
  const [purchaseDate, setPurchaseDate] = useState('')
  const [purchasePrice, setPurchasePrice] = useState('')
  const [operatingHours, setOperatingHours] = useState('0')
  const [isActive, setIsActive] = useState(true)
  const [locations, setLocations] = useState<Location[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (isOpen) {
      locationsApi.getAll().then(setLocations).catch(() => {})
      setName('')
      setSerialNumber('')
      setLocationId('')
      setPurchaseDate('')
      setPurchasePrice('')
      setOperatingHours('0')
      setIsActive(true)
      setError(null)
    }
  }, [isOpen])

  if (!isOpen) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const machine = await createMachine({
        name,
        serialNumber,
        locationId,
        purchaseDate,
        purchasePrice: parseFloat(purchasePrice),
        operatingHours: parseInt(operatingHours) || 0,
        isActive,
      })
      onSuccess(machine)
      onClose()
    } catch (err: any) {
      setError(err.message || 'Wystąpił błąd podczas tworzenia maszyny.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2>Nowa Maszyna</h2>
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
              minLength={2}
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="serialNumber">Numer seryjny</label>
            <input
              id="serialNumber"
              type="text"
              value={serialNumber}
              onChange={(e) => setSerialNumber(e.target.value)}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="locationId">Lokalizacja</label>
            <select
              id="locationId"
              value={locationId}
              onChange={(e) => setLocationId(e.target.value)}
              required
            >
              <option value="">Wybierz lokalizację...</option>
              {locations.map((loc) => (
                <option key={loc.id} value={loc.id}>{loc.name}</option>
              ))}
            </select>
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="purchaseDate">Data zakupu</label>
            <input
              id="purchaseDate"
              type="date"
              value={purchaseDate}
              onChange={(e) => setPurchaseDate(e.target.value)}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="purchasePrice">Cena zakupu (PLN)</label>
            <input
              id="purchasePrice"
              type="number"
              min="0"
              step="0.01"
              value={purchasePrice}
              onChange={(e) => setPurchasePrice(e.target.value)}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="operatingHours">Roboczogodziny (h)</label>
            <input
              id="operatingHours"
              type="number"
              min="0"
              value={operatingHours}
              onChange={(e) => setOperatingHours(e.target.value)}
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="status">Status</label>
            <select
              id="status"
              value={isActive ? '1' : '0'}
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
              {isLoading ? 'Tworzenie...' : 'Utwórz maszynę'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}