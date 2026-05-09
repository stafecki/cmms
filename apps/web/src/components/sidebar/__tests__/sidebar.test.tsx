import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import Sidebar from '../sidebar'

vi.mock('next/link', () => ({
  default: ({ href, children, onClick }: any) => (
    <a href={href} onClick={onClick}>
      {children}
    </a>
  ),
}))

describe('Sidebar', () => {
  beforeEach(() => {
    document.body.style.overflow = ''
    vi.clearAllMocks()
  })

  describe('zamknięty (isOpen=false)', () => {
    it('renderuje element aside', () => {
      render(<Sidebar isOpen={false} onClose={vi.fn()} />)
      expect(screen.getByRole('complementary')).toBeInTheDocument()
    })

    it('nie blokuje scrolla', () => {
      render(<Sidebar isOpen={false} onClose={vi.fn()} />)
      expect(document.body.style.overflow).toBe('unset')
    })

    it('renderuje wszystkie pozycje menu', () => {
      render(<Sidebar isOpen={false} onClose={vi.fn()} />)
      const expectedItems = [
        { name: 'Panel główny', href: '/dashboard' },
        { name: 'Maszyny', href: '/machines' },
        { name: 'Lokalizacje', href: '/locations' },
        { name: 'Zlecenia pracy', href: '/work-orders' },
        { name: 'Magazyn', href: '/inventory' },
        { name: 'Przeglądy', href: '/preventive' },
        { name: 'Powiadomienia', href: '/notifications' },
        { name: 'Monitoring', href: '/monitoring' },
        { name: 'Mój profil', href: '/me' },
        { name: 'Użytkownicy', href: '/users' },
      ]
      expectedItems.forEach(({ name, href }) => {
        const link = screen.getByRole('link', { name })
        expect(link).toHaveAttribute('href', href)
      })
    })

    it('renderuje nagłówek Menu', () => {
      render(<Sidebar isOpen={false} onClose={vi.fn()} />)
      expect(screen.getByRole('heading', { name: /menu/i })).toBeInTheDocument()
    })

    it('renderuje wersję systemu', () => {
      render(<Sidebar isOpen={false} onClose={vi.fn()} />)
      expect(screen.getByText('System CMMS v1.0')).toBeInTheDocument()
    })
  })

  describe('otwarty (isOpen=true)', () => {
    it('blokuje scroll na body', () => {
      render(<Sidebar isOpen={true} onClose={vi.fn()} />)
      expect(document.body.style.overflow).toBe('hidden')
    })
  })

  describe('interakcje', () => {
    it('kliknięcie przycisku zamknięcia wywołuje onClose', () => {
      const onClose = vi.fn()
      render(<Sidebar isOpen={true} onClose={onClose} />)
      fireEvent.click(screen.getByRole('button'))
      expect(onClose).toHaveBeenCalledTimes(1)
    })

    it('kliknięcie overlay wywołuje onClose', () => {
      const onClose = vi.fn()
      const { container } = render(<Sidebar isOpen={true} onClose={onClose} />)
      const overlay = container.firstChild as HTMLElement
      fireEvent.click(overlay)
      expect(onClose).toHaveBeenCalledTimes(1)
    })

    it('kliknięcie linku menu wywołuje onClose', () => {
      const onClose = vi.fn()
      render(<Sidebar isOpen={true} onClose={onClose} />)
      fireEvent.click(screen.getByRole('link', { name: 'Panel główny' }))
      expect(onClose).toHaveBeenCalledTimes(1)
    })

    it('odmontowanie resetuje overflow body', () => {
      const { unmount } = render(<Sidebar isOpen={true} onClose={vi.fn()} />)
      expect(document.body.style.overflow).toBe('hidden')
      unmount()
      expect(document.body.style.overflow).toBe('unset')
    })
  })
})
