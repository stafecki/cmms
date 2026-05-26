import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { locationsApi } from '../../locations.api'
import { AddLocationModal } from '../AddLocationModal'

vi.mock('../../locations.api', () => ({
  locationsApi: {
    create: vi.fn(),
  },
}))

const defaultProps = {
  isOpen: true,
  onClose: vi.fn(),
  onSuccess: vi.fn(),
}

describe('AddLocationModal', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('widoczność', () => {
    it('nie renderuje gdy isOpen=false', () => {
      render(<AddLocationModal {...defaultProps} isOpen={false} />)
      expect(screen.queryByRole('heading')).not.toBeInTheDocument()
    })

    it('renderuje gdy isOpen=true', () => {
      render(<AddLocationModal {...defaultProps} />)
      expect(screen.getByRole('heading')).toBeInTheDocument()
    })
  })

  describe('nagłówek', () => {
    it('pokazuje "Nowa lokalizacja główna" gdy brak parentId', () => {
      render(<AddLocationModal {...defaultProps} />)
      expect(screen.getByRole('heading', { name: 'Nowa lokalizacja główna' })).toBeInTheDocument()
    })

    it('pokazuje "Dodaj podlokalizację" gdy parentId jest ustawiony', () => {
      render(<AddLocationModal {...defaultProps} parentId="parent-1" />)
      expect(screen.getByRole('heading', { name: 'Dodaj podlokalizację' })).toBeInTheDocument()
    })
  })

  describe('formularz', () => {
    it('renderuje pole nazwy', () => {
      render(<AddLocationModal {...defaultProps} />)
      expect(screen.getByPlaceholderText(/np\. Hala/)).toBeInTheDocument()
    })

    it('renderuje select typów z domyślną wartością HALL', () => {
      render(<AddLocationModal {...defaultProps} />)
      const select = screen.getByRole('combobox')
      expect(select).toBeInTheDocument()
      expect((select as HTMLSelectElement).value).toBe('HALL')
    })

    it('renderuje opcje typów lokalizacji', () => {
      render(<AddLocationModal {...defaultProps} />)
      expect(screen.getByRole('option', { name: 'Zakład / Fabryka' })).toBeInTheDocument()
      expect(screen.getByRole('option', { name: 'Hala produkcyjna' })).toBeInTheDocument()
      expect(screen.getByRole('option', { name: 'Linia / Sekcja' })).toBeInTheDocument()
      expect(screen.getByRole('option', { name: 'Stacja robocza' })).toBeInTheDocument()
    })

    it('renderuje przyciski Anuluj i Zatwierdź', () => {
      render(<AddLocationModal {...defaultProps} />)
      expect(screen.getByRole('button', { name: 'Anuluj' })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'Zatwierdź' })).toBeInTheDocument()
    })
  })

  describe('interakcje', () => {
    it('kliknięcie Anuluj wywołuje onClose', () => {
      render(<AddLocationModal {...defaultProps} />)
      fireEvent.click(screen.getByRole('button', { name: 'Anuluj' }))
      expect(defaultProps.onClose).toHaveBeenCalledTimes(1)
    })

    it('kliknięcie overlay wywołuje onClose', () => {
      const { container } = render(<AddLocationModal {...defaultProps} />)
      fireEvent.click(container.firstChild as HTMLElement)
      expect(defaultProps.onClose).toHaveBeenCalledTimes(1)
    })

    it('kliknięcie treści modala nie wywołuje onClose', () => {
      render(<AddLocationModal {...defaultProps} />)
      fireEvent.click(screen.getByRole('heading'))
      expect(defaultProps.onClose).not.toHaveBeenCalled()
    })
  })

  describe('wysyłanie formularza', () => {
    it('wywołuje locationsApi.create z danymi formularza', async () => {
      vi.mocked(locationsApi.create).mockResolvedValue({ id: 'new-1', name: 'Hala B', type: 'HALL' })
      render(<AddLocationModal {...defaultProps} />)
      fireEvent.change(screen.getByPlaceholderText(/np\. Hala/), { target: { value: 'Hala B' } })
      fireEvent.submit(screen.getByRole('button', { name: 'Zatwierdź' }).closest('form')!)
      await waitFor(() =>
        expect(locationsApi.create).toHaveBeenCalledWith({
          name: 'Hala B',
          type: 'HALL',
          parentId: null,
        })
      )
    })

    it('przekazuje parentId do locationsApi.create', async () => {
      vi.mocked(locationsApi.create).mockResolvedValue({})
      render(<AddLocationModal {...defaultProps} parentId="parent-123" />)
      fireEvent.change(screen.getByPlaceholderText(/np\. Hala/), { target: { value: 'Stacja X' } })
      fireEvent.submit(screen.getByRole('button', { name: 'Zatwierdź' }).closest('form')!)
      await waitFor(() =>
        expect(locationsApi.create).toHaveBeenCalledWith(
          expect.objectContaining({ parentId: 'parent-123' })
        )
      )
    })

    it('wywołuje onSuccess i onClose po pomyślnym dodaniu', async () => {
      vi.mocked(locationsApi.create).mockResolvedValue({})
      render(<AddLocationModal {...defaultProps} />)
      fireEvent.change(screen.getByPlaceholderText(/np\. Hala/), { target: { value: 'Hala B' } })
      fireEvent.submit(screen.getByRole('button', { name: 'Zatwierdź' }).closest('form')!)
      await waitFor(() => {
        expect(defaultProps.onSuccess).toHaveBeenCalledTimes(1)
        expect(defaultProps.onClose).toHaveBeenCalledTimes(1)
      })
    })

    it('wyświetla "Zapisywanie..." podczas wysyłania', async () => {
      vi.mocked(locationsApi.create).mockReturnValue(new Promise(() => {}))
      render(<AddLocationModal {...defaultProps} />)
      fireEvent.change(screen.getByPlaceholderText(/np\. Hala/), { target: { value: 'Hala B' } })
      fireEvent.submit(screen.getByRole('button', { name: 'Zatwierdź' }).closest('form')!)
      expect(await screen.findByRole('button', { name: 'Zapisywanie...' })).toBeDisabled()
    })

    it('wyświetla alert gdy API zwróci błąd', async () => {
      vi.mocked(locationsApi.create).mockRejectedValue(new Error('Błąd serwera'))
      vi.spyOn(window, 'alert').mockImplementation(() => {})
      render(<AddLocationModal {...defaultProps} />)
      fireEvent.change(screen.getByPlaceholderText(/np\. Hala/), { target: { value: 'Hala B' } })
      fireEvent.submit(screen.getByRole('button', { name: 'Zatwierdź' }).closest('form')!)
      await waitFor(() =>
        expect(window.alert).toHaveBeenCalledWith('Błąd serwera')
      )
    })

    it('nie wywołuje onClose gdy API zwróci błąd', async () => {
      vi.mocked(locationsApi.create).mockRejectedValue(new Error('Błąd'))
      vi.spyOn(window, 'alert').mockImplementation(() => {})
      render(<AddLocationModal {...defaultProps} />)
      fireEvent.change(screen.getByPlaceholderText(/np\. Hala/), { target: { value: 'Hala B' } })
      fireEvent.submit(screen.getByRole('button', { name: 'Zatwierdź' }).closest('form')!)
      await waitFor(() => expect(window.alert).toHaveBeenCalled())
      expect(defaultProps.onClose).not.toHaveBeenCalled()
    })
  })
})
