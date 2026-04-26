import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import LoggedInView from '../loggedInView'

vi.mock('next/link', () => ({
  default: ({ href, children, ...props }: any) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}))

describe('LoggedInView', () => {
  it('renderuje burger z trzema spanami', () => {
    const { container } = render(<LoggedInView onOpenSidebar={vi.fn()} />)
    expect(container.querySelectorAll('span')).toHaveLength(3)
  })

  it('kliknięcie burgera wywołuje onOpenSidebar', () => {
    const onOpenSidebar = vi.fn()
    const { container } = render(<LoggedInView onOpenSidebar={onOpenSidebar} />)
    fireEvent.click(container.querySelector('span')!.parentElement!.parentElement!)
    expect(onOpenSidebar).toHaveBeenCalledTimes(1)
  })

  it('renderuje link do /dashboard z poprawnym tekstem', () => {
    render(<LoggedInView onOpenSidebar={vi.fn()} />)
    const link = screen.getByRole('link', { name: 'Panel główny' })
    expect(link).toHaveAttribute('href', '/dashboard')
  })

  it('renderuje link do /me z poprawnym tekstem', () => {
    render(<LoggedInView onOpenSidebar={vi.fn()} />)
    const link = screen.getByRole('link', { name: 'Mój profil' })
    expect(link).toHaveAttribute('href', '/me')
  })
})
