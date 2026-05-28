import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useAuth } from '@/context/AuthContext'
import AuthBtn from '../authBtn'

vi.mock('@/context/AuthContext', () => ({
  useAuth: vi.fn(),
}))

vi.mock('next/link', () => ({
  default: ({ href, children, ...props }: any) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}))

const mockedUseAuth = vi.mocked(useAuth)

describe('AuthBtn', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('niezalogowany', () => {
    beforeEach(() => {
      mockedUseAuth.mockReturnValue({ user: null, isLoading: false, logout: vi.fn() })
    })

    it('renderuje link Zaloguj do /auth/login', () => {
      render(<AuthBtn />)
      const link = screen.getByRole('link', { name: 'Zaloguj' })
      expect(link).toHaveAttribute('href', '/auth/login')
    })

    it('nie renderuje przycisku Wyloguj', () => {
      render(<AuthBtn />)
      expect(screen.queryByRole('button', { name: 'Wyloguj' })).not.toBeInTheDocument()
    })
  })

  describe('zalogowany', () => {
    beforeEach(() => {
      mockedUseAuth.mockReturnValue({
        user: { id: '1', name: 'Test', email: 'test@test.com', role: 'ADMIN' },
        isLoading: false,
        logout: vi.fn(),
      })
    })

    it('renderuje przycisk Wyloguj', () => {
      render(<AuthBtn />)
      expect(screen.getByRole('button', { name: 'Wyloguj' })).toBeInTheDocument()
    })

    it('nie renderuje linku Zaloguj', () => {
      render(<AuthBtn />)
      expect(screen.queryByRole('link', { name: 'Zaloguj' })).not.toBeInTheDocument()
    })
  })
})
