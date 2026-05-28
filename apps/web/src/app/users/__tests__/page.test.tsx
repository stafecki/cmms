import { render, screen, fireEvent, act } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useAuth } from '@/context/AuthContext'
import UsersPage from '../page'
import * as usersApi from '../users.api'

vi.mock('@/context/AuthContext', () => ({ useAuth: vi.fn() }))
vi.mock('../users.api', () => ({
  fetchUsers: vi.fn(),
  createUser: vi.fn(),
}))
vi.mock('../components/UserModal', () => ({
  default: ({ isOpen, onClose, onSubmit }: any) =>
    isOpen ? (
      <div data-testid="user-modal">
        <button onClick={onClose}>Zamknij modal</button>
        <button onClick={() => onSubmit({ name: 'Nowy', email: 'n@test.com', password: 'Pass1234', role: 'OPERATOR' })}>
          Zapisz modal
        </button>
      </div>
    ) : null,
}))

const mockUseAuth = vi.mocked(useAuth)
const mockFetchUsers = vi.mocked(usersApi.fetchUsers)
const mockCreateUser = vi.mocked(usersApi.createUser)

const flush = () => act(async () => {})

const adminUser = { id: 'a1', name: 'Admin', email: 'admin@test.com', role: 'ADMIN' as const, isActive: true, createdAt: '' }
const managerUser = { ...adminUser, id: 'm1', role: 'MANAGER' as const }
const operatorUser = { ...adminUser, id: 'o1', role: 'OPERATOR' as const }

const sampleData = {
  data: [
    { id: 'u1', name: 'Jan Kowalski', email: 'jan@test.com', role: 'TECHNICIAN' as const, isActive: true, createdAt: '' },
    { id: 'u2', name: 'Anna Nowak', email: 'anna@test.com', role: 'OPERATOR' as const, isActive: false, createdAt: '' },
  ],
  total: 2,
  limit: 50,
  offset: 0,
}

