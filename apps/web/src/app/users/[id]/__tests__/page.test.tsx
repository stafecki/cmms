import { render, screen, fireEvent, act } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useParams, useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import UserDetailsPage from '../page'
import * as usersApi from '../../users.api'

vi.mock('@/context/AuthContext', () => ({ useAuth: vi.fn() }))
vi.mock('../../users.api', () => ({
  fetchUserById: vi.fn(),
  fetchCertifications: vi.fn(),
  updateUser: vi.fn(),
  deleteUser: vi.fn(),
  addCertification: vi.fn(),
  removeCertification: vi.fn(),
}))
vi.mock('../../components/EditUserModal', () => ({
  default: ({ isOpen, onClose }: any) =>
    isOpen ? (
      <div data-testid="edit-modal">
        <button onClick={onClose}>Zamknij edit</button>
      </div>
    ) : null,
}))
vi.mock('../../components/AddCertificationModal', () => ({
  default: ({ isOpen, onClose, onSubmit }: any) =>
    isOpen ? (
      <div data-testid="cert-modal">
        <button onClick={onClose}>Zamknij cert</button>
        <button onClick={() => onSubmit({ type: 'SEP', issuedAt: '2024-01-01T00:00:00.000Z', expiresAt: '2025-01-01T00:00:00.000Z' })}>
          Dodaj cert
        </button>
      </div>
    ) : null,
}))

const mockUseAuth = vi.mocked(useAuth)
const mockUseParams = vi.mocked(useParams)
const mockUseRouter = vi.mocked(useRouter)
const mockFetchUserById = vi.mocked(usersApi.fetchUserById)
const mockFetchCertifications = vi.mocked(usersApi.fetchCertifications)
const mockDeleteUser = vi.mocked(usersApi.deleteUser)
const mockAddCertification = vi.mocked(usersApi.addCertification)
const mockRemoveCertification = vi.mocked(usersApi.removeCertification)

const flush = () => act(async () => {})

const adminUser = { id: 'a1', name: 'Admin', email: 'admin@test.com', role: 'ADMIN' as const, isActive: true, createdAt: '' }
const managerUser = { ...adminUser, id: 'm1', role: 'MANAGER' as const }

const targetUser = {
  id: 'user-1',
  name: 'Jan Kowalski',
  email: 'jan@test.com',
  role: 'TECHNICIAN' as const,
  isActive: true,
  createdAt: '2024-01-01',
}

const sampleCert = {
  id: 'cert-1',
  userId: 'user-1',
  type: 'SEP' as const,
  issuedAt: '2024-01-01T00:00:00.000Z',
  expiresAt: '2025-01-01T00:00:00.000Z',
  isValid: true,
}

