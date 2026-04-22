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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = Cookies.get('accessToken');
    const res = await fetch('http://localhost:3000/inventory/parts', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(newPart)
    });
    if (res.ok) { onSuccess(); onClose(); }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <h2>Nowy <span>Przedmiot</span></h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.field}>
            <label>Nazwa</label>
            <input type="text" required value={newPart.name} onChange={e => setNewPart({...newPart, name: e.target.value})} />
          </div>
          <div className={styles.field}>
            <label>Kategoria</label>
            <select required value={newPart.categoryId} onChange={e => setNewPart({...newPart, categoryId: e.target.value})}>
              <option value="">Wybierz...</option>
              {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
          <div className={styles.row}>
            <div className={styles.field}>
              <label>Ilość</label>
              <input type="number" value={newPart.stockQuantity} onChange={e => setNewPart({...newPart, stockQuantity: parseInt(e.target.value)})} />
            </div>
            <div className={styles.field}>
              <label>Cena (PLN)</label>
              <input type="number" step="0.01" value={newPart.unitPrice} onChange={e => setNewPart({...newPart, unitPrice: parseFloat(e.target.value)})} />
            </div>
          </div>
          <div className={styles.field}>
            <label>Kod (QR)</label>
            <input type="text" value={newPart.qrCode} onChange={e => setNewPart({...newPart, qrCode: e.target.value.toUpperCase()})} maxLength={6} />
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