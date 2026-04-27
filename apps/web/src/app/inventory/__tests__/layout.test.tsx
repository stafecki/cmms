import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import Cookies from 'js-cookie'
import InventoryLayout from '../layout'

vi.mock('js-cookie', () => ({
  default: { get: vi.fn() },
}))

const mockPush = vi.fn()
vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: mockPush }),
}))

const mockedCookiesGet = vi.mocked(Cookies.get) as any

describe('InventoryLayout', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('niezalogowany', () => {
    beforeEach(() => {
      mockedCookiesGet.mockReturnValue(undefined)
    })

    it('wyświetla ekran weryfikacji uprawnień', () => {
      render(<InventoryLayout><div /></InventoryLayout>)
      expect(screen.getByText('Weryfikacja uprawnień...')).toBeInTheDocument()
    })

    it('wywołuje router.push do /auth/login gdy brak tokenów', async () => {
      render(<InventoryLayout><div /></InventoryLayout>)
      await vi.waitFor(() => {
        expect(mockPush).toHaveBeenCalledWith('/auth/login')
      })
    })

    it('nie renderuje children', () => {
      render(<InventoryLayout><div data-testid="child" /></InventoryLayout>)
      expect(screen.queryByTestId('child')).not.toBeInTheDocument()
    })
  })

  describe('zalogowany', () => {
    it('renderuje children gdy accessToken istnieje', async () => {
      mockedCookiesGet.mockImplementation((key: string) =>
        key === 'accessToken' ? 'access-token' : undefined,
      )
      render(<InventoryLayout><div data-testid="child" /></InventoryLayout>)
      expect(await screen.findByTestId('child')).toBeInTheDocument()
    })

    it('renderuje children gdy refreshToken istnieje', async () => {
      mockedCookiesGet.mockImplementation((key: string) =>
        key === 'refreshToken' ? 'refresh-token' : undefined,
      )
      render(<InventoryLayout><div data-testid="child" /></InventoryLayout>)
      expect(await screen.findByTestId('child')).toBeInTheDocument()
    })

    it('nie wywołuje push gdy token istnieje', async () => {
      mockedCookiesGet.mockReturnValue('token')
      render(<InventoryLayout><div data-testid="child" /></InventoryLayout>)
      await screen.findByTestId('child')
      expect(mockPush).not.toHaveBeenCalled()
    })
  })
})
