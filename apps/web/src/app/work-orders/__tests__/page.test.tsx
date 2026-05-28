import { render, screen, fireEvent, act } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useAuth } from '@/context/AuthContext'
import WorkOrdersPage from '../page'
import * as workOrdersApi from '../work-orders.api'
import { WorkOrderStatus, Priority } from '../types'

vi.mock('@/context/AuthContext', () => ({ useAuth: vi.fn() }))
vi.mock('../work-orders.api', () => ({
  fetchWorkOrders: vi.fn(),
  createWorkOrder: vi.fn(),
}))
vi.mock('../components/WorkOrderModal', () => ({
  WorkOrderModal: ({ isOpen, onClose, onSubmit }: any) =>
    isOpen ? (
      <div data-testid="work-order-modal">
        <button onClick={onClose}>Zamknij modal</button>
        <button onClick={() => onSubmit({ machineId: 'm1', title: 'Test', description: 'Opis testowy zlecenia', priority: 'MEDIUM' })}>
          Utwórz
        </button>
      </div>
    ) : null,
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
      <button onClick={onReset}>Resetuj filtry</button>
      {children}
    </div>
  ),
  FilterGroup: ({ label, children }: any) => (
    <div><span>{label}</span>{children}</div>
  ),
}))

const mockUseAuth = vi.mocked(useAuth)
const mockFetchWorkOrders = vi.mocked(workOrdersApi.fetchWorkOrders)
const mockCreateWorkOrder = vi.mocked(workOrdersApi.createWorkOrder)

const flush = () => act(async () => {})

const adminUser = { id: 'admin-1', name: 'Admin', email: 'admin@test.com', role: 'ADMIN' as const, isActive: true, createdAt: '' }
const managerUser = { ...adminUser, id: 'mgr-1', role: 'MANAGER' as const }
const technicianUser = { ...adminUser, id: 'tech-1', role: 'TECHNICIAN' as const }
const operatorUser = { ...adminUser, id: 'op-1', role: 'OPERATOR' as const }

const makeOrder = (overrides: any = {}) => ({
  id: 'wo-1',
  machineId: 'm1',
  reportedById: 'op-1',
  assignedToId: 'tech-1',
  status: WorkOrderStatus.NEW,
  priority: Priority.MEDIUM,
  title: 'Awaria pompy',
  description: 'Pompa nie działa',
  bhpConfirmed: false,
  laborCost: '0',
  partsCost: '0',
  createdAt: '2024-01-15T10:00:00.000Z',
  startedAt: null,
  closedAt: null,
  updatedAt: '2024-01-15T10:00:00.000Z',
  machine: { id: 'm1', name: 'Maszyna Alpha', serialNumber: 'SN001' },
  reportedBy: { id: 'op-1', name: 'Jan Operator', email: 'op@test.com', role: 'OPERATOR' },
  assignedTo: { id: 'tech-1', name: 'Tomek Technik', email: 'tech@test.com', role: 'TECHNICIAN' },
  ...overrides,
})

