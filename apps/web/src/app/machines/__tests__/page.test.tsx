import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useAuth } from '@/context/AuthContext'
import { fetchMachines, deleteMachine } from '../machines.api'
import MachinesPage from '../page'

vi.mock('@/context/AuthContext', () => ({
  useAuth: vi.fn(),
}))

vi.mock('../machines.api', () => ({
  fetchMachines: vi.fn(),
  deleteMachine: vi.fn(),
}))

vi.mock('../components/AddMachineModal', () => ({
  default: ({ isOpen, onClose, onSuccess }: any) =>
    isOpen ? (
      <div data-testid="add-modal">
        <button onClick={onClose}>Close</button>
        <button onClick={() => onSuccess({ id: 'new-1', name: 'Nowa', serialNumber: 'SN-NEW', locationId: 'loc-1', operatingHours: 0, purchaseDate: '', purchasePrice: 0, isActive: true, createdAt: '', updatedAt: '' })}>
          Success
        </button>
      </div>
    ) : null,
}))

vi.mock('@/components/filterPanel/FilterPanel', () => ({
  FilterPanel: ({ children, onReset }: any) => (
    <div data-testid="filter-panel">
      {children}
      <button data-testid="reset-filters" onClick={onReset}>Resetuj</button>
    </div>
  ),
  FilterGroup: ({ children }: any) => <div>{children}</div>,
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

vi.mock('next/link', () => ({
  default: ({ href, children, ...props }: any) => <a href={href} {...props}>{children}</a>,
}))

const adminUser = { id: '1', name: 'Admin', email: 'admin@test.com', role: 'ADMIN' as const }
const managerUser = { id: '2', name: 'Manager', email: 'mgr@test.com', role: 'MANAGER' as const }
const operatorUser = { id: '3', name: 'Op', email: 'op@test.com', role: 'OPERATOR' as const }

const mockMachines = [
  {
    id: 'm-1',
    name: 'Tokarka CNC',
    serialNumber: 'SN-001',
    locationId: 'loc-1',
    operatingHours: 1200,
    purchaseDate: '2020-01-01',
    purchasePrice: 50000,
    isActive: true,
    createdAt: '',
    updatedAt: '',
    location: { id: 'loc-1', name: 'Hala A', type: 'HALL' as const, parentId: null },
  },
  {
    id: 'm-2',
    name: 'Frezarka',
    serialNumber: 'SN-002',
    locationId: 'loc-2',
    operatingHours: 800,
    purchaseDate: '2021-06-01',
    purchasePrice: 30000,
    isActive: false,
    createdAt: '',
    updatedAt: '',
    location: { id: 'loc-2', name: 'Hala B', type: 'HALL' as const, parentId: null },
  },
]

const mockedUseAuth = vi.mocked(useAuth)

describe('MachinesPage', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockedUseAuth.mockReturnValue({ user: adminUser, isLoading: false, logout: vi.fn() })
    vi.mocked(fetchMachines).mockResolvedValue(mockMachines)
  })

  describe('stan ładowania', () => {
    it('wyświetla ekran ładowania', () => {
      vi.mocked(fetchMachines).mockReturnValue(new Promise(() => {}))
      render(<MachinesPage />)
      expect(screen.getByText('Ładowanie maszyn...')).toBeInTheDocument()
    })
  })

  describe('stan błędu', () => {
    it('wyświetla komunikat błędu gdy API zawiedzie', async () => {
      vi.mocked(fetchMachines).mockRejectedValue(new Error('Błąd'))
      render(<MachinesPage />)
      expect(await screen.findByText('Wystąpił błąd podczas ładowania maszyn.')).toBeInTheDocument()
    })
  })

  describe('renderowanie', () => {
    it('renderuje nagłówek strony', async () => {
      render(<MachinesPage />)
      await screen.findByText('Tokarka CNC')
      expect(screen.getByText('Zarządzanie')).toBeInTheDocument()
    })

    it('renderuje nazwy maszyn', async () => {
      render(<MachinesPage />)
      await screen.findByText('Tokarka CNC')
      expect(screen.getByText('Frezarka')).toBeInTheDocument()
    })

    it('renderuje numery seryjne', async () => {
      render(<MachinesPage />)
      await screen.findByText('SN-001')
      expect(screen.getByText('SN-002')).toBeInTheDocument()
    })

    it('renderuje lokalizacje maszyn', async () => {
      render(<MachinesPage />)
      await screen.findByText('Tokarka CNC')
      expect(screen.getAllByText('Hala A').length).toBeGreaterThan(0)
      expect(screen.getAllByText('Hala B').length).toBeGreaterThan(0)
    })

    it('renderuje roboczogodziny', async () => {
      render(<MachinesPage />)
      await screen.findByText('1200 h')
      expect(screen.getByText('800 h')).toBeInTheDocument()
    })

    it('renderuje linki Szczegóły do każdej maszyny', async () => {
      render(<MachinesPage />)
      await screen.findByText('Tokarka CNC')
      const links = screen.getAllByRole('link', { name: 'Szczegóły' })
      expect(links[0]).toHaveAttribute('href', '/machines/m-1')
      expect(links[1]).toHaveAttribute('href', '/machines/m-2')
    })

    it('wyświetla komunikat gdy brak maszyn spełniających kryteria', async () => {
      vi.mocked(fetchMachines).mockResolvedValue([])
      render(<MachinesPage />)
      expect(await screen.findByText('Brak maszyn spełniających kryteria wyszukiwania.')).toBeInTheDocument()
    })
  })

  describe('uprawnienia', () => {
    it('ADMIN widzi przycisk + Dodaj maszynę', async () => {
      render(<MachinesPage />)
      await screen.findByText('Tokarka CNC')
      expect(screen.getByRole('button', { name: '+ Dodaj maszynę' })).toBeInTheDocument()
    })

    it('ADMIN widzi przyciski Usuń', async () => {
      render(<MachinesPage />)
      await screen.findByText('Tokarka CNC')
      expect(screen.getAllByRole('button', { name: 'Usuń' }).length).toBeGreaterThan(0)
    })

    it('MANAGER widzi przycisk + Dodaj maszynę', async () => {
      mockedUseAuth.mockReturnValue({ user: managerUser, isLoading: false, logout: vi.fn() })
      render(<MachinesPage />)
      await screen.findByText('Tokarka CNC')
      expect(screen.getByRole('button', { name: '+ Dodaj maszynę' })).toBeInTheDocument()
    })

    it('MANAGER nie widzi przycisków Usuń', async () => {
      mockedUseAuth.mockReturnValue({ user: managerUser, isLoading: false, logout: vi.fn() })
      render(<MachinesPage />)
      await screen.findByText('Tokarka CNC')
      expect(screen.queryByRole('button', { name: 'Usuń' })).not.toBeInTheDocument()
    })

    it('OPERATOR nie widzi przycisku + Dodaj maszynę', async () => {
      mockedUseAuth.mockReturnValue({ user: operatorUser, isLoading: false, logout: vi.fn() })
      render(<MachinesPage />)
      await screen.findByText('Tokarka CNC')
      expect(screen.queryByRole('button', { name: '+ Dodaj maszynę' })).not.toBeInTheDocument()
    })

    it('OPERATOR nie widzi przycisków Usuń', async () => {
      mockedUseAuth.mockReturnValue({ user: operatorUser, isLoading: false, logout: vi.fn() })
      render(<MachinesPage />)
      await screen.findByText('Tokarka CNC')
      expect(screen.queryByRole('button', { name: 'Usuń' })).not.toBeInTheDocument()
    })
  })

  describe('wyszukiwanie', () => {
    it('filtruje maszyny po nazwie', async () => {
      render(<MachinesPage />)
      await screen.findByText('Tokarka CNC')
      fireEvent.change(screen.getByTestId('search-bar'), { target: { value: 'Tokarka' } })
      expect(screen.getByText('Tokarka CNC')).toBeInTheDocument()
      expect(screen.queryByText('Frezarka')).not.toBeInTheDocument()
    })

    it('filtruje maszyny po numerze seryjnym', async () => {
      render(<MachinesPage />)
      await screen.findByText('Tokarka CNC')
      fireEvent.change(screen.getByTestId('search-bar'), { target: { value: 'SN-002' } })
      expect(screen.queryByText('Tokarka CNC')).not.toBeInTheDocument()
      expect(screen.getByText('Frezarka')).toBeInTheDocument()
    })

    it('wyszukiwanie jest case-insensitive', async () => {
      render(<MachinesPage />)
      await screen.findByText('Tokarka CNC')
      fireEvent.change(screen.getByTestId('search-bar'), { target: { value: 'tokarka' } })
      expect(screen.getByText('Tokarka CNC')).toBeInTheDocument()
    })
  })

  describe('usuwanie maszyny', () => {
    it('wywołuje deleteMachine po potwierdzeniu', async () => {
      vi.spyOn(window, 'confirm').mockReturnValue(true)
      vi.mocked(deleteMachine).mockResolvedValue()
      render(<MachinesPage />)
      await screen.findByText('Tokarka CNC')
      fireEvent.click(screen.getAllByRole('button', { name: 'Usuń' })[0])
      await waitFor(() => expect(deleteMachine).toHaveBeenCalledWith('m-1'))
    })

    it('nie wywołuje deleteMachine gdy użytkownik anuluje', async () => {
      vi.spyOn(window, 'confirm').mockReturnValue(false)
      render(<MachinesPage />)
      await screen.findByText('Tokarka CNC')
      fireEvent.click(screen.getAllByRole('button', { name: 'Usuń' })[0])
      expect(deleteMachine).not.toHaveBeenCalled()
    })

    it('usuwa maszynę z listy po pomyślnym usunięciu', async () => {
      vi.spyOn(window, 'confirm').mockReturnValue(true)
      vi.mocked(deleteMachine).mockResolvedValue()
      render(<MachinesPage />)
      await screen.findByText('Tokarka CNC')
      fireEvent.click(screen.getAllByRole('button', { name: 'Usuń' })[0])
      await waitFor(() => expect(screen.queryByText('Tokarka CNC')).not.toBeInTheDocument())
    })

    it('wyświetla alert gdy usuwanie się nie powiedzie', async () => {
      vi.spyOn(window, 'confirm').mockReturnValue(true)
      vi.spyOn(window, 'alert').mockImplementation(() => {})
      vi.mocked(deleteMachine).mockRejectedValue(new Error('Błąd'))
      render(<MachinesPage />)
      await screen.findByText('Tokarka CNC')
      fireEvent.click(screen.getAllByRole('button', { name: 'Usuń' })[0])
      await waitFor(() => expect(window.alert).toHaveBeenCalled())
    })
  })

  describe('modal dodawania', () => {
    it('otwiera modal po kliknięciu + Dodaj maszynę', async () => {
      render(<MachinesPage />)
      await screen.findByText('Tokarka CNC')
      fireEvent.click(screen.getByRole('button', { name: '+ Dodaj maszynę' }))
      expect(screen.getByTestId('add-modal')).toBeInTheDocument()
    })

    it('zamyka modal po wywołaniu onClose', async () => {
      render(<MachinesPage />)
      await screen.findByText('Tokarka CNC')
      fireEvent.click(screen.getByRole('button', { name: '+ Dodaj maszynę' }))
      fireEvent.click(screen.getByRole('button', { name: 'Close' }))
      expect(screen.queryByTestId('add-modal')).not.toBeInTheDocument()
    })

    it('dodaje nową maszynę do listy po onSuccess', async () => {
      render(<MachinesPage />)
      await screen.findByText('Tokarka CNC')
      fireEvent.click(screen.getByRole('button', { name: '+ Dodaj maszynę' }))
      fireEvent.click(screen.getByRole('button', { name: 'Success' }))
      expect(await screen.findByText('Nowa')).toBeInTheDocument()
    })
  })
})
