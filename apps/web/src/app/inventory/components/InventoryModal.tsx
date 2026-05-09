'use client'

import React, { useState } from 'react';
import styles from '../inventory.module.scss';
import Cookies from 'js-cookie';
import { Category, NewPart } from '../types';
import { INITIAL_PART_STATE } from '../useInventory';

interface ModalProps {
  categories: Category[];
  onClose: () => void;
  onSuccess: () => void;
}

export const InventoryModal = ({ categories, onClose, onSuccess }: ModalProps) => {
  const [newPart, setNewPart] = useState<NewPart>(INITIAL_PART_STATE);

  // Stany dla nowej kategorii (identycznie jak w edycji)
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = Cookies.get('accessToken');
    let finalCategoryId = newPart.categoryId;

    try {
      // 1. Jeśli wybrano dodawanie nowej kategorii
      if (isAddingCategory && newCategoryName.trim()) {
        const catRes = await fetch('http://localhost:3000/inventory/categories', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ name: newCategoryName })
        });

        if (catRes.ok) {
          const createdCat = await catRes.json();
          finalCategoryId = createdCat.id;
        } else {
          throw new Error('Nie udało się utworzyć nowej kategorii.');
        }
      }

      // 2. Dodaj przedmiot z finalnym ID kategorii
      const res = await fetch('http://localhost:3000/inventory/parts', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...newPart, categoryId: finalCategoryId })
      });

      if (res.ok) {
        onSuccess();
        onClose();
      }
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <h2>Nowy <span>Przedmiot</span></h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.field}>
            <label>Nazwa</label>
            <input
              type="text"
              required
              value={newPart.name}
              onChange={e => setNewPart({...newPart, name: e.target.value})}
            />
          </div>

          <div className={styles.field}>
            <label>Kategoria</label>
            {!isAddingCategory ? (
              <select
                required
                value={newPart.categoryId}
                onChange={e => {
                  if (e.target.value === 'NEW') {
                    setIsAddingCategory(true);
                  } else {
                    setNewPart({...newPart, categoryId: e.target.value});
                  }
                }}
              >
                <option value="">Wybierz...</option>
                {categories.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
                <option value="NEW" style={{ color: '#ffcc00', fontWeight: 'bold' }}>
                  + Dodaj nową kategorię...
                </option>
              </select>
            ) : (
              <div style={{ display: 'flex', gap: '10px' }}>
                <input
                  type="text"
                  placeholder="Nazwa nowej kategorii..."
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  autoFocus
                  style={{ flex: 1 }}
                />
                <button
                  type="button"
                  onClick={() => setIsAddingCategory(false)}
                  className={styles.cancelBtn}
                  style={{ padding: '0 15px', height: 'auto' }}
                >
                  Cofnij
                </button>
              </div>
            )}
          </div>

          <div className={styles.row}>
            <div className={styles.field}>
              <label>Ilość</label>
              <input
                type="number"
                value={newPart.stockQuantity}
                onChange={e => setNewPart({...newPart, stockQuantity: parseInt(e.target.value) || 0})}
              />
            </div>
            <div className={styles.field}>
              <label>Cena (PLN)</label>
              <input
                type="number"
                step="0.01"
                value={newPart.unitPrice}
                onChange={e => setNewPart({...newPart, unitPrice: parseFloat(e.target.value) || 0})}
              />
            </div>
          </div>

          <div className={styles.field}>
            <label>Kod (QR)</label>
            <input
              type="text"
              value={newPart.qrCode}
              onChange={e => setNewPart({...newPart, qrCode: e.target.value.toUpperCase()})}
              maxLength={6}
            />
          </div>

          <div className={styles.modalActions}>
            <button type="button" onClick={onClose} className={styles.cancelBtn}>Anuluj</button>
            <button type="submit" className={styles.saveBtn}>Zatwierdź</button>
          </div>
        </form>
      </div>
    </div>
  );
};