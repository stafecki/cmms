import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import About from '../page'

const observeMock = vi.fn()
const unobserveMock = vi.fn()
let intersectionCallback: (entries: IntersectionObserverEntry[]) => void
let capturedOptions: IntersectionObserverInit | undefined

class IntersectionObserverMock {
  constructor(
    callback: (entries: IntersectionObserverEntry[]) => void,
    options?: IntersectionObserverInit,
  ) {
    intersectionCallback = callback
    capturedOptions = options
  }
  observe = observeMock
  unobserve = unobserveMock
  disconnect = vi.fn()
}

vi.stubGlobal('IntersectionObserver', IntersectionObserverMock)

describe('About', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('treść', () => {
    it('renderuje nagłówek główny', () => {
      render(<About />)
      expect(screen.getByRole('heading', { level: 1, name: 'O aplikacji CMMS' })).toBeInTheDocument()
    })

    it('renderuje nagłówek sekcji funkcjonalności', () => {
      render(<About />)
      expect(screen.getByRole('heading', { name: 'Najważniejsze funkcjonalności' })).toBeInTheDocument()
    })

    it('renderuje nagłówek sekcji dla kogo', () => {
      render(<About />)
      expect(screen.getByRole('heading', { name: 'Dla kogo przeznaczony jest system' })).toBeInTheDocument()
    })

    it('renderuje nagłówek sekcji korzyści', () => {
      render(<About />)
      expect(screen.getByRole('heading', { name: 'Korzyści z używania systemu' })).toBeInTheDocument()
    })

    it('renderuje nagłówek sekcji informacji o projekcie', () => {
      render(<About />)
      expect(screen.getByRole('heading', { name: 'Informacje o projekcie' })).toBeInTheDocument()
    })

    it('renderuje pozycje listy funkcjonalności', () => {
      render(<About />)
      expect(screen.getByText('zarządzanie maszynami i urządzeniami')).toBeInTheDocument()
      expect(screen.getByText('rejestrowanie zgłoszeń usterek')).toBeInTheDocument()
      expect(screen.getByText('planowanie przeglądów technicznych')).toBeInTheDocument()
      expect(screen.getByText('prowadzenie historii napraw i serwisów')).toBeInTheDocument()
      expect(screen.getByText('zarządzanie użytkownikami systemu')).toBeInTheDocument()
    })

    it('renderuje pozycje listy korzyści', () => {
      render(<About />)
      expect(screen.getByText('lepsza kontrola nad stanem technicznym maszyn')).toBeInTheDocument()
      expect(screen.getByText('szybsze reagowanie na awarie')).toBeInTheDocument()
      expect(screen.getByText('łatwy dostęp do historii serwisowej')).toBeInTheDocument()
      expect(screen.getByText('uporządkowana dokumentacja techniczna')).toBeInTheDocument()
    })
  })

  describe('IntersectionObserver', () => {
    it('tworzy IntersectionObserver z progiem 0.5', () => {
      render(<About />)
      expect(capturedOptions).toEqual({ threshold: 0.5 })
    })

    it('obserwuje wszystkie 5 sekcji', () => {
      render(<About />)
      expect(observeMock).toHaveBeenCalledTimes(5)
    })

    it('dodaje klasę visible gdy sekcja jest widoczna', () => {
      render(<About />)
      const section = screen.getByRole('heading', { level: 1 }).closest('section')!
      intersectionCallback([{ isIntersecting: true, target: section } as unknown as IntersectionObserverEntry])
      expect(section.classList.contains('visible')).toBe(true)
    })

    it('nie dodaje klasy visible gdy sekcja nie jest widoczna', () => {
      render(<About />)
      const section = screen.getByRole('heading', { level: 1 }).closest('section')!
      intersectionCallback([{ isIntersecting: false, target: section } as unknown as IntersectionObserverEntry])
      expect(section.classList.contains('visible')).toBe(false)
    })

    it('przestaje obserwować sekcję po jej wyświetleniu', () => {
      render(<About />)
      const section = screen.getByRole('heading', { level: 1 }).closest('section')!
      intersectionCallback([{ isIntersecting: true, target: section } as unknown as IntersectionObserverEntry])
      expect(unobserveMock).toHaveBeenCalledWith(section)
    })

    it('przestaje obserwować sekcje po odmontowaniu', () => {
      const { unmount } = render(<About />)
      unmount()
      expect(unobserveMock).toHaveBeenCalledTimes(5)
    })
  })
})
