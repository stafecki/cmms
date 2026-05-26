import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { updateMachine } from '../../machines.api'
import EditMachineModal from '../EditMachineModal'
import { Machine } from '../../types'

vi.mock('../../machines.api', () => ({
  updateMachine: vi.fn(),
}))

const mockMachine: Machine = {
  id: 'machine-1',
  name: 'Tokarka CNC',
  serialNumber: 'SN-001',
  locationId: 'loc-1',
  operatingHours: 1200,
  purchaseDate: '2020-01-01',
  purchasePrice: 50000,
  isActive: true,
  createdAt: '',
  updatedAt: '',
}

const defaultProps = {
  isOpen: true,
  onClose: vi.fn(),
  onSuccess: vi.fn(),
  machine: mockMachine,
}

describe('EditMachineModal', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('widoczność', () => {
    it('nie renderuje gdy isOpen=false', () => {
      render(<EditMachineModal {...defaultProps} isOpen={false} />)
      expect(screen.queryByRole('heading')).not.toBeInTheDocument()
    })

    it('nie renderuje gdy machine=null', () => {
      render(<EditMachineModal {...defaultProps} machine={null} />)
      expect(screen.queryByRole('heading')).not.toBeInTheDocument()
    })

    it('renderuje gdy isOpen=true i machine jest podana', () => {
      render(<EditMachineModal {...defaultProps} />)
      expect(screen.getByRole('heading', { name: 'Edytuj Maszynę' })).toBeInTheDocument()
    })
  })

  describe('formularz', () => {
    it('wypełnia pole nazwy danymi maszyny', () => {
      render(<EditMachineModal {...defaultProps} />)
      expect(screen.getByDisplayValue('Tokarka CNC')).toBeInTheDocument()
    })

    it('wypełnia pole numeru seryjnego danymi maszyny', () => {
      render(<EditMachineModal {...defaultProps} />)
      expect(screen.getByDisplayValue('SN-001')).toBeInTheDocument()
    })

    it('ustawia domyślny status na Aktywna', () => {
      render(<EditMachineModal {...defaultProps} />)
      const select = screen.getByLabelText('Status')
      expect((select as HTMLSelectElement).value).toBe('1')
    })

    it('ustawia status na Nieaktywna dla nieaktywnej maszyny', () => {
      render(<EditMachineModal {...defaultProps} machine={{ ...mockMachine, isActive: false }} />)
      const select = screen.getByLabelText('Status')
      expect((select as HTMLSelectElement).value).toBe('0')
    })

    it('renderuje przyciski Anuluj i Zapisz zmiany', () => {
      render(<EditMachineModal {...defaultProps} />)
      expect(screen.getByRole('button', { name: 'Anuluj' })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'Zapisz zmiany' })).toBeInTheDocument()
    })
  })

  describe('interakcje', () => {
    it('kliknięcie Anuluj wywołuje onClose', () => {
      render(<EditMachineModal {...defaultProps} />)
      fireEvent.click(screen.getByRole('button', { name: 'Anuluj' }))
      expect(defaultProps.onClose).toHaveBeenCalledTimes(1)
    })

    it('kliknięcie overlay wywołuje onClose', () => {
      const { container } = render(<EditMachineModal {...defaultProps} />)
      fireEvent.click(container.firstChild as HTMLElement)
      expect(defaultProps.onClose).toHaveBeenCalledTimes(1)
    })

    it('kliknięcie treści modala nie wywołuje onClose', () => {
      render(<EditMachineModal {...defaultProps} />)
      fireEvent.click(screen.getByRole('heading'))
      expect(defaultProps.onClose).not.toHaveBeenCalled()
    })
  })

  describe('wysyłanie formularza', () => {
    it('wywołuje updateMachine z danymi formularza', async () => {
      const updated = { ...mockMachine, name: 'Tokarka XL' }
      vi.mocked(updateMachine).mockResolvedValue(updated)
      render(<EditMachineModal {...defaultProps} />)
      fireEvent.change(screen.getByLabelText('Nazwa maszyny'), { target: { value: 'Tokarka XL' } })
      fireEvent.submit(screen.getByRole('button', { name: 'Zapisz zmiany' }).closest('form')!)
      await waitFor(() =>
        expect(updateMachine).toHaveBeenCalledWith(
          'machine-1',
          expect.objectContaining({ name: 'Tokarka XL' })
        )
      )
    })

    it('wywołuje onSuccess i onClose po pomyślnym zapisie', async () => {
      const updated = { ...mockMachine, name: 'Tokarka XL' }
      vi.mocked(updateMachine).mockResolvedValue(updated)
      render(<EditMachineModal {...defaultProps} />)
      fireEvent.submit(screen.getByRole('button', { name: 'Zapisz zmiany' }).closest('form')!)
      await waitFor(() => {
        expect(defaultProps.onSuccess).toHaveBeenCalledWith(updated)
        expect(defaultProps.onClose).toHaveBeenCalledTimes(1)
      })
    })

    it('wyświetla Zapisywanie... podczas wysyłania', async () => {
      vi.mocked(updateMachine).mockReturnValue(new Promise(() => {}))
      render(<EditMachineModal {...defaultProps} />)
      fireEvent.submit(screen.getByRole('button', { name: 'Zapisz zmiany' }).closest('form')!)
      expect(await screen.findByRole('button', { name: 'Zapisywanie...' })).toBeDisabled()
    })

    it('wyświetla błąd gdy API zwróci błąd', async () => {
      vi.mocked(updateMachine).mockRejectedValue(new Error('Błąd serwera'))
      render(<EditMachineModal {...defaultProps} />)
      fireEvent.submit(screen.getByRole('button', { name: 'Zapisz zmiany' }).closest('form')!)
      expect(await screen.findByText('Błąd serwera')).toBeInTheDocument()
    })

    it('nie wywołuje onClose gdy API zwróci błąd', async () => {
      vi.mocked(updateMachine).mockRejectedValue(new Error('Błąd'))
      render(<EditMachineModal {...defaultProps} />)
      fireEvent.submit(screen.getByRole('button', { name: 'Zapisz zmiany' }).closest('form')!)
      await waitFor(() => expect(screen.getByText('Błąd')).toBeInTheDocument())
      expect(defaultProps.onClose).not.toHaveBeenCalled()
    })
  })
})
