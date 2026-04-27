import { renderHook, act, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import Cookies from 'js-cookie'
import { useInventory } from '../useInventory'
import { Part } from '../types'

vi.mock('js-cookie', () => ({
  default: { get: vi.fn() },
}))

const mockedFetch = vi.fn()
vi.stubGlobal('fetch', mockedFetch)

const mockedCookiesGet = vi.mocked(Cookies.get) as any

const makePart = (overrides: Partial<Part> = {}): Part => ({
  id: '1',
  name: 'Śruba M8',
  qrCode: 'QR-001',
  stockQuantity: 10,
  reorderPoint: 5,
  unitPrice: 2.5,
  category: { id: 'cat-1', name: 'Złączniki' },
  ...overrides,
})

const makeOkResponse = (data: unknown) => ({
  ok: true,
  status: 200,
  json: async () => data,
})

const makeAllOkFetch = (parts: Part[] = []) => {
  mockedFetch.mockResolvedValue(makeOkResponse(parts))
}

describe('useInventory', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockedCookiesGet.mockReturnValue('token')
  })

  describe('stan początkowy', () => {
    it('loading jest true na początku', () => {
      mockedFetch.mockReturnValue(new Promise(() => {}))
      const { result } = renderHook(() => useInventory())
      expect(result.current.loading).toBe(true)
    })

    it('parts jest pustą tablicą na początku', () => {
      mockedFetch.mockReturnValue(new Promise(() => {}))
      const { result } = renderHook(() => useInventory())
      expect(result.current.parts).toEqual([])
    })
  })

  describe('fetchData', () => {
    it('wywołuje wszystkie 5 endpointów', async () => {
      makeAllOkFetch()
      renderHook(() => useInventory())
      await waitFor(() => {
        expect(mockedFetch).toHaveBeenCalledTimes(5)
      })
    })

    it('ustawia parts po załadowaniu', async () => {
      const parts = [makePart()]
      mockedFetch.mockResolvedValue(makeOkResponse(parts))
      const { result } = renderHook(() => useInventory())
      await waitFor(() => expect(result.current.loading).toBe(false))
      expect(result.current.parts).toEqual(parts)
    })

    it('ustawia loading false po zakończeniu', async () => {
      makeAllOkFetch()
      const { result } = renderHook(() => useInventory())
      await waitFor(() => expect(result.current.loading).toBe(false))
    })

    it('używa accessToken z cookies w nagłówku Authorization', async () => {
      makeAllOkFetch()
      renderHook(() => useInventory())
      await waitFor(() => {
        expect(mockedFetch).toHaveBeenCalledWith(
          expect.stringContaining('inventory'),
          expect.objectContaining({
            headers: expect.objectContaining({ Authorization: 'Bearer token' }),
          }),
        )
      })
    })
  })

  describe('filteredParts', () => {
    const parts = [
      makePart({ id: '1', name: 'Śruba M8', stockQuantity: 10, unitPrice: 2.5, category: { id: 'cat-1', name: 'Złączniki' } }),
      makePart({ id: '2', name: 'Nakrętka M8', stockQuantity: 3, unitPrice: 1.0, category: { id: 'cat-2', name: 'Nakrętki' } }),
      makePart({ id: '3', name: 'Podkładka', stockQuantity: 20, unitPrice: 0.5, category: { id: 'cat-1', name: 'Złączniki' } }),
    ]

    beforeEach(() => {
      mockedFetch.mockResolvedValue(makeOkResponse(parts))
    })

    it('zwraca wszystkie parts gdy brak filtrów', async () => {
      const { result } = renderHook(() => useInventory())
      await waitFor(() => expect(result.current.loading).toBe(false))
      expect(result.current.filteredParts).toHaveLength(3)
    })

    it('filtruje po searchQuery', async () => {
      const { result } = renderHook(() => useInventory())
      await waitFor(() => expect(result.current.loading).toBe(false))
      act(() => result.current.setSearchQuery('śruba'))
      expect(result.current.filteredParts).toHaveLength(1)
      expect(result.current.filteredParts[0].name).toBe('Śruba M8')
    })

    it('filtruje po kategorii', async () => {
      const { result } = renderHook(() => useInventory())
      await waitFor(() => expect(result.current.loading).toBe(false))
      act(() => result.current.setFilterCategory('cat-1'))
      expect(result.current.filteredParts).toHaveLength(2)
    })

    it('filtruje po priceFrom', async () => {
      const { result } = renderHook(() => useInventory())
      await waitFor(() => expect(result.current.loading).toBe(false))
      act(() => result.current.setPriceFrom(2))
      expect(result.current.filteredParts).toHaveLength(1)
      expect(result.current.filteredParts[0].name).toBe('Śruba M8')
    })

    it('filtruje po priceTo', async () => {
      const { result } = renderHook(() => useInventory())
      await waitFor(() => expect(result.current.loading).toBe(false))
      act(() => result.current.setPriceTo(1))
      expect(result.current.filteredParts).toHaveLength(2)
    })

    it('filtruje po minStock', async () => {
      const { result } = renderHook(() => useInventory())
      await waitFor(() => expect(result.current.loading).toBe(false))
      act(() => result.current.setMinStock(10))
      expect(result.current.filteredParts).toHaveLength(2)
    })
  })

  describe('handleReturn', () => {
    it('wywołuje PATCH na właściwym endpoincie', async () => {
      makeAllOkFetch()
      const { result } = renderHook(() => useInventory())
      await waitFor(() => expect(result.current.loading).toBe(false))
      mockedFetch.mockResolvedValue({ ok: true })
      await act(() => result.current.handleReturn('loan-1'))
      expect(mockedFetch).toHaveBeenCalledWith(
        'http://localhost:3000/inventory/loans/loan-1/return',
        expect.objectContaining({ method: 'PATCH' }),
      )
    })

    it('odświeża dane po pomyślnym zwrocie', async () => {
      makeAllOkFetch()
      const { result } = renderHook(() => useInventory())
      await waitFor(() => expect(result.current.loading).toBe(false))
      const callsBefore = mockedFetch.mock.calls.length
      mockedFetch.mockResolvedValue({ ok: true })
      await act(() => result.current.handleReturn('loan-1'))
      await waitFor(() => expect(mockedFetch.mock.calls.length).toBeGreaterThan(callsBefore))
    })
  })

  describe('handleLoan', () => {
    it('wywołuje POST na właściwym endpoincie z partId', async () => {
      makeAllOkFetch()
      const { result } = renderHook(() => useInventory())
      await waitFor(() => expect(result.current.loading).toBe(false))
      mockedFetch.mockResolvedValue({ ok: true })
      await act(() => result.current.handleLoan('part-1'))
      expect(mockedFetch).toHaveBeenCalledWith(
        'http://localhost:3000/inventory/loans',
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify({ partId: 'part-1' }),
        }),
      )
    })

    it('wywołuje alert gdy API zwróci błąd', async () => {
      makeAllOkFetch()
      const alertMock = vi.spyOn(window, 'alert').mockImplementation(() => {})
      const { result } = renderHook(() => useInventory())
      await waitFor(() => expect(result.current.loading).toBe(false))
      mockedFetch.mockResolvedValue({
        ok: false,
        json: async () => ({ message: 'Brak na stanie' }),
      })
      await act(() => result.current.handleLoan('part-1'))
      expect(alertMock).toHaveBeenCalledWith('Błąd: Brak na stanie')
      alertMock.mockRestore()
    })
  })
})
