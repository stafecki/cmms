import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useAuth } from '@/context/AuthContext'
import { locationsApi } from '../locations.api'
import LocationsPage from '../page'

vi.mock('@/context/AuthContext', () => ({
  useAuth: vi.fn(),
}))

vi.mock('../locations.api', () => ({
  locationsApi: {
    getAll: vi.fn(),
    delete: vi.fn(),
  },
}))

vi.mock('../components/AddLocationModal', () => ({
  AddLocationModal: ({ isOpen, onClose, onSuccess }: any) =>
    isOpen ? (
      <div data-testid="add-modal">
        <button onClick={onSuccess}>Success</button>
        <button onClick={onClose}>Close</button>
      </div>
    ) : null,
}))

vi.mock('next/link', () => ({
  default: ({ href, children, ...props }: any) => (
    <a href={href} {...props}>{children}</a>
  ),
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

const adminUser = { id: '1', name: 'Admin', email: 'admin@test.com', role: 'ADMIN' as const }
const managerUser = { id: '2', name: 'Manager', email: 'mgr@test.com', role: 'MANAGER' as const }
const operatorUser = { id: '3', name: 'Op', email: 'op@test.com', role: 'OPERATOR' as const }

const singleLocation = { id: 'loc-1', name: 'Hala A', type: 'HALL', parentId: null, children: [] }

const mockLocations = [
  singleLocation,
  {
    id: 'loc-2',
    name: 'Zakład Główny',
    type: 'PLANT',
    parentId: null,
    children: [
      { id: 'c1', name: 'Stacja 1', type: 'STATION' },
      { id: 'c2', name: 'Stacja 2', type: 'STATION' },
      { id: 'c3', name: 'Stacja 3', type: 'STATION' },
      { id: 'c4', name: 'Stacja 4', type: 'STATION' },
    ],
  },
]

const mockedUseAuth = vi.mocked(useAuth)

describe('LocationsPage', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockedUseAuth.mockReturnValue({ user: adminUser, isLoading: false, logout: vi.fn() })
    vi.mocked(locationsApi.getAll).mockResolvedValue(mockLocations)
  })

  describe('stan ładowania', () => {
    it('wyświetla ekran ładowania', () => {
      vi.mocked(locationsApi.getAll).mockReturnValue(new Promise(() => {}))
      render(<LocationsPage />)
      expect(screen.getByText('Wczytywanie struktury...')).toBeInTheDocument()
    })
  })

  describe('renderowanie', () => {
    it('renderuje nagłówek strony', async () => {
      render(<LocationsPage />)
      expect(await screen.findByText('Lokalizacji')).toBeInTheDocument()
    })

    it('renderuje nazwy lokalizacji', async () => {
      render(<LocationsPage />)
      await screen.findByText('Hala A')
      expect(screen.getByText('Zakład Główny')).toBeInTheDocument()
    })

    it('renderuje typy lokalizacji', async () => {
      render(<LocationsPage />)
      await screen.findByText('HALL')
      expect(screen.getByText('PLANT')).toBeInTheDocument()
    })

    it('renderuje linki do szczegółów lokalizacji', async () => {
      render(<LocationsPage />)
      await screen.findByText('Hala A')
      expect(screen.getByRole('link', { name: /Hala A/ })).toHaveAttribute('href', '/locations/loc-1')
    })

    it('wyświetla maks. 3 podlokalizacje', async () => {
      render(<LocationsPage />)
      await screen.findByText('Stacja 1')
      expect(screen.getByText('Stacja 2')).toBeInTheDocument()
      expect(screen.getByText('Stacja 3')).toBeInTheDocument()
      expect(screen.queryByText('Stacja 4')).not.toBeInTheDocument()
    })

    it('wyświetla "... i więcej" gdy podlokalizacji jest ponad 3', async () => {
      render(<LocationsPage />)
      expect(await screen.findByText('... i więcej')).toBeInTheDocument()
    })

    it('wyświetla komunikat gdy brak lokalizacji', async () => {
      vi.mocked(locationsApi.getAll).mockResolvedValue([])
      render(<LocationsPage />)
      expect(await screen.findByText('Brak wyników do wyświetlenia.')).toBeInTheDocument()
    })
  })

  describe('uprawnienia', () => {
    it('ADMIN widzi przycisk + Dodaj', async () => {
      render(<LocationsPage />)
      await screen.findByText('Hala A')
      expect(screen.getByRole('button', { name: '+ Dodaj' })).toBeInTheDocument()
    })

    it('ADMIN widzi przyciski usuń', async () => {
      render(<LocationsPage />)
      await screen.findByText('Hala A')
      expect(screen.getAllByRole('button', { name: 'usuń' }).length).toBeGreaterThan(0)
    })

    it('MANAGER widzi przycisk + Dodaj', async () => {
      mockedUseAuth.mockReturnValue({ user: managerUser, isLoading: false, logout: vi.fn() })
      render(<LocationsPage />)
      await screen.findByText('Hala A')
      expect(screen.getByRole('button', { name: '+ Dodaj' })).toBeInTheDocument()
    })

    it('MANAGER nie widzi przycisku usuń', async () => {
      mockedUseAuth.mockReturnValue({ user: managerUser, isLoading: false, logout: vi.fn() })
      render(<LocationsPage />)
      await screen.findByText('Hala A')
      expect(screen.queryByRole('button', { name: 'usuń' })).not.toBeInTheDocument()
    })

    it('OPERATOR nie widzi przycisku + Dodaj', async () => {
      mockedUseAuth.mockReturnValue({ user: operatorUser, isLoading: false, logout: vi.fn() })
      render(<LocationsPage />)
      await screen.findByText('Hala A')
      expect(screen.queryByRole('button', { name: '+ Dodaj' })).not.toBeInTheDocument()
    })

    it('OPERATOR nie widzi przycisków usuń', async () => {
      mockedUseAuth.mockReturnValue({ user: operatorUser, isLoading: false, logout: vi.fn() })
      render(<LocationsPage />)
      await screen.findByText('Hala A')
      expect(screen.queryByRole('button', { name: 'usuń' })).not.toBeInTheDocument()
    })
  })

  describe('wyszukiwanie', () => {
    it('filtruje lokalizacje po nazwie', async () => {
      render(<LocationsPage />)
      await screen.findByText('Hala A')
      fireEvent.change(screen.getByTestId('search-bar'), { target: { value: 'Hala' } })
      expect(screen.getByText('Hala A')).toBeInTheDocument()
      expect(screen.queryByText('Zakład Główny')).not.toBeInTheDocument()
    })

    it('wyszukiwanie jest case-insensitive', async () => {
      render(<LocationsPage />)
      await screen.findByText('Hala A')
      fireEvent.change(screen.getByTestId('search-bar'), { target: { value: 'hala' } })
      expect(screen.getByText('Hala A')).toBeInTheDocument()
    })

    it('wyświetla komunikat gdy brak wyników wyszukiwania', async () => {
      render(<LocationsPage />)
      await screen.findByText('Hala A')
      fireEvent.change(screen.getByTestId('search-bar'), { target: { value: 'xyz123' } })
      expect(screen.getByText('Brak wyników do wyświetlenia.')).toBeInTheDocument()
    })
  })

  describe('filtry', () => {
    it('pokazuje panel filtrów po kliknięciu przycisku', async () => {
      render(<LocationsPage />)
      await screen.findByText('Hala A')
      fireEvent.click(screen.getByTestId('filter-toggle'))
      expect(screen.getByTestId('filter-panel')).toBeInTheDocument()
    })

    it('filtruje lokalizacje po typie', async () => {
      render(<LocationsPage />)
      await screen.findByText('Hala A')
      fireEvent.click(screen.getByTestId('filter-toggle'))
      fireEvent.change(screen.getByRole('combobox'), { target: { value: 'HALL' } })
      expect(screen.getByText('Hala A')).toBeInTheDocument()
      expect(screen.queryByText('Zakład Główny')).not.toBeInTheDocument()
    })

    it('resetuje filtry po kliknięciu Resetuj', async () => {
      render(<LocationsPage />)
      await screen.findByText('Hala A')
      fireEvent.click(screen.getByTestId('filter-toggle'))
      fireEvent.change(screen.getByRole('combobox'), { target: { value: 'HALL' } })
      fireEvent.click(screen.getByTestId('reset-filters'))
      expect(screen.getByText('Hala A')).toBeInTheDocument()
      expect(screen.getByText('Zakład Główny')).toBeInTheDocument()
    })
  })

  describe('usuwanie lokalizacji', () => {
    beforeEach(() => {
      vi.mocked(locationsApi.getAll).mockResolvedValue([singleLocation])
    })

    it('wywołuje locationsApi.delete po potwierdzeniu', async () => {
      vi.spyOn(window, 'confirm').mockReturnValue(true)
      vi.mocked(locationsApi.delete).mockResolvedValue({})
      render(<LocationsPage />)
      await screen.findByText('Hala A')
      fireEvent.click(screen.getByRole('button', { name: 'usuń' }))
      await waitFor(() => expect(locationsApi.delete).toHaveBeenCalledWith('loc-1'))
    })

    it('nie wywołuje delete gdy użytkownik anuluje potwierdzenie', async () => {
      vi.spyOn(window, 'confirm').mockReturnValue(false)
      render(<LocationsPage />)
      await screen.findByText('Hala A')
      fireEvent.click(screen.getByRole('button', { name: 'usuń' }))
      expect(locationsApi.delete).not.toHaveBeenCalled()
    })

    it('odświeża listę po pomyślnym usunięciu', async () => {
      vi.spyOn(window, 'confirm').mockReturnValue(true)
      vi.mocked(locationsApi.delete).mockResolvedValue({})
      render(<LocationsPage />)
      await screen.findByText('Hala A')
      fireEvent.click(screen.getByRole('button', { name: 'usuń' }))
      await waitFor(() => expect(locationsApi.getAll).toHaveBeenCalledTimes(2))
    })
  })

  describe('modal dodawania', () => {
    it('otwiera modal po kliknięciu + Dodaj', async () => {
      render(<LocationsPage />)
      await screen.findByText('Hala A')
      fireEvent.click(screen.getByRole('button', { name: '+ Dodaj' }))
      expect(screen.getByTestId('add-modal')).toBeInTheDocument()
    })

    it('zamyka modal po wywołaniu onClose', async () => {
      render(<LocationsPage />)
      await screen.findByText('Hala A')
      fireEvent.click(screen.getByRole('button', { name: '+ Dodaj' }))
      fireEvent.click(screen.getByRole('button', { name: 'Close' }))
      expect(screen.queryByTestId('add-modal')).not.toBeInTheDocument()
    })

    it('odświeża listę po dodaniu lokalizacji', async () => {
      render(<LocationsPage />)
      await screen.findByText('Hala A')
      fireEvent.click(screen.getByRole('button', { name: '+ Dodaj' }))
      fireEvent.click(screen.getByRole('button', { name: 'Success' }))
      await waitFor(() => expect(locationsApi.getAll).toHaveBeenCalledTimes(2))
    })
  })
})
