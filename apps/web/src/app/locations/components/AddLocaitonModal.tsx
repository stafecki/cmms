// src/app/locations/components/AddLocationModal.tsx
'use client'
import React, { useState } from 'react';
import { locationsApi } from '../locations.api';
import styles from '../locations.module.scss';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  parentId?: string | null;
}

export const AddLocationModal = ({ isOpen, onClose, onSuccess, parentId = null }: Props) => {
  const [formData, setFormData] = useState({
    name: '',
    type: 'AREA'
  });
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await locationsApi.create({ ...formData, parentId });
      setFormData({ name: '', type: 'AREA' }); // Reset
      onSuccess();
      onClose();
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
        <h2>{parentId ? '➕ Dodaj podlokalizację' : '🏢 Nowa lokalizacja główna'}</h2>

        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label>Nazwa jednostki</label>
            <input
              required
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              placeholder="np. Hala Produkcyjna, Regał A1..."
            />
          </div>

          <div className={styles.formGroup}>
            <label>Typ</label>
            <select
              value={formData.type}
              onChange={e => setFormData({ ...formData, type: e.target.value })}
            >
              <option value="AREA">Obszar / Hala</option>
              <option value="SECTION">Sekcja / Linia</option>
              <option value="RACK">Regał / Półka</option>
              <option value="STORAGE_BIN">Miejsce składowania</option>
            </select>
          </div>

          <div className={styles.modalActions}>
            <button type="button" onClick={onClose} className={styles.cancelBtn}>
              Anuluj
            </button>
            <button type="submit" disabled={loading} className={styles.saveBtn}>
              {loading ? 'Zapisywanie...' : 'Zatwierdź'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};