import { render, screen, fireEvent, act } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useAuth } from '@/context/AuthContext'
import { fetchMachineById, updateOperatingHours } from '../../machines.api'
import MachineDetailsPage from '../page'

vi.mock('@/context/AuthContext', () => ({
  useAuth: vi.fn(),
}))

vi.mock('../../machines.api', () => ({
  fetchMachineById: vi.fn(),
  updateOperatingHours: vi.fn(),
}))

vi.mock('../../components/EditMachineModal', () => ({
  default: ({ isOpen, onClose, machine, onSuccess }: any) =>
    isOpen ? (
      <div data-testid="edit-modal">
        <span>{machine?.name}</span>
        <button onClick={onClose}>Close</button>
        <button onClick={() => onSuccess({ ...machine, name: 'Zaktualizowana' })}>Save</button>
      </div>
    ) : null,
}))

vi.mock('next/link', () => ({
  default: ({ href, children, ...props }: any) => <a href={href} {...props}>{children}</a>,
}))

// React 19 tracks promise state via .status / .value on the thenable.
// Pre-patching lets use() return synchronously without suspending.
function resolvedParams(id: string): Promise<{ id: string }> {
  const p = Promise.resolve({ id }) as any
  p.status = 'fulfilled'
  p.value = { id }
  return p
}

// Flush all pending React updates and microtasks (useEffect async callbacks).
async function flush() {
  await act(async () => {})
}

const adminUser = { id: '1', name: 'Admin', email: 'admin@test.com', role: 'ADMIN' as const }
const managerUser = { id: '2', name: 'Manager', email: 'mgr@test.com', role: 'MANAGER' as const }
const operatorUser = { id: '3', name: 'Op', email: 'op@test.com', role: 'OPERATOR' as const }
const technicianUser = { id: '4', name: 'Tech', email: 'tech@test.com', role: 'TECHNICIAN' as const }

const mockMachine = {
  id: 'machine-123',
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
}

const mockedUseAuth = vi.mocked(useAuth)

