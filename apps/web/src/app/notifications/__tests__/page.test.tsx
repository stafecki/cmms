import { render, screen, fireEvent, act } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useAuth } from '@/context/AuthContext'
import NotificationsPage from '../page'
import * as notificationsApi from '../notifications.api'
import * as usersApi from '../../users/users.api'

vi.mock('@/context/AuthContext', () => ({
  useAuth: vi.fn(),
}))

vi.mock('../notifications.api', () => ({
  fetchMyNotifications: vi.fn(),
  fetchAllNotifications: vi.fn(),
  markAsRead: vi.fn(),
  markAllAsRead: vi.fn(),
  deleteNotification: vi.fn(),
  createNotification: vi.fn(),
  createAnnouncement: vi.fn(),
}))

vi.mock('../../users/users.api', () => ({
  fetchUsers: vi.fn(),
}))

const mockedUseAuth = vi.mocked(useAuth)
const mockedFetchMy = vi.mocked(notificationsApi.fetchMyNotifications)
const mockedFetchAll = vi.mocked(notificationsApi.fetchAllNotifications)
const mockedMarkAsRead = vi.mocked(notificationsApi.markAsRead)
const mockedMarkAllAsRead = vi.mocked(notificationsApi.markAllAsRead)
const mockedDeleteNotification = vi.mocked(notificationsApi.deleteNotification)
const mockedCreateNotification = vi.mocked(notificationsApi.createNotification)
const mockedCreateAnnouncement = vi.mocked(notificationsApi.createAnnouncement)
const mockedFetchUsers = vi.mocked(usersApi.fetchUsers)

const adminUser = { id: '1', name: 'Admin', email: 'a@test.com', role: 'ADMIN' as const }
const managerUser = { id: '2', name: 'Mgr', email: 'm@test.com', role: 'MANAGER' as const }
const operatorUser = { id: '3', name: 'Op', email: 'o@test.com', role: 'OPERATOR' as const }

const mockUnread = {
  id: 'notif-1',
  userId: 'user-1',
  type: 'CRITICAL_FAILURE' as const,
  title: 'Awaria maszyny',
  message: 'Maszyna wymaga naprawy',
  isRead: false,
  createdAt: '2024-03-15T10:30:00.000Z',
}

const mockRead = {
  id: 'notif-2',
  userId: 'user-1',
  type: 'ANNOUNCEMENT' as const,
  title: 'Ogłoszenie ogólne',
  message: 'Ważne ogłoszenie',
  isRead: true,
  createdAt: '2024-03-14T09:00:00.000Z',
}

const mockWithUser = {
  ...mockUnread,
  id: 'notif-3',
  user: { id: 'user-1', name: 'Jan Kowalski', email: 'jan@test.com' },
}

async function flush() {
  await act(async () => {})
}

