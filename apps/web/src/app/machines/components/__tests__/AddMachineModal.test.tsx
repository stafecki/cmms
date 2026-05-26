import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { createMachine } from '../../machines.api'
import { locationsApi } from '../../../locations/locations.api'
import AddMachineModal from '../AddMachineModal'

vi.mock('../../machines.api', () => ({
  createMachine: vi.fn(),
}))

vi.mock('../../../locations/locations.api', () => ({
  locationsApi: {
    getAll: vi.fn(),
  },
}))

const mockLocations = [
  { id: 'loc-1', name: 'Hala A', type: 'HALL', parentId: null },
  { id: 'loc-2', name: 'Hala B', type: 'HALL', parentId: null },
]

const defaultProps = {
  isOpen: true,
  onClose: vi.fn(),
  onSuccess: vi.fn(),
}

const newMachine = {
  id: 'new-1',
  name: 'Tokarka',
  serialNumber: 'SN-NEW',
  locationId: 'loc-1',
  operatingHours: 0,
  purchaseDate: '2024-01-01',
  purchasePrice: 10000,
  isActive: true,
  createdAt: '',
  updatedAt: '',
}

describe('AddMachineModal', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(locationsApi.getAll).mockResolvedValue(mockLocations)
  })

  describe('widoczność', () => {
    it('nie renderuje gdy isOpen=false', () => {
      render(<AddMachineModal {...defaultProps} isOpen={false} />)
      expect(screen.queryByRole('heading')).not.toBeInTheDocument()
    })

    it('renderuje gdy isOpen=true', async () => {
      render(<AddMachineModal {...defaultProps} />)
      expect(screen.getByRole('heading', { name: 'Nowa Maszyna' })).toBeInTheDocument()
    })
  })

  describe('formularz', () => {
    it('renderuje pole nazwy maszyny', () => {
      render(<AddMachineModal {...defaultProps} />)
      expect(screen.getByLabelText('Nazwa maszyny')).toBeInTheDocument()
    })

    it('renderuje pole numeru seryjnego', () => {
      render(<AddMachineModal {...defaultProps} />)
      expect(screen.getByLabelText('Numer seryjny')).toBeInTheDocument()
    })

    it('renderuje select lokalizacji z opcjami z API', async () => {
      render(<AddMachineModal {...defaultProps} />)
      expect(await screen.findByRole('option', { name: 'Hala A' })).toBeInTheDocument()
      expect(screen.getByRole('option', { name: 'Hala B' })).toBeInTheDocument()
    })

    it('renderuje pole daty zakupu', () => {
      render(<AddMachineModal {...defaultProps} />)
      expect(screen.getByLabelText('Data zakupu')).toBeInTheDocument()
    })

    it('renderuje pole ceny zakupu', () => {
      render(<AddMachineModal {...defaultProps} />)
      expect(screen.getByLabelText('Cena zakupu (PLN)')).toBeInTheDocument()
    })

    it('renderuje select statusu z domyślną wartością Aktywna', () => {
      render(<AddMachineModal {...defaultProps} />)
      const statusSelect = screen.getByLabelText('Status')
      expect((statusSelect as HTMLSelectElement).value).toBe('1')
    })

    it('renderuje przyciski Anuluj i Utwórz maszynę', () => {
      render(<AddMachineModal {...defaultProps} />)
      expect(screen.getByRole('button', { name: 'Anuluj' })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'Utwórz maszynę' })).toBeInTheDocument()
    })
  })

  describe('interakcje', () => {
    it('kliknięcie Anuluj wywołuje onClose', () => {
      render(<AddMachineModal {...defaultProps} />)
      fireEvent.click(screen.getByRole('button', { name: 'Anuluj' }))
      expect(defaultProps.onClose).toHaveBeenCalledTimes(1)
    })

    it('kliknięcie overlay wywołuje onClose', () => {
      const { container } = render(<AddMachineModal {...defaultProps} />)
      fireEvent.click(container.firstChild as HTMLElement)
      expect(defaultProps.onClose).toHaveBeenCalledTimes(1)
    })

    it('kliknięcie treści modala nie wywołuje onClose', () => {
      render(<AddMachineModal {...defaultProps} />)
      fireEvent.click(screen.getByRole('heading'))
      expect(defaultProps.onClose).not.toHaveBeenCalled()
    })
  })

  describe('wysyłanie formularza', () => {
    const fillForm = () => {
      fireEvent.change(screen.getByLabelText('Nazwa maszyny'), { target: { value: 'Tokarka' } })
      fireEvent.change(screen.getByLabelText('Numer seryjny'), { target: { value: 'SN-NEW' } })
      fireEvent.change(screen.getByLabelText('Data zakupu'), { target: { value: '2024-01-01' } })
      fireEvent.change(screen.getByLabelText('Cena zakupu (PLN)'), { target: { value: '10000' } })
    }

    it('wywołuje createMachine z danymi formularza', async () => {
      vi.mocked(createMachine).mockResolvedValue(newMachine)
      render(<AddMachineModal {...defaultProps} />)
      await screen.findByRole('option', { name: 'Hala A' })
      fillForm()
      fireEvent.change(screen.getByLabelText('Lokalizacja'), { target: { value: 'loc-1' } })
      fireEvent.submit(screen.getByRole('button', { name: 'Utwórz maszynę' }).closest('form')!)
      await waitFor(() =>
        expect(createMachine).toHaveBeenCalledWith(
          expect.objectContaining({ name: 'Tokarka', serialNumber: 'SN-NEW', locationId: 'loc-1' })
        )
      )
    })

    it('wywołuje onSuccess i onClose po pomyślnym dodaniu', async () => {
      vi.mocked(createMachine).mockResolvedValue(newMachine)
      render(<AddMachineModal {...defaultProps} />)
      await screen.findByRole('option', { name: 'Hala A' })
      fillForm()
      fireEvent.change(screen.getByLabelText('Lokalizacja'), { target: { value: 'loc-1' } })
      fireEvent.submit(screen.getByRole('button', { name: 'Utwórz maszynę' }).closest('form')!)
      await waitFor(() => {
        expect(defaultProps.onSuccess).toHaveBeenCalledWith(newMachine)
        expect(defaultProps.onClose).toHaveBeenCalledTimes(1)
      })
    })

    it('wyświetla Tworzenie... podczas wysyłania', async () => {
      vi.mocked(createMachine).mockReturnValue(new Promise(() => {}))
      render(<AddMachineModal {...defaultProps} />)
      await screen.findByRole('option', { name: 'Hala A' })
      fillForm()
      fireEvent.submit(screen.getByRole('button', { name: 'Utwórz maszynę' }).closest('form')!)
      expect(await screen.findByRole('button', { name: 'Tworzenie...' })).toBeDisabled()
    })

    it('wyświetla błąd gdy API zwróci błąd', async () => {
      vi.mocked(createMachine).mockRejectedValue(new Error('Błąd serwera'))
      render(<AddMachineModal {...defaultProps} />)
      await screen.findByRole('option', { name: 'Hala A' })
      fillForm()
      fireEvent.submit(screen.getByRole('button', { name: 'Utwórz maszynę' }).closest('form')!)
      expect(await screen.findByText('Błąd serwera')).toBeInTheDocument()
    })

    it('nie wywołuje onClose gdy API zwróci błąd', async () => {
      vi.mocked(createMachine).mockRejectedValue(new Error('Błąd'))
      render(<AddMachineModal {...defaultProps} />)
      await screen.findByRole('option', { name: 'Hala A' })
      fillForm()
      fireEvent.submit(screen.getByRole('button', { name: 'Utwórz maszynę' }).closest('form')!)
      await waitFor(() => expect(screen.getByText('Błąd')).toBeInTheDocument())
      expect(defaultProps.onClose).not.toHaveBeenCalled()
    })
  })
})
