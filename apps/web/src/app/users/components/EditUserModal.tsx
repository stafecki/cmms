'use client'

import React, { useState, useEffect } from 'react';
import { User, UpdateUserInput, UserRole } from '../types';
import styles from './editUserModal.module.scss';

interface EditUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: UpdateUserInput) => Promise<void>;
  user: User | null;
}

export default function EditUserModal({ isOpen, onClose, onSubmit, user }: EditUserModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    role: 'OPERATOR' as UserRole,
    isActive: true,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen && user) {
      setFormData({
        name: user.name,
        role: user.role,
        isActive: user.isActive,
      });
      setError(null);
    }
  }, [isOpen, user]);

  if (!isOpen || !user) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;

    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const updateData: UpdateUserInput = {
        name: formData.name,
        role: formData.role,
        isActive: formData.isActive
      };

      await onSubmit(updateData);
      onClose();
    } catch (err: any) {
      setError(err.message || 'Wystąpił błąd podczas zapisywania.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2 className={styles.title}>Edytuj użytkownika</h2>
        <p className={styles.subtitle}>Edytujesz profil: <strong>{user.email}</strong></p>

        {error && <div className={styles.errorAlert}>{error}</div>}

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="name">Imię i nazwisko</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              minLength={2}
              maxLength={100}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="role">Rola</label>
            <select id="role" name="role" value={formData.role} onChange={handleChange}>
              <option value="ADMIN">Admin</option>
              <option value="MANAGER">Manager</option>
              <option value="WAREHOUSE">Warehouse</option>
              <option value="OPERATOR">Operator</option>
              <option value="TECHNICIAN">Technician</option>
            </select>
          </div>

          <div className={styles.checkboxGroup}>
            <label>
              <input
                type="checkbox"
                name="isActive"
                checked={formData.isActive}
                onChange={handleChange}
              />
              Konto aktywne
            </label>
          </div>

          <div className={styles.actions}>
            <button type="button" onClick={onClose} className={styles.cancelButton} disabled={isLoading}>
              Anuluj
            </button>
            <button type="submit" className={styles.submitButton} disabled={isLoading}>
              {isLoading ? 'Zapisywanie...' : 'Zapisz zmiany'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}