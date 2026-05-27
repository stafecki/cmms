import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { CategoriesPanel } from '../CategoriesPanel'
import { Category } from '../../types'

const mockOnDelete = vi.fn()
const mockOnClose = vi.fn()

const sampleCategories: Category[] = [
  { id: 'c1', name: 'Złączki' },
  { id: 'c2', name: 'Narzędzia' },
  { id: 'c3', name: 'Elektronika' },
]

describe('CategoriesPanel', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('wyświetla nagłówek z liczbą kategorii', () => {
    render(<CategoriesPanel categories={sampleCategories} onDelete={mockOnDelete} onClose={mockOnClose} />)
    expect(screen.getByText('Zarządzaj kategoriami (3)')).toBeInTheDocument()
  })

  it('wyświetla "Brak kategorii." gdy lista pusta', () => {
    render(<CategoriesPanel categories={[]} onDelete={mockOnDelete} onClose={mockOnClose} />)
    expect(screen.getByText('Brak kategorii.')).toBeInTheDocument()
    expect(screen.getByText('Zarządzaj kategoriami (0)')).toBeInTheDocument()
  })

  it('renderuje nazwy kategorii', () => {
    render(<CategoriesPanel categories={sampleCategories} onDelete={mockOnDelete} onClose={mockOnClose} />)
    expect(screen.getByText('Złączki')).toBeInTheDocument()
    expect(screen.getByText('Narzędzia')).toBeInTheDocument()
    expect(screen.getByText('Elektronika')).toBeInTheDocument()
  })

  it('renderuje przycisk Usuń dla każdej kategorii', () => {
    render(<CategoriesPanel categories={sampleCategories} onDelete={mockOnDelete} onClose={mockOnClose} />)
    expect(screen.getAllByText('Usuń')).toHaveLength(3)
  })

  it('przycisk × wywołuje onClose', () => {
    render(<CategoriesPanel categories={sampleCategories} onDelete={mockOnDelete} onClose={mockOnClose} />)
    fireEvent.click(screen.getByText('×'))
    expect(mockOnClose).toHaveBeenCalledTimes(1)
  })

  it('Usuń po potwierdzeniu wywołuje onDelete z id kategorii', () => {
    vi.spyOn(window, 'confirm').mockReturnValue(true)
    render(<CategoriesPanel categories={sampleCategories} onDelete={mockOnDelete} onClose={mockOnClose} />)
    fireEvent.click(screen.getAllByText('Usuń')[0])
    expect(mockOnDelete).toHaveBeenCalledWith('c1')
  })

  it('Usuń po anulowaniu nie wywołuje onDelete', () => {
    vi.spyOn(window, 'confirm').mockReturnValue(false)
    render(<CategoriesPanel categories={sampleCategories} onDelete={mockOnDelete} onClose={mockOnClose} />)
    fireEvent.click(screen.getAllByText('Usuń')[0])
    expect(mockOnDelete).not.toHaveBeenCalled()
  })

  it('confirm zawiera nazwę usuwanej kategorii', () => {
    const confirmSpy = vi.spyOn(window, 'confirm').mockReturnValue(false)
    render(<CategoriesPanel categories={sampleCategories} onDelete={mockOnDelete} onClose={mockOnClose} />)
    fireEvent.click(screen.getAllByText('Usuń')[1])
    expect(confirmSpy).toHaveBeenCalledWith(expect.stringContaining('Narzędzia'))
  })

  it('usunięcie drugiej kategorii wywołuje onDelete z jej id', () => {
    vi.spyOn(window, 'confirm').mockReturnValue(true)
    render(<CategoriesPanel categories={sampleCategories} onDelete={mockOnDelete} onClose={mockOnClose} />)
    fireEvent.click(screen.getAllByText('Usuń')[1])
    expect(mockOnDelete).toHaveBeenCalledWith('c2')
  })
})
