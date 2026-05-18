'use client'

import React, { useState, useEffect } from 'react';
import { CertificationType, CreateCertificationInput } from '../types';
import styles from './userModal.module.scss';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateCertificationInput) => Promise<void>;
}

export default function AddCertificationModal({ isOpen, onClose, onSubmit }: Props) {
  const [formData, setFormData] = useState<CreateCertificationInput>({
    type: 'FORKLIFT' as CertificationType,
    issuedAt: '',
    expiresAt: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setFormData({
        type: 'FORKLIFT',
        issuedAt: new Date().toISOString().split('T')[0],
        expiresAt: ''
      });
      setError(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const issued = new Date(formData.issuedAt);
    const expires = new Date(formData.expiresAt);

    if (expires <= issued) {
      setError('Data wygaśnięcia musi być po dacie wydania (Expiry date must be after issue date).');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Bezpieczne wysyłanie jako pełny ISO-8601 String, co jest optymalne dla Prisma i Zod
      await onSubmit({
        type: formData.type,
        issuedAt: issued.toISOString(),
        expiresAt: expires.toISOString()
      });
      onClose();
    } catch (err: any) {
      setError(err.message || 'Wystąpił błąd podczas dodawania certyfikatu.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2 className={styles.title}>Dodaj Certyfikat</h2>

        {error && <div className={styles.errorAlert}>{error}</div>}

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="cert-type">Typ certyfikatu</label>
            <select
              id="cert-type"
              value={formData.type}
              onChange={e => setFormData({...formData, type: e.target.value as CertificationType})}
              required
            >
              <option value="FORKLIFT">Wózki widłowe</option>
              <option value="SEP">Uprawnienia SEP</option>
              <option value="UDS">UDS</option>
              <option value="CRANE">Suwnice</option>
              <option value="FIRST_AID">Pierwsza Pomoc</option>
              <option value="SAFETY">BHP</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="issuedAt">Data wydania</label>
            <input
              id="issuedAt"
              type="date"
              value={formData.issuedAt}
              onChange={e => setFormData({...formData, issuedAt: e.target.value})}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="expiresAt">Data wygaśnięcia</label>
            <input
              id="expiresAt"
              type="date"
              value={formData.expiresAt}
              onChange={e => setFormData({...formData, expiresAt: e.target.value})}
              required
              min={formData.issuedAt}
            />
          </div>

          <div className={styles.actions}>
            <button type="button" onClick={onClose} className={styles.cancelButton} disabled={isLoading}>
              Anuluj
            </button>
            <button type="submit" className={styles.submitButton} disabled={isLoading}>
              {isLoading ? 'Dodawanie...' : 'Dodaj certyfikat'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}