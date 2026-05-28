import { render, screen, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import Cookies from 'js-cookie'
import LogoutPage from '../page'

vi.mock('js-cookie', () => ({
  default: { get: vi.fn(), remove: vi.fn() },
}))

const mockedFetch = vi.fn()
vi.stubGlobal('fetch', mockedFetch)

const mockedCookiesGet = vi.mocked(Cookies.get) as any // eslint-disable-line @typescript-eslint/no-explicit-any
const mockedCookiesRemove = vi.mocked(Cookies.remove)

describe('LogoutPage', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    localStorage.clear()
  })

  it('renderuje tekst Wylogowywanie...', () => {
    mockedCookiesGet.mockReturnValue(undefined)
    mockedFetch.mockResolvedValue({ ok: true })
    render(<LogoutPage />)
    expect(screen.getByText('Wylogowywanie...')).toBeInTheDocument()
  })

  describe('z accessToken', () => {
    beforeEach(() => {
      mockedCookiesGet.mockReturnValue('access-123')
      mockedFetch.mockResolvedValue({ ok: true })
    })

    it('wywołuje POST /auth/logout z tokenem', async () => {
      render(<LogoutPage />)
      await waitFor(() => {
        expect(mockedFetch).toHaveBeenCalledWith(
          'http://localhost:3000/auth/logout',
          expect.objectContaining({
            method: 'POST',
            headers: { Authorization: 'Bearer access-123' },
          }),
        )
      })
    })

    it('usuwa ciasteczko accessToken', async () => {
      render(<LogoutPage />)
      await waitFor(() => {
        expect(mockedCookiesRemove).toHaveBeenCalledWith('accessToken')
      })
    })

    it('usuwa ciasteczko refreshToken', async () => {
      render(<LogoutPage />)
      await waitFor(() => {
        expect(mockedCookiesRemove).toHaveBeenCalledWith('refreshToken')
      })
    })

    it('usuwa dane użytkownika z localStorage', async () => {
      localStorage.setItem('user', JSON.stringify({ id: '1' }))
      render(<LogoutPage />)
      await waitFor(() => {
        expect(localStorage.getItem('user')).toBeNull()
      })
    })
  })

  describe('bez accessToken', () => {
    beforeEach(() => {
      mockedCookiesGet.mockReturnValue(undefined)
    })

    it('nie wywołuje fetch', async () => {
      render(<LogoutPage />)
      await waitFor(() => {
        expect(mockedCookiesRemove).toHaveBeenCalled()
      })
      expect(mockedFetch).not.toHaveBeenCalled()
    })

    it('nadal usuwa ciasteczka', async () => {
      render(<LogoutPage />)
      await waitFor(() => {
        expect(mockedCookiesRemove).toHaveBeenCalledWith('accessToken')
        expect(mockedCookiesRemove).toHaveBeenCalledWith('refreshToken')
      })
    })
  })

  describe('błąd fetch', () => {
    it('nadal usuwa ciasteczka gdy fetch rzuci wyjątek', async () => {
      mockedCookiesGet.mockReturnValue('access-123')
      mockedFetch.mockRejectedValue(new Error('Network error'))
      render(<LogoutPage />)
      await waitFor(() => {
        expect(mockedCookiesRemove).toHaveBeenCalledWith('accessToken')
        expect(mockedCookiesRemove).toHaveBeenCalledWith('refreshToken')
      })
    })
  })
})
