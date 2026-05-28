import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useAuth } from '@/context/AuthContext'
import MonitoringPage from '../page'

vi.mock('@/context/AuthContext', () => ({
  useAuth: vi.fn(),
}))

vi.mock('../components/MonitoringDashboard', () => ({
  default: () => <div data-testid="monitoring-dashboard" />,
}))

const mockedUseAuth = vi.mocked(useAuth)

const adminUser = { id: '1', name: 'Admin', email: 'a@test.com', role: 'ADMIN' as const }
const managerUser = { id: '2', name: 'Mgr', email: 'm@test.com', role: 'MANAGER' as const }
const operatorUser = { id: '3', name: 'Op', email: 'o@test.com', role: 'OPERATOR' as const }

describe('MonitoringPage', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('stan ładowania', () => {
    it('wyświetla spinner i tekst Ładowanie...', () => {
      mockedUseAuth.mockReturnValue({ user: null, isLoading: true, logout: vi.fn() })
      render(<MonitoringPage />)
      expect(screen.getByText('Ładowanie...')).toBeInTheDocument()
    })

    it('nie renderuje dashboardu podczas ładowania', () => {
      mockedUseAuth.mockReturnValue({ user: null, isLoading: true, logout: vi.fn() })
      render(<MonitoringPage />)
      expect(screen.queryByTestId('monitoring-dashboard')).not.toBeInTheDocument()
    })
  })

  describe('brak dostępu', () => {
    it('wyświetla "Brak dostępu" dla roli MANAGER', () => {
      mockedUseAuth.mockReturnValue({ user: managerUser, isLoading: false, logout: vi.fn() })
      render(<MonitoringPage />)
      expect(screen.getByText('Brak dostępu')).toBeInTheDocument()
    })

    it('wyświetla "Brak dostępu" dla roli OPERATOR', () => {
      mockedUseAuth.mockReturnValue({ user: operatorUser, isLoading: false, logout: vi.fn() })
      render(<MonitoringPage />)
      expect(screen.getByText('Brak dostępu')).toBeInTheDocument()
    })

    it('wyświetla rolę użytkownika w komunikacie odmowy', () => {
      mockedUseAuth.mockReturnValue({ user: managerUser, isLoading: false, logout: vi.fn() })
      render(<MonitoringPage />)
      expect(screen.getByText('MANAGER')).toBeInTheDocument()
    })

    it('wyświetla "Niezalogowany" gdy brak użytkownika', () => {
      mockedUseAuth.mockReturnValue({ user: null, isLoading: false, logout: vi.fn() })
      render(<MonitoringPage />)
      expect(screen.getByText('Niezalogowany')).toBeInTheDocument()
    })

    it('nie renderuje dashboardu przy braku dostępu', () => {
      mockedUseAuth.mockReturnValue({ user: operatorUser, isLoading: false, logout: vi.fn() })
      render(<MonitoringPage />)
      expect(screen.queryByTestId('monitoring-dashboard')).not.toBeInTheDocument()
    })
  })

  describe('dostęp ADMIN', () => {
    it('renderuje MonitoringDashboard dla ADMIN', () => {
      mockedUseAuth.mockReturnValue({ user: adminUser, isLoading: false, logout: vi.fn() })
      render(<MonitoringPage />)
      expect(screen.getByTestId('monitoring-dashboard')).toBeInTheDocument()
    })

    it('nie wyświetla komunikatu o braku dostępu dla ADMIN', () => {
      mockedUseAuth.mockReturnValue({ user: adminUser, isLoading: false, logout: vi.fn() })
      render(<MonitoringPage />)
      expect(screen.queryByText('Brak dostępu')).not.toBeInTheDocument()
    })
  })
})
