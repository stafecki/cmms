'use client'

import React, { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Cookies from 'js-cookie'
import styles from './editPart.module.scss'

export default function EditPartPage() {
  const { id } = useParams()
  const router = useRouter()
  const [categories, setCategories] = useState<{id: string, name: string}[]>([])
  const [loading, setLoading] = useState(true)

  // Stany dla nowej kategorii
  const [isAddingCategory, setIsAddingCategory] = useState(false)
  const [newCategoryName, setNewCategoryName] = useState('')

  const [formData, setFormData] = useState({
    name: '',
    categoryId: '',
    stockQuantity: 0,
    unitPrice: 0
  })

  const token = Cookies.get('accessToken')

  useEffect(() => {
    const fetchData = async () => {
      try {
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
  }, [id, token])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    let finalCategoryId = formData.categoryId

    try {
      // 1. Jeśli użytkownik wpisał nową kategorię, najpierw ją stwórz
      if (isAddingCategory && newCategoryName.trim()) {
        const catRes = await fetch('http://localhost:3000/inventory/categories', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ name: newCategoryName })
        })

        if (catRes.ok) {
          const createdCat = await catRes.json()
          finalCategoryId = createdCat.id
        } else {
          throw new Error('Nie udało się utworzyć nowej kategorii.')
        }
      }

      // 2. Zapisz zmiany w przedmiocie
      const res = await fetch(`http://localhost:3000/inventory/parts/${id}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...formData, categoryId: finalCategoryId })
      })

      if (res.ok) {
        router.push('/inventory')
        router.refresh()
      }
    } catch (err: any) {
      alert(err.message)
    }
  }

  const handleDelete = async () => {
    if (!confirm('Czy na pewno chcesz usunąć ten przedmiot?')) return
    const res = await fetch(`http://localhost:3000/inventory/parts/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    })
    if (res.ok) {
      router.push('/inventory')
      router.refresh()
    }
  }

  if (loading) return <div className={styles.loader}>Wczytywanie...</div>

  return (
    <div className={styles.editContainer}>
      <form onSubmit={handleSubmit} className={styles.formCard}>
        <div className={styles.formHeader}>
          <h2>Edytuj <span>Zasób</span></h2>
          <button type="button" onClick={handleDelete} className={styles.deleteBtn}>Usuń przedmiot</button>
        </div>

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
          {!isAddingCategory ? (
            <div className={styles.selectWrapper}>
              <select
                value={formData.categoryId}
                onChange={(e) => {
                  if (e.target.value === 'NEW') {
                    setIsAddingCategory(true)
                  } else {
                    setFormData({...formData, categoryId: e.target.value})
                  }
                }}
              >
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
                <option value="NEW" className={styles.newOption}>+ Dodaj nową kategorię...</option>
              </select>
            </div>
          ) : (
            <div className={styles.inlineInput}>
              <input
                type="text"
                placeholder="Wpisz nazwę nowej kategorii..."
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                autoFocus
              />
              <button type="button" onClick={() => setIsAddingCategory(false)}>Cofnij</button>
            </div>
          )}
        </div>

        <div className={styles.row}>
          <div className={styles.field}>
            <label>Stan magazynowy</label>
            <input
              type="number"
              value={isNaN(formData.stockQuantity) ? '' : formData.stockQuantity}
              onChange={(e) => {
                const val = parseInt(e.target.value);
                setFormData({
                  ...formData,
                  stockQuantity: isNaN(val) ? 0 : val
                });
              }}
            />
          </div>
          <div className={styles.field}>
            <label>Cena (PLN)</label>
            <input
              type="number"
              step="0.01"
              value={isNaN(formData.unitPrice) ? '' : formData.unitPrice}
              onChange={(e) => {
                const val = parseFloat(e.target.value);
                setFormData({
                  ...formData,
                  unitPrice: isNaN(val) ? 0 : val
                });
              }}
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