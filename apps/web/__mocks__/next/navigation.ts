import { vi } from 'vitest'

export const useRouter = vi.fn(() => ({
  push: vi.fn(),
  back: vi.fn(),
  replace: vi.fn(),
  refresh: vi.fn(),
  forward: vi.fn(),
  prefetch: vi.fn(),
}))
export const useParams = vi.fn(() => ({}))
export const useSearchParams = vi.fn(() => ({ get: vi.fn(() => null) }))
export const usePathname = vi.fn(() => '/')
export const redirect = vi.fn()
export const notFound = vi.fn()
