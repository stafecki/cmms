import { render, screen, fireEvent, act } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import LogsTable from '../Logstable'

vi.mock('js-cookie', () => ({
  default: { get: vi.fn(() => 'test-token') },
}))

vi.mock('../Logdetailmodal', () => ({
  default: ({ entry, onClose }: any) => (
    <div data-testid="log-detail-modal">
      <span>{String(entry._id)}</span>
      <button onClick={onClose}>Zamknij</button>
    </div>
  ),
}))

const mockedFetch = vi.fn()
vi.stubGlobal('fetch', mockedFetch)

const mockRequestLogs = {
  data: [
    {
      _id: 'req-1',
      method: 'GET',
      url: '/api/machines',
      statusCode: 200,
      duration: 45,
      userId: 'user-1',
      ip: '192.168.1.1',
      createdAt: '2024-03-15T10:30:00.000Z',
    },
    {
      _id: 'req-2',
      method: 'POST',
      url: '/api/inventory',
      statusCode: 500,
      duration: 120,
      userId: undefined,
      ip: '10.0.0.2',
      createdAt: '2024-03-15T11:00:00.000Z',
    },
  ],
  total: 2,
  limit: 50,
  offset: 0,
}

const mockErrorLogs = {
  data: [
    {
      _id: 'err-1',
      message: 'Internal Server Error',
      statusCode: 500,
      url: '/api/users',
      method: 'DELETE',
      userId: 'user-2',
      ip: '10.0.0.3',
      createdAt: '2024-03-15T12:00:00.000Z',
    },
  ],
  total: 1,
  limit: 50,
  offset: 0,
}

const defaultFilters = { limit: 50, offset: 0 }
const onPageChange = vi.fn()

async function flush() {
  await act(async () => {})
}

