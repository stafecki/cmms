import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import Register from '../register/page'

const mockedFetch = vi.fn()
vi.stubGlobal('fetch', mockedFetch)

describe('Register', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('renderowanie', () => {
    it('renderuje nagłówek formularza', () => {
      render(<Register />)
      expect(screen.getByRole('heading', { name: 'Zarejestruj' })).toBeInTheDocument()
    })

    it('renderuje pole email', () => {
      render(<Register />)
      expect(screen.getByLabelText('Email:')).toBeInTheDocument()
    })

    it('renderuje pole nazwy użytkownika', () => {
      render(<Register />)
      expect(screen.getByLabelText('Nazwa użytkownika (Imię i Nazwisko):')).toBeInTheDocument()
    })

    it('renderuje pole hasła', () => {
      render(<Register />)
      expect(screen.getByLabelText('Hasło:')).toBeInTheDocument()
    })

    it('renderuje pole powtórzenia hasła', () => {
      render(<Register />)
      expect(screen.getByLabelText('Powtórz hasło:')).toBeInTheDocument()
    })

    it('renderuje przycisk submit z tekstem Zarejestruj', () => {
      render(<Register />)
      expect(screen.getByRole('button', { name: 'Zarejestruj' })).toBeInTheDocument()
    })

    it('renderuje link do logowania', () => {
      render(<Register />)
      expect(screen.getByRole('link', { name: 'Zaloguj się' })).toHaveAttribute('href', '/auth/login')
    })
  })

  describe('walidacja haseł', () => {
    it('wyświetla błąd gdy hasła się nie zgadzają', async () => {
      render(<Register />)
      fireEvent.change(screen.getByLabelText('Hasło:'), { target: { value: 'haslo123' } })
      fireEvent.change(screen.getByLabelText('Powtórz hasło:'), { target: { value: 'inne123' } })
      fireEvent.submit(screen.getByRole('button').closest('form')!)
      expect(await screen.findByText('Hasła nie są jendakowe')).toBeInTheDocument()
    })

    it('nie wywołuje fetch gdy hasła się nie zgadzają', async () => {
      render(<Register />)
      fireEvent.change(screen.getByLabelText('Hasło:'), { target: { value: 'haslo123' } })
      fireEvent.change(screen.getByLabelText('Powtórz hasło:'), { target: { value: 'inne123' } })
      fireEvent.submit(screen.getByRole('button').closest('form')!)
      await screen.findByText('Hasła nie są jendakowe')
      expect(mockedFetch).not.toHaveBeenCalled()
    })
  })

  describe('stan ładowania', () => {
    it('wyświetla Rejestrowanie... podczas wysyłania', async () => {
      mockedFetch.mockReturnValue(new Promise(() => {}))
      render(<Register />)
      fireEvent.change(screen.getByLabelText('Hasło:'), { target: { value: 'haslo123' } })
      fireEvent.change(screen.getByLabelText('Powtórz hasło:'), { target: { value: 'haslo123' } })
      fireEvent.submit(screen.getByRole('button').closest('form')!)
      await waitFor(() => {
        expect(screen.getByRole('button')).toHaveTextContent('Rejestrowanie...')
        expect(screen.getByRole('button')).toBeDisabled()
      })
    })
  })

  describe('błąd rejestracji', () => {
    it('wyświetla komunikat błędu z API', async () => {
      mockedFetch.mockResolvedValue({
        ok: false,
        json: async () => ({ message: 'Email już istnieje' }),
      })
      render(<Register />)
      fireEvent.change(screen.getByLabelText('Hasło:'), { target: { value: 'haslo123' } })
      fireEvent.change(screen.getByLabelText('Powtórz hasło:'), { target: { value: 'haslo123' } })
      fireEvent.submit(screen.getByRole('button').closest('form')!)
      expect(await screen.findByText('Email już istnieje')).toBeInTheDocument()
    })

    it('wyświetla błąd połączenia przy wyjątku fetch', async () => {
      mockedFetch.mockRejectedValue(new Error('Network error'))
      render(<Register />)
      fireEvent.change(screen.getByLabelText('Hasło:'), { target: { value: 'haslo123' } })
      fireEvent.change(screen.getByLabelText('Powtórz hasło:'), { target: { value: 'haslo123' } })
      fireEvent.submit(screen.getByRole('button').closest('form')!)
      expect(await screen.findByText('Problem z połączeniem z serwerem')).toBeInTheDocument()
    })
  })
})
