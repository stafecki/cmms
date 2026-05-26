'use client'

import styles from '../inventory.module.scss'
import { Category } from '../types'

interface CategoriesPanelProps {
  categories: Category[]
  onDelete: (id: string) => void
  onClose: () => void
}

export function CategoriesPanel({ categories, onDelete, onClose }: CategoriesPanelProps) {
  const handleDelete = (id: string, name: string) => {
    if (!window.confirm(`Usunąć kategorię "${name}"? Upewnij się, że żadna część jej nie używa.`)) return
    onDelete(id)
  }

  return (
    <div className={`${styles.alertPanel} ${styles.categoriesPanel}`}>
      <div className={styles.alertHeader}>
        <h3>Zarządzaj kategoriami ({categories.length})</h3>
        <button onClick={onClose}>&times;</button>
      </div>
      <div className={styles.alertList}>
        {categories.length === 0 ? (
          <p className={styles.emptyAlerts}>Brak kategorii.</p>
        ) : (
          categories.map((cat) => (
            <div key={cat.id} className={styles.alertItem}>
              <span className={styles.partName}>{cat.name}</span>
              <button
                className={styles.deleteCatBtn}
                onClick={() => handleDelete(cat.id, cat.name)}
              >
                Usuń
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  )
}