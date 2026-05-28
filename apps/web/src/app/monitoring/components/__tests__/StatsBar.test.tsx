import { render, screen, act } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import StatsBar from '../Statsbar'

vi.mock('js-cookie', () => ({
  default: { get: vi.fn(() => 'test-token') },
}))

const mockedFetch = vi.fn()
vi.stubGlobal('fetch', mockedFetch)

const defaultFilters = { limit: 50, offset: 0 }

async function flush() {
  await act(async () => {})
}

function mockRequestsFetch(total: number, recentCount: number, errorTotal: number) {
  mockedFetch
    .mockResolvedValueOnce({ ok: true, json: async () => ({ total }) } as any)
    .mockResolvedValueOnce({ ok: true, json: async () => ({ total: recentCount }) } as any)
    .mockResolvedValueOnce({ ok: true, json: async () => ({ total: errorTotal }) } as any)
}

function mockErrorsFetch(total: number, recentCount: number) {
  mockedFetch
    .mockResolvedValueOnce({ ok: true, json: async () => ({ total }) } as any)
    .mockResolvedValueOnce({ ok: true, json: async () => ({ total: recentCount }) } as any)
}

describe('StatsBar', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('renderowanie etykiet', () => {
    it('wyświetla etykietę "Łącznie w bazie"', async () => {
      mockRequestsFetch(100, 5, 10)
      render(<StatsBar type="requests" filters={defaultFilters} />)
      await flush()
      expect(screen.getByText('Łącznie w bazie')).toBeInTheDocument()
    })

    it('wyświetla etykietę "Ostatnia godzina"', async () => {
      mockRequestsFetch(100, 5, 10)
      render(<StatsBar type="requests" filters={defaultFilters} />)
      await flush()
      expect(screen.getByText('Ostatnia godzina')).toBeInTheDocument()
    })

    it('wyświetla etykietę "Wskaźnik błędów" dla requests', async () => {
      mockRequestsFetch(100, 5, 10)
      render(<StatsBar type="requests" filters={defaultFilters} />)
      await flush()
      expect(screen.getByText('Wskaźnik błędów')).toBeInTheDocument()
    })

    it('nie wyświetla etykiety "Wskaźnik błędów" dla errors', async () => {
      mockErrorsFetch(50, 3)
      render(<StatsBar type="errors" filters={defaultFilters} />)
      await flush()
      expect(screen.queryByText('Wskaźnik błędów')).not.toBeInTheDocument()
    })
  })

  describe('wartości statystyk', () => {
    it('wyświetla łączną liczbę logów', async () => {
      mockRequestsFetch(150, 12, 8)
      render(<StatsBar type="requests" filters={defaultFilters} />)
      await flush()
      expect(screen.getByText('150')).toBeInTheDocument()
    })

    it('wyświetla liczbę logów z ostatniej godziny', async () => {
      mockRequestsFetch(150, 12, 8)
      render(<StatsBar type="requests" filters={defaultFilters} />)
      await flush()
      expect(screen.getByText('12')).toBeInTheDocument()
    })

    it('wyświetla wskaźnik błędów jako procent', async () => {
      mockRequestsFetch(100, 5, 10)
      render(<StatsBar type="requests" filters={defaultFilters} />)
      await flush()
      expect(screen.getByText('10%')).toBeInTheDocument()
    })

    it('wyświetla 0% gdy brak błędów', async () => {
      mockRequestsFetch(100, 5, 0)
      render(<StatsBar type="requests" filters={defaultFilters} />)
      await flush()
      expect(screen.getByText('0%')).toBeInTheDocument()
    })
  })

  describe('obsługa błędu fetch', () => {
    it('wyświetla "—" gdy fetch się nie powiedzie', async () => {
      mockedFetch.mockRejectedValue(new Error('Network error'))
      render(<StatsBar type="requests" filters={defaultFilters} />)
      await flush()
      expect(screen.getAllByText('—').length).toBeGreaterThan(0)
    })
  })
})
