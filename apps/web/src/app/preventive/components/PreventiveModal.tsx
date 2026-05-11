'use client'

import { useState, useEffect } from 'react'
import styles from './PreventiveModal.module.scss'
import { createPlan, fetchAllMachinesForSelect } from '../preventive.api'

interface PreventiveModalProps {
  onClose: () => void
  onSuccess: () => void
}

export const PreventiveModal = ({
  onClose,
  onSuccess
}: PreventiveModalProps) => {
  const [machines, setMachines] = useState<
    { id: string; name: string; serialNumber: string }[]
  >([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Stany formularza
  const [machineId, setMachineId] = useState('')
  const [name, setName] = useState('')
  const [intervalHours, setIntervalHours] = useState<number | ''>('')
  const [intervalDays, setIntervalDays] = useState<number | ''>('')
  const [advanceDays, setAdvanceDays] = useState<number>(7)
  const [checklist, setChecklist] = useState<{ label: string }[]>([
    { label: '' }
  ])

  useEffect(() => {
    // Pobieramy maszyny przy otwarciu modala
    fetchAllMachinesForSelect()
      .then(setMachines)
      .catch(() => setError('Nie udało się załadować listy maszyn.'))
  }, [])

  const handleAddStep = () => {
    setChecklist([...checklist, { label: '' }])
  }

  const handleRemoveStep = (index: number) => {
    if (checklist.length > 1) {
      setChecklist(checklist.filter((_, i) => i !== index))
    }
  }

  const handleStepChange = (index: number, value: string) => {
    const newChecklist = [...checklist]
    newChecklist[index].label = value
    setChecklist(newChecklist)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    // Walidacja front-endowa
    if (!intervalHours && !intervalDays) {
      setError('Musisz podać interwał godzinowy LUB dniowy.')
      return
    }

    const cleanChecklist = checklist.filter((c) => c.label.trim() !== '')
    if (cleanChecklist.length === 0) {
      setError('Checklista musi mieć przynajmniej jeden krok.')
      return
    }

    setIsLoading(true)
    try {
      const payload = {
        machineId,
        name,
        intervalHours: intervalHours ? Number(intervalHours) : undefined,
        intervalDays: intervalDays ? Number(intervalDays) : undefined,
        advanceDays: Number(advanceDays),
        checklist: cleanChecklist.map((item, idx) => ({
          step: idx + 1,
          label: item.label
        }))
      }

      await createPlan(payload)
      onSuccess()
      onClose()
    } catch (err: any) {
      setError(err.message || 'Wystąpił błąd podczas zapisywania.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2>Dodaj Plan Prewencyjny</h2>
          <button className={styles.closeBtn} onClick={onClose}>
            &times;
          </button>
        </div>

        {error && <div className={styles.error}>{error}</div>}

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formContent}>
            <div className={styles.inputGroup}>
              <label>Maszyna *</label>
              <select
                value={machineId}
                onChange={(e) => setMachineId(e.target.value)}
                required
              >
                <option value="">-- Wybierz maszynę --</option>
                {machines.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name} ({m.serialNumber})
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.inputGroup}>
              <label>Nazwa Przeglądu *</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="np. Miesięczny przegląd pompy"
                required
                minLength={3}
              />
            </div>

            <div className={styles.row}>
              <div className={styles.inputGroup}>
                <label>Interwał (dni)</label>
                <input
                  type="number"
                  min="1"
                  value={intervalDays}
                  onChange={(e) =>
                    setIntervalDays(
                      e.target.value === '' ? '' : Number(e.target.value)
                    )
                  }
                  placeholder="np. 30"
                />
              </div>
              <div className={styles.inputGroup}>
                <label>Interwał (godziny pracy)</label>
                <input
                  type="number"
                  min="1"
                  value={intervalHours}
                  onChange={(e) =>
                    setIntervalHours(
                      e.target.value === '' ? '' : Number(e.target.value)
                    )
                  }
                  placeholder="np. 500"
                />
              </div>
            </div>

            <div className={styles.inputGroup}>
              <label>Powiadomienie / Zlecenie z wyprzedzeniem (dni)</label>
              <input
                type="number"
                min="1"
                value={advanceDays}
                onChange={(e) => setAdvanceDays(Number(e.target.value))}
                required
              />
            </div>

            <div className={styles.checklistSection}>
              <div className={styles.checklistHeader}>
                <label>Zadania (Checklista) *</label>
                <button
                  type="button"
                  onClick={handleAddStep}
                  className={styles.addStepBtn}
                >
                  + Dodaj krok
                </button>
              </div>

              <div className={styles.checklistItems}>
                {checklist.map((item, index) => (
                  <div key={index} className={styles.checklistItem}>
                    <span className={styles.stepNumber}>{index + 1}.</span>
                    <input
                      type="text"
                      value={item.label}
                      onChange={(e) => handleStepChange(index, e.target.value)}
                      placeholder="Opis zadania..."
                      required
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveStep(index)}
                      className={styles.removeStepBtn}
                      disabled={checklist.length === 1}
                    >
                      &times;
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className={styles.actions}>
            <button
              type="button"
              className={styles.cancelBtn}
              onClick={onClose}
              disabled={isLoading}
            >
              Anuluj
            </button>
            <button
              type="submit"
              className={styles.saveBtn}
              disabled={isLoading}
            >
              {isLoading ? 'Zapisywanie...' : 'Utwórz Plan'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
