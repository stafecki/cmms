'use client';

import { useState, useEffect } from 'react';
import styles from '../work-orders.module.scss';
import { CreateWorkOrderInput, Priority, Machine } from '../types';
import { fetchAllMachines } from '../work-orders.api';

interface WorkOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateWorkOrderInput) => Promise<void>;
}

export function WorkOrderModal({ isOpen, onClose, onSubmit }: WorkOrderModalProps) {
  const [machines, setMachines] = useState<Machine[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState<CreateWorkOrderInput>({
    machineId: '',
    title: '',
    description: '',
    priority: Priority.MEDIUM,
  });

  useEffect(() => {
    if (isOpen) {
      loadMachines();
      // Reset form
      setFormData({
        machineId: '',
        title: '',
        description: '',
        priority: Priority.MEDIUM,
      });
      setError(null);
    }
  }, [isOpen]);

  const loadMachines = async () => {
    try {
      setIsLoading(true);
      const data = await fetchAllMachines();
      setMachines(data);
    } catch (err) {
      console.error('Failed to load machines', err);
      setError('Nie udało się załadować listy maszyn.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.machineId || !formData.title || !formData.description) {
      setError('Wypełnij wszystkie wymagane pola.');
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);
      await onSubmit(formData);
      onClose();
    } catch (err: any) {
      setError(err.message || 'Wystąpił błąd podczas zapisywania zlecenia.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2>Nowe Zlecenie Pracy</h2>
        {error && <div className={styles.error} style={{ padding: '1rem' }}>{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="machineId">Maszyna *</label>
            <select
              id="machineId"
              value={formData.machineId}
              onChange={e => setFormData({ ...formData, machineId: e.target.value })}
              required
              disabled={isLoading}
            >
              <option value="">Wybierz maszynę...</option>
              {machines.map(m => (
                <option key={m.id} value={m.id}>
                  {m.name} ({m.serialNumber})
                </option>
              ))}
            </select>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="title">Tytuł Zgłoszenia *</label>
            <input
              type="text"
              id="title"
              value={formData.title}
              onChange={e => setFormData({ ...formData, title: e.target.value })}
              required
              minLength={3}
              placeholder="Krótki opis problemu (min. 3 znaki)"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="priority">Priorytet</label>
            <select
              id="priority"
              value={formData.priority}
              onChange={e => setFormData({ ...formData, priority: e.target.value as Priority })}
            >
              <option value={Priority.LOW}>Niski</option>
              <option value={Priority.MEDIUM}>Średni</option>
              <option value={Priority.HIGH}>Wysoki</option>
              <option value={Priority.CRITICAL}>Krytyczny</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="description">Szczegółowy opis *</label>
            <textarea
              id="description"
              value={formData.description}
              onChange={e => setFormData({ ...formData, description: e.target.value })}
              required
              minLength={10}
              placeholder="Opisz dokładnie co się stało (min. 10 znaków)..."
            />
          </div>

          <div className={styles.modalActions}>
            <button type="button" className={styles.cancelButton} onClick={onClose} disabled={isSubmitting}>
              Anuluj
            </button>
            <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
              {isSubmitting ? 'Zapisywanie...' : 'Utwórz Zlecenie'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