describe('MachineDetailsPage', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockedUseAuth.mockReturnValue({ user: adminUser, isLoading: false, logout: vi.fn() })
    vi.mocked(fetchMachineById).mockResolvedValue(mockMachine)
  })

  describe('stan ładowania', () => {
    it('wyświetla ekran ładowania', () => {
      vi.mocked(fetchMachineById).mockReturnValue(new Promise(() => {}))
      render(<MachineDetailsPage params={resolvedParams('machine-123')} />)
      expect(screen.getByText('Ładowanie...')).toBeInTheDocument()
    })
  })

  describe('stan błędu', () => {
    it('wyświetla komunikat błędu gdy API zawiedzie', async () => {
      vi.mocked(fetchMachineById).mockRejectedValue(new Error('Błąd'))
      render(<MachineDetailsPage params={resolvedParams('machine-123')} />)
      await flush()
      expect(screen.getByText('Nie udało się załadować szczegółów maszyny.')).toBeInTheDocument()
    })
  })

  describe('renderowanie szczegółów', () => {
    it('renderuje nazwę maszyny w nagłówku', async () => {
      render(<MachineDetailsPage params={resolvedParams('machine-123')} />)
      await flush()
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Tokarka CNC')
    })

    it('renderuje numer seryjny', async () => {
      render(<MachineDetailsPage params={resolvedParams('machine-123')} />)
      await flush()
      expect(screen.getByText('SN-001')).toBeInTheDocument()
    })

    it('renderuje lokalizację', async () => {
      render(<MachineDetailsPage params={resolvedParams('machine-123')} />)
      await flush()
      expect(screen.getByText('Hala A')).toBeInTheDocument()
    })

    it('renderuje roboczogodziny', async () => {
      render(<MachineDetailsPage params={resolvedParams('machine-123')} />)
      await flush()
      expect(screen.getByText('1200 h')).toBeInTheDocument()
    })

    it('renderuje link powrotu do listy', async () => {
      render(<MachineDetailsPage params={resolvedParams('machine-123')} />)
      await flush()
      expect(screen.getByRole('link', { name: '← Powrót do listy' })).toHaveAttribute('href', '/machines')
    })
  })

  describe('uprawnienia — edycja', () => {
    it('ADMIN widzi przycisk Edytuj maszynę', async () => {
      render(<MachineDetailsPage params={resolvedParams('machine-123')} />)
      await flush()
      expect(screen.getByRole('button', { name: 'Edytuj maszynę' })).toBeInTheDocument()
    })

    it('MANAGER widzi przycisk Edytuj maszynę', async () => {
      mockedUseAuth.mockReturnValue({ user: managerUser, isLoading: false, logout: vi.fn() })
      render(<MachineDetailsPage params={resolvedParams('machine-123')} />)
      await flush()
      expect(screen.getByRole('button', { name: 'Edytuj maszynę' })).toBeInTheDocument()
    })

    it('OPERATOR nie widzi przycisku Edytuj maszynę', async () => {
      mockedUseAuth.mockReturnValue({ user: operatorUser, isLoading: false, logout: vi.fn() })
      render(<MachineDetailsPage params={resolvedParams('machine-123')} />)
      await flush()
      expect(screen.queryByRole('button', { name: 'Edytuj maszynę' })).not.toBeInTheDocument()
    })
  })

  describe('uprawnienia — aktualizacja godzin', () => {
    it('ADMIN widzi formularz aktualizacji godzin', async () => {
      render(<MachineDetailsPage params={resolvedParams('machine-123')} />)
      await flush()
      expect(screen.getByRole('button', { name: 'Zaktualizuj' })).toBeInTheDocument()
    })

    it('TECHNICIAN widzi formularz aktualizacji godzin', async () => {
      mockedUseAuth.mockReturnValue({ user: technicianUser, isLoading: false, logout: vi.fn() })
      render(<MachineDetailsPage params={resolvedParams('machine-123')} />)
      await flush()
      expect(screen.getByRole('button', { name: 'Zaktualizuj' })).toBeInTheDocument()
    })

    it('OPERATOR nie widzi formularza aktualizacji godzin', async () => {
      mockedUseAuth.mockReturnValue({ user: operatorUser, isLoading: false, logout: vi.fn() })
      render(<MachineDetailsPage params={resolvedParams('machine-123')} />)
      await flush()
      expect(screen.queryByRole('button', { name: 'Zaktualizuj' })).not.toBeInTheDocument()
    })
  })

  describe('aktualizacja godzin pracy', () => {
    it('wywołuje updateOperatingHours po submicie', async () => {
      vi.mocked(updateOperatingHours).mockResolvedValue({ ...mockMachine, operatingHours: 1500 })
      render(<MachineDetailsPage params={resolvedParams('machine-123')} />)
      await flush()
      fireEvent.change(screen.getByRole('spinbutton'), { target: { value: '1500' } })
      fireEvent.submit(screen.getByRole('button', { name: 'Zaktualizuj' }).closest('form')!)
      await flush()
      expect(updateOperatingHours).toHaveBeenCalledWith('machine-123', 1500)
    })

    it('wyświetla Zapisywanie... podczas aktualizacji', async () => {
      vi.mocked(updateOperatingHours).mockReturnValue(new Promise(() => {}))
      render(<MachineDetailsPage params={resolvedParams('machine-123')} />)
      await flush()
      fireEvent.change(screen.getByRole('spinbutton'), { target: { value: '1500' } })
      fireEvent.submit(screen.getByRole('button', { name: 'Zaktualizuj' }).closest('form')!)
      expect(screen.getByRole('button', { name: 'Zapisywanie...' })).toBeDisabled()
    })

    it('wyświetla alert gdy aktualizacja się nie powiedzie', async () => {
      vi.mocked(updateOperatingHours).mockRejectedValue(new Error('Błąd API'))
      vi.spyOn(window, 'alert').mockImplementation(() => {})
      render(<MachineDetailsPage params={resolvedParams('machine-123')} />)
      await flush()
      fireEvent.change(screen.getByRole('spinbutton'), { target: { value: '1500' } })
      fireEvent.submit(screen.getByRole('button', { name: 'Zaktualizuj' }).closest('form')!)
      await flush()
      expect(window.alert).toHaveBeenCalledWith('Błąd API')
    })
  })

  describe('modal edycji', () => {
    it('otwiera modal po kliknięciu Edytuj maszynę', async () => {
      render(<MachineDetailsPage params={resolvedParams('machine-123')} />)
      await flush()
      fireEvent.click(screen.getByRole('button', { name: 'Edytuj maszynę' }))
      expect(screen.getByTestId('edit-modal')).toBeInTheDocument()
    })

    it('zamyka modal po wywołaniu onClose', async () => {
      render(<MachineDetailsPage params={resolvedParams('machine-123')} />)
      await flush()
      fireEvent.click(screen.getByRole('button', { name: 'Edytuj maszynę' }))
      fireEvent.click(screen.getByRole('button', { name: 'Close' }))
      expect(screen.queryByTestId('edit-modal')).not.toBeInTheDocument()
    })

    it('aktualizuje dane maszyny po onSuccess', async () => {
      render(<MachineDetailsPage params={resolvedParams('machine-123')} />)
      await flush()
      fireEvent.click(screen.getByRole('button', { name: 'Edytuj maszynę' }))
      fireEvent.click(screen.getByRole('button', { name: 'Save' }))
      expect(screen.getAllByText('Zaktualizowana').length).toBeGreaterThan(0)
    })
  })
})
