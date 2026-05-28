import { render, screen, fireEvent, act } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useAuth } from '@/context/AuthContext'
import PreventivePage from '../page'
import * as preventiveApi from '../preventive.api'

vi.mock('@/context/AuthContext', () => ({
  useAuth: vi.fn(),
}))

vi.mock('../preventive.api', () => ({
  fetchPreventivePlans: vi.fn(),
  fetchUpcomingPlans: vi.fn(),
  triggerPlan: vi.fn(),
  deletePlan: vi.fn(),
  checkAndCreateOrders: vi.fn(),
}))

vi.mock('../components/PreventiveModal', () => ({
  PreventiveModal: ({ onClose, onSuccess }: any) => (
    <div data-testid="preventive-modal">
      <button onClick={onClose}>Zamknij modal</button>
      <button onClick={onSuccess}>Sukces</button>
    </div>
  ),
}))

vi.mock('@/components/searchBar/SearchBar', () => ({
  SearchBar: ({ value, onChange, placeholder }: any) => (
    <input
      data-testid="search-bar"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
    />
  ),
}))

vi.mock('@/components/filterPanel/FilterPanel', () => ({
  FilterPanel: ({ children, onReset }: any) => (
    <div data-testid="filter-panel">
      {children}
      <button onClick={onReset}>Resetuj</button>
    </div>
  ),
  FilterGroup: ({ label, children }: any) => (
    <div>
      <label>{label}</label>
      {children}
    </div>
  ),
}))

const mockedUseAuth = vi.mocked(useAuth)
const adminUser = { id: '1', name: 'Admin', email: 'a@test.com', role: 'ADMIN' as const }
const managerUser = { id: '2', name: 'Mgr', email: 'm@test.com', role: 'MANAGER' as const }
const operatorUser = { id: '3', name: 'Op', email: 'o@test.com', role: 'OPERATOR' as const }

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
  nextRunAt: '2099-03-15T10:00:00.000Z',
  createdAt: '2024-01-01T00:00:00.000Z',
  machine: { id: 'machine-1', name: 'Tokarka CNC', serialNumber: 'SN-001' },
}

async function flush() {
  await act(async () => {})
}

