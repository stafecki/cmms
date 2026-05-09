import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import Cookies from 'js-cookie'
import Navbar from '../navbar'

vi.mock('js-cookie', () => ({
  default: { get: vi.fn() },
}))

vi.mock('../loggedInView', () => ({
  default: ({ onOpenSidebar }: any) => (
    <div data-testid="logged-in-view" onClick={onOpenSidebar} />
  ),
}))

vi.mock('../loggedOutView', () => ({
  default: () => <div data-testid="logged-out-view" />,
}))

vi.mock('../../sidebar/sidebar', () => ({
  default: ({ isOpen, onClose }: any) => (
    <div data-testid="sidebar" data-open={String(isOpen)} onClick={onClose} />
  ),
}))

const mockedCookiesGet = vi.mocked(Cookies.get) as any

describe('Navbar', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('niezalogowany', () => {
    beforeEach(() => {
      mockedCookiesGet.mockReturnValue(undefined)
    })

    it('sprawdza ciasteczko refreshToken', () => {
      render(<Navbar />)
      expect(mockedCookiesGet).toHaveBeenCalledWith('refreshToken')
    })

    it('renderuje LoggedOutView', () => {
      render(<Navbar />)
      expect(screen.getByTestId('logged-out-view')).toBeInTheDocument()
    })

    it('nie renderuje LoggedInView ani Sidebar', () => {
      render(<Navbar />)
      expect(screen.queryByTestId('logged-in-view')).not.toBeInTheDocument()
      expect(screen.queryByTestId('sidebar')).not.toBeInTheDocument()
    })
  })

  describe('zalogowany', () => {
    beforeEach(() => {
      mockedCookiesGet.mockReturnValue('some-token')
    })

    it('renderuje LoggedInView', () => {
      render(<Navbar />)
      expect(screen.getByTestId('logged-in-view')).toBeInTheDocument()
    })

    it('renderuje zamknięty Sidebar', () => {
      render(<Navbar />)
      expect(screen.getByTestId('sidebar')).toHaveAttribute('data-open', 'false')
    })

    it('nie renderuje LoggedOutView', () => {
      render(<Navbar />)
      expect(screen.queryByTestId('logged-out-view')).not.toBeInTheDocument()
    })
  })

  describe('interakcje', () => {
    beforeEach(() => {
      mockedCookiesGet.mockReturnValue('some-token')
    })

    it('onOpenSidebar z LoggedInView otwiera Sidebar', () => {
      render(<Navbar />)
      fireEvent.click(screen.getByTestId('logged-in-view'))
      expect(screen.getByTestId('sidebar')).toHaveAttribute('data-open', 'true')
    })

    it('onClose z Sidebar zamyka Sidebar', () => {
      render(<Navbar />)
      fireEvent.click(screen.getByTestId('logged-in-view'))
      fireEvent.click(screen.getByTestId('sidebar'))
      expect(screen.getByTestId('sidebar')).toHaveAttribute('data-open', 'false')
    })
  })
})
