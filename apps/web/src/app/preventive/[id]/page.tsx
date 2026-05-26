'use client'

import { useEffect, useState, use } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import styles from './preventiveDetails.module.scss'
import { fetchPlanById, updatePlan, triggerPlan, fetchAllMachinesForSelect } from '../preventive.api'
import { PreventivePlan, ChecklistItem } from '../types'
import { useAuth } from '../../../context/AuthContext'

interface PageProps {
  params: Promise<{ id: string }>
}

export default function PreventiveDetailsPage({ params }: PageProps) {
  const { user } = useAuth()
  const router = useRouter()

  const resolvedParams = use(params)
  const id = resolvedParams.id

  const [plan, setPlan] = useState<PreventivePlan | null>(null)
  const [machines, setMachines] = useState<{id: string, name: string, serialNumber: string}[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Tryb edycji
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  // Stany formularza
  const [name, setName] = useState('')
  const [machineId, setMachineId] = useState('')
  const [intervalHours, setIntervalHours] = useState<number | ''>('')
  const [intervalDays, setIntervalDays] = useState<number | ''>('')
  const [advanceDays, setAdvanceDays] = useState<number>(7)
  const [checklist, setChecklist] = useState<{ label: string }[]>([])

  // Uprawnienia (Zgodnie z serwerem PATCH /:id -> ADMIN, MANAGER)
  const canEdit = user?.role === 'ADMIN' || user?.role === 'MANAGER'

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true)
        const [planData, machinesData] = await Promise.all([
          fetchPlanById(id),
          fetchAllMachinesForSelect()
        ])

        setPlan(planData)
        setMachines(machinesData)

        // Inicjalizacja stanów formularza
        setName(planData.name)
        setMachineId(planData.machineId)
        setIntervalHours(planData.intervalHours || '')
        setIntervalDays(planData.intervalDays || '')
        setAdvanceDays(planData.advanceDays)
        setChecklist(planData.checklist.map((c: ChecklistItem) => ({ label: c.label })))

      } catch (err: any) {
        setError('Nie udało się załadować szczegółów planu.')
      } finally {
        setIsLoading(false)
      }
    }
    loadData()
  }, [id])

  const handleAddStep = () => setChecklist([...checklist, { label: '' }])
  const handleRemoveStep = (index: number) => {
    if (checklist.length > 1) setChecklist(checklist.filter((_, i) => i !== index))
  }
  const handleStepChange = (index: number, value: string) => {
    const newChecklist = [...checklist]
    newChecklist[index].label = value
    setChecklist(newChecklist)
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!intervalHours && !intervalDays) {
      alert('Musisz podać interwał godzinowy LUB dniowy.')
      return
    }

    const cleanChecklist = checklist.filter(c => c.label.trim() !== '')
    if (cleanChecklist.length === 0) {
      alert('Checklista musi mieć przynajmniej jeden krok.')
      return
    }

    setIsSaving(true)
    try {
      const payload = {
        name,
        machineId,
        intervalHours: intervalHours ? Number(intervalHours) : undefined,
        intervalDays: intervalDays ? Number(intervalDays) : undefined,
        advanceDays: Number(advanceDays),
        checklist: cleanChecklist.map((item, idx) => ({
          step: idx + 1,
          label: item.label
        }))
      }

      const updatedPlan = await updatePlan(id, payload)
      setPlan(updatedPlan)
      setIsEditing(false)
    } catch (err: any) {
      alert(err.message || 'Wystąpił błąd podczas zapisywania.')
    } finally {
      setIsSaving(false)
    }
  }

  const handleManualTrigger = async () => {
    if (!window.confirm('Czy na pewno chcesz wygenerować zlecenie pracy?')) return
    try {
      await triggerPlan(id)
      alert('Zlecenie wygenerowane.')
      const updated = await fetchPlanById(id)
      setPlan(updated)
    } catch (err) {
      alert('Błąd generowania zlecenia.')
    }
  }

  if (isLoading) return <div className={styles.loading}>Ładowanie danych planu...</div>
  if (error || !plan) return <div className={styles.error}>{error || 'Nie znaleziono planu'}</div>

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.titleSection}>
          <Link href="/preventive" className={styles.backLink}>← Powrót do listy</Link>
          <h1>{isEditing ? 'Edycja planu' : 'Szczegóły planu'}</h1>
        </div>

        <div className={styles.actions}>
          {!isEditing && canEdit && (
            <button onClick={() => setIsEditing(true)} className={styles.editBtn}>
              Edytuj Plan
            </button>
          )}
          {!isEditing && canEdit && (
            <button onClick={handleManualTrigger} className={styles.triggerBtn}>
              Wygeneruj zlecenie teraz
            </button>
          )}
        </div>
      </div>

      <div className={styles.content}>
        {isEditing ? (
          <form onSubmit={handleSave} className={styles.editForm}>
            <div className={styles.card}>
              <h3>Podstawowe dane</h3>
              <div className={styles.inputGroup}>
                <label>Nazwa planu</label>
                <input type="text" value={name} onChange={e => setName(e.target.value)} required />
              </div>

              <div className={styles.inputGroup}>
                <label>Przypisana maszyna</label>
                <select value={machineId} onChange={e => setMachineId(e.target.value)} required>
                  {machines.map(m => (
                    <option key={m.id} value={m.id}>{m.name} ({m.serialNumber})</option>
                  ))}
                </select>
              </div>

              <div className={styles.row}>
                <div className={styles.inputGroup}>
                  <label>Interwał (dni)</label>
                  <input type="number" min="1" value={intervalDays} onChange={e => setIntervalDays(e.target.value === '' ? '' : Number(e.target.value))} />
                </div>
                <div className={styles.inputGroup}>
                  <label>Interwał (godziny pracy)</label>
                  <input type="number" min="1" value={intervalHours} onChange={e => setIntervalHours(e.target.value === '' ? '' : Number(e.target.value))} />
                </div>
              </div>

              <div className={styles.inputGroup}>
                <label>Powiadamiaj przed (dni)</label>
                <input type="number" min="1" value={advanceDays} onChange={e => setAdvanceDays(Number(e.target.value))} required />
              </div>
            </div>

            <div className={styles.card}>
              <div className={styles.checklistHeader}>
                <h3>Lista zadań (Checklista)</h3>
                <button type="button" onClick={handleAddStep} className={styles.addBtn}>+ Krok</button>
              </div>

              <div className={styles.checklistItems}>
                {checklist.map((item, index) => (
                  <div key={index} className={styles.checklistItem}>
                    <span>{index + 1}.</span>
                    <input type="text" value={item.label} onChange={e => handleStepChange(index, e.target.value)} required />
                    <button type="button" onClick={() => handleRemoveStep(index)} disabled={checklist.length === 1}>&times;</button>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.formActions}>
              <button type="button" onClick={() => setIsEditing(false)} className={styles.cancelBtn}>Anuluj</button>
              <button type="submit" disabled={isSaving} className={styles.saveBtn}>
                {isSaving ? 'Zapisywanie...' : 'Zapisz Zmiany'}
              </button>
            </div>
          </form>
        ) : (
          <div className={styles.readOnlyView}>
            <div className={styles.card}>
              <h3>Informacje ogólne</h3>
              <p><strong>Nazwa:</strong> {plan.name}</p>
              <p><strong>Maszyna:</strong> {plan.machine?.name} ({plan.machine?.serialNumber})</p>
              <p><strong>Status:</strong> {plan.isActive ? '🟢 Aktywny' : '🔴 Nieaktywny'}</p>
              <p><strong>Interwał dniowy:</strong> {plan.intervalDays ? `${plan.intervalDays} dni` : 'Brak'}</p>
              <p><strong>Interwał godzinowy:</strong> {plan.intervalHours ? `${plan.intervalHours} godz.` : 'Brak'}</p>
              <p><strong>Powiadomienie z wyprzedzeniem:</strong> {plan.advanceDays} dni</p>
              <hr />
              <p><strong>Ostatnio wykonano:</strong> {plan.lastRunAt ? new Date(plan.lastRunAt).toLocaleString() : 'Nigdy'}</p>
              <p><strong>Następny termin:</strong> {plan.nextRunAt ? new Date(plan.nextRunAt).toLocaleString() : 'Brak'}</p>
            </div>

            <div className={styles.card}>
              <h3>Procedura przeglądu ({plan.checklist.length} kroków)</h3>
              <ul className={styles.readonlyChecklist}>
                {plan.checklist.map((step: ChecklistItem) => (
                  <li key={step.step}>
                    <span className={styles.stepNum}>{step.step}.</span> {step.label}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}