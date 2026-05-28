import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { SearchBar } from '../SearchBar'

describe('SearchBar', () => {
  it('renderuje pole tekstowe z domyślnym placeholderem', () => {
    render(<SearchBar value="" onChange={vi.fn()} />)
    expect(screen.getByPlaceholderText('Szukaj...')).toBeInTheDocument()
  })

  it('renderuje pole tekstowe z podanym placeholderem', () => {
    render(<SearchBar value="" onChange={vi.fn()} placeholder="Szukaj maszyn..." />)
    expect(screen.getByPlaceholderText('Szukaj maszyn...')).toBeInTheDocument()
  })

  it('wyświetla podaną wartość', () => {
    render(<SearchBar value="pompa" onChange={vi.fn()} />)
    expect(screen.getByDisplayValue('pompa')).toBeInTheDocument()
  })

  it('wywołuje onChange po wpisaniu tekstu', () => {
    const mockOnChange = vi.fn()
    render(<SearchBar value="" onChange={mockOnChange} />)
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'turbina' } })
    expect(mockOnChange).toHaveBeenCalledWith('turbina')
  })

  it('nie renderuje przycisku Filtry gdy showFilterToggle=false', () => {
    render(<SearchBar value="" onChange={vi.fn()} showFilterToggle={false} onToggleFilters={vi.fn()} />)
    expect(screen.queryByText('Filtry')).not.toBeInTheDocument()
  })

  it('renderuje przycisk Filtry gdy showFilterToggle=true i onToggleFilters podany', () => {
    render(<SearchBar value="" onChange={vi.fn()} showFilterToggle={true} onToggleFilters={vi.fn()} />)
    expect(screen.getByText('Filtry')).toBeInTheDocument()
  })

  it('wywołuje onToggleFilters po kliknięciu przycisku Filtry', () => {
    const mockToggle = vi.fn()
    render(<SearchBar value="" onChange={vi.fn()} showFilterToggle={true} onToggleFilters={mockToggle} />)
    fireEvent.click(screen.getByText('Filtry'))
    expect(mockToggle).toHaveBeenCalledTimes(1)
  })
})