describe('UsersPage', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockFetchUsers.mockResolvedValue(sampleData)
    mockCreateUser.mockResolvedValue({ id: 'new', name: 'Nowy', email: 'n@test.com', role: 'OPERATOR', isActive: true, createdAt: '' })
  })

  it('wyświetla ładowanie gdy auth się ładuje', () => {
    mockUseAuth.mockReturnValue({ user: null, isLoading: true } as any)
    render(<UsersPage />)
    expect(screen.getByText('Ładowanie danych...')).toBeInTheDocument()
  })

  it('wyświetla brak uprawnień dla OPERATOR', async () => {
    mockUseAuth.mockReturnValue({ user: operatorUser, isLoading: false } as any)
    render(<UsersPage />)
    await flush()
    expect(screen.getByText('Brak uprawnień')).toBeInTheDocument()
    expect(screen.getByText('Wymagana rola to ADMIN lub MANAGER.')).toBeInTheDocument()
  })

  it('nie wywołuje fetchUsers dla OPERATOR', async () => {
    mockUseAuth.mockReturnValue({ user: operatorUser, isLoading: false } as any)
    render(<UsersPage />)
    await flush()
    expect(mockFetchUsers).not.toHaveBeenCalled()
  })

  it('wyświetla brak uprawnień gdy user jest null', async () => {
    mockUseAuth.mockReturnValue({ user: null, isLoading: false } as any)
    render(<UsersPage />)
    await flush()
    expect(screen.getByText('Brak uprawnień')).toBeInTheDocument()
  })

  it('renderuje nagłówki tabeli dla ADMIN', async () => {
    mockUseAuth.mockReturnValue({ user: adminUser, isLoading: false } as any)
    render(<UsersPage />)
    await flush()
    expect(screen.getByText('Imię i nazwisko')).toBeInTheDocument()
    expect(screen.getByText('Email')).toBeInTheDocument()
    expect(screen.getByText('Rola')).toBeInTheDocument()
    expect(screen.getByText('Status')).toBeInTheDocument()
    expect(screen.getByText('Akcje')).toBeInTheDocument()
  })

  it('renderuje dane użytkowników w tabeli', async () => {
    mockUseAuth.mockReturnValue({ user: adminUser, isLoading: false } as any)
    render(<UsersPage />)
    await flush()
    expect(screen.getByText('Jan Kowalski')).toBeInTheDocument()
    expect(screen.getByText('jan@test.com')).toBeInTheDocument()
    expect(screen.getByText('Anna Nowak')).toBeInTheDocument()
    expect(screen.getByText('anna@test.com')).toBeInTheDocument()
  })

  it('wyświetla badge Aktywny i Nieaktywny', async () => {
    mockUseAuth.mockReturnValue({ user: adminUser, isLoading: false } as any)
    render(<UsersPage />)
    await flush()
    expect(screen.getByText('Aktywny')).toBeInTheDocument()
    expect(screen.getByText('Nieaktywny')).toBeInTheDocument()
  })

  it('renderuje linki Szczegóły z poprawnymi href', async () => {
    mockUseAuth.mockReturnValue({ user: adminUser, isLoading: false } as any)
    render(<UsersPage />)
    await flush()
    const links = screen.getAllByText('Szczegóły')
    expect(links[0]).toHaveAttribute('href', '/users/u1')
    expect(links[1]).toHaveAttribute('href', '/users/u2')
  })

  it('MANAGER widzi tabelę ale nie widzi przycisku Dodaj Użytkownika', async () => {
    mockUseAuth.mockReturnValue({ user: managerUser, isLoading: false } as any)
    render(<UsersPage />)
    await flush()
    expect(screen.getByText('Jan Kowalski')).toBeInTheDocument()
    expect(screen.queryByText('Dodaj Użytkownika')).not.toBeInTheDocument()
  })

  it('wyświetla błąd gdy fetchUsers rzuci wyjątek', async () => {
    mockUseAuth.mockReturnValue({ user: adminUser, isLoading: false } as any)
    mockFetchUsers.mockRejectedValue(new Error('Błąd serwera'))
    render(<UsersPage />)
    await flush()
    expect(screen.getByText('Błąd serwera')).toBeInTheDocument()
  })

  it('ADMIN widzi przycisk Dodaj Użytkownika', async () => {
    mockUseAuth.mockReturnValue({ user: adminUser, isLoading: false } as any)
    render(<UsersPage />)
    await flush()
    expect(screen.getByText('Dodaj Użytkownika')).toBeInTheDocument()
  })

  it('otwiera modal po kliknięciu Dodaj Użytkownika', async () => {
    mockUseAuth.mockReturnValue({ user: adminUser, isLoading: false } as any)
    render(<UsersPage />)
    await flush()
    expect(screen.queryByTestId('user-modal')).not.toBeInTheDocument()
    fireEvent.click(screen.getByText('Dodaj Użytkownika'))
    expect(screen.getByTestId('user-modal')).toBeInTheDocument()
  })

  it('zamyka modal po kliknięciu Zamknij', async () => {
    mockUseAuth.mockReturnValue({ user: adminUser, isLoading: false } as any)
    render(<UsersPage />)
    await flush()
    fireEvent.click(screen.getByText('Dodaj Użytkownika'))
    fireEvent.click(screen.getByText('Zamknij modal'))
    expect(screen.queryByTestId('user-modal')).not.toBeInTheDocument()
  })

  it('zapis wywołuje createUser i odświeża listę', async () => {
    mockUseAuth.mockReturnValue({ user: adminUser, isLoading: false } as any)
    render(<UsersPage />)
    await flush()
    fireEvent.click(screen.getByText('Dodaj Użytkownika'))
    await act(async () => {
      fireEvent.click(screen.getByText('Zapisz modal'))
    })
    expect(mockCreateUser).toHaveBeenCalledTimes(1)
    expect(mockFetchUsers).toHaveBeenCalledTimes(2)
  })
})
