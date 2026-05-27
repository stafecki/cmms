import { render, screen, fireEvent, act } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useAuth } from '@/context/AuthContext'
import PreventiveDetailsPage from '../page'
import * as preventiveApi from '../../preventive.api'

vi.mock('@/context/AuthContext', () => ({
  useAuth: vi.fn(),
}))

vi.mock('../../preventive.api', () => ({
  fetchPlanById: vi.fn(),
  updatePlan: vi.fn(),
  triggerPlan: vi.fn(),
  fetchAllMachinesForSelect: vi.fn(),
}))

const mockedUseAuth = vi.mocked(useAuth)
const adminUser = { id: '1', name: 'Admin', email: 'a@test.com', role: 'ADMIN' as const }
const managerUser = { id: '2', name: 'Mgr', email: 'm@test.com', role: 'MANAGER' as const }
const operatorUser = { id: '3', name: 'Op', email: 'o@test.com', role: 'OPERATOR' as const }

const mockMachines = [
  { id: 'machine-1', name: 'Tokarka CNC', serialNumber: 'SN-001' },
]

const mockPlan = {
  id: 'plan-1',
  machineId: 'machine-1',
  name: 'Miesięczny przegląd',
  intervalDays: 30,
  intervalHours: null,
  advanceDays: 7,
  checklist: [
    { step: 1, label: 'Sprawdź olej', done: false },
    { step: 2, label: 'Sprawdź filtry', done: false },
  ],
  isActive: true,
  lastRunAt: '2024-02-15T10:00:00.000Z',
  nextRunAt: '2024-03-15T10:00:00.000Z',
  createdAt: '2024-01-01T00:00:00.000Z',
  machine: { id: 'machine-1', name: 'Tokarka CNC', serialNumber: 'SN-001' },
}

function resolvedParams(id: string): Promise<{ id: string }> {
  const p = Promise.resolve({ id }) as any
  p.status = 'fulfilled'
  p.value = { id }
  return p
}

async function flush() {
  await act(async () => {})
}