describe('UserDetailsPage', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockUseParams.mockReturnValue({ id: 'user-1' } as any)
    mockUseRouter.mockReturnValue({ back: vi.fn(), push: vi.fn() } as any)
    mockUseAuth.mockReturnValue({ user: adminUser, isLoading: false } as any)
    mockFetchUserById.mockResolvedValue(targetUser)
    mockFetchCertifications.mockResolvedValue([])
  })

  it('wyświetla stan ładowania', () => {
    mockFetchUserById.mockReturnValue(new Promise(() => {}))
    render(<UserDetailsPage />)
    expect(screen.getByText('Ładowanie...')).toBeInTheDocument()
  })

  it('wyświetla "Użytkownik nie znaleziony" gdy fetchUserById rzuci błąd', async () => {
    mockFetchUserById.mockRejectedValue(new Error('Not found'))
    render(<UserDetailsPage />)
    await flush()
    expect(screen.getByText('Użytkownik nie znaleziony')).toBeInTheDocument()
  })

  it('renderuje imię i status AKTYWNY', async () => {
    render(<UserDetailsPage />)
    await flush()
    expect(screen.getByText('Jan Kowalski')).toBeInTheDocument()
    expect(screen.getByText('AKTYWNY')).toBeInTheDocument()
  })

  it('renderuje status NIEAKTYWNY dla dezaktywowanego użytkownika', async () => {
    mockFetchUserById.mockResolvedValue({ ...targetUser, isActive: false })
    render(<UserDetailsPage />)
    await flush()
    expect(screen.getByText('NIEAKTYWNY')).toBeInTheDocument()
  })

  it('wyświetla "Brak aktywnych certyfikatów." gdy lista pusta', async () => {
    render(<UserDetailsPage />)
    await flush()
    expect(screen.getByText('Brak aktywnych certyfikatów.')).toBeInTheDocument()
  })

  it('renderuje certyfikat z typem i statusem Ważny', async () => {
    mockFetchCertifications.mockResolvedValue([sampleCert])
    render(<UserDetailsPage />)
    await flush()
    expect(screen.getByText('SEP')).toBeInTheDocument()
    expect(screen.getByText('Ważny')).toBeInTheDocument()
  })

  it('renderuje certyfikat z statusem Nieważny', async () => {
    mockFetchCertifications.mockResolvedValue([{ ...sampleCert, isValid: false }])
    render(<UserDetailsPage />)
    await flush()
    expect(screen.getByText('Nieważny')).toBeInTheDocument()
  })

  it('ADMIN widzi przycisk + Dodaj nowy', async () => {
    render(<UserDetailsPage />)
    await flush()
    expect(screen.getByText('+ Dodaj nowy')).toBeInTheDocument()
  })

  it('MANAGER nie widzi przycisku + Dodaj nowy', async () => {
    mockUseAuth.mockReturnValue({ user: managerUser, isLoading: false } as any)
    render(<UserDetailsPage />)
    await flush()
    expect(screen.queryByText('+ Dodaj nowy')).not.toBeInTheDocument()
  })

  it('ADMIN widzi Edytuj Dane i Dezaktywuj Profil gdy użytkownik aktywny', async () => {
    render(<UserDetailsPage />)
    await flush()
    expect(screen.getByText('Edytuj Dane')).toBeInTheDocument()
    expect(screen.getByText('Dezaktywuj Profil')).toBeInTheDocument()
  })

  it('Dezaktywuj Profil nie pojawia się gdy użytkownik nieaktywny', async () => {
    mockFetchUserById.mockResolvedValue({ ...targetUser, isActive: false })
    render(<UserDetailsPage />)
    await flush()
    expect(screen.queryByText('Dezaktywuj Profil')).not.toBeInTheDocument()
  })

  it('MANAGER nie widzi Edytuj Dane ani Dezaktywuj Profil', async () => {
    mockUseAuth.mockReturnValue({ user: managerUser, isLoading: false } as any)
    render(<UserDetailsPage />)
    await flush()
    expect(screen.queryByText('Edytuj Dane')).not.toBeInTheDocument()
    expect(screen.queryByText('Dezaktywuj Profil')).not.toBeInTheDocument()
  })

  it('handleDeactivate wywołuje deleteUser po potwierdzeniu', async () => {
    mockDeleteUser.mockResolvedValue(undefined)
    vi.spyOn(window, 'confirm').mockReturnValue(true)
    vi.spyOn(window, 'alert').mockImplementation(() => {})
    render(<UserDetailsPage />)
    await flush()
    await act(async () => {
      fireEvent.click(screen.getByText('Dezaktywuj Profil'))
    })
    expect(mockDeleteUser).toHaveBeenCalledWith('user-1')
  })

  it('handleDeactivate nie wywołuje deleteUser po anulowaniu', async () => {
    vi.spyOn(window, 'confirm').mockReturnValue(false)
    render(<UserDetailsPage />)
    await flush()
    fireEvent.click(screen.getByText('Dezaktywuj Profil'))
    expect(mockDeleteUser).not.toHaveBeenCalled()
  })

  it('handleDeleteCert wywołuje removeCertification po potwierdzeniu', async () => {
    mockFetchCertifications.mockResolvedValue([sampleCert])
    mockRemoveCertification.mockResolvedValue(undefined)
    vi.spyOn(window, 'confirm').mockReturnValue(true)
    render(<UserDetailsPage />)
    await flush()
    await act(async () => {
      fireEvent.click(screen.getByText('usuń'))
    })
    expect(mockRemoveCertification).toHaveBeenCalledWith('user-1', 'cert-1')
  })

  it('handleDeleteCert nie usuwa po anulowaniu', async () => {
    mockFetchCertifications.mockResolvedValue([sampleCert])
    vi.spyOn(window, 'confirm').mockReturnValue(false)
    render(<UserDetailsPage />)
    await flush()
    fireEvent.click(screen.getByText('usuń'))
    expect(mockRemoveCertification).not.toHaveBeenCalled()
  })

  it('otwiera i zamyka EditUserModal', async () => {
    render(<UserDetailsPage />)
    await flush()
    fireEvent.click(screen.getByText('Edytuj Dane'))
    expect(screen.getByTestId('edit-modal')).toBeInTheDocument()
    fireEvent.click(screen.getByText('Zamknij edit'))
    expect(screen.queryByTestId('edit-modal')).not.toBeInTheDocument()
  })

  it('otwiera i zamyka AddCertificationModal', async () => {
    render(<UserDetailsPage />)
    await flush()
    fireEvent.click(screen.getByText('+ Dodaj nowy'))
    expect(screen.getByTestId('cert-modal')).toBeInTheDocument()
    fireEvent.click(screen.getByText('Zamknij cert'))
    expect(screen.queryByTestId('cert-modal')).not.toBeInTheDocument()
  })

  it('handleAddCert wywołuje addCertification i dodaje certyfikat do listy', async () => {
    const newCert = { ...sampleCert, id: 'cert-2' }
    mockAddCertification.mockResolvedValue(newCert)
    render(<UserDetailsPage />)
    await flush()
    fireEvent.click(screen.getByText('+ Dodaj nowy'))
    await act(async () => {
      fireEvent.click(screen.getByText('Dodaj cert'))
    })
    expect(mockAddCertification).toHaveBeenCalledWith('user-1', {
      type: 'SEP',
      issuedAt: '2024-01-01T00:00:00.000Z',
      expiresAt: '2025-01-01T00:00:00.000Z',
    })
  })
})
