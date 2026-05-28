import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useAuth } from '@/context/AuthContext'
import { locationsApi } from '../../locations.api'
import LocationDetailsPage from '../page'

vi.mock('@/context/AuthContext', () => ({
  useAuth: vi.fn(),
}))

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: mockPush, back: mockBack, refresh: mockRefresh }),
  useParams: () => ({ id: 'loc-123' }),
}))

vi.mock('../../locations.api', () => ({
  locationsApi: {
    getById: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
  },
}))

vi.mock('../../components/AddLocationModal', () => ({
  AddLocationModal: ({ isOpen, onClose }: any) =>
    isOpen ? (
      <div data-testid="add-modal">
        <button onClick={onClose}>Close</button>
      </div>
    ) : null,
}))

vi.mock('@/components/searchBar', () => ({
  SearchBar: ({ value, onChange, onToggleFilters, placeholder }: any) => (
    <div>
      <input
        data-testid="search-bar"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
      <button data-testid="filter-toggle" onClick={onToggleFilters}>Filtry</button>
    </div>
  ),
}))

vi.mock('@/components/filterPanel', () => ({
  FilterPanel: ({ children, onReset }: any) => (
    <div data-testid="filter-panel">
      {children}
      <button data-testid="reset-filters" onClick={onReset}>Resetuj</button>
    </div>
  ),
  FilterGroup: ({ label, children }: any) => (
    <div><span>{label}</span>{children}</div>
  ),
}))

const mockPush = vi.fn()
const mockBack = vi.fn()
const mockRefresh = vi.fn()

const adminUser = { id: '1', name: 'Admin', email: 'admin@test.com', role: 'ADMIN' as const }
const managerUser = { id: '2', name: 'Manager', email: 'mgr@test.com', role: 'MANAGER' as const }
const operatorUser = { id: '3', name: 'Op', email: 'op@test.com', role: 'OPERATOR' as const }

const mockLocation = {
  id: 'loc-123',
  name: 'Hala A',
  type: 'HALL',
  parentId: null,
  children: [
    { id: 'c1', name: 'Stacja 1', type: 'STATION' },
    { id: 'c2', name: 'Stacja 2', type: 'STATION' },
  ],
  machines: [],
}

const mockedUseAuth = vi.mocked(useAuth)