describe('PreventivePage', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(preventiveApi.fetchPreventivePlans).mockResolvedValue([])
    vi.mocked(preventiveApi.fetchUpcomingPlans).mockResolvedValue([])
  })

  describe('stan autoryzacji', () => {
    it('wyświetla "Weryfikacja sesji..." podczas ładowania auth', () => {
      mockedUseAuth.mockReturnValue({ user: null, isLoading: true, logout: vi.fn() })
      render(<PreventivePage />)
      expect(screen.getByText('Weryfikacja sesji...')).toBeInTheDocument()
    })

    it('nie ładuje danych podczas ładowania auth', () => {
      mockedUseAuth.mockReturnValue({ user: null, isLoading: true, logout: vi.fn() })
      render(<PreventivePage />)
      expect(vi.mocked(preventiveApi.fetchPreventivePlans)).not.toHaveBeenCalled()
    })

    it('wyświetla błąd autoryzacji gdy brak użytkownika', async () => {
      mockedUseAuth.mockReturnValue({ user: null, isLoading: false, logout: vi.fn() })
      render(<PreventivePage />)
      await flush()
      expect(screen.getByText('Brak autoryzacji. Zaloguj się ponownie.')).toBeInTheDocument()
    })
  })

  describe('stan ładowania i błędu', () => {
    it('wyświetla "Ładowanie danych..." podczas pobierania', () => {
      mockedUseAuth.mockReturnValue({ user: operatorUser, isLoading: false, logout: vi.fn() })
      vi.mocked(preventiveApi.fetchPreventivePlans).mockReturnValue(new Promise(() => {}))
      render(<PreventivePage />)
      expect(screen.getByText('Ładowanie danych...')).toBeInTheDocument()
    })

    it('wyświetla błąd gdy fetch nie powiedzie', async () => {
      mockedUseAuth.mockReturnValue({ user: operatorUser, isLoading: false, logout: vi.fn() })
      vi.mocked(preventiveApi.fetchPreventivePlans).mockRejectedValue(new Error('Błąd serwera'))
      render(<PreventivePage />)
      await flush()
      expect(screen.getByText('Błąd serwera')).toBeInTheDocument()
    })

    it('wyświetla komunikat gdy brak planów', async () => {
      mockedUseAuth.mockReturnValue({ user: operatorUser, isLoading: false, logout: vi.fn() })
      render(<PreventivePage />)
      await flush()
      expect(screen.getByText('Brak planów prewencyjnych spełniających kryteria.')).toBeInTheDocument()
    })
  })

  describe('renderowanie planów', () => {
    beforeEach(() => {
      mockedUseAuth.mockReturnValue({ user: operatorUser, isLoading: false, logout: vi.fn() })
      vi.mocked(preventiveApi.fetchPreventivePlans).mockResolvedValue([mockPlan])
    })

    it('wyświetla nazwę planu', async () => {
      render(<PreventivePage />)
      await flush()
      expect(screen.getByText('Miesięczny przegląd')).toBeInTheDocument()
    })

    it('wyświetla nazwę maszyny', async () => {
      render(<PreventivePage />)
      await flush()
      expect(screen.getByText('Tokarka CNC')).toBeInTheDocument()
    })

    it('wyświetla interwał dniowy', async () => {
      render(<PreventivePage />)
      await flush()
      expect(screen.getByText(/co 30 dni/)).toBeInTheDocument()
    })

    it('wyświetla liczbę kroków checklisty', async () => {
      render(<PreventivePage />)
      await flush()
      expect(screen.getByText('2 kroków')).toBeInTheDocument()
    })

    it('wyświetla link Szczegóły z poprawnym href', async () => {
      render(<PreventivePage />)
      await flush()
      expect(screen.getByRole('link', { name: 'Szczegóły' })).toHaveAttribute('href', '/preventive/plan-1')
    })
  })

  describe('zakładki', () => {
    beforeEach(() => {
      mockedUseAuth.mockReturnValue({ user: operatorUser, isLoading: false, logout: vi.fn() })
    })

    it('renderuje zakładki "Wszystkie plany" i "Zbliżające się"', async () => {
      render(<PreventivePage />)
      await flush()
      expect(screen.getByRole('button', { name: /Wszystkie plany/ })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /Zbliżające się/ })).toBeInTheDocument()
    })

    it('kliknięcie "Zbliżające się" wywołuje fetchUpcomingPlans z 7 dniami', async () => {
      render(<PreventivePage />)
      await flush()
      fireEvent.click(screen.getByRole('button', { name: /Zbliżające się/ }))
      await flush()
      expect(vi.mocked(preventiveApi.fetchUpcomingPlans)).toHaveBeenCalledWith(7)
    })
  })

  describe('uprawnienia', () => {
    it('ADMIN widzi "Wymuś weryfikację"', async () => {
      mockedUseAuth.mockReturnValue({ user: adminUser, isLoading: false, logout: vi.fn() })
      render(<PreventivePage />)
      await flush()
      expect(screen.getByRole('button', { name: 'Wymuś weryfikację' })).toBeInTheDocument()
    })

    it('MANAGER nie widzi "Wymuś weryfikację"', async () => {
      mockedUseAuth.mockReturnValue({ user: managerUser, isLoading: false, logout: vi.fn() })
      render(<PreventivePage />)
      await flush()
      expect(screen.queryByRole('button', { name: 'Wymuś weryfikację' })).not.toBeInTheDocument()
    })

    it('ADMIN widzi "+ Nowy Plan"', async () => {
      mockedUseAuth.mockReturnValue({ user: adminUser, isLoading: false, logout: vi.fn() })
      render(<PreventivePage />)
      await flush()
      expect(screen.getByRole('button', { name: '+ Nowy Plan' })).toBeInTheDocument()
    })

    it('MANAGER widzi "+ Nowy Plan"', async () => {
      mockedUseAuth.mockReturnValue({ user: managerUser, isLoading: false, logout: vi.fn() })
      render(<PreventivePage />)
      await flush()
      expect(screen.getByRole('button', { name: '+ Nowy Plan' })).toBeInTheDocument()
    })

    it('OPERATOR nie widzi "+ Nowy Plan"', async () => {
      mockedUseAuth.mockReturnValue({ user: operatorUser, isLoading: false, logout: vi.fn() })
      render(<PreventivePage />)
      await flush()
      expect(screen.queryByRole('button', { name: '+ Nowy Plan' })).not.toBeInTheDocument()
    })

    it('ADMIN widzi "Generuj Zlecenie" i "Usuń"', async () => {
      mockedUseAuth.mockReturnValue({ user: adminUser, isLoading: false, logout: vi.fn() })
      vi.mocked(preventiveApi.fetchPreventivePlans).mockResolvedValue([mockPlan])
      render(<PreventivePage />)
      await flush()
      expect(screen.getByRole('button', { name: 'Generuj Zlecenie' })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'Usuń' })).toBeInTheDocument()
    })

    it('MANAGER widzi "Generuj Zlecenie" ale nie "Usuń"', async () => {
      mockedUseAuth.mockReturnValue({ user: managerUser, isLoading: false, logout: vi.fn() })
      vi.mocked(preventiveApi.fetchPreventivePlans).mockResolvedValue([mockPlan])
      render(<PreventivePage />)
      await flush()
      expect(screen.getByRole('button', { name: 'Generuj Zlecenie' })).toBeInTheDocument()
      expect(screen.queryByRole('button', { name: 'Usuń' })).not.toBeInTheDocument()
    })

    it('OPERATOR nie widzi "Generuj Zlecenie" ani "Usuń"', async () => {
      mockedUseAuth.mockReturnValue({ user: operatorUser, isLoading: false, logout: vi.fn() })
      vi.mocked(preventiveApi.fetchPreventivePlans).mockResolvedValue([mockPlan])
      render(<PreventivePage />)
      await flush()
      expect(screen.queryByRole('button', { name: 'Generuj Zlecenie' })).not.toBeInTheDocument()
      expect(screen.queryByRole('button', { name: 'Usuń' })).not.toBeInTheDocument()
    })
  })

  describe('akcje', () => {
    beforeEach(() => {
      mockedUseAuth.mockReturnValue({ user: adminUser, isLoading: false, logout: vi.fn() })
      vi.mocked(preventiveApi.fetchPreventivePlans).mockResolvedValue([mockPlan])
    })

    it('handleTrigger z potwierdzeniem wywołuje triggerPlan', async () => {
      vi.spyOn(window, 'confirm').mockReturnValue(true)
      vi.spyOn(window, 'alert').mockImplementation(() => {})
      vi.mocked(preventiveApi.triggerPlan).mockResolvedValue({} as any)
      render(<PreventivePage />)
      await flush()
      fireEvent.click(screen.getByRole('button', { name: 'Generuj Zlecenie' }))
      await flush()
      expect(vi.mocked(preventiveApi.triggerPlan)).toHaveBeenCalledWith('plan-1')
    })

    it('handleTrigger z anulowaniem nie wywołuje triggerPlan', async () => {
      vi.spyOn(window, 'confirm').mockReturnValue(false)
      render(<PreventivePage />)
      await flush()
      fireEvent.click(screen.getByRole('button', { name: 'Generuj Zlecenie' }))
      expect(vi.mocked(preventiveApi.triggerPlan)).not.toHaveBeenCalled()
    })

    it('handleDelete z potwierdzeniem usuwa plan z listy', async () => {
      vi.spyOn(window, 'confirm').mockReturnValue(true)
      vi.mocked(preventiveApi.deletePlan).mockResolvedValue()
      render(<PreventivePage />)
      await flush()
      fireEvent.click(screen.getByRole('button', { name: 'Usuń' }))
      await flush()
      expect(vi.mocked(preventiveApi.deletePlan)).toHaveBeenCalledWith('plan-1')
      expect(screen.queryByText('Miesięczny przegląd')).not.toBeInTheDocument()
    })

    it('handleDelete z anulowaniem nie wywołuje deletePlan', async () => {
      vi.spyOn(window, 'confirm').mockReturnValue(false)
      render(<PreventivePage />)
      await flush()
      fireEvent.click(screen.getByRole('button', { name: 'Usuń' }))
      expect(vi.mocked(preventiveApi.deletePlan)).not.toHaveBeenCalled()
    })

    it('handleRunCheck wywołuje checkAndCreateOrders', async () => {
      vi.spyOn(window, 'alert').mockImplementation(() => {})
      vi.mocked(preventiveApi.checkAndCreateOrders).mockResolvedValue({ message: 'OK' } as any)
      render(<PreventivePage />)
      await flush()
      fireEvent.click(screen.getByRole('button', { name: 'Wymuś weryfikację' }))
      await flush()
      expect(vi.mocked(preventiveApi.checkAndCreateOrders)).toHaveBeenCalledTimes(1)
    })
  })

  describe('wyszukiwanie', () => {
    beforeEach(() => {
      mockedUseAuth.mockReturnValue({ user: operatorUser, isLoading: false, logout: vi.fn() })
      vi.mocked(preventiveApi.fetchPreventivePlans).mockResolvedValue([mockPlan])
    })

    it('filtruje plany po nazwie — brak dopasowania', async () => {
      render(<PreventivePage />)
      await flush()
      fireEvent.change(screen.getByTestId('search-bar'), { target: { value: 'Nieistniejący' } })
      expect(screen.queryByText('Miesięczny przegląd')).not.toBeInTheDocument()
    })

    it('filtruje plany po nazwie maszyny', async () => {
      render(<PreventivePage />)
      await flush()
      fireEvent.change(screen.getByTestId('search-bar'), { target: { value: 'Tokarka' } })
      expect(screen.getByText('Miesięczny przegląd')).toBeInTheDocument()
    })
  })

  describe('modal nowego planu', () => {
    beforeEach(() => {
      mockedUseAuth.mockReturnValue({ user: adminUser, isLoading: false, logout: vi.fn() })
    })

    it('otwiera modal po kliknięciu "+ Nowy Plan"', async () => {
      render(<PreventivePage />)
      await flush()
      fireEvent.click(screen.getByRole('button', { name: '+ Nowy Plan' }))
      expect(screen.getByTestId('preventive-modal')).toBeInTheDocument()
    })

    it('zamyka modal po kliknięciu Zamknij', async () => {
      render(<PreventivePage />)
      await flush()
      fireEvent.click(screen.getByRole('button', { name: '+ Nowy Plan' }))
      fireEvent.click(screen.getByRole('button', { name: 'Zamknij modal' }))
      expect(screen.queryByTestId('preventive-modal')).not.toBeInTheDocument()
    })
  })
})
