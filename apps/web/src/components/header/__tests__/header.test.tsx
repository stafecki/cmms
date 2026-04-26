import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import Cookies from 'js-cookie'
import Header from '../header'

vi.mock('js-cookie', () => ({
  default: { get: vi.fn() },
}))

vi.mock('../../navbar/index', () => ({
  default: () => <div data-testid="navbar" />,
}))

vi.mock('../../authBtn/index', () => ({
  default: () => <div data-testid="auth-btn" />,
}))

vi.mock('../../sidebar/sidebar', () => ({
  default: ({ isOpen, onClose }: any) => (
    <div data-testid="sidebar" data-open={String(isOpen)} onClick={onClose} />
  ),
}))

vi.mock('next/link', () => ({
  default: ({ href, children, ...props }: any) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}))

const mockedCookiesGet = vi.mocked(Cookies.get) as any

describe('Header', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('niezalogowany', () => {
    beforeEach(() => {
      mockedCookiesGet.mockReturnValue(undefined)
    })

    it('sprawdza ciasteczko refreshToken', () => {
      render(<Header />)
      expect(mockedCookiesGet).toHaveBeenCalledWith('refreshToken')
    })

    it('renderuje tekst CMMS bez linka', () => {
      render(<Header />)
      expect(screen.getByText('CMMS')).toBeInTheDocument()
      expect(screen.queryByRole('link')).not.toBeInTheDocument()
    })

    it('renderuje Navbar', () => {
      render(<Header />)
      expect(screen.getByTestId('navbar')).toBeInTheDocument()
    })

    it('renderuje AuthBtn', () => {
      render(<Header />)
      expect(screen.getByTestId('auth-btn')).toBeInTheDocument()
    })

    it('nie renderuje burgera ani Sidebar', () => {
      const { container } = render(<Header />)
      expect(container.querySelectorAll('span')).toHaveLength(0)
      expect(screen.queryByTestId('sidebar')).not.toBeInTheDocument()
    })
  })

  describe('zalogowany', () => {
    beforeEach(() => {
      mockedCookiesGet.mockReturnValue('some-token')
    })

    it('renderuje logo jako link do /dashboard', () => {
      render(<Header />)
      const link = screen.getByRole('link')
      expect(link).toHaveAttribute('href', '/dashboard')
      expect(link).toHaveTextContent('CMMS')
    })

    it('renderuje burger z trzema spanami', () => {
      const { container } = render(<Header />)
      expect(container.querySelectorAll('span')).toHaveLength(3)
    })

    it('renderuje AuthBtn', () => {
      render(<Header />)
      expect(screen.getByTestId('auth-btn')).toBeInTheDocument()
    })

    it('nie renderuje Navbar', () => {
      render(<Header />)
      expect(screen.queryByTestId('navbar')).not.toBeInTheDocument()
    })

    it('renderuje Sidebar jako zamknięty', () => {
      render(<Header />)
      expect(screen.getByTestId('sidebar')).toHaveAttribute('data-open', 'false')
    })
  })

  describe('interakcje', () => {
    beforeEach(() => {
      mockedCookiesGet.mockReturnValue('some-token')
    })

    it('kliknięcie burgera otwiera Sidebar', () => {
      const { container } = render(<Header />)
      const burgerSpan = container.querySelector('span')!
      fireEvent.click(burgerSpan.parentElement!)
      expect(screen.getByTestId('sidebar')).toHaveAttribute('data-open', 'true')
    })

    it('wywołanie onClose zamyka Sidebar', () => {
      const { container } = render(<Header />)
      fireEvent.click(container.querySelector('span')!.parentElement!)
      fireEvent.click(screen.getByTestId('sidebar'))
      expect(screen.getByTestId('sidebar')).toHaveAttribute('data-open', 'false')
    })
  })
})
