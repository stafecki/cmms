import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { FilterPanel, FilterGroup } from '../FilterPanel'

describe('FilterPanel', () => {
  it('renderuje dzieci', () => {
    render(<FilterPanel onReset={vi.fn()}><span>Filtr treści</span></FilterPanel>)
    expect(screen.getByText('Filtr treści')).toBeInTheDocument()
  })

  it('renderuje przycisk Resetuj filtry', () => {
    render(<FilterPanel onReset={vi.fn()}><span /></FilterPanel>)
    expect(screen.getByText('Resetuj filtry')).toBeInTheDocument()
  })

  it('wywołuje onReset po kliknięciu przycisku', () => {
    const mockOnReset = vi.fn()
    render(<FilterPanel onReset={mockOnReset}><span /></FilterPanel>)
    fireEvent.click(screen.getByText('Resetuj filtry'))
    expect(mockOnReset).toHaveBeenCalledTimes(1)
  })
})

describe('FilterGroup', () => {
  it('renderuje etykietę', () => {
    render(<FilterGroup label="Kategoria"><input /></FilterGroup>)
    expect(screen.getByText('Kategoria')).toBeInTheDocument()
  })

  it('renderuje dzieci', () => {
    render(<FilterGroup label="Kategoria"><input data-testid="input" /></FilterGroup>)
    expect(screen.getByTestId('input')).toBeInTheDocument()
  })
})
