'use client'

import React, { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Cookies from 'js-cookie'
import styles from './editPart.module.scss'

export default function EditPartPage() {
  const { id } = useParams()
  const router = useRouter()
  const [categories, setCategories] = useState<{id: string, name: string}[]>([])
  const [formData, setFormData] = useState({
    name: '',
    categoryId: '',
    stockQuantity: 0,
    unitPrice: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      const token = Cookies.get('accessToken')
      try {
        // Pobieramy dane części i kategorie równolegle
        const [partRes, catRes] = await Promise.all([
          fetch(`http://localhost:3000/inventory/parts/${id}`, {
            headers: { 'Authorization': `Bearer ${token}` }
          }),
          fetch(`http://localhost:3000/inventory/categories`, {
            headers: { 'Authorization': `Bearer ${token}` }
          })
        ])

        if (partRes.ok && catRes.ok) {
          const part = await partRes.json()
          const cats = await catRes.json()

          setCategories(cats)
          setFormData({
            name: part.name,
            categoryId: part.categoryId,
            stockQuantity: part.stockQuantity,
            unitPrice: Number(part.unitPrice)
          })
        }
      } catch (err) {
        console.error("Błąd ładowania danych:", err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [id])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const token = Cookies.get('accessToken')

    try {
      const res = await fetch(`http://localhost:3000/inventory/parts/${id}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      if (res.ok) {
        router.push('/inventory')
        router.refresh()
      } else {
        const error = await res.json()
        alert(`Błąd: ${error.message}`)
      }
    } catch (err) {
      console.error("Błąd zapisu:", err)
    }
  }

  if (loading) return <div className={styles.loader}>Wczytywanie danych...</div>

  return (
    <div className={styles.editContainer}>
      <form onSubmit={handleSubmit} className={styles.formCard}>
        <h2>Edytuj <span>Zasób</span></h2>

        <div className={styles.field}>
          <label>Nazwa części</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            required
          />
        </div>

        <div className={styles.field}>
          <label>Kategoria</label>
          <select
            value={formData.categoryId}
            onChange={(e) => setFormData({...formData, categoryId: e.target.value})}
          >
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>

        <div className={styles.row}>
          <div className={styles.field}>
            <label>Stan magazynowy</label>
            <input
              type="number"
              value={formData.stockQuantity}
              onChange={(e) => setFormData({...formData, stockQuantity: parseInt(e.target.value)})}
            />
          </div>

          <div className={styles.field}>
            <label>Cena (PLN)</label>
            <input
              type="number"
              step="0.01"
              value={formData.unitPrice}
              onChange={(e) => setFormData({...formData, unitPrice: parseFloat(e.target.value)})}
            />
          </div>
        </div>

        <div className={styles.actions}>
          <button type="button" onClick={() => router.back()} className={styles.cancelBtn}>Anuluj</button>
          <button type="submit" className={styles.saveBtn}>Zapisz zmiany</button>
        </div>
      </form>
    </div>
  )
}