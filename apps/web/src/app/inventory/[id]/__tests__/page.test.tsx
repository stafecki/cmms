import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import Cookies from 'js-cookie'
import EditPartPage from '../page'

vi.mock('js-cookie', () => ({
  default: { get: vi.fn() },
}))

const mockPush = vi.fn()
const mockBack = vi.fn()
const mockRefresh = vi.fn()
vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: mockPush, back: mockBack, refresh: mockRefresh }),
  useParams: () => ({ id: 'part-123' }),
}))

const mockedFetch = vi.fn()
vi.stubGlobal('fetch', mockedFetch)

const mockedCookiesGet = vi.mocked(Cookies.get) as any

const mockPart = { name: 'Śruba M8', categoryId: 'cat-1', stockQuantity: 10, unitPrice: 2.5 }
const mockCategories = [{ id: 'cat-1', name: 'Złączniki' }, { id: 'cat-2', name: 'Nakrętki' }]

const makeLoadFetch = () => {
  mockedFetch
    .mockResolvedValueOnce({ ok: true, json: async () => mockPart })
    .mockResolvedValueOnce({ ok: true, json: async () => mockCategories })
}

describe('EditPartPage', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockedCookiesGet.mockReturnValue('token')
  })

  describe('stan ładowania', () => {
    it('wyświetla Wczytywanie... przed załadowaniem danych', () => {
      mockedFetch.mockReturnValue(new Promise(() => {}))
      render(<EditPartPage />)
      expect(screen.getByText('Wczytywanie...')).toBeInTheDocument()
    })
  })

  describe('formularz po załadowaniu', () => {
    it('renderuje nagłówek Edytuj Zasób', async () => {
      makeLoadFetch()
      render(<EditPartPage />)
      expect(await screen.findByText('Edytuj')).toBeInTheDocument()
    })

    it('wypełnia pole nazwy danymi z API', async () => {
      makeLoadFetch()
      render(<EditPartPage />)
      await screen.findByText('Edytuj')
      expect(screen.getByDisplayValue('Śruba M8')).toBeInTheDocument()
    })

    it('renderuje opcje kategorii', async () => {
      makeLoadFetch()
      render(<EditPartPage />)
      await screen.findByText('Edytuj')
      expect(screen.getByRole('option', { name: 'Złączniki' })).toBeInTheDocument()
      expect(screen.getByRole('option', { name: 'Nakrętki' })).toBeInTheDocument()
    })

    it('renderuje przycisk Zapisz zmiany', async () => {
      makeLoadFetch()
      render(<EditPartPage />)
      await screen.findByText('Edytuj')
      expect(screen.getByRole('button', { name: 'Zapisz zmiany' })).toBeInTheDocument()
    })

    it('renderuje przycisk Usuń przedmiot', async () => {
      makeLoadFetch()
      render(<EditPartPage />)
      await screen.findByText('Edytuj')
      expect(screen.getByRole('button', { name: 'Usuń przedmiot' })).toBeInTheDocument()
    })

    it('renderuje przycisk Anuluj', async () => {
      makeLoadFetch()
      render(<EditPartPage />)
      await screen.findByText('Edytuj')
      expect(screen.getByRole('button', { name: 'Anuluj' })).toBeInTheDocument()
    })
  })

  describe('wybór nowej kategorii', () => {
    it('wybranie opcji NEW pokazuje input nowej kategorii', async () => {
      makeLoadFetch()
      render(<EditPartPage />)
      await screen.findByText('Edytuj')
      fireEvent.change(screen.getByRole('combobox'), { target: { value: 'NEW' } })
      expect(screen.getByPlaceholderText('Wpisz nazwę nowej kategorii...')).toBeInTheDocument()
    })

    it('kliknięcie Cofnij ukrywa input nowej kategorii', async () => {
      makeLoadFetch()
      render(<EditPartPage />)
      await screen.findByText('Edytuj')
      fireEvent.change(screen.getByRole('combobox'), { target: { value: 'NEW' } })
      fireEvent.click(screen.getByRole('button', { name: 'Cofnij' }))
      expect(screen.queryByPlaceholderText('Wpisz nazwę nowej kategorii...')).not.toBeInTheDocument()
    })
  })

  describe('zapis zmian', () => {
    it('wywołuje PATCH /inventory/parts/:id', async () => {
      makeLoadFetch()
      render(<EditPartPage />)
      await screen.findByText('Edytuj')
      mockedFetch.mockResolvedValue({ ok: true })
      fireEvent.submit(screen.getByRole('button', { name: 'Zapisz zmiany' }).closest('form')!)
      await waitFor(() => {
        expect(mockedFetch).toHaveBeenCalledWith(
          'http://localhost:3000/inventory/parts/part-123',
          expect.objectContaining({ method: 'PATCH' }),
        )
      })
    })

    it('przekierowuje do /inventory po pomyślnym zapisie', async () => {
      makeLoadFetch()
      render(<EditPartPage />)
      await screen.findByText('Edytuj')
      mockedFetch.mockResolvedValue({ ok: true })
      fireEvent.submit(screen.getByRole('button', { name: 'Zapisz zmiany' }).closest('form')!)
      await waitFor(() => expect(mockPush).toHaveBeenCalledWith('/inventory'))
    })
  })

  describe('usuwanie', () => {
    it('wywołuje DELETE /inventory/parts/:id po potwierdzeniu', async () => {
      makeLoadFetch()
      vi.spyOn(window, 'confirm').mockReturnValue(true)
      render(<EditPartPage />)
      await screen.findByText('Edytuj')
      mockedFetch.mockResolvedValue({ ok: true })
      fireEvent.click(screen.getByRole('button', { name: 'Usuń przedmiot' }))
      await waitFor(() => {
        expect(mockedFetch).toHaveBeenCalledWith(
          'http://localhost:3000/inventory/parts/part-123',
          expect.objectContaining({ method: 'DELETE' }),
        )
      })
    })

    it('nie wywołuje DELETE gdy użytkownik anuluje potwierdzenie', async () => {
      makeLoadFetch()
      vi.spyOn(window, 'confirm').mockReturnValue(false)
      render(<EditPartPage />)
      await screen.findByText('Edytuj')
      fireEvent.click(screen.getByRole('button', { name: 'Usuń przedmiot' }))
      expect(mockedFetch).not.toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({ method: 'DELETE' }),
      )
    })
  })

  describe('nawigacja', () => {
    it('kliknięcie Anuluj wywołuje router.back', async () => {
      makeLoadFetch()
      render(<EditPartPage />)
      await screen.findByText('Edytuj')
      fireEvent.click(screen.getByRole('button', { name: 'Anuluj' }))
      expect(mockBack).toHaveBeenCalledTimes(1)
    })
  })
})