describe('LocationDetailsPage', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockedUseAuth.mockReturnValue({ user: adminUser, isLoading: false, logout: vi.fn() })
    vi.mocked(locationsApi.getById).mockResolvedValue(mockLocation)
  })

  describe('stan ładowania', () => {
    it('wyświetla ekran ładowania', () => {
      vi.mocked(locationsApi.getById).mockReturnValue(new Promise(() => {}))
      render(<LocationDetailsPage />)
      expect(screen.getByText('Pobieranie detali...')).toBeInTheDocument()
    })
  })

  describe('renderowanie szczegółów', () => {
    it('renderuje nazwę lokalizacji', async () => {
      render(<LocationDetailsPage />)
      expect(await screen.findByRole('heading', { level: 1 })).toHaveTextContent('Hala A')
    })

    it('renderuje typ lokalizacji jako badge', async () => {
      render(<LocationDetailsPage />)
      await screen.findByRole('heading', { level: 1 })
      expect(screen.getByText('HALL')).toBeInTheDocument()
    })

    it('renderuje ID lokalizacji', async () => {
      render(<LocationDetailsPage />)
      await screen.findByRole('heading', { level: 1 })
      expect(screen.getByText('ID: loc-123')).toBeInTheDocument()
    })

    it('renderuje podlokalizacje', async () => {
      render(<LocationDetailsPage />)
      await screen.findByText('Stacja 1')
      expect(screen.getByText('Stacja 2')).toBeInTheDocument()
    })

    it('wyświetla komunikat gdy brak podlokalizacji', async () => {
      vi.mocked(locationsApi.getById).mockResolvedValue({ ...mockLocation, children: [] })
      render(<LocationDetailsPage />)
      expect(await screen.findByText('Brak jednostek podrzędnych spełniających kryteria.')).toBeInTheDocument()
    })

    it('przekierowuje do /locations gdy API zwróci błąd', async () => {
      vi.mocked(locationsApi.getById).mockRejectedValue(new Error('Nie znaleziono'))
      render(<LocationDetailsPage />)
      await waitFor(() => expect(mockPush).toHaveBeenCalledWith('/locations'))
    })
  })

  describe('uprawnienia', () => {
    it('ADMIN widzi przyciski Edytuj i Usuń', async () => {
      render(<LocationDetailsPage />)
      await screen.findByRole('heading', { level: 1 })
      expect(screen.getByRole('button', { name: 'Edytuj' })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'Usuń' })).toBeInTheDocument()
    })

    it('ADMIN widzi przycisk + Dodaj podlokalizację', async () => {
      render(<LocationDetailsPage />)
      await screen.findByRole('heading', { level: 1 })
      expect(screen.getByRole('button', { name: '+ Dodaj' })).toBeInTheDocument()
    })

    it('MANAGER widzi przycisk Edytuj', async () => {
      mockedUseAuth.mockReturnValue({ user: managerUser, isLoading: false, logout: vi.fn() })
      render(<LocationDetailsPage />)
      await screen.findByRole('heading', { level: 1 })
      expect(screen.getByRole('button', { name: 'Edytuj' })).toBeInTheDocument()
    })

    it('MANAGER nie widzi przycisku Usuń', async () => {
      mockedUseAuth.mockReturnValue({ user: managerUser, isLoading: false, logout: vi.fn() })
      render(<LocationDetailsPage />)
      await screen.findByRole('heading', { level: 1 })
      expect(screen.queryByRole('button', { name: 'Usuń' })).not.toBeInTheDocument()
    })

    it('OPERATOR nie widzi przycisków Edytuj ani Usuń', async () => {
      mockedUseAuth.mockReturnValue({ user: operatorUser, isLoading: false, logout: vi.fn() })
      render(<LocationDetailsPage />)
      await screen.findByRole('heading', { level: 1 })
      expect(screen.queryByRole('button', { name: 'Edytuj' })).not.toBeInTheDocument()
      expect(screen.queryByRole('button', { name: 'Usuń' })).not.toBeInTheDocument()
    })
  })

  describe('nawigacja', () => {
    it('kliknięcie ← Powrót wywołuje router.back', async () => {
      render(<LocationDetailsPage />)
      await screen.findByRole('heading', { level: 1 })
      fireEvent.click(screen.getByRole('button', { name: '← Powrót' }))
      expect(mockBack).toHaveBeenCalledTimes(1)
    })

    it('kliknięcie podlokalizacji przekierowuje do jej strony', async () => {
      render(<LocationDetailsPage />)
      await screen.findByText('Stacja 1')
      fireEvent.click(screen.getByText('Stacja 1'))
      expect(mockPush).toHaveBeenCalledWith('/locations/c1')
    })
  })

  describe('tryb edycji', () => {
    it('kliknięcie Edytuj pokazuje formularz z aktualną nazwą', async () => {
      render(<LocationDetailsPage />)
      await screen.findByRole('heading', { level: 1 })
      fireEvent.click(screen.getByRole('button', { name: 'Edytuj' }))
      expect(screen.getByDisplayValue('Hala A')).toBeInTheDocument()
    })

    it('przycisk zmienia się na Anuluj w trybie edycji', async () => {
      render(<LocationDetailsPage />)
      await screen.findByRole('heading', { level: 1 })
      fireEvent.click(screen.getByRole('button', { name: 'Edytuj' }))
      expect(screen.getByRole('button', { name: 'Anuluj' })).toBeInTheDocument()
    })

    it('kliknięcie Anuluj ukrywa formularz edycji', async () => {
      render(<LocationDetailsPage />)
      await screen.findByRole('heading', { level: 1 })
      fireEvent.click(screen.getByRole('button', { name: 'Edytuj' }))
      fireEvent.click(screen.getByRole('button', { name: 'Anuluj' }))
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Hala A')
    })

    it('zapisuje zmiany po submicie formularza', async () => {
      vi.mocked(locationsApi.update).mockResolvedValue({ ...mockLocation, name: 'Hala B' })
      vi.mocked(locationsApi.getById)
        .mockResolvedValueOnce(mockLocation)
        .mockResolvedValueOnce({ ...mockLocation, name: 'Hala B' })
      render(<LocationDetailsPage />)
      await screen.findByRole('heading', { level: 1 })
      fireEvent.click(screen.getByRole('button', { name: 'Edytuj' }))
      fireEvent.change(screen.getByDisplayValue('Hala A'), { target: { value: 'Hala B' } })
      fireEvent.click(screen.getByRole('button', { name: 'Zapisz' }))
      await waitFor(() =>
        expect(locationsApi.update).toHaveBeenCalledWith('loc-123', { name: 'Hala B' })
      )
    })
  })

  describe('usuwanie lokalizacji', () => {
    it('wywołuje locationsApi.delete po potwierdzeniu', async () => {
      vi.spyOn(window, 'confirm').mockReturnValue(true)
      vi.mocked(locationsApi.delete).mockResolvedValue({})
      render(<LocationDetailsPage />)
      await screen.findByRole('heading', { level: 1 })
      fireEvent.click(screen.getByRole('button', { name: 'Usuń' }))
      await waitFor(() => expect(locationsApi.delete).toHaveBeenCalledWith('loc-123'))
    })

    it('przekierowuje do /locations po usunięciu', async () => {
      vi.spyOn(window, 'confirm').mockReturnValue(true)
      vi.mocked(locationsApi.delete).mockResolvedValue({})
      render(<LocationDetailsPage />)
      await screen.findByRole('heading', { level: 1 })
      fireEvent.click(screen.getByRole('button', { name: 'Usuń' }))
      await waitFor(() => expect(mockPush).toHaveBeenCalledWith('/locations'))
    })

    it('nie wywołuje delete gdy użytkownik anuluje', async () => {
      vi.spyOn(window, 'confirm').mockReturnValue(false)
      render(<LocationDetailsPage />)
      await screen.findByRole('heading', { level: 1 })
      fireEvent.click(screen.getByRole('button', { name: 'Usuń' }))
      expect(locationsApi.delete).not.toHaveBeenCalled()
    })
  })

  describe('wyszukiwanie podlokalizacji', () => {
    it('filtruje podlokalizacje po nazwie', async () => {
      render(<LocationDetailsPage />)
      await screen.findByText('Stacja 1')
      fireEvent.change(screen.getByTestId('search-bar'), { target: { value: 'Stacja 1' } })
      expect(screen.getByText('Stacja 1')).toBeInTheDocument()
      expect(screen.queryByText('Stacja 2')).not.toBeInTheDocument()
    })

    it('pokazuje panel filtrów po kliknięciu', async () => {
      render(<LocationDetailsPage />)
      await screen.findByText('Stacja 1')
      fireEvent.click(screen.getByTestId('filter-toggle'))
      expect(screen.getByTestId('filter-panel')).toBeInTheDocument()
    })
  })

  describe('modal dodawania podlokalizacji', () => {
    it('otwiera modal po kliknięciu + Dodaj', async () => {
      render(<LocationDetailsPage />)
      await screen.findByRole('heading', { level: 1 })
      fireEvent.click(screen.getByRole('button', { name: '+ Dodaj' }))
      expect(screen.getByTestId('add-modal')).toBeInTheDocument()
    })

    it('zamyka modal po wywołaniu onClose', async () => {
      render(<LocationDetailsPage />)
      await screen.findByRole('heading', { level: 1 })
      fireEvent.click(screen.getByRole('button', { name: '+ Dodaj' }))
      fireEvent.click(screen.getByRole('button', { name: 'Close' }))
      expect(screen.queryByTestId('add-modal')).not.toBeInTheDocument()
    })
  })
})
