import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import MonitoringDashboard from '../MonitoringDashboard'

vi.mock('../Logstable', () => ({
  default: ({ type, filters }: any) => (
    <div data-testid="logs-table" data-type={type} data-offset={filters.offset} data-limit={filters.limit} />
  ),
}))

vi.mock('../Statsbar', () => ({
  default: ({ type }: any) => <div data-testid="stats-bar" data-type={type} />,
}))

vi.mock('@/components/filterPanel/FilterPanel', () => ({
  FilterPanel: ({ children, onReset }: any) => (
    <div data-testid="filter-panel">
      {children}
      <button data-testid="reset-btn" onClick={onReset}>Resetuj</button>
    </div>
  ),
  FilterGroup: ({ label, children }: any) => (
    <div>
      <label>{label}</label>
      {children}
    </div>
  ),
}))

describe('MonitoringDashboard', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('renderowanie', () => {
    it('wyświetla tytuł "Monitoring systemu"', () => {
      render(<MonitoringDashboard />)
      expect(screen.getByText('Monitoring systemu')).toBeInTheDocument()
    })

    it('wyświetla podtytuł', () => {
      render(<MonitoringDashboard />)
      expect(screen.getByText('Logi żądań i błędów aplikacji CMMS')).toBeInTheDocument()
    })

    it('renderuje przyciski zakładek', () => {
      render(<MonitoringDashboard />)
      expect(screen.getByRole('button', { name: 'Żądania HTTP' })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'Błędy' })).toBeInTheDocument()
    })

    it('renderuje StatsBar', () => {
      render(<MonitoringDashboard />)
      expect(screen.getByTestId('stats-bar')).toBeInTheDocument()
    })

    it('renderuje LogsTable', () => {
      render(<MonitoringDashboard />)
      expect(screen.getByTestId('logs-table')).toBeInTheDocument()
    })

    it('renderuje panel filtrów', () => {
      render(<MonitoringDashboard />)
      expect(screen.getByTestId('filter-panel')).toBeInTheDocument()
    })
  })

  describe('zakładki', () => {
    it('domyślna zakładka to "requests"', () => {
      render(<MonitoringDashboard />)
      expect(screen.getByTestId('logs-table')).toHaveAttribute('data-type', 'requests')
      expect(screen.getByTestId('stats-bar')).toHaveAttribute('data-type', 'requests')
    })

    it('kliknięcie "Błędy" przełącza typ na "errors"', () => {
      render(<MonitoringDashboard />)
      fireEvent.click(screen.getByRole('button', { name: 'Błędy' }))
      expect(screen.getByTestId('logs-table')).toHaveAttribute('data-type', 'errors')
      expect(screen.getByTestId('stats-bar')).toHaveAttribute('data-type', 'errors')
    })

    it('kliknięcie "Żądania HTTP" z powrotem przełącza na "requests"', () => {
      render(<MonitoringDashboard />)
      fireEvent.click(screen.getByRole('button', { name: 'Błędy' }))
      fireEvent.click(screen.getByRole('button', { name: 'Żądania HTTP' }))
      expect(screen.getByTestId('logs-table')).toHaveAttribute('data-type', 'requests')
    })

    it('zmiana zakładki resetuje offset do 0', () => {
      render(<MonitoringDashboard />)
      fireEvent.click(screen.getByRole('button', { name: 'Błędy' }))
      expect(screen.getByTestId('logs-table')).toHaveAttribute('data-offset', '0')
    })
  })

  describe('filtry', () => {
    it('renderuje pole "Data od"', () => {
      render(<MonitoringDashboard />)
      expect(screen.getByText('Data od')).toBeInTheDocument()
    })

    it('renderuje pole "Data do"', () => {
      render(<MonitoringDashboard />)
      expect(screen.getByText('Data do')).toBeInTheDocument()
    })

    it('renderuje pole "ID użytkownika"', () => {
      render(<MonitoringDashboard />)
      expect(screen.getByPlaceholderText('np. clx1abc...')).toBeInTheDocument()
    })

    it('renderuje pole "Kod statusu"', () => {
      render(<MonitoringDashboard />)
      expect(screen.getByPlaceholderText('np. 500')).toBeInTheDocument()
    })

    it('renderuje select liczby wierszy z opcjami 10/25/50/100', () => {
      render(<MonitoringDashboard />)
      expect(screen.getByRole('option', { name: '10' })).toBeInTheDocument()
      expect(screen.getByRole('option', { name: '25' })).toBeInTheDocument()
      expect(screen.getByRole('option', { name: '50' })).toBeInTheDocument()
      expect(screen.getByRole('option', { name: '100' })).toBeInTheDocument()
    })

    it('domyślna liczba wierszy to 50', () => {
      render(<MonitoringDashboard />)
      expect(screen.getByTestId('logs-table')).toHaveAttribute('data-limit', '50')
    })

    it('kliknięcie Resetuj przywraca domyślne filtry', () => {
      render(<MonitoringDashboard />)
      fireEvent.change(screen.getByPlaceholderText('np. clx1abc...'), { target: { value: 'user-123' } })
      fireEvent.click(screen.getByTestId('reset-btn'))
      expect(screen.getByTestId('logs-table')).toHaveAttribute('data-offset', '0')
      expect(screen.getByTestId('logs-table')).toHaveAttribute('data-limit', '50')
    })
  })
})
