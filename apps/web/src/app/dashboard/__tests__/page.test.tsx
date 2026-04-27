import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import Cookies from 'js-cookie'
import Dashboard from '../page'
import DashboardLayout from '../layout'

vi.mock('js-cookie', () => ({
  default: { get: vi.fn() },
}))

vi.mock('recharts', () => ({
  BarChart: ({ children }: any) => <div data-testid="bar-chart">{children}</div>,
  Bar: () => null,
  XAxis: () => null,
  YAxis: () => null,
  CartesianGrid: () => null,
  Tooltip: () => null,
  ResponsiveContainer: ({ children }: any) => <div>{children}</div>,
}))

const mockedFetch = vi.fn()
vi.stubGlobal('fetch', mockedFetch)

const mockedCookiesGet = vi.mocked(Cookies.get) as any

const mockDashboardData = {
  workOrders: { open: 5, critical: 2 },
  costs: { totalCost: 12000, totalPartsCost: 3000, topMachinesByCost: [] },
  machines: { mttr: 4 },
  preventive: { overdue: 1, upcomingIn7Days: 3 },
  inventory: { totalParts: 50, lowStockCount: 2, activeLoans: 1 },
}

describe('DashboardLayout', () => {
  it('renderuje children', () => {
    render(<DashboardLayout><div data-testid="child" /></DashboardLayout>)
    expect(screen.getByTestId('child')).toBeInTheDocument()
  })
})

describe('Dashboard', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('auth guard', () => {
    it('nie wywołuje fetch gdy brak refreshToken', () => {
      mockedCookiesGet.mockReturnValue(undefined)
      render(<Dashboard />)
      expect(mockedFetch).not.toHaveBeenCalled()
    })

    it('wyświetla ekran ładowania gdy brak refreshToken', () => {
      mockedCookiesGet.mockReturnValue(undefined)
      render(<Dashboard />)
      expect(screen.getByText('Inicjalizacja danych...')).toBeInTheDocument()
    })
  })

  describe('stan ładowania', () => {
    it('wyświetla Inicjalizacja danych... przed załadowaniem', async () => {
      mockedCookiesGet.mockReturnValue('token')
      mockedFetch.mockReturnValue(new Promise(() => {}))
      render(<Dashboard />)
      expect(screen.getByText('Inicjalizacja danych...')).toBeInTheDocument()
    })
  })

  describe('dane z API', () => {
    beforeEach(() => {
      mockedCookiesGet.mockReturnValue('token')
      mockedFetch.mockResolvedValue({
        ok: true,
        status: 200,
        headers: { get: () => 'application/json' },
        json: async () => mockDashboardData,
      })
    })

    it('renderuje nagłówek panelu', async () => {
      render(<Dashboard />)
      expect(await screen.findByText('Panel')).toBeInTheDocument()
    })

    it('renderuje liczbę otwartych zleceń', async () => {
      render(<Dashboard />)
      await screen.findByText('Panel')
      expect(screen.getByText('5')).toBeInTheDocument()
    })

    it('renderuje liczbę krytycznych zleceń', async () => {
      render(<Dashboard />)
      await screen.findByText('Panel')
      expect(screen.getByText('Krytyczne: 2')).toBeInTheDocument()
    })

    it('renderuje koszty całkowite', async () => {
      render(<Dashboard />)
      await screen.findByText('Panel')
      expect(screen.getByText(/12[\s ]?000.*PLN/)).toBeInTheDocument()
    })

    it('renderuje MTTR', async () => {
      render(<Dashboard />)
      await screen.findByText('Panel')
      expect(screen.getByText('4 h')).toBeInTheDocument()
    })

    it('renderuje zaległe przeglądy', async () => {
      render(<Dashboard />)
      await screen.findByText('Panel')
      expect(screen.getByText('1')).toBeInTheDocument()
    })

    it('renderuje aktywne części', async () => {
      render(<Dashboard />)
      await screen.findByText('Panel')
      expect(screen.getByText('50')).toBeInTheDocument()
    })

    it('renderuje wykres', async () => {
      render(<Dashboard />)
      await screen.findByText('Panel')
      expect(screen.getByTestId('bar-chart')).toBeInTheDocument()
    })
  })

  describe('fallback wartości', () => {
    beforeEach(() => {
      mockedCookiesGet.mockReturnValue('token')
      mockedFetch.mockResolvedValue({
        ok: true,
        status: 200,
        headers: { get: () => 'application/json' },
        json: async () => ({}),
      })
    })

    it('wyświetla 0 gdy brak danych z API', async () => {
      render(<Dashboard />)
      await screen.findByText('Panel')
      const zeros = screen.getAllByText('0')
      expect(zeros.length).toBeGreaterThan(0)
    })
  })

  describe('przełącznik okresu', () => {
    beforeEach(() => {
      mockedCookiesGet.mockReturnValue('token')
      mockedFetch.mockResolvedValue({
        ok: true,
        status: 200,
        headers: { get: () => 'application/json' },
        json: async () => mockDashboardData,
      })
    })

    it('renderuje przyciski Tydzień, Miesiąc, Rok', async () => {
      render(<Dashboard />)
      await screen.findByText('Panel')
      expect(screen.getByRole('button', { name: 'Tydzień' })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'Miesiąc' })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'Rok' })).toBeInTheDocument()
    })

    it('domyślny okres to miesiąc', async () => {
      render(<Dashboard />)
      await screen.findByText('Panel')
      expect(screen.getByText('ostatni miesiąc')).toBeInTheDocument()
    })

    it('kliknięcie Tydzień zmienia opis okresu', async () => {
      render(<Dashboard />)
      await screen.findByText('Panel')
      fireEvent.click(screen.getByRole('button', { name: 'Tydzień' }))
      await screen.findByText('ostatni tydzień')
      expect(screen.getByText('ostatni tydzień')).toBeInTheDocument()
    })

    it('kliknięcie Rok zmienia opis okresu', async () => {
      render(<Dashboard />)
      await screen.findByText('Panel')
      fireEvent.click(screen.getByRole('button', { name: 'Rok' }))
      await screen.findByText('ostatni rok')
      expect(screen.getByText('ostatni rok')).toBeInTheDocument()
    })

    it('zmiana okresu wywołuje ponowny fetch', async () => {
      render(<Dashboard />)
      await screen.findByText('Panel')
      fireEvent.click(screen.getByRole('button', { name: 'Tydzień' }))
      await waitFor(() => {
        expect(mockedFetch).toHaveBeenCalledTimes(2)
      })
    })

    it('fetch dla tygodnia używa period=week', async () => {
      render(<Dashboard />)
      await screen.findByText('Panel')
      fireEvent.click(screen.getByRole('button', { name: 'Tydzień' }))
      await waitFor(() => {
        expect(mockedFetch).toHaveBeenCalledWith(
          expect.stringContaining('period=week'),
          expect.any(Object),
        )
      })
    })
  })

  describe('obsługa 401', () => {
    it('nie ustawia danych gdy API zwróci 401', async () => {
      mockedCookiesGet.mockReturnValue('token')
      mockedFetch.mockResolvedValue({
        status: 401,
        headers: { get: () => 'application/json' },
      })
      render(<Dashboard />)
      await screen.findByText('Panel')
      expect(screen.getAllByText('0').length).toBeGreaterThan(0)
    })
  })
})
