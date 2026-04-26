import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import LoggedOutView from '../loggedOutView'

vi.mock('next/link', () => ({
  default: ({ href, children, ...props }: any) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}))

describe('LoggedOutView', () => {
  it('renderuje link do strony głównej', () => {
    render(<LoggedOutView />)
    const link = screen.getByRole('link', { name: 'Strona główna' })
    expect(link).toHaveAttribute('href', '/')
  })

  it('renderuje link do strony O nas', () => {
    render(<LoggedOutView />)
    const link = screen.getByRole('link', { name: 'O nas' })
    expect(link).toHaveAttribute('href', '/about')
  })
})