describe('PreventiveDetailsPage', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockedUseAuth.mockReturnValue({ user: adminUser, isLoading: false, logout: vi.fn() })
    vi.mocked(preventiveApi.fetchPlanById).mockResolvedValue(mockPlan)
    vi.mocked(preventiveApi.fetchAllMachinesForSelect).mockResolvedValue(mockMachines)
  })

  describe('stany ładowania i błędu', () => {
    it('wyświetla "Ładowanie danych planu..." na starcie', () => {
      vi.mocked(preventiveApi.fetchPlanById).mockReturnValue(new Promise(() => {}))
      render(<PreventiveDetailsPage params={resolvedParams('plan-1')} />)
      expect(screen.getByText('Ładowanie danych planu...')).toBeInTheDocument()
    })

    it('wyświetla błąd gdy fetch się nie powiedzie', async () => {
      vi.mocked(preventiveApi.fetchPlanById).mockRejectedValue(new Error('fail'))
      render(<PreventiveDetailsPage params={resolvedParams('plan-1')} />)
      await flush()
      expect(screen.getByText('Nie udało się załadować szczegółów planu.')).toBeInTheDocument()
    })
  })

  describe('widok tylko do odczytu', () => {
    it('wyświetla nazwę planu', async () => {
      render(<PreventiveDetailsPage params={resolvedParams('plan-1')} />)
      await flush()
      expect(screen.getByText('Miesięczny przegląd')).toBeInTheDocument()
    })

    it('wyświetla maszynę', async () => {
      render(<PreventiveDetailsPage params={resolvedParams('plan-1')} />)
      await flush()
      expect(screen.getAllByText(/Tokarka CNC/).length).toBeGreaterThan(0)
    })

    it('wyświetla interwał dniowy', async () => {
      render(<PreventiveDetailsPage params={resolvedParams('plan-1')} />)
      await flush()
      expect(screen.getByText('30 dni')).toBeInTheDocument()
    })

    it('wyświetla dni wyprzedzenia', async () => {
      render(<PreventiveDetailsPage params={resolvedParams('plan-1')} />)
      await flush()
      expect(screen.getByText('7 dni')).toBeInTheDocument()
    })

    it('wyświetla kroki checklisty', async () => {
      render(<PreventiveDetailsPage params={resolvedParams('plan-1')} />)
      await flush()
      expect(screen.getByText('Sprawdź olej')).toBeInTheDocument()
      expect(screen.getByText('Sprawdź filtry')).toBeInTheDocument()
    })

    it('wyświetla nagłówek "Szczegóły planu"', async () => {
      render(<PreventiveDetailsPage params={resolvedParams('plan-1')} />)
      await flush()
      expect(screen.getByText('Szczegóły planu')).toBeInTheDocument()
    })

    it('wyświetla link powrotu do listy', async () => {
      render(<PreventiveDetailsPage params={resolvedParams('plan-1')} />)
      await flush()
      expect(screen.getByRole('link', { name: /Powrót do listy/ })).toHaveAttribute('href', '/preventive')
    })
  })

  describe('uprawnienia', () => {
    it('ADMIN widzi "Edytuj Plan"', async () => {
      render(<PreventiveDetailsPage params={resolvedParams('plan-1')} />)
      await flush()
      expect(screen.getByRole('button', { name: 'Edytuj Plan' })).toBeInTheDocument()
    })

    it('MANAGER widzi "Edytuj Plan"', async () => {
      mockedUseAuth.mockReturnValue({ user: managerUser, isLoading: false, logout: vi.fn() })
      render(<PreventiveDetailsPage params={resolvedParams('plan-1')} />)
      await flush()
      expect(screen.getByRole('button', { name: 'Edytuj Plan' })).toBeInTheDocument()
    })

    it('OPERATOR nie widzi "Edytuj Plan"', async () => {
      mockedUseAuth.mockReturnValue({ user: operatorUser, isLoading: false, logout: vi.fn() })
      render(<PreventiveDetailsPage params={resolvedParams('plan-1')} />)
      await flush()
      expect(screen.queryByRole('button', { name: 'Edytuj Plan' })).not.toBeInTheDocument()
    })

    it('ADMIN widzi "Wygeneruj zlecenie teraz"', async () => {
      render(<PreventiveDetailsPage params={resolvedParams('plan-1')} />)
      await flush()
      expect(screen.getByRole('button', { name: 'Wygeneruj zlecenie teraz' })).toBeInTheDocument()
    })

    it('OPERATOR nie widzi "Wygeneruj zlecenie teraz"', async () => {
      mockedUseAuth.mockReturnValue({ user: operatorUser, isLoading: false, logout: vi.fn() })
      render(<PreventiveDetailsPage params={resolvedParams('plan-1')} />)
      await flush()
      expect(screen.queryByRole('button', { name: 'Wygeneruj zlecenie teraz' })).not.toBeInTheDocument()
    })
  })

  describe('tryb edycji', () => {
    it('kliknięcie "Edytuj Plan" przełącza w tryb edycji', async () => {
      render(<PreventiveDetailsPage params={resolvedParams('plan-1')} />)
      await flush()
      fireEvent.click(screen.getByRole('button', { name: 'Edytuj Plan' }))
      expect(screen.getByText('Edycja planu')).toBeInTheDocument()
    })

    it('formularz edycji ma wypełnioną nazwę', async () => {
      render(<PreventiveDetailsPage params={resolvedParams('plan-1')} />)
      await flush()
      fireEvent.click(screen.getByRole('button', { name: 'Edytuj Plan' }))
      expect(screen.getByDisplayValue('Miesięczny przegląd')).toBeInTheDocument()
    })

    it('"Anuluj" wychodzi z trybu edycji', async () => {
      render(<PreventiveDetailsPage params={resolvedParams('plan-1')} />)
      await flush()
      fireEvent.click(screen.getByRole('button', { name: 'Edytuj Plan' }))
      fireEvent.click(screen.getByRole('button', { name: 'Anuluj' }))
      expect(screen.getByText('Szczegóły planu')).toBeInTheDocument()
    })

    it('kliknięcie "+ Krok" dodaje krok do checklisty', async () => {
      render(<PreventiveDetailsPage params={resolvedParams('plan-1')} />)
      await flush()
      fireEvent.click(screen.getByRole('button', { name: 'Edytuj Plan' }))
      expect(screen.getByText('1.')).toBeInTheDocument()
      expect(screen.getByText('2.')).toBeInTheDocument()
      expect(screen.queryByText('3.')).not.toBeInTheDocument()
      fireEvent.click(screen.getByRole('button', { name: '+ Krok' }))
      expect(screen.getByText('3.')).toBeInTheDocument()
    })

    it('zapisanie wywołuje updatePlan', async () => {
      vi.mocked(preventiveApi.updatePlan).mockResolvedValue(mockPlan)
      render(<PreventiveDetailsPage params={resolvedParams('plan-1')} />)
      await flush()
      fireEvent.click(screen.getByRole('button', { name: 'Edytuj Plan' }))
      fireEvent.click(screen.getByRole('button', { name: 'Zapisz Zmiany' }))
      await flush()
      expect(vi.mocked(preventiveApi.updatePlan)).toHaveBeenCalledWith('plan-1', expect.any(Object))
    })

    it('zapisanie bez interwału pokazuje alert', async () => {
      const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {})
      const planWithoutInterval = { ...mockPlan, intervalDays: null, intervalHours: null }
      vi.mocked(preventiveApi.fetchPlanById).mockResolvedValue(planWithoutInterval)
      render(<PreventiveDetailsPage params={resolvedParams('plan-1')} />)
      await flush()
      fireEvent.click(screen.getByRole('button', { name: 'Edytuj Plan' }))
      fireEvent.click(screen.getByRole('button', { name: 'Zapisz Zmiany' }))
      expect(alertSpy).toHaveBeenCalledWith('Musisz podać interwał godzinowy LUB dniowy.')
    })

    it('przycisk "Zapisz" pokazuje "Zapisywanie..." podczas zapisu', async () => {
      vi.mocked(preventiveApi.updatePlan).mockReturnValue(new Promise(() => {}))
      render(<PreventiveDetailsPage params={resolvedParams('plan-1')} />)
      await flush()
      fireEvent.click(screen.getByRole('button', { name: 'Edytuj Plan' }))
      fireEvent.click(screen.getByRole('button', { name: 'Zapisz Zmiany' }))
      expect(screen.getByRole('button', { name: 'Zapisywanie...' })).toBeInTheDocument()
    })
  })

  describe('ręczne wygenerowanie zlecenia', () => {
    it('z potwierdzeniem wywołuje triggerPlan', async () => {
      vi.spyOn(window, 'confirm').mockReturnValue(true)
      vi.spyOn(window, 'alert').mockImplementation(() => {})
      vi.mocked(preventiveApi.triggerPlan).mockResolvedValue({} as any)
      render(<PreventiveDetailsPage params={resolvedParams('plan-1')} />)
      await flush()
      fireEvent.click(screen.getByRole('button', { name: 'Wygeneruj zlecenie teraz' }))
      await flush()
      expect(vi.mocked(preventiveApi.triggerPlan)).toHaveBeenCalledWith('plan-1')
    })

    it('z anulowaniem nie wywołuje triggerPlan', async () => {
      vi.spyOn(window, 'confirm').mockReturnValue(false)
      render(<PreventiveDetailsPage params={resolvedParams('plan-1')} />)
      await flush()
      fireEvent.click(screen.getByRole('button', { name: 'Wygeneruj zlecenie teraz' }))
      expect(vi.mocked(preventiveApi.triggerPlan)).not.toHaveBeenCalled()
    })
  })
})
