import { render, screen, fireEvent, act } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { WorkOrderModal } from '../WorkOrderModal'
import * as workOrdersApi from '../../work-orders.api'
import { Priority } from '../../types'

vi.mock('../../work-orders.api', () => ({
  fetchAllMachines: vi.fn(),
}))

const mockFetchAllMachines = vi.mocked(workOrdersApi.fetchAllMachines)
const mockOnClose = vi.fn()
const mockOnSubmit = vi.fn()

const flush = () => act(async () => {})

const sampleMachines = [
  { id: 'm1', name: 'Tokarka CNC', serialNumber: 'SN001' },
  { id: 'm2', name: 'Spawarka MIG', serialNumber: 'SN002' },
]

describe('WorkOrderModal', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockFetchAllMachines.mockResolvedValue(sampleMachines)
    mockOnSubmit.mockResolvedValue(undefined)
  })

  it('zwraca null gdy isOpen=false', () => {
    render(<WorkOrderModal isOpen={false} onClose={mockOnClose} onSubmit={mockOnSubmit} />)
    expect(screen.queryByText('Nowe Zlecenie Pracy')).not.toBeInTheDocument()
  })

  it('wyświetla tytuł "Nowe Zlecenie Pracy"', async () => {
    render(<WorkOrderModal isOpen={true} onClose={mockOnClose} onSubmit={mockOnSubmit} />)
    await flush()
    expect(screen.getByText('Nowe Zlecenie Pracy')).toBeInTheDocument()
  })

  it('ładuje i wyświetla maszyny z API', async () => {
    render(<WorkOrderModal isOpen={true} onClose={mockOnClose} onSubmit={mockOnSubmit} />)
    await flush()
    expect(mockFetchAllMachines).toHaveBeenCalledTimes(1)
    expect(screen.getByText('Tokarka CNC (SN001)')).toBeInTheDocument()
    expect(screen.getByText('Spawarka MIG (SN002)')).toBeInTheDocument()
  })

  it('wyświetla błąd gdy ładowanie maszyn się nie powiedzie', async () => {
    mockFetchAllMachines.mockRejectedValue(new Error('Błąd sieci'))
    render(<WorkOrderModal isOpen={true} onClose={mockOnClose} onSubmit={mockOnSubmit} />)
    await flush()
    expect(screen.getByText('Nie udało się załadować listy maszyn.')).toBeInTheDocument()
  })

  it('wyświetla pola formularza: Maszyna, Tytuł, Priorytet, Opis', async () => {
    render(<WorkOrderModal isOpen={true} onClose={mockOnClose} onSubmit={mockOnSubmit} />)
    await flush()
    expect(screen.getByLabelText('Maszyna *')).toBeInTheDocument()
    expect(screen.getByLabelText('Tytuł Zgłoszenia *')).toBeInTheDocument()
    expect(screen.getByLabelText('Priorytet')).toBeInTheDocument()
    expect(screen.getByLabelText('Szczegółowy opis *')).toBeInTheDocument()
  })

  it('domyślny priorytet to Średni', async () => {
    render(<WorkOrderModal isOpen={true} onClose={mockOnClose} onSubmit={mockOnSubmit} />)
    await flush()
    expect(screen.getByDisplayValue('Średni')).toBeInTheDocument()
  })

  it('Anuluj wywołuje onClose', async () => {
    render(<WorkOrderModal isOpen={true} onClose={mockOnClose} onSubmit={mockOnSubmit} />)
    await flush()
    fireEvent.click(screen.getByText('Anuluj'))
    expect(mockOnClose).toHaveBeenCalledTimes(1)
  })

  it('wywołuje onSubmit z poprawnymi danymi po wypełnieniu formularza', async () => {
    render(<WorkOrderModal isOpen={true} onClose={mockOnClose} onSubmit={mockOnSubmit} />)
    await flush()
    fireEvent.change(screen.getByLabelText('Maszyna *'), { target: { value: 'm1' } })
    fireEvent.change(screen.getByLabelText('Tytuł Zgłoszenia *'), { target: { value: 'Awaria silnika' } })
    fireEvent.change(screen.getByLabelText('Priorytet'), { target: { value: Priority.HIGH } })
    fireEvent.change(screen.getByLabelText('Szczegółowy opis *'), { target: { value: 'Silnik nie odpowiada na sygnały' } })
    await act(async () => {
      fireEvent.click(screen.getByText('Utwórz Zlecenie'))
    })
    expect(mockOnSubmit).toHaveBeenCalledWith({
      machineId: 'm1',
      title: 'Awaria silnika',
      description: 'Silnik nie odpowiada na sygnały',
      priority: Priority.HIGH,
    })
  })

  it('wywołuje onClose po pomyślnym zapisie', async () => {
    render(<WorkOrderModal isOpen={true} onClose={mockOnClose} onSubmit={mockOnSubmit} />)
    await flush()
    fireEvent.change(screen.getByLabelText('Maszyna *'), { target: { value: 'm1' } })
    fireEvent.change(screen.getByLabelText('Tytuł Zgłoszenia *'), { target: { value: 'Awaria silnika' } })
    fireEvent.change(screen.getByLabelText('Szczegółowy opis *'), { target: { value: 'Silnik nie odpowiada na sygnały' } })
    await act(async () => {
      fireEvent.click(screen.getByText('Utwórz Zlecenie'))
    })
    expect(mockOnClose).toHaveBeenCalledTimes(1)
  })

  it('wyświetla stan ładowania "Zapisywanie..."', async () => {
    mockOnSubmit.mockReturnValue(new Promise(() => {}))
    render(<WorkOrderModal isOpen={true} onClose={mockOnClose} onSubmit={mockOnSubmit} />)
    await flush()
    fireEvent.change(screen.getByLabelText('Maszyna *'), { target: { value: 'm1' } })
    fireEvent.change(screen.getByLabelText('Tytuł Zgłoszenia *'), { target: { value: 'Awaria silnika' } })
    fireEvent.change(screen.getByLabelText('Szczegółowy opis *'), { target: { value: 'Silnik nie odpowiada na sygnały' } })
    act(() => {
      fireEvent.click(screen.getByText('Utwórz Zlecenie'))
    })
    expect(screen.getByText('Zapisywanie...')).toBeInTheDocument()
  })

  it('wyświetla błąd zwrócony przez onSubmit', async () => {
    mockOnSubmit.mockRejectedValue(new Error('Serwer niedostępny'))
    render(<WorkOrderModal isOpen={true} onClose={mockOnClose} onSubmit={mockOnSubmit} />)
    await flush()
    fireEvent.change(screen.getByLabelText('Maszyna *'), { target: { value: 'm1' } })
    fireEvent.change(screen.getByLabelText('Tytuł Zgłoszenia *'), { target: { value: 'Awaria silnika' } })
    fireEvent.change(screen.getByLabelText('Szczegółowy opis *'), { target: { value: 'Silnik nie odpowiada na sygnały' } })
    await act(async () => {
      fireEvent.click(screen.getByText('Utwórz Zlecenie'))
    })
    expect(screen.getByText('Serwer niedostępny')).toBeInTheDocument()
  })

  it('resetuje formularz przy ponownym otwarciu', async () => {
    const { rerender } = render(<WorkOrderModal isOpen={true} onClose={mockOnClose} onSubmit={mockOnSubmit} />)
    await flush()
    fireEvent.change(screen.getByLabelText('Tytuł Zgłoszenia *'), { target: { value: 'Wpisany tytuł' } })
    rerender(<WorkOrderModal isOpen={false} onClose={mockOnClose} onSubmit={mockOnSubmit} />)
    rerender(<WorkOrderModal isOpen={true} onClose={mockOnClose} onSubmit={mockOnSubmit} />)
    await flush()
    expect(screen.getByLabelText('Tytuł Zgłoszenia *')).toHaveValue('')
  })
})
