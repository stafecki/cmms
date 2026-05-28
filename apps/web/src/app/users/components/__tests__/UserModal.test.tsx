import { render, screen, fireEvent, act } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import UserModal from '../UserModal'
import { User } from '../../types'

const mockOnClose = vi.fn()
const mockOnSubmit = vi.fn()

const existingUser: User = {
  id: 'u1',
  name: 'Jan Kowalski',
  email: 'jan@test.com',
  role: 'TECHNICIAN',
  isActive: true,
  createdAt: '2024-01-01',
}

describe('UserModal', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockOnSubmit.mockResolvedValue(undefined)
  })

  it('zwraca null gdy isOpen=false', () => {
    render(<UserModal isOpen={false} onClose={mockOnClose} onSubmit={mockOnSubmit} />)
    expect(screen.queryByText('Dodaj Użytkownika')).not.toBeInTheDocument()
    expect(screen.queryByText('Edytuj Użytkownika')).not.toBeInTheDocument()
  })

  it('wyświetla tytuł "Dodaj Użytkownika" w trybie tworzenia', () => {
    render(<UserModal isOpen={true} onClose={mockOnClose} onSubmit={mockOnSubmit} />)
    expect(screen.getByText('Dodaj Użytkownika')).toBeInTheDocument()
  })

  it('wyświetla tytuł "Edytuj Użytkownika" w trybie edycji', () => {
    render(<UserModal isOpen={true} onClose={mockOnClose} onSubmit={mockOnSubmit} initialData={existingUser} />)
    expect(screen.getByText('Edytuj Użytkownika')).toBeInTheDocument()
  })

  it('tryb tworzenia: pole email jest aktywne i pole hasło jest widoczne', () => {
    render(<UserModal isOpen={true} onClose={mockOnClose} onSubmit={mockOnSubmit} />)
    expect(screen.getByLabelText('Email')).not.toBeDisabled()
    expect(screen.getByLabelText('Hasło')).toBeInTheDocument()
  })

  it('tryb edycji: email jest disabled, hasło ukryte, checkbox isActive widoczny', () => {
    render(<UserModal isOpen={true} onClose={mockOnClose} onSubmit={mockOnSubmit} initialData={existingUser} />)
    expect(screen.getByLabelText('Email')).toBeDisabled()
    expect(screen.queryByLabelText('Hasło')).not.toBeInTheDocument()
    expect(screen.getByLabelText('Konto aktywne')).toBeInTheDocument()
  })

  it('tryb edycji: pre-wypełnia pola z initialData', () => {
    render(<UserModal isOpen={true} onClose={mockOnClose} onSubmit={mockOnSubmit} initialData={existingUser} />)
    expect(screen.getByDisplayValue('Jan Kowalski')).toBeInTheDocument()
    expect(screen.getByDisplayValue('jan@test.com')).toBeInTheDocument()
    expect(screen.getByDisplayValue('Technician')).toBeInTheDocument()
  })

  it('Anuluj wywołuje onClose', () => {
    render(<UserModal isOpen={true} onClose={mockOnClose} onSubmit={mockOnSubmit} />)
    fireEvent.click(screen.getByText('Anuluj'))
    expect(mockOnClose).toHaveBeenCalledTimes(1)
  })

  it('tryb tworzenia: submit wywołuje onSubmit z CreateUserInput', async () => {
    render(<UserModal isOpen={true} onClose={mockOnClose} onSubmit={mockOnSubmit} />)
    fireEvent.change(screen.getByLabelText('Imię i nazwisko'), { target: { value: 'Nowy User' } })
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'nowy@test.com' } })
    fireEvent.change(screen.getByLabelText('Hasło'), { target: { value: 'Password1' } })
    await act(async () => {
      fireEvent.click(screen.getByText('Zapisz'))
    })
    expect(mockOnSubmit).toHaveBeenCalledWith({
      name: 'Nowy User',
      email: 'nowy@test.com',
      password: 'Password1',
      role: 'OPERATOR',
    })
  })

  it('tryb edycji: submit wywołuje onSubmit z UpdateUserInput', async () => {
    render(<UserModal isOpen={true} onClose={mockOnClose} onSubmit={mockOnSubmit} initialData={existingUser} />)
    fireEvent.change(screen.getByLabelText('Imię i nazwisko'), { target: { value: 'Zmienione Imię' } })
    await act(async () => {
      fireEvent.click(screen.getByText('Zapisz'))
    })
    expect(mockOnSubmit).toHaveBeenCalledWith({
      name: 'Zmienione Imię',
      role: 'TECHNICIAN',
      isActive: true,
    })
  })

  it('tryb edycji: zmiana roli przekazywana do onSubmit', async () => {
    render(<UserModal isOpen={true} onClose={mockOnClose} onSubmit={mockOnSubmit} initialData={existingUser} />)
    fireEvent.change(screen.getByLabelText('Rola'), { target: { value: 'MANAGER' } })
    await act(async () => {
      fireEvent.click(screen.getByText('Zapisz'))
    })
    expect(mockOnSubmit).toHaveBeenCalledWith(expect.objectContaining({ role: 'MANAGER' }))
  })

  it('wyświetla stan ładowania "Zapisywanie..."', () => {
    mockOnSubmit.mockReturnValue(new Promise(() => {}))
    render(<UserModal isOpen={true} onClose={mockOnClose} onSubmit={mockOnSubmit} initialData={existingUser} />)
    act(() => {
      fireEvent.click(screen.getByText('Zapisz'))
    })
    expect(screen.getByText('Zapisywanie...')).toBeInTheDocument()
  })

  it('wyświetla błąd zwrócony przez onSubmit', async () => {
    mockOnSubmit.mockRejectedValue(new Error('Błąd walidacji'))
    render(<UserModal isOpen={true} onClose={mockOnClose} onSubmit={mockOnSubmit} initialData={existingUser} />)
    await act(async () => {
      fireEvent.click(screen.getByText('Zapisz'))
    })
    expect(screen.getByText('Błąd walidacji')).toBeInTheDocument()
  })
})
