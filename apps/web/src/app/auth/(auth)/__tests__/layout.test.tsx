import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import Cookies from 'js-cookie'
import AuthLayout from '../layout'

vi.mock('js-cookie', () => ({
  default: { get: vi.fn() },
}))

vi.mock('next/link', () => ({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  default: ({ href, children, ...props }: any) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}))

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mockedCookiesGet = vi.mocked(Cookies.get) as any

describe('AuthLayout', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('niezalogowany', () => {
    beforeEach(() => {
      mockedCookiesGet.mockReturnValue(undefined)
    })

    it('renderuje children po sprawdzeniu autoryzacji', async () => {
      render(<AuthLayout><div data-testid="child">children</div></AuthLayout>)
      expect(await screen.findByTestId('child')).toBeInTheDocument()
    })

    it('nie renderuje komunikatu o aktywnej sesji', async () => {
      render(<AuthLayout>children</AuthLayout>)
      await screen.findByText('children')
      expect(screen.queryByText('Jesteś już zalogowany')).not.toBeInTheDocument()
    })
  })

  describe('zalogowany', () => {
    beforeEach(() => {
      mockedCookiesGet.mockReturnValue('some-token')
    })

    it('sprawdza ciasteczko refreshToken', async () => {
      render(<AuthLayout>children</AuthLayout>)
      await screen.findByText('Jesteś już zalogowany')
      expect(mockedCookiesGet).toHaveBeenCalledWith('refreshToken')
    })

    it('renderuje komunikat o aktywnej sesji', async () => {
      render(<AuthLayout>children</AuthLayout>)
      expect(await screen.findByText('Jesteś już zalogowany')).toBeInTheDocument()
    })

    it('renderuje link do panelu głównego', async () => {
      render(<AuthLayout>children</AuthLayout>)
      await screen.findByText('Jesteś już zalogowany')
      expect(screen.getByRole('link', { name: 'Przejdź do panelu' })).toHaveAttribute('href', '/dashboard')
    })

    it('renderuje link do wylogowania', async () => {
      render(<AuthLayout>children</AuthLayout>)
      await screen.findByText('Jesteś już zalogowany')
      expect(screen.getByRole('link', { name: 'Wyloguj się' })).toHaveAttribute('href', '/auth/logout')
    })

    it('nie renderuje children', async () => {
      render(<AuthLayout><div data-testid="child">children</div></AuthLayout>)
      await screen.findByText('Jesteś już zalogowany')
      expect(screen.queryByTestId('child')).not.toBeInTheDocument()
    })
  })
})
