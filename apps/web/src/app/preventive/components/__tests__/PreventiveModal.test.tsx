import { render, screen, fireEvent, act } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { PreventiveModal } from '../PreventiveModal'
import * as preventiveApi from '../../preventive.api'

vi.mock('../../preventive.api', () => ({
  createPlan: vi.fn(),
  fetchAllMachinesForSelect: vi.fn(),
}))

const mockMachines = [
  { id: 'm1', name: 'Tokarka CNC', serialNumber: 'SN-001' },
  { id: 'm2', name: 'Frezarka', serialNumber: 'SN-002' },
]

const onClose = vi.fn()
const onSuccess = vi.fn()

async function flush() {
  await act(async () => {})
}

describe('PreventiveModal', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(preventiveApi.fetchAllMachinesForSelect).mockResolvedValue(mockMachines)
  })

  describe('renderowanie', () => {
    it('wyświetla nagłówek "Dodaj Plan Prewencyjny"', async () => {
      render(<PreventiveModal onClose={onClose} onSuccess={onSuccess} />)
      await flush()
      expect(screen.getByText('Dodaj Plan Prewencyjny')).toBeInTheDocument()
    })

    it('wyświetla select maszyn po załadowaniu', async () => {
      render(<PreventiveModal onClose={onClose} onSuccess={onSuccess} />)
      await flush()
      expect(screen.getByRole('option', { name: 'Tokarka CNC (SN-001)' })).toBeInTheDocument()
      expect(screen.getByRole('option', { name: 'Frezarka (SN-002)' })).toBeInTheDocument()
    })

    it('wyświetla pole "Nazwa Przeglądu"', async () => {
      render(<PreventiveModal onClose={onClose} onSuccess={onSuccess} />)
      await flush()
      expect(screen.getByPlaceholderText('np. Miesięczny przegląd pompy')).toBeInTheDocument()
    })

    it('wyświetla pola interwału dni i godzin', async () => {
      render(<PreventiveModal onClose={onClose} onSuccess={onSuccess} />)
      await flush()
      expect(screen.getByPlaceholderText('np. 30')).toBeInTheDocument()
      expect(screen.getByPlaceholderText('np. 500')).toBeInTheDocument()
    })

    it('wyświetla domyślnie jeden krok checklisty', async () => {
      render(<PreventiveModal onClose={onClose} onSuccess={onSuccess} />)
      await flush()
      expect(screen.getAllByPlaceholderText('Opis zadania...')).toHaveLength(1)
    })

    it('przycisk usunięcia kroku jest nieaktywny gdy jest tylko jeden krok', async () => {
      render(<PreventiveModal onClose={onClose} onSuccess={onSuccess} />)
      await flush()
      const xButtons = screen.getAllByRole('button', { name: '×' })
      const removeStepBtn = xButtons[xButtons.length - 1]
      expect(removeStepBtn).toBeDisabled()
    })
  })

  describe('zarządzanie checklistą', () => {
    it('kliknięcie "+ Dodaj krok" dodaje nowy krok', async () => {
      render(<PreventiveModal onClose={onClose} onSuccess={onSuccess} />)
      await flush()
      fireEvent.click(screen.getByRole('button', { name: '+ Dodaj krok' }))
      expect(screen.getAllByPlaceholderText('Opis zadania...')).toHaveLength(2)
    })

    it('kliknięcie × usuwa krok gdy jest ich więcej niż jeden', async () => {
      render(<PreventiveModal onClose={onClose} onSuccess={onSuccess} />)
      await flush()
      fireEvent.click(screen.getByRole('button', { name: '+ Dodaj krok' }))
      expect(screen.getAllByPlaceholderText('Opis zadania...')).toHaveLength(2)
      // first × is the header close btn; remove step buttons follow
      const xButtons = screen.getAllByRole('button', { name: '×' })
      fireEvent.click(xButtons[1]) // first remove step button
      expect(screen.getAllByPlaceholderText('Opis zadania...')).toHaveLength(1)
    })
  })

  describe('walidacja', () => {
    it('wyświetla błąd gdy brak interwału', async () => {
      render(<PreventiveModal onClose={onClose} onSuccess={onSuccess} />)
      await flush()
      fireEvent.change(screen.getByDisplayValue('-- Wybierz maszynę --'), { target: { value: 'm1' } })
      fireEvent.change(screen.getByPlaceholderText('np. Miesięczny przegląd pompy'), { target: { value: 'Test plan' } })
      fireEvent.change(screen.getAllByPlaceholderText('Opis zadania...')[0], { target: { value: 'Krok 1' } })
      fireEvent.click(screen.getByRole('button', { name: 'Utwórz Plan' }))
      expect(screen.getByText('Musisz podać interwał godzinowy LUB dniowy.')).toBeInTheDocument()
    })

    it('wyświetla błąd gdy checklista zawiera tylko białe znaki', async () => {
      render(<PreventiveModal onClose={onClose} onSuccess={onSuccess} />)
      await flush()
      fireEvent.change(screen.getByDisplayValue('-- Wybierz maszynę --'), { target: { value: 'm1' } })
      fireEvent.change(screen.getByPlaceholderText('np. Miesięczny przegląd pompy'), { target: { value: 'Test plan' } })
      fireEvent.change(screen.getByPlaceholderText('np. 30'), { target: { value: '30' } })
      // whitespace passes 'required' HTML check but is filtered by .trim()
      fireEvent.change(screen.getAllByPlaceholderText('Opis zadania...')[0], { target: { value: '   ' } })
      fireEvent.click(screen.getByRole('button', { name: 'Utwórz Plan' }))
      expect(screen.getByText('Checklista musi mieć przynajmniej jeden krok.')).toBeInTheDocument()
    })
  })

  describe('wysyłanie formularza', () => {
    it('wywołuje createPlan z poprawnymi danymi', async () => {
      vi.mocked(preventiveApi.createPlan).mockResolvedValue()
      render(<PreventiveModal onClose={onClose} onSuccess={onSuccess} />)
      await flush()
      fireEvent.change(screen.getByDisplayValue('-- Wybierz maszynę --'), { target: { value: 'm1' } })
      fireEvent.change(screen.getByPlaceholderText('np. Miesięczny przegląd pompy'), { target: { value: 'Nowy plan' } })
      fireEvent.change(screen.getByPlaceholderText('np. 30'), { target: { value: '30' } })
      fireEvent.change(screen.getAllByPlaceholderText('Opis zadania...')[0], { target: { value: 'Krok testowy' } })
      fireEvent.click(screen.getByRole('button', { name: 'Utwórz Plan' }))
      await flush()
      expect(vi.mocked(preventiveApi.createPlan)).toHaveBeenCalledWith(
        expect.objectContaining({ machineId: 'm1', name: 'Nowy plan', intervalDays: 30 })
      )
    })

    it('wywołuje onSuccess i onClose po sukcesie', async () => {
      vi.mocked(preventiveApi.createPlan).mockResolvedValue()
      render(<PreventiveModal onClose={onClose} onSuccess={onSuccess} />)
      await flush()
      fireEvent.change(screen.getByDisplayValue('-- Wybierz maszynę --'), { target: { value: 'm1' } })
      fireEvent.change(screen.getByPlaceholderText('np. Miesięczny przegląd pompy'), { target: { value: 'Nowy plan' } })
      fireEvent.change(screen.getByPlaceholderText('np. 30'), { target: { value: '30' } })
      fireEvent.change(screen.getAllByPlaceholderText('Opis zadania...')[0], { target: { value: 'Krok testowy' } })
      fireEvent.click(screen.getByRole('button', { name: 'Utwórz Plan' }))
      await flush()
      expect(onSuccess).toHaveBeenCalledTimes(1)
      expect(onClose).toHaveBeenCalledTimes(1)
    })

    it('pokazuje "Zapisywanie..." podczas wysyłania', async () => {
      vi.mocked(preventiveApi.createPlan).mockReturnValue(new Promise(() => {}))
      render(<PreventiveModal onClose={onClose} onSuccess={onSuccess} />)
      await flush()
      fireEvent.change(screen.getByDisplayValue('-- Wybierz maszynę --'), { target: { value: 'm1' } })
      fireEvent.change(screen.getByPlaceholderText('np. Miesięczny przegląd pompy'), { target: { value: 'Plan' } })
      fireEvent.change(screen.getByPlaceholderText('np. 30'), { target: { value: '30' } })
      fireEvent.change(screen.getAllByPlaceholderText('Opis zadania...')[0], { target: { value: 'Krok' } })
      fireEvent.click(screen.getByRole('button', { name: 'Utwórz Plan' }))
      expect(screen.getByRole('button', { name: 'Zapisywanie...' })).toBeInTheDocument()
    })

    it('wyświetla błąd API przy niepowodzeniu', async () => {
      vi.mocked(preventiveApi.createPlan).mockRejectedValue(new Error('Błąd API'))
      render(<PreventiveModal onClose={onClose} onSuccess={onSuccess} />)
      await flush()
      fireEvent.change(screen.getByDisplayValue('-- Wybierz maszynę --'), { target: { value: 'm1' } })
      fireEvent.change(screen.getByPlaceholderText('np. Miesięczny przegląd pompy'), { target: { value: 'Plan' } })
      fireEvent.change(screen.getByPlaceholderText('np. 30'), { target: { value: '30' } })
      fireEvent.change(screen.getAllByPlaceholderText('Opis zadania...')[0], { target: { value: 'Krok' } })
      fireEvent.click(screen.getByRole('button', { name: 'Utwórz Plan' }))
      await flush()
      expect(screen.getByText('Błąd API')).toBeInTheDocument()
    })
  })

  describe('zamykanie', () => {
    it('kliknięcie × wywołuje onClose', async () => {
      render(<PreventiveModal onClose={onClose} onSuccess={onSuccess} />)
      await flush()
      // header close button is the first × in the DOM
      fireEvent.click(screen.getAllByRole('button', { name: '×' })[0])
      expect(onClose).toHaveBeenCalledTimes(1)
    })

    it('kliknięcie "Anuluj" wywołuje onClose', async () => {
      render(<PreventiveModal onClose={onClose} onSuccess={onSuccess} />)
      await flush()
      fireEvent.click(screen.getByRole('button', { name: 'Anuluj' }))
      expect(onClose).toHaveBeenCalledTimes(1)
    })

    it('kliknięcie overlay wywołuje onClose', async () => {
      const { container } = render(<PreventiveModal onClose={onClose} onSuccess={onSuccess} />)
      await flush()
      fireEvent.click(container.firstChild as HTMLElement)
      expect(onClose).toHaveBeenCalledTimes(1)
    })

    it('kliknięcie treści modala nie wywołuje onClose', async () => {
      render(<PreventiveModal onClose={onClose} onSuccess={onSuccess} />)
      await flush()
      fireEvent.click(screen.getByText('Dodaj Plan Prewencyjny'))
      expect(onClose).not.toHaveBeenCalled()
    })
  })
})
