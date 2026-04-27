import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { LowStockPanel } from '../../components/LowStockPanel'
import { Part } from '../../types'

vi.mock('next/link', () => ({
  default: ({ href, children, ...props }: any) => (
    <a href={href} {...props}>{children}</a>
  ),
}))

const makePart = (overrides: Partial<Part> = {}): Part => ({
  id: '1',
  name: 'Śruba M8',
  qrCode: 'QR-001',
  stockQuantity: 2,
  reorderPoint: 5,
  unitPrice: 2.5,
  category: { id: 'cat-1', name: 'Złączniki' },
  ...overrides,
})

describe('LowStockPanel', () => {
  const onClose = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('pusta lista', () => {
    it('renderuje nagłówek z liczbą 0', () => {
      render(<LowStockPanel parts={[]} onClose={onClose} />)
      expect(screen.getByText('Krytyczny stan magazynowy (0)')).toBeInTheDocument()
    })

    it('renderuje komunikat o normie', () => {
      render(<LowStockPanel parts={[]} onClose={onClose} />)
      expect(screen.getByText('Wszystkie stany są w normie.')).toBeInTheDocument()
    })
  })

  describe('lista z częściami', () => {
    const parts = [
      makePart({ id: '1', name: 'Śruba M8', stockQuantity: 2, reorderPoint: 5 }),
      makePart({ id: '2', name: 'Nakrętka M6', stockQuantity: 1, reorderPoint: 10 }),
    ]

    it('renderuje nagłówek z poprawną liczbą', () => {
      render(<LowStockPanel parts={parts} onClose={onClose} />)
      expect(screen.getByText('Krytyczny stan magazynowy (2)')).toBeInTheDocument()
    })

    it('renderuje nazwy części', () => {
      render(<LowStockPanel parts={parts} onClose={onClose} />)
      expect(screen.getByText('Śruba M8')).toBeInTheDocument()
      expect(screen.getByText('Nakrętka M6')).toBeInTheDocument()
    })

    it('renderuje stan magazynowy i reorderPoint', () => {
      render(<LowStockPanel parts={parts} onClose={onClose} />)
      expect(screen.getByText('2')).toBeInTheDocument()
      expect(screen.getByText(/min: 5/)).toBeInTheDocument()
    })

    it('renderuje linki Zamów / Edytuj do właściwych ścieżek', () => {
      render(<LowStockPanel parts={parts} onClose={onClose} />)
      const links = screen.getAllByRole('link', { name: 'Zamów / Edytuj' })
      expect(links[0]).toHaveAttribute('href', '/inventory/1')
      expect(links[1]).toHaveAttribute('href', '/inventory/2')
    })

    it('nie renderuje komunikatu o normie gdy są części', () => {
      render(<LowStockPanel parts={parts} onClose={onClose} />)
      expect(screen.queryByText('Wszystkie stany są w normie.')).not.toBeInTheDocument()
    })
  })

  describe('interakcje', () => {
    it('kliknięcie przycisku zamknięcia wywołuje onClose', () => {
      render(<LowStockPanel parts={[]} onClose={onClose} />)
      fireEvent.click(screen.getByRole('button'))
      expect(onClose).toHaveBeenCalledTimes(1)
    })
  })
})
