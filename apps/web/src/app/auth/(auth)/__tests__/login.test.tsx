import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import Cookies from 'js-cookie'
import Login from '../login/page'

vi.mock('js-cookie', () => ({
  default: { get: vi.fn(), set: vi.fn() },
}))

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn() }),
}))

const mockedFetch = vi.fn()
vi.stubGlobal('fetch', mockedFetch)

const mockedCookiesSet = vi.mocked(Cookies.set)

describe('Login', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    localStorage.clear()
  })

  describe('renderowanie', () => {
    it('renderuje nagłówek formularza', () => {
      render(<Login />)
      expect(screen.getByRole('heading', { name: 'Zaloguj' })).toBeInTheDocument()
    })

    it('renderuje pole email', () => {
      render(<Login />)
      expect(screen.getByLabelText('Email:')).toBeInTheDocument()
    })

    it('renderuje pole hasła', () => {
      render(<Login />)
      expect(screen.getByLabelText('Hasło:')).toBeInTheDocument()
    })

    it('renderuje przycisk submit z tekstem Zaloguj', () => {
      render(<Login />)
      expect(screen.getByRole('button', { name: 'Zaloguj' })).toBeInTheDocument()
    })

    it('renderuje link do rejestracji', () => {
      render(<Login />)
      expect(screen.getByRole('link', { name: 'Zarejestruj się' })).toHaveAttribute('href', '/auth/register')
    })

    it('nie renderuje błędu na początku', () => {
      render(<Login />)
      expect(screen.queryByRole('alert')).not.toBeInTheDocument()
    })
  })

  describe('stan ładowania', () => {
    it('wyświetla Logowanie... i blokuje pola podczas wysyłania', async () => {
      mockedFetch.mockReturnValue(new Promise(() => {}))
      render(<Login />)
      fireEvent.submit(screen.getByRole('button').closest('form')!)
      await waitFor(() => {
        expect(screen.getByRole('button')).toHaveTextContent('Logowanie...')
        expect(screen.getByLabelText('Email:')).toBeDisabled()
        expect(screen.getByLabelText('Hasło:')).toBeDisabled()
        expect(screen.getByRole('button')).toBeDisabled()
      })
    })
  })

  describe('pomyślne logowanie', () => {
    beforeEach(() => {
      mockedFetch.mockResolvedValue({
        ok: true,
        json: async () => ({
          tokens: {
            accessToken: 'access-123',
            refreshToken: 'refresh-123',
          },
          user: { id: '1', email: 'test@test.com' },
        }),
      })
    })

    it('ustawia ciasteczko accessToken', async () => {
      render(<Login />)
      fireEvent.submit(screen.getByRole('button').closest('form')!)
      await waitFor(() => {
        expect(mockedCookiesSet).toHaveBeenCalledWith(
          'accessToken',
          'access-123',
          expect.objectContaining({ secure: true }),
        )
      })
    })

    it('ustawia ciasteczko refreshToken', async () => {
      render(<Login />)
      fireEvent.submit(screen.getByRole('button').closest('form')!)
      await waitFor(() => {
        expect(mockedCookiesSet).toHaveBeenCalledWith(
          'refreshToken',
          'refresh-123',
          expect.objectContaining({ secure: true }),
        )
      })
    })

    it('zapisuje dane użytkownika w localStorage', async () => {
      render(<Login />)
      fireEvent.submit(screen.getByRole('button').closest('form')!)
      await waitFor(() => {
        expect(localStorage.getItem('user')).toBe(
          JSON.stringify({ id: '1', email: 'test@test.com' }),
        )
      })
    })
  })

  describe('błąd logowania', () => {
    it('wyświetla komunikat błędu z API', async () => {
      mockedFetch.mockResolvedValue({
        ok: false,
        json: async () => ({ message: 'Nieprawidłowe hasło' }),
      })
      render(<Login />)
      fireEvent.submit(screen.getByRole('button').closest('form')!)
      expect(await screen.findByText('Nieprawidłowe hasło')).toBeInTheDocument()
    })

    it('wyświetla domyślny komunikat gdy brak message z API', async () => {
      mockedFetch.mockResolvedValue({
        ok: false,
        json: async () => ({}),
      })
      render(<Login />)
      fireEvent.submit(screen.getByRole('button').closest('form')!)
      expect(await screen.findByText('Błąd logowania')).toBeInTheDocument()
    })
  })
})
