import { render, screen, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import MachinesLayout from '../layout'

const mockPush = vi.fn()

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: mockPush }),
}))

vi.mock('js-cookie', () => ({
  default: { get: vi.fn() },
}))

import Cookies from 'js-cookie'

describe('MachinesLayout', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('nie renderuje children gdy brak tokenu', () => {
    vi.mocked(Cookies.get).mockReturnValue(undefined)
    render(<MachinesLayout><div data-testid="child" /></MachinesLayout>)
    expect(screen.queryByTestId('child')).not.toBeInTheDocument()
  })

  it('przekierowuje do /auth/login gdy brak tokenu', async () => {
    vi.mocked(Cookies.get).mockReturnValue(undefined)
    render(<MachinesLayout><div data-testid="child" /></MachinesLayout>)
    await waitFor(() => expect(mockPush).toHaveBeenCalledWith('/auth/login'))
  })

  it('renderuje children gdy token istnieje', async () => {
    vi.mocked(Cookies.get).mockReturnValue('valid-token')
    render(<MachinesLayout><div data-testid="child" /></MachinesLayout>)
    await waitFor(() => expect(screen.getByTestId('child')).toBeInTheDocument())
  })
})