describe('LogsTable', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('stan ładowania', () => {
    it('wyświetla overlay ładowania na starcie', () => {
      mockedFetch.mockReturnValue(new Promise(() => {}))
      const { container } = render(
        <LogsTable type="requests" filters={defaultFilters} onPageChange={onPageChange} />
      )
      expect(container.querySelector('[class*="loadingOverlay"]') || container.querySelector('[class*="spinner"]')).toBeInTheDocument()
    })
  })

  describe('stan błędu', () => {
    it('wyświetla komunikat błędu gdy fetch nie powiedzie', async () => {
      mockedFetch.mockResolvedValue({ ok: false, status: 500 } as any)
      render(<LogsTable type="requests" filters={defaultFilters} onPageChange={onPageChange} />)
      await flush()
      expect(screen.getByText('HTTP 500')).toBeInTheDocument()
    })

    it('wyświetla przycisk Ponów przy błędzie', async () => {
      mockedFetch.mockResolvedValue({ ok: false, status: 503 } as any)
      render(<LogsTable type="requests" filters={defaultFilters} onPageChange={onPageChange} />)
      await flush()
      expect(screen.getByRole('button', { name: 'Ponów' })).toBeInTheDocument()
    })

    it('kliknięcie Ponów ponawia fetch', async () => {
      mockedFetch.mockResolvedValue({ ok: false, status: 500 } as any)
      render(<LogsTable type="requests" filters={defaultFilters} onPageChange={onPageChange} />)
      await flush()
      const callsBefore = mockedFetch.mock.calls.length
      fireEvent.click(screen.getByRole('button', { name: 'Ponów' }))
      await flush()
      expect(mockedFetch.mock.calls.length).toBeGreaterThan(callsBefore)
    })
  })

  describe('pusta lista', () => {
    it('wyświetla komunikat "Brak wyników" gdy brak danych', async () => {
      mockedFetch.mockResolvedValue({
        ok: true,
        json: async () => ({ data: [], total: 0, limit: 50, offset: 0 }),
      } as any)
      render(<LogsTable type="requests" filters={defaultFilters} onPageChange={onPageChange} />)
      await flush()
      expect(screen.getByText('Brak wyników dla podanych filtrów')).toBeInTheDocument()
    })
  })

  describe('logi żądań HTTP', () => {
    beforeEach(() => {
      mockedFetch.mockResolvedValue({
        ok: true,
        json: async () => mockRequestLogs,
      } as any)
    })

    it('renderuje nagłówki tabeli żądań', async () => {
      render(<LogsTable type="requests" filters={defaultFilters} onPageChange={onPageChange} />)
      await flush()
      expect(screen.getByText('Metoda')).toBeInTheDocument()
      expect(screen.getByText('URL')).toBeInTheDocument()
      expect(screen.getByText('Status')).toBeInTheDocument()
      expect(screen.getByText('Czas [ms]')).toBeInTheDocument()
    })

    it('renderuje metodę HTTP', async () => {
      render(<LogsTable type="requests" filters={defaultFilters} onPageChange={onPageChange} />)
      await flush()
      expect(screen.getByText('GET')).toBeInTheDocument()
      expect(screen.getByText('POST')).toBeInTheDocument()
    })

    it('renderuje URL żądania', async () => {
      render(<LogsTable type="requests" filters={defaultFilters} onPageChange={onPageChange} />)
      await flush()
      expect(screen.getByText('/api/machines')).toBeInTheDocument()
    })

    it('renderuje czas odpowiedzi', async () => {
      render(<LogsTable type="requests" filters={defaultFilters} onPageChange={onPageChange} />)
      await flush()
      expect(screen.getByText('45ms')).toBeInTheDocument()
    })

    it('wyświetla "—" gdy brak userId', async () => {
      render(<LogsTable type="requests" filters={defaultFilters} onPageChange={onPageChange} />)
      await flush()
      expect(screen.getAllByText('—').length).toBeGreaterThan(0)
    })
  })

  describe('logi błędów', () => {
    beforeEach(() => {
      mockedFetch.mockResolvedValue({
        ok: true,
        json: async () => mockErrorLogs,
      } as any)
    })

    it('renderuje nagłówki tabeli błędów', async () => {
      render(<LogsTable type="errors" filters={defaultFilters} onPageChange={onPageChange} />)
      await flush()
      expect(screen.getByText('Komunikat')).toBeInTheDocument()
    })

    it('renderuje komunikat błędu', async () => {
      render(<LogsTable type="errors" filters={defaultFilters} onPageChange={onPageChange} />)
      await flush()
      expect(screen.getByText('Internal Server Error')).toBeInTheDocument()
    })
  })

  describe('modal szczegółów', () => {
    beforeEach(() => {
      mockedFetch.mockResolvedValue({
        ok: true,
        json: async () => mockRequestLogs,
      } as any)
    })

    it('otwiera modal po kliknięciu wiersza', async () => {
      render(<LogsTable type="requests" filters={defaultFilters} onPageChange={onPageChange} />)
      await flush()
      fireEvent.click(screen.getByText('/api/machines'))
      expect(screen.getByTestId('log-detail-modal')).toBeInTheDocument()
    })

    it('zamyka modal po kliknięciu Zamknij', async () => {
      render(<LogsTable type="requests" filters={defaultFilters} onPageChange={onPageChange} />)
      await flush()
      fireEvent.click(screen.getByText('/api/machines'))
      fireEvent.click(screen.getByRole('button', { name: 'Zamknij' }))
      expect(screen.queryByTestId('log-detail-modal')).not.toBeInTheDocument()
    })
  })

  describe('paginacja', () => {
    beforeEach(() => {
      mockedFetch.mockResolvedValue({
        ok: true,
        json: async () => ({ ...mockRequestLogs, total: 150 }),
      } as any)
    })

    it('wyświetla info o zakresie wyników', async () => {
      render(<LogsTable type="requests" filters={defaultFilters} onPageChange={onPageChange} />)
      await flush()
      expect(screen.getByText('1–50 z 150')).toBeInTheDocument()
    })

    it('wyświetla numer strony', async () => {
      render(<LogsTable type="requests" filters={defaultFilters} onPageChange={onPageChange} />)
      await flush()
      expect(screen.getByText('1 / 3')).toBeInTheDocument()
    })

    it('przycisk "pierwsza strona" jest nieaktywny na stronie 1', async () => {
      render(<LogsTable type="requests" filters={defaultFilters} onPageChange={onPageChange} />)
      await flush()
      expect(screen.getByTitle('Pierwsza strona')).toBeDisabled()
    })

    it('przycisk "następna strona" jest aktywny gdy są kolejne strony', async () => {
      render(<LogsTable type="requests" filters={defaultFilters} onPageChange={onPageChange} />)
      await flush()
      expect(screen.getByTitle('Następna strona')).not.toBeDisabled()
    })

    it('kliknięcie "następna strona" wywołuje onPageChange', async () => {
      render(<LogsTable type="requests" filters={defaultFilters} onPageChange={onPageChange} />)
      await flush()
      fireEvent.click(screen.getByTitle('Następna strona'))
      expect(onPageChange).toHaveBeenCalledWith(50)
    })

    it('kliknięcie "ostatnia strona" wywołuje onPageChange z ostatnim offsetem', async () => {
      render(<LogsTable type="requests" filters={defaultFilters} onPageChange={onPageChange} />)
      await flush()
      fireEvent.click(screen.getByTitle('Ostatnia strona'))
      expect(onPageChange).toHaveBeenCalledWith(100)
    })
  })
})
