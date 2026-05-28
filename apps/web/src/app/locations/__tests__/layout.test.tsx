import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useAuth } from '@/context/AuthContext'
import LocationsLayout from '../layout'

vi.mock('@/context/AuthContext', () => ({
  useAuth: vi.fn(),
}))

const mockedUseAuth = vi.mocked(useAuth)

describe('LocationsLayout', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('ładowanie', () => {
    beforeEach(() => {
      mockedUseAuth.mockReturnValue({ user: null, isLoading: true, logout: vi.fn() })
    })

    it('wyświetla ekran weryfikacji uprawnień', () => {
      render(<LocationsLayout><div /></LocationsLayout>)
      expect(screen.getByText('Weryfikacja uprawnień...')).toBeInTheDocument()
    })

    it('nie renderuje children podczas ładowania', () => {
      render(<LocationsLayout><div data-testid="child" /></LocationsLayout>)
      expect(screen.queryByTestId('child')).not.toBeInTheDocument()
    })
  })

  describe('niezalogowany', () => {
    beforeEach(() => {
      mockedUseAuth.mockReturnValue({ user: null, isLoading: false, logout: vi.fn() })
    })

    it('nie renderuje children gdy brak użytkownika', () => {
      render(<LocationsLayout><div data-testid="child" /></LocationsLayout>)
      expect(screen.queryByTestId('child')).not.toBeInTheDocument()
    })
  })

  describe('zalogowany', () => {
    it('renderuje children gdy użytkownik jest zalogowany', () => {
      mockedUseAuth.mockReturnValue({
        user: { id: '1', name: 'Test', email: 'test@test.com', role: 'OPERATOR' },
        isLoading: false,
        logout: vi.fn(),
      })
      render(<LocationsLayout><div data-testid="child" /></LocationsLayout>)
      expect(screen.getByTestId('child')).toBeInTheDocument()
    })
  })
})