describe('NotificationsPage', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockedFetchMy.mockResolvedValue([])
    mockedFetchAll.mockResolvedValue([])
    mockedFetchUsers.mockResolvedValue({ data: [] } as any)
  })

  describe('stan autoryzacji', () => {
    it('wyświetla "Weryfikacja sesji..." podczas ładowania auth', () => {
      mockedUseAuth.mockReturnValue({ user: null, isLoading: true, logout: vi.fn() })
      render(<NotificationsPage />)
      expect(screen.getByText('Weryfikacja sesji...')).toBeInTheDocument()
    })

    it('nie ładuje powiadomień podczas ładowania auth', () => {
      mockedUseAuth.mockReturnValue({ user: null, isLoading: true, logout: vi.fn() })
      render(<NotificationsPage />)
      expect(mockedFetchMy).not.toHaveBeenCalled()
    })

    it('wyświetla błąd autoryzacji gdy brak użytkownika', async () => {
      mockedUseAuth.mockReturnValue({ user: null, isLoading: false, logout: vi.fn() })
      render(<NotificationsPage />)
      await flush()
      expect(screen.getByText('Brak autoryzacji. Zaloguj się ponownie.')).toBeInTheDocument()
    })
  })

  describe('stan ładowania powiadomień', () => {
    it('wyświetla "Ładowanie powiadomień..." podczas pobierania', async () => {
      mockedUseAuth.mockReturnValue({ user: adminUser, isLoading: false, logout: vi.fn() })
      mockedFetchMy.mockReturnValue(new Promise(() => {}))
      render(<NotificationsPage />)
      expect(screen.getByText('Ładowanie powiadomień...')).toBeInTheDocument()
    })
  })

  describe('stan błędu', () => {
    it('wyświetla błąd gdy fetchMyNotifications rzuci wyjątek', async () => {
      mockedUseAuth.mockReturnValue({ user: operatorUser, isLoading: false, logout: vi.fn() })
      mockedFetchMy.mockRejectedValue(new Error('Network error'))
      render(<NotificationsPage />)
      await flush()
      expect(screen.getByText('Nie udało się pobrać powiadomień.')).toBeInTheDocument()
    })
  })

  describe('pusta lista', () => {
    it('wyświetla "Brak powiadomień." gdy lista pusta', async () => {
      mockedUseAuth.mockReturnValue({ user: operatorUser, isLoading: false, logout: vi.fn() })
      mockedFetchMy.mockResolvedValue([])
      render(<NotificationsPage />)
      await flush()
      expect(screen.getByText('Brak powiadomień.')).toBeInTheDocument()
    })
  })

  describe('renderowanie powiadomień', () => {
    beforeEach(() => {
      mockedUseAuth.mockReturnValue({ user: operatorUser, isLoading: false, logout: vi.fn() })
      mockedFetchMy.mockResolvedValue([mockUnread, mockRead])
    })

    it('wyświetla tytuł powiadomienia', async () => {
      render(<NotificationsPage />)
      await flush()
      expect(screen.getByText('Awaria maszyny')).toBeInTheDocument()
    })

    it('wyświetla treść powiadomienia', async () => {
      render(<NotificationsPage />)
      await flush()
      expect(screen.getByText('Maszyna wymaga naprawy')).toBeInTheDocument()
    })

    it('wyświetla typ powiadomienia jako tag', async () => {
      render(<NotificationsPage />)
      await flush()
      expect(screen.getByText('Awaria krytyczna')).toBeInTheDocument()
    })
  })

  describe('akcje na powiadomieniach (zakładka MY)', () => {
    beforeEach(() => {
      mockedUseAuth.mockReturnValue({ user: operatorUser, isLoading: false, logout: vi.fn() })
      mockedFetchMy.mockResolvedValue([mockUnread])
    })

    it('wyświetla przycisk "Przeczytane" dla nieprzeczytanego powiadomienia', async () => {
      render(<NotificationsPage />)
      await flush()
      expect(screen.getByRole('button', { name: /Przeczytane/ })).toBeInTheDocument()
    })

    it('nie wyświetla "Przeczytane" dla przeczytanego powiadomienia', async () => {
      mockedFetchMy.mockResolvedValue([mockRead])
      render(<NotificationsPage />)
      await flush()
      expect(screen.queryByRole('button', { name: /Przeczytane/ })).not.toBeInTheDocument()
    })

    it('wyświetla przycisk "Usuń"', async () => {
      render(<NotificationsPage />)
      await flush()
      expect(screen.getByRole('button', { name: 'Usuń' })).toBeInTheDocument()
    })

    it('kliknięcie "Przeczytane" wywołuje markAsRead z poprawnym id', async () => {
      mockedMarkAsRead.mockResolvedValue({ ...mockUnread, isRead: true })
      render(<NotificationsPage />)
      await flush()
      fireEvent.click(screen.getByRole('button', { name: /Przeczytane/ }))
      await flush()
      expect(mockedMarkAsRead).toHaveBeenCalledWith('notif-1')
    })

    it('po oznaczeniu jako przeczytane przycisk "Przeczytane" znika', async () => {
      mockedMarkAsRead.mockResolvedValue({ ...mockUnread, isRead: true })
      render(<NotificationsPage />)
      await flush()
      fireEvent.click(screen.getByRole('button', { name: /Przeczytane/ }))
      await flush()
      expect(screen.queryByRole('button', { name: /Przeczytane/ })).not.toBeInTheDocument()
    })

    it('kliknięcie "Usuń" z potwierdzeniem wywołuje deleteNotification', async () => {
      vi.spyOn(window, 'confirm').mockReturnValue(true)
      mockedDeleteNotification.mockResolvedValue()
      render(<NotificationsPage />)
      await flush()
      fireEvent.click(screen.getByRole('button', { name: 'Usuń' }))
      await flush()
      expect(mockedDeleteNotification).toHaveBeenCalledWith('notif-1')
    })

    it('kliknięcie "Usuń" z anulowaniem nie wywołuje deleteNotification', async () => {
      vi.spyOn(window, 'confirm').mockReturnValue(false)
      render(<NotificationsPage />)
      await flush()
      fireEvent.click(screen.getByRole('button', { name: 'Usuń' }))
      await flush()
      expect(mockedDeleteNotification).not.toHaveBeenCalled()
    })

    it('po usunięciu powiadomienie znika z listy', async () => {
      vi.spyOn(window, 'confirm').mockReturnValue(true)
      mockedDeleteNotification.mockResolvedValue()
      render(<NotificationsPage />)
      await flush()
      fireEvent.click(screen.getByRole('button', { name: 'Usuń' }))
      await flush()
      expect(screen.queryByText('Awaria maszyny')).not.toBeInTheDocument()
    })
  })

  describe('oznacz wszystkie jako przeczytane', () => {
    it('wyświetla przycisk "Oznacz wszystkie" gdy są nieprzeczytane', async () => {
      mockedUseAuth.mockReturnValue({ user: operatorUser, isLoading: false, logout: vi.fn() })
      mockedFetchMy.mockResolvedValue([mockUnread])
      render(<NotificationsPage />)
      await flush()
      expect(screen.getByRole('button', { name: 'Oznacz wszystkie jako przeczytane' })).toBeInTheDocument()
    })

    it('nie wyświetla przycisku gdy wszystkie przeczytane', async () => {
      mockedUseAuth.mockReturnValue({ user: operatorUser, isLoading: false, logout: vi.fn() })
      mockedFetchMy.mockResolvedValue([mockRead])
      render(<NotificationsPage />)
      await flush()
      expect(screen.queryByRole('button', { name: 'Oznacz wszystkie jako przeczytane' })).not.toBeInTheDocument()
    })

    it('kliknięcie wywołuje markAllAsRead', async () => {
      mockedUseAuth.mockReturnValue({ user: operatorUser, isLoading: false, logout: vi.fn() })
      mockedFetchMy.mockResolvedValue([mockUnread])
      mockedMarkAllAsRead.mockResolvedValue()
      render(<NotificationsPage />)
      await flush()
      fireEvent.click(screen.getByRole('button', { name: 'Oznacz wszystkie jako przeczytane' }))
      await flush()
      expect(mockedMarkAllAsRead).toHaveBeenCalledTimes(1)
    })
  })

  describe('zakładki (tylko ADMIN)', () => {
    it('ADMIN widzi zakładkę "Moje powiadomienia"', async () => {
      mockedUseAuth.mockReturnValue({ user: adminUser, isLoading: false, logout: vi.fn() })
      render(<NotificationsPage />)
      await flush()
      expect(screen.getByRole('button', { name: 'Moje powiadomienia' })).toBeInTheDocument()
    })

    it('ADMIN widzi zakładkę "Wszystkie powiadomienia (Admin)"', async () => {
      mockedUseAuth.mockReturnValue({ user: adminUser, isLoading: false, logout: vi.fn() })
      render(<NotificationsPage />)
      await flush()
      expect(screen.getByRole('button', { name: 'Wszystkie powiadomienia (Admin)' })).toBeInTheDocument()
    })

    it('MANAGER nie widzi zakładek', async () => {
      mockedUseAuth.mockReturnValue({ user: managerUser, isLoading: false, logout: vi.fn() })
      render(<NotificationsPage />)
      await flush()
      expect(screen.queryByRole('button', { name: 'Moje powiadomienia' })).not.toBeInTheDocument()
    })

    it('OPERATOR nie widzi zakładek', async () => {
      mockedUseAuth.mockReturnValue({ user: operatorUser, isLoading: false, logout: vi.fn() })
      render(<NotificationsPage />)
      await flush()
      expect(screen.queryByRole('button', { name: 'Moje powiadomienia' })).not.toBeInTheDocument()
    })

    it('kliknięcie "Wszystkie powiadomienia" wywołuje fetchAllNotifications', async () => {
      mockedUseAuth.mockReturnValue({ user: adminUser, isLoading: false, logout: vi.fn() })
      mockedFetchAll.mockResolvedValue([])
      render(<NotificationsPage />)
      await flush()
      fireEvent.click(screen.getByRole('button', { name: 'Wszystkie powiadomienia (Admin)' }))
      await flush()
      expect(mockedFetchAll).toHaveBeenCalledTimes(1)
    })

    it('w zakładce ALL wyświetla info o odbiorcy', async () => {
      mockedUseAuth.mockReturnValue({ user: adminUser, isLoading: false, logout: vi.fn() })
      mockedFetchAll.mockResolvedValue([mockWithUser])
      render(<NotificationsPage />)
      await flush()
      fireEvent.click(screen.getByRole('button', { name: 'Wszystkie powiadomienia (Admin)' }))
      await flush()
      expect(screen.getByText('Jan Kowalski')).toBeInTheDocument()
      expect(screen.getByText(/jan@test\.com/)).toBeInTheDocument()
    })
  })

  describe('panel compose — widoczność', () => {
    it('ADMIN widzi przycisk "+ Nowe powiadomienie"', async () => {
      mockedUseAuth.mockReturnValue({ user: adminUser, isLoading: false, logout: vi.fn() })
      render(<NotificationsPage />)
      await flush()
      expect(screen.getByRole('button', { name: '+ Nowe powiadomienie' })).toBeInTheDocument()
    })

    it('MANAGER widzi przycisk "+ Nowe powiadomienie"', async () => {
      mockedUseAuth.mockReturnValue({ user: managerUser, isLoading: false, logout: vi.fn() })
      render(<NotificationsPage />)
      await flush()
      expect(screen.getByRole('button', { name: '+ Nowe powiadomienie' })).toBeInTheDocument()
    })

    it('OPERATOR nie widzi przycisku compose', async () => {
      mockedUseAuth.mockReturnValue({ user: operatorUser, isLoading: false, logout: vi.fn() })
      render(<NotificationsPage />)
      await flush()
      expect(screen.queryByRole('button', { name: '+ Nowe powiadomienie' })).not.toBeInTheDocument()
    })

    it('kliknięcie compose otwiera panel', async () => {
      mockedUseAuth.mockReturnValue({ user: adminUser, isLoading: false, logout: vi.fn() })
      render(<NotificationsPage />)
      await flush()
      fireEvent.click(screen.getByRole('button', { name: '+ Nowe powiadomienie' }))
      await flush()
      expect(screen.getByPlaceholderText('Tytuł powiadomienia...')).toBeInTheDocument()
    })

    it('kliknięcie "✕ Zamknij" zamyka panel', async () => {
      mockedUseAuth.mockReturnValue({ user: adminUser, isLoading: false, logout: vi.fn() })
      render(<NotificationsPage />)
      await flush()
      fireEvent.click(screen.getByRole('button', { name: '+ Nowe powiadomienie' }))
      await flush()
      fireEvent.click(screen.getByRole('button', { name: '✕ Zamknij' }))
      expect(screen.queryByPlaceholderText('Tytuł powiadomienia...')).not.toBeInTheDocument()
    })
  })

  describe('panel compose — ADMIN', () => {
    beforeEach(async () => {
      mockedUseAuth.mockReturnValue({ user: adminUser, isLoading: false, logout: vi.fn() })
      mockedFetchUsers.mockResolvedValue({ data: [{ id: 'u1', name: 'Jan Kowalski' }] } as any)
    })

    it('ADMIN widzi przyciski trybu "Do użytkownika" i "Ogłoszenie do wszystkich"', async () => {
      render(<NotificationsPage />)
      await flush()
      fireEvent.click(screen.getByRole('button', { name: '+ Nowe powiadomienie' }))
      await flush()
      expect(screen.getByRole('button', { name: 'Do użytkownika' })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'Ogłoszenie do wszystkich' })).toBeInTheDocument()
    })

    it('domyślny tryb to "Do użytkownika" — wyświetla select odbiorcy', async () => {
      render(<NotificationsPage />)
      await flush()
      fireEvent.click(screen.getByRole('button', { name: '+ Nowe powiadomienie' }))
      await flush()
      expect(screen.getByText('Odbiorca')).toBeInTheDocument()
    })

    it('przełączenie na "Ogłoszenie" ukrywa select odbiorcy', async () => {
      render(<NotificationsPage />)
      await flush()
      fireEvent.click(screen.getByRole('button', { name: '+ Nowe powiadomienie' }))
      await flush()
      fireEvent.click(screen.getByRole('button', { name: 'Ogłoszenie do wszystkich' }))
      expect(screen.queryByText('Odbiorca')).not.toBeInTheDocument()
    })

    it('wysłanie ogłoszenia wywołuje createAnnouncement', async () => {
      mockedCreateAnnouncement.mockResolvedValue()
      render(<NotificationsPage />)
      await flush()
      fireEvent.click(screen.getByRole('button', { name: '+ Nowe powiadomienie' }))
      await flush()
      fireEvent.click(screen.getByRole('button', { name: 'Ogłoszenie do wszystkich' }))
      fireEvent.change(screen.getByPlaceholderText('Tytuł powiadomienia...'), { target: { value: 'Test tytuł' } })
      fireEvent.change(screen.getByPlaceholderText('Treść wiadomości...'), { target: { value: 'Test treść' } })
      fireEvent.click(screen.getByRole('button', { name: 'Wyślij ogłoszenie' }))
      await flush()
      expect(mockedCreateAnnouncement).toHaveBeenCalledWith({ title: 'Test tytuł', message: 'Test treść' })
    })

    it('po wysłaniu ogłoszenia panel się zamyka', async () => {
      mockedCreateAnnouncement.mockResolvedValue()
      render(<NotificationsPage />)
      await flush()
      fireEvent.click(screen.getByRole('button', { name: '+ Nowe powiadomienie' }))
      await flush()
      fireEvent.click(screen.getByRole('button', { name: 'Ogłoszenie do wszystkich' }))
      fireEvent.change(screen.getByPlaceholderText('Tytuł powiadomienia...'), { target: { value: 'Test tytuł' } })
      fireEvent.change(screen.getByPlaceholderText('Treść wiadomości...'), { target: { value: 'Test treść' } })
      fireEvent.click(screen.getByRole('button', { name: 'Wyślij ogłoszenie' }))
      await flush()
      expect(screen.queryByPlaceholderText('Tytuł powiadomienia...')).not.toBeInTheDocument()
    })
  })

  describe('panel compose — MANAGER', () => {
    beforeEach(() => {
      mockedUseAuth.mockReturnValue({ user: managerUser, isLoading: false, logout: vi.fn() })
      mockedFetchUsers.mockResolvedValue({ data: [{ id: 'u1', name: 'Jan Kowalski' }] } as any)
    })

    it('MANAGER nie widzi przycisków trybu', async () => {
      render(<NotificationsPage />)
      await flush()
      fireEvent.click(screen.getByRole('button', { name: '+ Nowe powiadomienie' }))
      await flush()
      expect(screen.queryByRole('button', { name: 'Do użytkownika' })).not.toBeInTheDocument()
      expect(screen.queryByRole('button', { name: 'Ogłoszenie do wszystkich' })).not.toBeInTheDocument()
    })

    it('MANAGER widzi formularz z odbiorcą', async () => {
      render(<NotificationsPage />)
      await flush()
      fireEvent.click(screen.getByRole('button', { name: '+ Nowe powiadomienie' }))
      await flush()
      expect(screen.getByText('Odbiorca')).toBeInTheDocument()
    })

    it('MANAGER może wysłać powiadomienie do użytkownika', async () => {
      mockedCreateNotification.mockResolvedValue()
      render(<NotificationsPage />)
      await flush()
      fireEvent.click(screen.getByRole('button', { name: '+ Nowe powiadomienie' }))
      await flush()
      fireEvent.change(screen.getByDisplayValue('Wybierz użytkownika...'), { target: { value: 'u1' } })
      fireEvent.change(screen.getByPlaceholderText('Tytuł powiadomienia...'), { target: { value: 'Tytuł' } })
      fireEvent.change(screen.getByPlaceholderText('Treść wiadomości...'), { target: { value: 'Treść' } })
      fireEvent.click(screen.getByRole('button', { name: 'Wyślij powiadomienie' }))
      await flush()
      expect(mockedCreateNotification).toHaveBeenCalledWith(
        expect.objectContaining({ userId: 'u1', title: 'Tytuł', message: 'Treść' })
      )
    })
  })

  describe('pobieranie listy użytkowników przy otwarciu compose', () => {
    it('wywołuje fetchUsers przy pierwszym otwarciu compose', async () => {
      mockedUseAuth.mockReturnValue({ user: adminUser, isLoading: false, logout: vi.fn() })
      render(<NotificationsPage />)
      await flush()
      fireEvent.click(screen.getByRole('button', { name: '+ Nowe powiadomienie' }))
      await flush()
      expect(mockedFetchUsers).toHaveBeenCalledWith(100)
    })

    it('wyświetla użytkowników w selekcie odbiorcy', async () => {
      mockedUseAuth.mockReturnValue({ user: managerUser, isLoading: false, logout: vi.fn() })
      mockedFetchUsers.mockResolvedValue({ data: [{ id: 'u1', name: 'Jan Kowalski' }] } as any)
      render(<NotificationsPage />)
      await flush()
      fireEvent.click(screen.getByRole('button', { name: '+ Nowe powiadomienie' }))
      await flush()
      expect(screen.getByRole('option', { name: 'Jan Kowalski' })).toBeInTheDocument()
    })
  })
})
