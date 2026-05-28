import { render, screen, fireEvent, act } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import EditUserModal from '../EditUserModal'
import { User } from '../../types'

const mockOnClose = vi.fn()
const mockOnSubmit = vi.fn()

const mockUser: User = {
  id: 'u1',
  name: 'Jan Kowalski',
  email: 'jan@test.com',
  role: 'TECHNICIAN',
  isActive: true,
  createdAt: '2024-01-01',
}

describe('EditUserModal', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockOnSubmit.mockResolvedValue(undefined)
  })

  it('zwraca null gdy isOpen=false', () => {
    render(<EditUserModal isOpen={false} onClose={mockOnClose} onSubmit={mockOnSubmit} user={mockUser} />)
    expect(screen.queryByText('Edytuj użytkownika')).not.toBeInTheDocument()
  })

  it('zwraca null gdy user=null', () => {
    render(<EditUserModal isOpen={true} onClose={mockOnClose} onSubmit={mockOnSubmit} user={null} />)
    expect(screen.queryByText('Edytuj użytkownika')).not.toBeInTheDocument()
  })

  it('wyświetla tytuł i email edytowanego użytkownika', () => {
    render(<EditUserModal isOpen={true} onClose={mockOnClose} onSubmit={mockOnSubmit} user={mockUser} />)
    expect(screen.getByText('Edytuj użytkownika')).toBeInTheDocument()
    expect(screen.getByText('jan@test.com')).toBeInTheDocument()
  })

  it('pre-wypełnia pola z danych użytkownika', () => {
    render(<EditUserModal isOpen={true} onClose={mockOnClose} onSubmit={mockOnSubmit} user={mockUser} />)
    expect(screen.getByDisplayValue('Jan Kowalski')).toBeInTheDocument()
    expect(screen.getByDisplayValue('Technician')).toBeInTheDocument()
    expect(screen.getByRole('checkbox')).toBeChecked()
  })

  it('Anuluj wywołuje onClose', () => {
    render(<EditUserModal isOpen={true} onClose={mockOnClose} onSubmit={mockOnSubmit} user={mockUser} />)
    fireEvent.click(screen.getByText('Anuluj'))
    expect(mockOnClose).toHaveBeenCalledTimes(1)
  })

  it('submit wywołuje onSubmit z aktualnymi danymi', async () => {
    render(<EditUserModal isOpen={true} onClose={mockOnClose} onSubmit={mockOnSubmit} user={mockUser} />)
    await act(async () => {
      fireEvent.click(screen.getByText('Zapisz zmiany'))
    })
    expect(mockOnSubmit).toHaveBeenCalledWith({
      name: 'Jan Kowalski',
      role: 'TECHNICIAN',
      isActive: true,
    })
  })

  it('zmiana imienia przekazywana do onSubmit', async () => {
    render(<EditUserModal isOpen={true} onClose={mockOnClose} onSubmit={mockOnSubmit} user={mockUser} />)
    fireEvent.change(screen.getByLabelText('Imię i nazwisko'), { target: { value: 'Nowe Imię' } })
    await act(async () => {
      fireEvent.click(screen.getByText('Zapisz zmiany'))
    })
    expect(mockOnSubmit).toHaveBeenCalledWith(expect.objectContaining({ name: 'Nowe Imię' }))
  })

  it('zmiana roli przekazywana do onSubmit', async () => {
    render(<EditUserModal isOpen={true} onClose={mockOnClose} onSubmit={mockOnSubmit} user={mockUser} />)
    fireEvent.change(screen.getByLabelText('Rola'), { target: { value: 'MANAGER' } })
    await act(async () => {
      fireEvent.click(screen.getByText('Zapisz zmiany'))
    })
    expect(mockOnSubmit).toHaveBeenCalledWith(expect.objectContaining({ role: 'MANAGER' }))
  })

  it('odznaczenie checkbox isActive przekazywane do onSubmit', async () => {
    render(<EditUserModal isOpen={true} onClose={mockOnClose} onSubmit={mockOnSubmit} user={mockUser} />)
    fireEvent.click(screen.getByRole('checkbox'))
    await act(async () => {
      fireEvent.click(screen.getByText('Zapisz zmiany'))
    })
    expect(mockOnSubmit).toHaveBeenCalledWith(expect.objectContaining({ isActive: false }))
  })

  it('wyświetla stan ładowania "Zapisywanie..."', () => {
    mockOnSubmit.mockReturnValue(new Promise(() => {}))
    render(<EditUserModal isOpen={true} onClose={mockOnClose} onSubmit={mockOnSubmit} user={mockUser} />)
    act(() => {
      fireEvent.click(screen.getByText('Zapisz zmiany'))
    })
    expect(screen.getByText('Zapisywanie...')).toBeInTheDocument()
  })

  it('wyświetla błąd zwrócony przez onSubmit', async () => {
    mockOnSubmit.mockRejectedValue(new Error('Błąd zapisu'))
    render(<EditUserModal isOpen={true} onClose={mockOnClose} onSubmit={mockOnSubmit} user={mockUser} />)
    await act(async () => {
      fireEvent.click(screen.getByText('Zapisz zmiany'))
    })
    expect(screen.getByText('Błąd zapisu')).toBeInTheDocument()
  })

  it('pre-wypełnia dane gdy user jest nieaktywny', () => {
    const inactiveUser = { ...mockUser, isActive: false }
    render(<EditUserModal isOpen={true} onClose={mockOnClose} onSubmit={mockOnSubmit} user={inactiveUser} />)
    expect(screen.getByRole('checkbox')).not.toBeChecked()
  })
})
