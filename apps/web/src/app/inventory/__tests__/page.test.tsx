import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useAuth } from '@/context/AuthContext'
import { useInventory } from '../useInventory'
import InventoryPage from '../page'

vi.mock('@/context/AuthContext', () => ({ useAuth: vi.fn() }))
vi.mock('../useInventory', () => ({ useInventory: vi.fn() }))
vi.mock('../components/InventoryModal', () => ({
  InventoryModal: ({ onClose }: any) => (
    <div data-testid="inventory-modal"><button onClick={onClose}>Zamknij modal</button></div>
  ),
}))
vi.mock('../components/AdjustStockModal', () => ({
  AdjustStockModal: ({ onClose, part }: any) => (
    <div data-testid="adjust-modal"><span>{part.name}</span><button onClick={onClose}>Zamknij korektę</button></div>
  ),
}))
vi.mock('../components/LowStockPanel', () => ({
  LowStockPanel: ({ onClose }: any) => (
    <div data-testid="low-stock-panel"><button onClick={onClose}>Zamknij</button></div>
  ),
}))
vi.mock('../components/CategoriesPanel', () => ({
  CategoriesPanel: ({ onClose }: any) => (
    <div data-testid="categories-panel"><button onClick={onClose}>Zamknij</button></div>
  ),
}))
vi.mock('@/components/searchBar', () => ({
  SearchBar: ({ value, onChange, placeholder, onToggleFilters }: any) => (
    <div>
      <input data-testid="search-bar" value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} />
      <button data-testid="filter-toggle" onClick={onToggleFilters}>Filtry</button>
    </div>
  ),
}))
vi.mock('@/components/filterPanel', () => ({
  FilterPanel: ({ children, onReset }: any) => (
    <div data-testid="filter-panel"><button onClick={onReset}>Resetuj</button>{children}</div>
  ),
  FilterGroup: ({ label, children }: any) => <div><span>{label}</span>{children}</div>,
}))

const mockUseAuth = vi.mocked(useAuth)
const mockUseInventory = vi.mocked(useInventory)

const adminUser = { id: 'admin-1', name: 'Admin', email: 'admin@test.com', role: 'ADMIN' as const, isActive: true, createdAt: '' }
const managerUser = { ...adminUser, id: 'mgr-1', role: 'MANAGER' as const }
const warehouseUser = { ...adminUser, id: 'wh-1', role: 'WAREHOUSE' as const }
const operatorUser = { ...adminUser, id: 'op-1', role: 'OPERATOR' as const }

const samplePart = {
  id: 'p1',
  name: 'Śruba M8',
  qrCode: 'QR-001',
  stockQuantity: 10,
  reorderPoint: 3,
  unitPrice: 5,
  category: { id: 'c1', name: 'Złączki' },
}

const sampleLoan = {
  id: 'loan-1',
  loanedAt: '2024-01-15T10:00:00.000Z',
  part: { id: 'p2', name: 'Klucz', qrCode: 'QR-002', stockQuantity: 1, reorderPoint: 1, unitPrice: 50, category: { id: 'c1', name: 'Narzędzia' } },
  user: { id: 'admin-1', name: 'Jan Kowalski' },
}

const createMockInv = (overrides: any = {}) => ({
  parts: [],
  loans: [],
  categories: [],
  lowStockParts: [],
  myLoans: [],
  loading: false,
  filteredParts: [],
  fetchData: vi.fn(),
  handleReturn: vi.fn(),
  handleLoan: vi.fn(),
  handleDeleteCategory: vi.fn(),
  searchQuery: '',
  setSearchQuery: vi.fn(),
  filterCategory: '',
  setFilterCategory: vi.fn(),
  priceFrom: '' as const,
  setPriceFrom: vi.fn(),
  priceTo: '' as const,
  setPriceTo: vi.fn(),
  minStock: 0,
  setMinStock: vi.fn(),
  ...overrides,
})

