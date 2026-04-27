import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { InventoryFilters } from '../../components/InventoryFilters'

const defaultProps = {
  categories: [
    { id: 'cat-1', name: 'Złączniki' },
    { id: 'cat-2', name: 'Nakrętki' },
  ],
  filterCategory: '',
  setFilterCategory: vi.fn(),
  priceFrom: '' as number | '',
  setPriceFrom: vi.fn(),
  priceTo: '' as number | '',
  setPriceTo: vi.fn(),
  minStock: 0,
  setMinStock: vi.fn(),
  resetFilters: vi.fn(),
}

describe('InventoryFilters', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('renderowanie', () => {
    it('renderuje label Kategoria', () => {
      render(<InventoryFilters {...defaultProps} />)
      expect(screen.getByText('Kategoria')).toBeInTheDocument()
    })

    it('renderuje opcję Wszystkie kategorie', () => {
      render(<InventoryFilters {...defaultProps} />)
      expect(screen.getByRole('option', { name: 'Wszystkie kategorie' })).toBeInTheDocument()
    })

    it('renderuje opcje kategorii', () => {
      render(<InventoryFilters {...defaultProps} />)
      expect(screen.getByRole('option', { name: 'Złączniki' })).toBeInTheDocument()
      expect(screen.getByRole('option', { name: 'Nakrętki' })).toBeInTheDocument()
    })

    it('renderuje inputy ceny Od i Do', () => {
      render(<InventoryFilters {...defaultProps} />)
      expect(screen.getByPlaceholderText('Od')).toBeInTheDocument()
      expect(screen.getByPlaceholderText('Do')).toBeInTheDocument()
    })

    it('renderuje suwak minimalnej ilości', () => {
      render(<InventoryFilters {...defaultProps} />)
      expect(screen.getByRole('slider')).toBeInTheDocument()
    })

    it('renderuje przycisk Resetuj filtry', () => {
      render(<InventoryFilters {...defaultProps} />)
      expect(screen.getByRole('button', { name: 'Resetuj filtry' })).toBeInTheDocument()
    })
  })

  describe('interakcje', () => {
    it('zmiana kategorii wywołuje setFilterCategory', () => {
      render(<InventoryFilters {...defaultProps} />)
      fireEvent.change(screen.getByRole('combobox'), { target: { value: 'cat-1' } })
      expect(defaultProps.setFilterCategory).toHaveBeenCalledWith('cat-1')
    })

    it('zmiana inputu Od wywołuje setPriceFrom z liczbą', () => {
      render(<InventoryFilters {...defaultProps} />)
      fireEvent.change(screen.getByPlaceholderText('Od'), { target: { value: '10' } })
      expect(defaultProps.setPriceFrom).toHaveBeenCalledWith(10)
    })

    it('zmiana inputu Do wywołuje setPriceTo z liczbą', () => {
      render(<InventoryFilters {...defaultProps} />)
      fireEvent.change(screen.getByPlaceholderText('Do'), { target: { value: '50' } })
      expect(defaultProps.setPriceTo).toHaveBeenCalledWith(50)
    })

    it('zmiana suwaka wywołuje setMinStock', () => {
      render(<InventoryFilters {...defaultProps} />)
      fireEvent.change(screen.getByRole('slider'), { target: { value: '20' } })
      expect(defaultProps.setMinStock).toHaveBeenCalledWith(20)
    })

    it('kliknięcie Resetuj filtry wywołuje resetFilters', () => {
      render(<InventoryFilters {...defaultProps} />)
      fireEvent.click(screen.getByRole('button', { name: 'Resetuj filtry' }))
      expect(defaultProps.resetFilters).toHaveBeenCalledTimes(1)
    })
  })
})
