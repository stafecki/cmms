'use client'

import { useState } from 'react'
import styles from '../inventory.module.scss'
import Cookies from 'js-cookie'
import { Part } from '../types'

interface AdjustStockModalProps {
  part: Part
  onClose: () => void
  onSuccess: () => void
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'

export function AdjustStockModal({ part, onClose, onSuccess }: AdjustStockModalProps) {
  const [quantity, setQuantity] = useState('')
  const [reason, setReason] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const delta = parseInt(quantity) || 0
  const newStock = part.stockQuantity + delta

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!quantity || reason.length < 3) return
    setIsLoading(true)
    setError(null)

    try {
      const token = Cookies.get('accessToken')
      const res = await fetch(`${API_URL}/inventory/parts/${part.id}/stock`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ quantity: delta, reason }),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.message || 'Nie udało się zaktualizować stanu magazynowego.')
      }

      onSuccess()
      onClose()
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h2>Koryguj stan: <span>{part.name}</span></h2>

        <div style={{ marginBottom: '1.5rem', padding: '1rem', background: 'rgba(240,237,229,0.05)', borderRadius: '8px', display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ color: 'rgba(240,237,229,0.6)', fontSize: '0.9rem' }}>Aktualny stan</span>
          <strong>{part.stockQuantity} szt.</strong>
        </div>

        {error && (
          <div style={{ background: 'rgba(255,107,107,0.1)', color: '#FF6B6B', border: '1px solid rgba(255,107,107,0.2)', borderRadius: '8px', padding: '1rem', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className={styles.field}>
            <label>Zmiana ilości (np. +10 lub -5)</label>
            <input
              type="number"
              placeholder="0"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              required
            />
            {quantity && (
              <span style={{ fontSize: '0.85rem', color: newStock < 0 ? '#FF6B6B' : 'rgba(240,237,229,0.5)', marginTop: '0.25rem' }}>
                Nowy stan: {newStock} szt.{newStock < 0 ? ' — wartość nie może być ujemna' : ''}
              </span>
            )}
          </div>

          <div className={styles.field}>
            <label>Powód korekty (min. 3 znaki)</label>
            <input
              type="text"
              placeholder="np. Inwentaryzacja, przyjęcie dostawy..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              minLength={3}
              required
            />
          </div>

          <div className={styles.modalActions}>
            <button type="button" onClick={onClose} className={styles.cancelBtn} disabled={isLoading}>
              Anuluj
            </button>
            <button
              type="submit"
              className={styles.saveBtn}
              disabled={isLoading || newStock < 0 || reason.length < 3 || !quantity}
            >
              {isLoading ? 'Zapisywanie...' : 'Zatwierdź korektę'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}