describe('InventoryPage', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockUseAuth.mockReturnValue({ user: adminUser, isLoading: false } as any)
    mockUseInventory.mockReturnValue(createMockInv())
  })

  it('wyświetla "Ładowanie danych z magazynu..." podczas ładowania', () => {
    mockUseInventory.mockReturnValue(createMockInv({ loading: true }))
    render(<InventoryPage />)
    expect(screen.getByText('Ładowanie danych z magazynu...')).toBeInTheDocument()
  })

  it('renderuje nagłówek strony', () => {
    render(<InventoryPage />)
    expect(screen.getByText('Magazyn')).toBeInTheDocument()
    expect(screen.getByText('Części i Narzędzi')).toBeInTheDocument()
  })

  it('wyświetla tab Stan z liczbą części', () => {
    mockUseInventory.mockReturnValue(createMockInv({ parts: [samplePart] }))
    render(<InventoryPage />)
    expect(screen.getByText('Stan (1)')).toBeInTheDocument()
  })

  it('wyświetla tab Moje Zasoby z liczbą wypożyczeń', () => {
    mockUseInventory.mockReturnValue(createMockInv({ myLoans: [sampleLoan] }))
    render(<InventoryPage />)
    expect(screen.getByText('Moje Zasoby (1)')).toBeInTheDocument()
  })

  it('ADMIN widzi tab Wszystkie wypożyczenia', () => {
    render(<InventoryPage />)
    expect(screen.getByText(/Wszystkie wypożyczenia/)).toBeInTheDocument()
  })

  it('MANAGER widzi tab Wszystkie wypożyczenia', () => {
    mockUseAuth.mockReturnValue({ user: managerUser, isLoading: false } as any)
    render(<InventoryPage />)
    expect(screen.getByText(/Wszystkie wypożyczenia/)).toBeInTheDocument()
  })

  it('WAREHOUSE widzi tab Wszystkie wypożyczenia', () => {
    mockUseAuth.mockReturnValue({ user: warehouseUser, isLoading: false } as any)
    render(<InventoryPage />)
    expect(screen.getByText(/Wszystkie wypożyczenia/)).toBeInTheDocument()
  })

  it('OPERATOR nie widzi tabu Wszystkie wypożyczenia', () => {
    mockUseAuth.mockReturnValue({ user: operatorUser, isLoading: false } as any)
    render(<InventoryPage />)
    expect(screen.queryByText(/Wszystkie wypożyczenia/)).not.toBeInTheDocument()
  })

  it('ADMIN widzi przycisk + (dodaj część)', () => {
    render(<InventoryPage />)
    expect(screen.getByText('+')).toBeInTheDocument()
  })

  it('OPERATOR nie widzi przycisku +', () => {
    mockUseAuth.mockReturnValue({ user: operatorUser, isLoading: false } as any)
    render(<InventoryPage />)
    expect(screen.queryByText('+')).not.toBeInTheDocument()
  })

  it('ADMIN widzi przycisk Kategorie', () => {
    render(<InventoryPage />)
    expect(screen.getByText('Kategorie')).toBeInTheDocument()
  })

  it('MANAGER nie widzi przycisku Kategorie', () => {
    mockUseAuth.mockReturnValue({ user: managerUser, isLoading: false } as any)
    render(<InventoryPage />)
    expect(screen.queryByText('Kategorie')).not.toBeInTheDocument()
  })

  it('renderuje karty części (nazwa, kategoria, stan)', () => {
    mockUseInventory.mockReturnValue(createMockInv({ filteredParts: [samplePart] }))
    render(<InventoryPage />)
    expect(screen.getByText('Śruba M8')).toBeInTheDocument()
    expect(screen.getByText('Złączki')).toBeInTheDocument()
    expect(screen.getByText('10')).toBeInTheDocument()
  })

  it('karta części ADMIN ma link do szczegółów', () => {
    mockUseInventory.mockReturnValue(createMockInv({ filteredParts: [samplePart] }))
    render(<InventoryPage />)
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/inventory/p1')
  })

  it('ADMIN widzi przycisk Koryguj na karcie części', () => {
    mockUseInventory.mockReturnValue(createMockInv({ filteredParts: [samplePart] }))
    render(<InventoryPage />)
    expect(screen.getByText('Koryguj')).toBeInTheDocument()
  })

  it('kliknięcie Koryguj otwiera AdjustStockModal', () => {
    mockUseInventory.mockReturnValue(createMockInv({ filteredParts: [samplePart] }))
    render(<InventoryPage />)
    fireEvent.click(screen.getByText('Koryguj'))
    expect(screen.getByTestId('adjust-modal')).toBeInTheDocument()
  })

  it('zamknięcie AdjustStockModal usuwa go z DOM', () => {
    mockUseInventory.mockReturnValue(createMockInv({ filteredParts: [samplePart] }))
    render(<InventoryPage />)
    fireEvent.click(screen.getByText('Koryguj'))
    fireEvent.click(screen.getByText('Zamknij korektę'))
    expect(screen.queryByTestId('adjust-modal')).not.toBeInTheDocument()
  })

  it('kliknięcie + otwiera InventoryModal', () => {
    render(<InventoryPage />)
    fireEvent.click(screen.getByText('+'))
    expect(screen.getByTestId('inventory-modal')).toBeInTheDocument()
  })

  it('zamknięcie InventoryModal usuwa go z DOM', () => {
    render(<InventoryPage />)
    fireEvent.click(screen.getByText('+'))
    fireEvent.click(screen.getByText('Zamknij modal'))
    expect(screen.queryByTestId('inventory-modal')).not.toBeInTheDocument()
  })

  it('kliknięcie Kategorie otwiera CategoriesPanel', () => {
    render(<InventoryPage />)
    fireEvent.click(screen.getByText('Kategorie'))
    expect(screen.getByTestId('categories-panel')).toBeInTheDocument()
  })

  it('przełączenie na tab Wszystkie wypożyczenia wyświetla tabelę', () => {
    render(<InventoryPage />)
    fireEvent.click(screen.getByText(/Wszystkie wypożyczenia/))
    expect(screen.getByText('Narzędzie')).toBeInTheDocument()
    expect(screen.getByText('Użytkownik')).toBeInTheDocument()
  })

  it('wyświetla "Brak aktywnych wypożyczeń." gdy lista pusta', () => {
    render(<InventoryPage />)
    fireEvent.click(screen.getByText(/Wszystkie wypożyczenia/))
    expect(screen.getByText('Brak aktywnych wypożyczeń.')).toBeInTheDocument()
  })

  it('renderuje dane wypożyczenia w tabeli', () => {
    mockUseInventory.mockReturnValue(createMockInv({ loans: [sampleLoan] }))
    render(<InventoryPage />)
    fireEvent.click(screen.getByText(/Wszystkie wypożyczenia/))
    expect(screen.getByText('Klucz')).toBeInTheDocument()
    expect(screen.getByText('Jan Kowalski')).toBeInTheDocument()
  })

  it('użytkownik widzi przycisk Zwrot dla swojego wypożyczenia', () => {
    mockUseInventory.mockReturnValue(createMockInv({ loans: [sampleLoan] }))
    render(<InventoryPage />)
    fireEvent.click(screen.getByText(/Wszystkie wypożyczenia/))
    expect(screen.getByText('Zwrot')).toBeInTheDocument()
  })

  it('inny użytkownik widzi "W posiadaniu" zamiast Zwrot', () => {
    mockUseAuth.mockReturnValue({ user: { ...adminUser, id: 'other-user' }, isLoading: false } as any)
    mockUseInventory.mockReturnValue(createMockInv({ loans: [sampleLoan] }))
    render(<InventoryPage />)
    fireEvent.click(screen.getByText(/Wszystkie wypożyczenia/))
    expect(screen.getByText('W posiadaniu')).toBeInTheDocument()
  })
})
