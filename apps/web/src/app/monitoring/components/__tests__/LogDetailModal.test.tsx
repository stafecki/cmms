import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import LogDetailModal from '../Logdetailmodal'

const requestEntry = {
  _id: 'req-123',
  method: 'GET',
  url: '/api/machines',
  statusCode: 200,
  duration: 45,
  userId: 'user-abc',
  ip: '192.168.1.1',
  userAgent: 'Mozilla/5.0',
  createdAt: '2024-03-15T10:30:00.000Z',
}

const errorEntry = {
  _id: 'err-456',
  message: 'Internal Server Error',
  stack: 'Error: Internal Server Error\n  at handler.js:42',
  statusCode: 500,
  url: '/api/users',
  method: 'POST',
  userId: 'user-xyz',
  ip: '10.0.0.1',
  createdAt: '2024-03-15T11:00:00.000Z',
}

describe('LogDetailModal', () => {
  const onClose = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('żądania HTTP', () => {
    it('wyświetla nagłówek "Szczegóły żądania"', () => {
      render(<LogDetailModal entry={requestEntry} type="requests" onClose={onClose} />)
      expect(screen.getByText('Szczegóły żądania')).toBeInTheDocument()
    })

    it('wyświetla ID wpisu', () => {
      render(<LogDetailModal entry={requestEntry} type="requests" onClose={onClose} />)
      expect(screen.getByText('req-123')).toBeInTheDocument()
    })

    it('wyświetla metodę HTTP', () => {
      render(<LogDetailModal entry={requestEntry} type="requests" onClose={onClose} />)
      expect(screen.getAllByText('GET').length).toBeGreaterThan(0)
    })

    it('wyświetla URL żądania', () => {
      render(<LogDetailModal entry={requestEntry} type="requests" onClose={onClose} />)
      expect(screen.getAllByText('/api/machines').length).toBeGreaterThan(0)
    })

    it('wyświetla kod statusu', () => {
      render(<LogDetailModal entry={requestEntry} type="requests" onClose={onClose} />)
      expect(screen.getAllByText('200').length).toBeGreaterThan(0)
    })

    it('wyświetla czas odpowiedzi w ms', () => {
      render(<LogDetailModal entry={requestEntry} type="requests" onClose={onClose} />)
      expect(screen.getByText('45ms')).toBeInTheDocument()
    })

    it('wyświetla IP klienta', () => {
      render(<LogDetailModal entry={requestEntry} type="requests" onClose={onClose} />)
      expect(screen.getByText('192.168.1.1')).toBeInTheDocument()
    })

    it('wyświetla ID użytkownika', () => {
      render(<LogDetailModal entry={requestEntry} type="requests" onClose={onClose} />)
      expect(screen.getByText('user-abc')).toBeInTheDocument()
    })

    it('wyświetla User Agent', () => {
      render(<LogDetailModal entry={requestEntry} type="requests" onClose={onClose} />)
      expect(screen.getByText('Mozilla/5.0')).toBeInTheDocument()
    })

    it('wyświetla surowe dane JSON', () => {
      render(<LogDetailModal entry={requestEntry} type="requests" onClose={onClose} />)
      expect(screen.getByText(/Surowe dane/)).toBeInTheDocument()
    })
  })

  describe('błędy', () => {
    it('wyświetla nagłówek "Szczegóły błędu"', () => {
      render(<LogDetailModal entry={errorEntry} type="errors" onClose={onClose} />)
      expect(screen.getByText('Szczegóły błędu')).toBeInTheDocument()
    })

    it('wyświetla komunikat błędu', () => {
      render(<LogDetailModal entry={errorEntry} type="errors" onClose={onClose} />)
      expect(screen.getByText('Internal Server Error')).toBeInTheDocument()
    })

    it('wyświetla stack trace', () => {
      render(<LogDetailModal entry={errorEntry} type="errors" onClose={onClose} />)
      expect(screen.getAllByText(/at handler\.js:42/).length).toBeGreaterThan(0)
    })

    it('wyświetla sekcję "Stack trace"', () => {
      render(<LogDetailModal entry={errorEntry} type="errors" onClose={onClose} />)
      expect(screen.getByText('Stack trace')).toBeInTheDocument()
    })

    it('nie wyświetla sekcji stack trace gdy brak stosu', () => {
      const entryWithoutStack = { ...errorEntry, stack: undefined }
      render(<LogDetailModal entry={entryWithoutStack} type="errors" onClose={onClose} />)
      expect(screen.queryByText('Stack trace')).not.toBeInTheDocument()
    })
  })

  describe('zamykanie', () => {
    it('kliknięcie przycisku zamknij wywołuje onClose', () => {
      render(<LogDetailModal entry={requestEntry} type="requests" onClose={onClose} />)
      fireEvent.click(screen.getByTitle('Zamknij (Esc)'))
      expect(onClose).toHaveBeenCalledTimes(1)
    })

    it('kliknięcie overlay wywołuje onClose', () => {
      const { container } = render(<LogDetailModal entry={requestEntry} type="requests" onClose={onClose} />)
      fireEvent.click(container.firstChild as HTMLElement)
      expect(onClose).toHaveBeenCalledTimes(1)
    })

    it('kliknięcie treści modala nie wywołuje onClose', () => {
      render(<LogDetailModal entry={requestEntry} type="requests" onClose={onClose} />)
      fireEvent.click(screen.getByText('Szczegóły żądania'))
      expect(onClose).not.toHaveBeenCalled()
    })

    it('naciśnięcie Escape wywołuje onClose', () => {
      render(<LogDetailModal entry={requestEntry} type="requests" onClose={onClose} />)
      fireEvent.keyDown(window, { key: 'Escape' })
      expect(onClose).toHaveBeenCalledTimes(1)
    })

    it('usuwa listener klawiatury po odmontowaniu', () => {
      const { unmount } = render(<LogDetailModal entry={requestEntry} type="requests" onClose={onClose} />)
      unmount()
      fireEvent.keyDown(window, { key: 'Escape' })
      expect(onClose).not.toHaveBeenCalled()
    })
  })
})
