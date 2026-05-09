import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import Cookies from 'js-cookie'
import AuthBtn from '../authBtn'

vi.mock('js-cookie', () => ({
  default: { get: vi.fn() },
}))

vi.mock('next/link', () => ({
  default: ({ href, children, ...props }: any) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}))

const mockedCookiesGet = vi.mocked(Cookies.get) as any

describe('AuthBtn', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('niezalogowany', () => {
    beforeEach(() => {
      mockedCookiesGet.mockReturnValue(undefined)
    })

    it('sprawdza ciasteczko refreshToken', () => {
      render(<AuthBtn />)
      expect(mockedCookiesGet).toHaveBeenCalledWith('refreshToken')
    })

    it('renderuje link Zaloguj do /auth/login', () => {
      render(<AuthBtn />)
      const link = screen.getByRole('link', { name: 'Zaloguj' })
      expect(link).toHaveAttribute('href', '/auth/login')
    })

    it('nie renderuje linku Wyloguj', () => {
      render(<AuthBtn />)
      expect(screen.queryByRole('link', { name: 'Wyloguj' })).not.toBeInTheDocument()
    })
  })

  describe('zalogowany', () => {
    beforeEach(() => {
      mockedCookiesGet.mockReturnValue('some-token')
    })

    it('renderuje link Wyloguj do /auth/logout', () => {
      render(<AuthBtn />)
      const link = screen.getByRole('link', { name: 'Wyloguj' })
      expect(link).toHaveAttribute('href', '/auth/logout')
    })

    it('nie renderuje linku Zaloguj', () => {
      render(<AuthBtn />)
      expect(screen.queryByRole('link', { name: 'Zaloguj' })).not.toBeInTheDocument()
    })
  })
})
