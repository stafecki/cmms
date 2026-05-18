'use client'

import React, { useState, useEffect } from 'react';
import { UserRole, User, UpdateUserInput, CreateUserInput } from '../types';
import styles from './userModal.module.scss';

interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => Promise<void>;
  initialData?: User | null;
}

export default function UserModal({ isOpen, onClose, onSubmit, initialData }: UserModalProps) {
  const isEditMode = !!initialData;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'OPERATOR' as UserRole,
    isActive: true,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setFormData({
          name: initialData.name || '',
          email: initialData.email || '',
          password: '',
          role: initialData.role,
          isActive: initialData.isActive,
        });
      } else {
        setFormData({
          name: '',
          email: '',
          password: '',
          role: 'OPERATOR',
          isActive: true,
        });
      }
      setError(null);
    }
  }, [isOpen, initialData]);

  if (!isOpen) return null;

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
      if (isEditMode) {
        const updateData: UpdateUserInput = {
          name: formData.name,
          role: formData.role,
          isActive: formData.isActive
        };
        await onSubmit(updateData);
      } else {
        const createData: CreateUserInput = {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: formData.role
        };
        await onSubmit(createData);
      }
      onClose();
    } catch (err: any) {
      setError(err.message || 'Wystąpił błąd');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2 className={styles.title}>{isEditMode ? 'Edytuj Użytkownika' : 'Dodaj Użytkownika'}</h2>

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
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={isEditMode}
              className={isEditMode ? styles.disabledInput : ''}
            />
          </div>

          {!isEditMode && (
            <div className={styles.formGroup}>
              <label htmlFor="password">Hasło</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,100}$"
                title="Hasło musi mieć od 8 do 100 znaków, zawierać co najmniej jedną wielką literę, jedną małą literę i jedną cyfrę."
              />
              <span className={styles.inputHint}>
                Min. 8 znaków, wielka/mała litera i cyfra.
              </span>
            </div>
          )}

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

          {isEditMode && (
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
          )}

          <div className={styles.actions}>
            <button type="button" onClick={onClose} className={styles.cancelButton} disabled={isLoading}>
              Anuluj
            </button>
            <button type="submit" className={styles.submitButton} disabled={isLoading}>
              {isLoading ? 'Zapisywanie...' : 'Zapisz'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}