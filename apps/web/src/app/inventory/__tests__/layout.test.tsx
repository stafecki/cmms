import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useAuth } from '@/context/AuthContext'
import InventoryLayout from '../layout'

vi.mock('@/context/AuthContext', () => ({
  useAuth: vi.fn(),
}))

const mockedUseAuth = vi.mocked(useAuth)

describe('InventoryLayout', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('ładowanie', () => {
    beforeEach(() => {
      mockedUseAuth.mockReturnValue({ user: null, isLoading: true, logout: vi.fn() })
    })

    it('wyświetla ekran weryfikacji uprawnień', () => {
      render(<InventoryLayout><div /></InventoryLayout>)
      expect(screen.getByText('Weryfikacja uprawnień...')).toBeInTheDocument()
    })

    it('nie renderuje children podczas ładowania', () => {
      render(<InventoryLayout><div data-testid="child" /></InventoryLayout>)
      expect(screen.queryByTestId('child')).not.toBeInTheDocument()
    })
  })

  describe('niezalogowany', () => {
    beforeEach(() => {
      mockedUseAuth.mockReturnValue({ user: null, isLoading: false, logout: vi.fn() })
    })

    it('nie renderuje children gdy brak użytkownika', () => {
      render(<InventoryLayout><div data-testid="child" /></InventoryLayout>)
      expect(screen.queryByTestId('child')).not.toBeInTheDocument()
    })
  })

  describe('zalogowany', () => {
    it('renderuje children gdy użytkownik jest zalogowany', async () => {
      mockedUseAuth.mockReturnValue({
        user: { id: '1', name: 'Test', email: 'test@test.com', role: 'OPERATOR' },
        isLoading: false,
        logout: vi.fn(),
      })
      render(<InventoryLayout><div data-testid="child" /></InventoryLayout>)
      expect(await screen.findByTestId('child')).toBeInTheDocument()
    })

    it('nie wywołuje przekierowania gdy użytkownik istnieje', async () => {
      mockedUseAuth.mockReturnValue({
        user: { id: '1', name: 'Test', email: 'test@test.com', role: 'ADMIN' },
        isLoading: false,
        logout: vi.fn(),
      })
      render(<InventoryLayout><div data-testid="child" /></InventoryLayout>)
      expect(await screen.findByTestId('child')).toBeInTheDocument()
    })
  })
})
