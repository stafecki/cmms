import { render, screen, fireEvent, act } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import AddCertificationModal from '../AddCertificationModal'

const mockOnClose = vi.fn()
const mockOnSubmit = vi.fn()

describe('AddCertificationModal', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockOnSubmit.mockResolvedValue(undefined)
  })

  it('zwraca null gdy isOpen=false', () => {
    render(<AddCertificationModal isOpen={false} onClose={mockOnClose} onSubmit={mockOnSubmit} />)
    expect(screen.queryByText('Dodaj Certyfikat')).not.toBeInTheDocument()
  })

  it('wyświetla tytuł "Dodaj Certyfikat"', () => {
    render(<AddCertificationModal isOpen={true} onClose={mockOnClose} onSubmit={mockOnSubmit} />)
    expect(screen.getByText('Dodaj Certyfikat')).toBeInTheDocument()
  })

  it('domyślnie wybrany typ to FORKLIFT', () => {
    render(<AddCertificationModal isOpen={true} onClose={mockOnClose} onSubmit={mockOnSubmit} />)
    expect(screen.getByDisplayValue('Wózki widłowe')).toBeInTheDocument()
  })

  it('domyślna data wydania to dzisiejsza data', () => {
    const today = new Date().toISOString().split('T')[0]
    render(<AddCertificationModal isOpen={true} onClose={mockOnClose} onSubmit={mockOnSubmit} />)
    expect(screen.getByLabelText('Data wydania')).toHaveValue(today)
  })

  it('wyświetla wszystkie typy certyfikatów', () => {
    render(<AddCertificationModal isOpen={true} onClose={mockOnClose} onSubmit={mockOnSubmit} />)
    expect(screen.getByText('Wózki widłowe')).toBeInTheDocument()
    expect(screen.getByText('Uprawnienia SEP')).toBeInTheDocument()
    expect(screen.getByText('UDS')).toBeInTheDocument()
    expect(screen.getByText('Suwnice')).toBeInTheDocument()
    expect(screen.getByText('Pierwsza Pomoc')).toBeInTheDocument()
    expect(screen.getByText('BHP')).toBeInTheDocument()
  })

  it('Anuluj wywołuje onClose', () => {
    render(<AddCertificationModal isOpen={true} onClose={mockOnClose} onSubmit={mockOnSubmit} />)
    fireEvent.click(screen.getByText('Anuluj'))
    expect(mockOnClose).toHaveBeenCalledTimes(1)
  })

  it('wyświetla błąd gdy data wygaśnięcia nie jest po dacie wydania', async () => {
    render(<AddCertificationModal isOpen={true} onClose={mockOnClose} onSubmit={mockOnSubmit} />)
    fireEvent.change(screen.getByLabelText('Data wydania'), { target: { value: '2024-06-01' } })
    fireEvent.change(screen.getByLabelText('Data wygaśnięcia'), { target: { value: '2024-06-01' } })
    await act(async () => {
      fireEvent.click(screen.getByText('Dodaj certyfikat'))
    })
    expect(screen.getByText('Data wygaśnięcia musi być po dacie wydania (Expiry date must be after issue date).')).toBeInTheDocument()
    expect(mockOnSubmit).not.toHaveBeenCalled()
  })

  it('wywołuje onSubmit z poprawnymi danymi ISO', async () => {
    render(<AddCertificationModal isOpen={true} onClose={mockOnClose} onSubmit={mockOnSubmit} />)
    fireEvent.change(screen.getByLabelText('Typ certyfikatu'), { target: { value: 'SEP' } })
    fireEvent.change(screen.getByLabelText('Data wydania'), { target: { value: '2024-01-01' } })
    fireEvent.change(screen.getByLabelText('Data wygaśnięcia'), { target: { value: '2025-01-01' } })
    await act(async () => {
      fireEvent.click(screen.getByText('Dodaj certyfikat'))
    })
    expect(mockOnSubmit).toHaveBeenCalledWith({
      type: 'SEP',
      issuedAt: new Date('2024-01-01').toISOString(),
      expiresAt: new Date('2025-01-01').toISOString(),
    })
  })

  it('wywołuje onClose po pomyślnym zapisie', async () => {
    render(<AddCertificationModal isOpen={true} onClose={mockOnClose} onSubmit={mockOnSubmit} />)
    fireEvent.change(screen.getByLabelText('Data wydania'), { target: { value: '2024-01-01' } })
    fireEvent.change(screen.getByLabelText('Data wygaśnięcia'), { target: { value: '2025-01-01' } })
    await act(async () => {
      fireEvent.click(screen.getByText('Dodaj certyfikat'))
    })
    expect(mockOnClose).toHaveBeenCalledTimes(1)
  })

  it('wyświetla stan ładowania "Dodawanie..."', () => {
    mockOnSubmit.mockReturnValue(new Promise(() => {}))
    render(<AddCertificationModal isOpen={true} onClose={mockOnClose} onSubmit={mockOnSubmit} />)
    fireEvent.change(screen.getByLabelText('Data wydania'), { target: { value: '2024-01-01' } })
    fireEvent.change(screen.getByLabelText('Data wygaśnięcia'), { target: { value: '2025-01-01' } })
    act(() => {
      fireEvent.click(screen.getByText('Dodaj certyfikat'))
    })
    expect(screen.getByText('Dodawanie...')).toBeInTheDocument()
  })

  it('wyświetla błąd zwrócony przez onSubmit', async () => {
    mockOnSubmit.mockRejectedValue(new Error('Błąd API'))
    render(<AddCertificationModal isOpen={true} onClose={mockOnClose} onSubmit={mockOnSubmit} />)
    fireEvent.change(screen.getByLabelText('Data wydania'), { target: { value: '2024-01-01' } })
    fireEvent.change(screen.getByLabelText('Data wygaśnięcia'), { target: { value: '2025-01-01' } })
    await act(async () => {
      fireEvent.click(screen.getByText('Dodaj certyfikat'))
    })
    expect(screen.getByText('Błąd API')).toBeInTheDocument()
  })

  it('zmiana typu certyfikatu', () => {
    render(<AddCertificationModal isOpen={true} onClose={mockOnClose} onSubmit={mockOnSubmit} />)
    fireEvent.change(screen.getByLabelText('Typ certyfikatu'), { target: { value: 'CRANE' } })
    expect(screen.getByDisplayValue('Suwnice')).toBeInTheDocument()
  })
})
