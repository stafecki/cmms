import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import Cookies from 'js-cookie'
import { InventoryModal } from '../../components/InventoryModal'

vi.mock('js-cookie', () => ({
  default: { get: vi.fn() },
}))

const mockedFetch = vi.fn()
vi.stubGlobal('fetch', mockedFetch)

const mockedCookiesGet = vi.mocked(Cookies.get) as any

const categories = [
  { id: 'cat-1', name: 'Złączniki' },
  { id: 'cat-2', name: 'Nakrętki' },
]

describe('InventoryModal', () => {
  const onClose = vi.fn()
  const onSuccess = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
    mockedCookiesGet.mockReturnValue('token')
  })

  describe('renderowanie', () => {
    it('renderuje nagłówek Nowy Przedmiot', () => {
      render(<InventoryModal categories={categories} onClose={onClose} onSuccess={onSuccess} />)
      expect(screen.getByText('Nowy')).toBeInTheDocument()
      expect(screen.getByText('Przedmiot')).toBeInTheDocument()
    })

    it('renderuje pole Nazwa', () => {
      render(<InventoryModal categories={categories} onClose={onClose} onSuccess={onSuccess} />)
      expect(screen.getByText('Nazwa')).toBeInTheDocument()
    })

    it('renderuje opcje kategorii', () => {
      render(<InventoryModal categories={categories} onClose={onClose} onSuccess={onSuccess} />)
      expect(screen.getByRole('option', { name: 'Złączniki' })).toBeInTheDocument()
      expect(screen.getByRole('option', { name: 'Nakrętki' })).toBeInTheDocument()
    })

    it('renderuje przyciski Anuluj i Zatwierdź', () => {
      render(<InventoryModal categories={categories} onClose={onClose} onSuccess={onSuccess} />)
      expect(screen.getByRole('button', { name: 'Anuluj' })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'Zatwierdź' })).toBeInTheDocument()
    })
  })

  describe('interakcje', () => {
    it('kliknięcie Anuluj wywołuje onClose', () => {
      render(<InventoryModal categories={categories} onClose={onClose} onSuccess={onSuccess} />)
      fireEvent.click(screen.getByRole('button', { name: 'Anuluj' }))
      expect(onClose).toHaveBeenCalledTimes(1)
    })

    it('kod QR jest zapisywany jako uppercase', () => {
      render(<InventoryModal categories={categories} onClose={onClose} onSuccess={onSuccess} />)
      const qrInput = screen.getByDisplayValue('QR-')
      fireEvent.change(qrInput, { target: { value: 'qr-abc' } })
      expect(qrInput).toHaveValue('QR-ABC')
    })
  })

  describe('wysyłanie formularza', () => {
    it('wywołuje POST /inventory/parts', async () => {
      mockedFetch.mockResolvedValue({ ok: true })
      render(<InventoryModal categories={categories} onClose={onClose} onSuccess={onSuccess} />)
      fireEvent.submit(screen.getByRole('button', { name: 'Zatwierdź' }).closest('form')!)
      await waitFor(() => {
        expect(mockedFetch).toHaveBeenCalledWith(
          'http://localhost:3000/inventory/parts',
          expect.objectContaining({ method: 'POST' }),
        )
      })
    })

    it('wywołuje onSuccess i onClose po pomyślnym dodaniu', async () => {
      mockedFetch.mockResolvedValue({ ok: true })
      render(<InventoryModal categories={categories} onClose={onClose} onSuccess={onSuccess} />)
      fireEvent.submit(screen.getByRole('button', { name: 'Zatwierdź' }).closest('form')!)
      await waitFor(() => {
        expect(onSuccess).toHaveBeenCalledTimes(1)
        expect(onClose).toHaveBeenCalledTimes(1)
      })
    })

    it('nie wywołuje onSuccess gdy fetch zwróci błąd', async () => {
      mockedFetch.mockResolvedValue({ ok: false })
      render(<InventoryModal categories={categories} onClose={onClose} onSuccess={onSuccess} />)
      fireEvent.submit(screen.getByRole('button', { name: 'Zatwierdź' }).closest('form')!)
      await waitFor(() => expect(mockedFetch).toHaveBeenCalled())
      expect(onSuccess).not.toHaveBeenCalled()
    })
  })
})
