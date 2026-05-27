import { render, screen, fireEvent, act } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { AdjustStockModal } from '../AdjustStockModal'
import { Part } from '../../types'

vi.mock('js-cookie', () => ({
  default: { get: vi.fn().mockReturnValue('test-token') }
}))

const mockOnClose = vi.fn()
const mockOnSuccess = vi.fn()

const samplePart: Part = {
  id: 'p1',
  name: 'Śruba M8',
  qrCode: 'QR-001',
  stockQuantity: 10,
  reorderPoint: 3,
  unitPrice: 5,
  category: { id: 'c1', name: 'Złączki' },
}

describe('AdjustStockModal', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({}),
    })
  })

  it('wyświetla nazwę części w nagłówku', () => {
    render(<AdjustStockModal part={samplePart} onClose={mockOnClose} onSuccess={mockOnSuccess} />)
    expect(screen.getByText('Śruba M8')).toBeInTheDocument()
  })

  it('wyświetla aktualny stan magazynowy', () => {
    render(<AdjustStockModal part={samplePart} onClose={mockOnClose} onSuccess={mockOnSuccess} />)
    expect(screen.getByText('10 szt.')).toBeInTheDocument()
  })

  it('wyświetla podgląd nowego stanu po wpisaniu ilości', () => {
    render(<AdjustStockModal part={samplePart} onClose={mockOnClose} onSuccess={mockOnSuccess} />)
    fireEvent.change(screen.getByPlaceholderText('0'), { target: { value: '5' } })
    expect(screen.getByText(/Nowy stan: 15 szt\./)).toBeInTheDocument()
  })

  it('wyświetla ostrzeżenie gdy nowy stan byłby ujemny', () => {
    render(<AdjustStockModal part={samplePart} onClose={mockOnClose} onSuccess={mockOnSuccess} />)
    fireEvent.change(screen.getByPlaceholderText('0'), { target: { value: '-20' } })
    expect(screen.getByText(/wartość nie może być ujemna/)).toBeInTheDocument()
  })

  it('przycisk Zatwierdź jest wyłączony gdy nowy stan ujemny', () => {
    render(<AdjustStockModal part={samplePart} onClose={mockOnClose} onSuccess={mockOnSuccess} />)
    fireEvent.change(screen.getByPlaceholderText('0'), { target: { value: '-20' } })
    fireEvent.change(screen.getByPlaceholderText(/Inwentaryzacja/), { target: { value: 'Korekta stanu' } })
    expect(screen.getByText('Zatwierdź korektę')).toBeDisabled()
  })

  it('przycisk Zatwierdź jest wyłączony gdy powód ma mniej niż 3 znaki', () => {
    render(<AdjustStockModal part={samplePart} onClose={mockOnClose} onSuccess={mockOnSuccess} />)
    fireEvent.change(screen.getByPlaceholderText('0'), { target: { value: '5' } })
    fireEvent.change(screen.getByPlaceholderText(/Inwentaryzacja/), { target: { value: 'AB' } })
    expect(screen.getByText('Zatwierdź korektę')).toBeDisabled()
  })

  it('Anuluj wywołuje onClose', () => {
    render(<AdjustStockModal part={samplePart} onClose={mockOnClose} onSuccess={mockOnSuccess} />)
    fireEvent.click(screen.getByText('Anuluj'))
    expect(mockOnClose).toHaveBeenCalledTimes(1)
  })

  it('kliknięcie overlay wywołuje onClose', () => {
    render(<AdjustStockModal part={samplePart} onClose={mockOnClose} onSuccess={mockOnSuccess} />)
    fireEvent.click(screen.getByText('Koryguj stan:').closest('[class*="modalOverlay"]')!)
    expect(mockOnClose).toHaveBeenCalledTimes(1)
  })

  it('kliknięcie wewnątrz modala nie wywołuje onClose', () => {
    render(<AdjustStockModal part={samplePart} onClose={mockOnClose} onSuccess={mockOnSuccess} />)
    fireEvent.click(screen.getByText('Koryguj stan:').closest('[class*="modal"]')!)
    expect(mockOnClose).not.toHaveBeenCalled()
  })

  it('wywołuje fetch PATCH z poprawnymi danymi', async () => {
    render(<AdjustStockModal part={samplePart} onClose={mockOnClose} onSuccess={mockOnSuccess} />)
    fireEvent.change(screen.getByPlaceholderText('0'), { target: { value: '5' } })
    fireEvent.change(screen.getByPlaceholderText(/Inwentaryzacja/), { target: { value: 'Przyjęcie dostawy' } })
    await act(async () => {
      fireEvent.click(screen.getByText('Zatwierdź korektę'))
    })
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('/inventory/parts/p1/stock'),
      expect.objectContaining({
        method: 'PATCH',
        body: JSON.stringify({ quantity: 5, reason: 'Przyjęcie dostawy' }),
      })
    )
  })

  it('wywołuje onSuccess i onClose po pomyślnym zapisie', async () => {
    render(<AdjustStockModal part={samplePart} onClose={mockOnClose} onSuccess={mockOnSuccess} />)
    fireEvent.change(screen.getByPlaceholderText('0'), { target: { value: '5' } })
    fireEvent.change(screen.getByPlaceholderText(/Inwentaryzacja/), { target: { value: 'Przyjęcie dostawy' } })
    await act(async () => {
      fireEvent.click(screen.getByText('Zatwierdź korektę'))
    })
    expect(mockOnSuccess).toHaveBeenCalledTimes(1)
    expect(mockOnClose).toHaveBeenCalledTimes(1)
  })

  it('wyświetla stan ładowania "Zapisywanie..."', async () => {
    global.fetch = vi.fn().mockReturnValue(new Promise(() => {}))
    render(<AdjustStockModal part={samplePart} onClose={mockOnClose} onSuccess={mockOnSuccess} />)
    fireEvent.change(screen.getByPlaceholderText('0'), { target: { value: '5' } })
    fireEvent.change(screen.getByPlaceholderText(/Inwentaryzacja/), { target: { value: 'Przyjęcie dostawy' } })
    act(() => {
      fireEvent.click(screen.getByText('Zatwierdź korektę'))
    })
    expect(screen.getByText('Zapisywanie...')).toBeInTheDocument()
  })

  it('wyświetla błąd gdy API zwróci błąd', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      json: () => Promise.resolve({ message: 'Niewystarczający stan magazynowy' }),
    })
    render(<AdjustStockModal part={samplePart} onClose={mockOnClose} onSuccess={mockOnSuccess} />)
    fireEvent.change(screen.getByPlaceholderText('0'), { target: { value: '-5' } })
    fireEvent.change(screen.getByPlaceholderText(/Inwentaryzacja/), { target: { value: 'Test błędu' } })
    await act(async () => {
      fireEvent.click(screen.getByText('Zatwierdź korektę'))
    })
    expect(screen.getByText('Niewystarczający stan magazynowy')).toBeInTheDocument()
  })
})