describe('WorkOrdersPage', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockFetchWorkOrders.mockResolvedValue([makeOrder()])
    mockCreateWorkOrder.mockResolvedValue(makeOrder({ id: 'wo-new' }))
  })

  it('wyświetla "Sprawdzanie uprawnień..." gdy auth się ładuje', () => {
    mockUseAuth.mockReturnValue({ user: null, isLoading: true } as any)
    render(<WorkOrdersPage />)
    expect(screen.getByText('Sprawdzanie uprawnień...')).toBeInTheDocument()
  })

  it('wyświetla błąd autoryzacji gdy user jest null po załadowaniu', async () => {
    mockUseAuth.mockReturnValue({ user: null, isLoading: false } as any)
    render(<WorkOrdersPage />)
    await flush()
    expect(screen.getByText('Brak autoryzacji. Zaloguj się ponownie.')).toBeInTheDocument()
  })

  it('wyświetla "Ładowanie danych..." podczas pobierania zleceń', () => {
    mockUseAuth.mockReturnValue({ user: adminUser, isLoading: false } as any)
    mockFetchWorkOrders.mockReturnValue(new Promise(() => {}))
    render(<WorkOrdersPage />)
    expect(screen.getByText('Ładowanie danych...')).toBeInTheDocument()
  })

  it('wyświetla błąd gdy fetchWorkOrders rzuci wyjątek', async () => {
    mockUseAuth.mockReturnValue({ user: adminUser, isLoading: false } as any)
    mockFetchWorkOrders.mockRejectedValue(new Error('Błąd serwera'))
    render(<WorkOrdersPage />)
    await flush()
    expect(screen.getByText('Błąd serwera')).toBeInTheDocument()
  })

  it('wyświetla komunikat gdy lista zleceń jest pusta', async () => {
    mockUseAuth.mockReturnValue({ user: adminUser, isLoading: false } as any)
    mockFetchWorkOrders.mockResolvedValue([])
    render(<WorkOrdersPage />)
    await flush()
    expect(screen.getByText('Brak zleceń pracy spełniających kryteria.')).toBeInTheDocument()
  })

  it('renderuje tytuł, status i priorytet zlecenia', async () => {
    mockUseAuth.mockReturnValue({ user: adminUser, isLoading: false } as any)
    render(<WorkOrdersPage />)
    await flush()
    expect(screen.getByText('Awaria pompy')).toBeInTheDocument()
    expect(screen.getByText('Nowe')).toBeInTheDocument()
    expect(screen.getByText('Średni')).toBeInTheDocument()
  })

  it('renderuje nazwę maszyny i zgłaszającego', async () => {
    mockUseAuth.mockReturnValue({ user: adminUser, isLoading: false } as any)
    render(<WorkOrdersPage />)
    await flush()
    expect(screen.getByText('Maszyna Alpha')).toBeInTheDocument()
    expect(screen.getByText('Jan Operator')).toBeInTheDocument()
  })

  it('renderuje link Szczegóły z poprawnym href', async () => {
    mockUseAuth.mockReturnValue({ user: adminUser, isLoading: false } as any)
    render(<WorkOrdersPage />)
    await flush()
    expect(screen.getByText('Szczegóły')).toHaveAttribute('href', '/work-orders/wo-1')
  })

  it('ADMIN widzi przycisk + Nowe Zlecenie', async () => {
    mockUseAuth.mockReturnValue({ user: adminUser, isLoading: false } as any)
    render(<WorkOrdersPage />)
    await flush()
    expect(screen.getByText('+ Nowe Zlecenie')).toBeInTheDocument()
  })

  it('MANAGER widzi przycisk + Nowe Zlecenie', async () => {
    mockUseAuth.mockReturnValue({ user: managerUser, isLoading: false } as any)
    render(<WorkOrdersPage />)
    await flush()
    expect(screen.getByText('+ Nowe Zlecenie')).toBeInTheDocument()
  })

  it('OPERATOR widzi przycisk + Nowe Zlecenie', async () => {
    mockUseAuth.mockReturnValue({ user: operatorUser, isLoading: false } as any)
    mockFetchWorkOrders.mockResolvedValue([makeOrder({ reportedById: 'op-1' })])
    render(<WorkOrdersPage />)
    await flush()
    expect(screen.getByText('+ Nowe Zlecenie')).toBeInTheDocument()
  })

  it('TECHNICIAN nie widzi przycisku + Nowe Zlecenie', async () => {
    mockUseAuth.mockReturnValue({ user: technicianUser, isLoading: false } as any)
    render(<WorkOrdersPage />)
    await flush()
    expect(screen.queryByText('+ Nowe Zlecenie')).not.toBeInTheDocument()
  })

  it('otwiera modal po kliknięciu + Nowe Zlecenie', async () => {
    mockUseAuth.mockReturnValue({ user: adminUser, isLoading: false } as any)
    render(<WorkOrdersPage />)
    await flush()
    expect(screen.queryByTestId('work-order-modal')).not.toBeInTheDocument()
    fireEvent.click(screen.getByText('+ Nowe Zlecenie'))
    expect(screen.getByTestId('work-order-modal')).toBeInTheDocument()
  })

  it('zamyka modal po kliknięciu Zamknij modal', async () => {
    mockUseAuth.mockReturnValue({ user: adminUser, isLoading: false } as any)
    render(<WorkOrdersPage />)
    await flush()
    fireEvent.click(screen.getByText('+ Nowe Zlecenie'))
    fireEvent.click(screen.getByText('Zamknij modal'))
    expect(screen.queryByTestId('work-order-modal')).not.toBeInTheDocument()
  })

  it('handleCreate wywołuje createWorkOrder i odświeża listę', async () => {
    mockUseAuth.mockReturnValue({ user: adminUser, isLoading: false } as any)
    render(<WorkOrdersPage />)
    await flush()
    fireEvent.click(screen.getByText('+ Nowe Zlecenie'))
    await act(async () => {
      fireEvent.click(screen.getByText('Utwórz'))
    })
    expect(mockCreateWorkOrder).toHaveBeenCalledTimes(1)
    expect(mockFetchWorkOrders).toHaveBeenCalledTimes(2)
  })

  it('ADMIN widzi wszystkie zlecenia', async () => {
    mockUseAuth.mockReturnValue({ user: adminUser, isLoading: false } as any)
    mockFetchWorkOrders.mockResolvedValue([
      makeOrder({ id: 'wo-1', title: 'Zlecenie pierwsze' }),
      makeOrder({ id: 'wo-2', title: 'Zlecenie drugie', reportedById: 'other', assignedToId: 'other' }),
    ])
    render(<WorkOrdersPage />)
    await flush()
    expect(screen.getByText('Zlecenie pierwsze')).toBeInTheDocument()
    expect(screen.getByText('Zlecenie drugie')).toBeInTheDocument()
  })

  it('TECHNICIAN widzi tylko zlecenia do niego przypisane', async () => {
    mockUseAuth.mockReturnValue({ user: technicianUser, isLoading: false } as any)
    mockFetchWorkOrders.mockResolvedValue([
      makeOrder({ id: 'wo-1', title: 'Moje zlecenie', assignedToId: 'tech-1', assignedTo: { id: 'tech-1', name: 'Tomek Technik', email: 'tech@test.com', role: 'TECHNICIAN' } }),
      makeOrder({ id: 'wo-2', title: 'Cudze zlecenie', assignedToId: 'other-tech', assignedTo: { id: 'other-tech', name: 'Inny Technik', email: 'other@test.com', role: 'TECHNICIAN' } }),
    ])
    render(<WorkOrdersPage />)
    await flush()
    expect(screen.getByText('Moje zlecenie')).toBeInTheDocument()
    expect(screen.queryByText('Cudze zlecenie')).not.toBeInTheDocument()
  })

  it('OPERATOR widzi tylko swoje zgłoszenia', async () => {
    mockUseAuth.mockReturnValue({ user: operatorUser, isLoading: false } as any)
    mockFetchWorkOrders.mockResolvedValue([
      makeOrder({ id: 'wo-1', title: 'Moje zgłoszenie', reportedById: 'op-1', reportedBy: { id: 'op-1', name: 'Jan Operator', email: 'op@test.com', role: 'OPERATOR' } }),
      makeOrder({ id: 'wo-2', title: 'Cudze zgłoszenie', reportedById: 'other-op', reportedBy: { id: 'other-op', name: 'Inny Operator', email: 'other@test.com', role: 'OPERATOR' } }),
    ])
    render(<WorkOrdersPage />)
    await flush()
    expect(screen.getByText('Moje zgłoszenie')).toBeInTheDocument()
    expect(screen.queryByText('Cudze zgłoszenie')).not.toBeInTheDocument()
  })

  it('filtruje zlecenia po tytule przez wyszukiwarkę', async () => {
    mockUseAuth.mockReturnValue({ user: adminUser, isLoading: false } as any)
    mockFetchWorkOrders.mockResolvedValue([
      makeOrder({ id: 'wo-1', title: 'Awaria pompy' }),
      makeOrder({ id: 'wo-2', title: 'Wymiana filtra' }),
    ])
    render(<WorkOrdersPage />)
    await flush()
    fireEvent.change(screen.getByTestId('search-bar'), { target: { value: 'pompy' } })
    expect(screen.getByText('Awaria pompy')).toBeInTheDocument()
    expect(screen.queryByText('Wymiana filtra')).not.toBeInTheDocument()
  })

  it('filtruje zlecenia po nazwie maszyny', async () => {
    mockUseAuth.mockReturnValue({ user: adminUser, isLoading: false } as any)
    mockFetchWorkOrders.mockResolvedValue([
      makeOrder({ id: 'wo-1', title: 'Zlecenie A', machine: { id: 'm1', name: 'Tokarka CNC', serialNumber: 'SN1' } }),
      makeOrder({ id: 'wo-2', title: 'Zlecenie B', machine: { id: 'm2', name: 'Spawarka MIG', serialNumber: 'SN2' } }),
    ])
    render(<WorkOrdersPage />)
    await flush()
    fireEvent.change(screen.getByTestId('search-bar'), { target: { value: 'Tokarka' } })
    expect(screen.getByText('Zlecenie A')).toBeInTheDocument()
    expect(screen.queryByText('Zlecenie B')).not.toBeInTheDocument()
  })

  it('przełącza widoczność panelu filtrów', async () => {
    mockUseAuth.mockReturnValue({ user: adminUser, isLoading: false } as any)
    render(<WorkOrdersPage />)
    await flush()
    expect(screen.queryByTestId('filter-panel')).not.toBeInTheDocument()
    fireEvent.click(screen.getByText('Pokaż filtry'))
    expect(screen.getByTestId('filter-panel')).toBeInTheDocument()
    expect(screen.getByText('Ukryj filtry')).toBeInTheDocument()
    fireEvent.click(screen.getByText('Ukryj filtry'))
    expect(screen.queryByTestId('filter-panel')).not.toBeInTheDocument()
  })
})
