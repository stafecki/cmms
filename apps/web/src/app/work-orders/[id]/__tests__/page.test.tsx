import { render, screen, fireEvent, act } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useParams } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import WorkOrderDetailsPage from '../page'
import * as workOrdersApi from '../../work-orders.api'
import { WorkOrderStatus, Priority } from '../../types'

vi.mock('@/context/AuthContext', () => ({ useAuth: vi.fn() }))
vi.mock('../../work-orders.api', () => ({
  fetchWorkOrderById: vi.fn(),
  updateWorkOrderStatus: vi.fn(),
  assignTechnician: vi.fn(),
  confirmBhp: vi.fn(),
  fetchMessages: vi.fn(),
  addMessage: vi.fn(),
  fetchWorkOrderParts: vi.fn(),
  addPartToWorkOrder: vi.fn(),
  fetchTechnicians: vi.fn(),
  fetchAllParts: vi.fn(),
}))

const mockUseAuth = vi.mocked(useAuth)
const mockUseParams = vi.mocked(useParams)
const mockFetchWorkOrderById = vi.mocked(workOrdersApi.fetchWorkOrderById)
const mockUpdateWorkOrderStatus = vi.mocked(workOrdersApi.updateWorkOrderStatus)
const mockAssignTechnician = vi.mocked(workOrdersApi.assignTechnician)
const mockConfirmBhp = vi.mocked(workOrdersApi.confirmBhp)
const mockFetchMessages = vi.mocked(workOrdersApi.fetchMessages)
const mockAddMessage = vi.mocked(workOrdersApi.addMessage)
const mockFetchWorkOrderParts = vi.mocked(workOrdersApi.fetchWorkOrderParts)
const mockAddPartToWorkOrder = vi.mocked(workOrdersApi.addPartToWorkOrder)
const mockFetchTechnicians = vi.mocked(workOrdersApi.fetchTechnicians)
const mockFetchAllParts = vi.mocked(workOrdersApi.fetchAllParts)

const flush = () => act(async () => {})

const adminUser = { id: 'admin-1', name: 'Admin', email: 'admin@test.com', role: 'ADMIN' as const, isActive: true, createdAt: '' }
const managerUser = { ...adminUser, id: 'mgr-1', role: 'MANAGER' as const }
const technicianUser = { ...adminUser, id: 'tech-1', role: 'TECHNICIAN' as const }
const operatorUser = { ...adminUser, id: 'op-1', role: 'OPERATOR' as const }

const sampleOrder = {
  id: 'wo-1',
  machineId: 'm1',
  reportedById: 'op-1',
  assignedToId: 'tech-1',
  status: WorkOrderStatus.NEW,
  priority: Priority.MEDIUM,
  title: 'Awaria pompy',
  description: 'Pompa hydrauliczna nie działa poprawnie',
  bhpConfirmed: false,
  laborCost: '0',
  partsCost: '0',
  createdAt: '2024-01-15T10:00:00.000Z',
  startedAt: null,
  closedAt: null,
  updatedAt: '2024-01-15T10:00:00.000Z',
  machine: { id: 'm1', name: 'Tokarka CNC', serialNumber: 'SN001' },
  reportedBy: { id: 'op-1', name: 'Jan Operator', email: 'op@test.com', role: 'OPERATOR' },
  assignedTo: { id: 'tech-1', name: 'Tomek Technik', email: 'tech@test.com', role: 'TECHNICIAN' },
}

const sampleMessage = {
  id: 'msg-1',
  workOrderId: 'wo-1',
  userId: 'admin-1',
  content: 'Sprawdzam usterkę',
  sentAt: '2024-01-15T11:00:00.000Z',
  user: { id: 'admin-1', name: 'Admin', email: 'admin@test.com', role: 'ADMIN' },
}

const samplePart = {
  id: 'wop-1',
  workOrderId: 'wo-1',
  partId: 'p1',
  quantity: 3,
  part: { id: 'p1', name: 'Śruba M8', unitPrice: '5.00' },
}

describe('WorkOrderDetailsPage', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockUseParams.mockReturnValue({ id: 'wo-1' } as any)
    mockUseAuth.mockReturnValue({ user: adminUser, isLoading: false } as any)
    mockFetchWorkOrderById.mockResolvedValue(sampleOrder)
    mockFetchMessages.mockResolvedValue([])
    mockFetchWorkOrderParts.mockResolvedValue([])
    mockFetchTechnicians.mockResolvedValue([])
    mockFetchAllParts.mockResolvedValue([])
  })

  it('wyświetla "Ładowanie danych..." podczas ładowania', () => {
    mockFetchWorkOrderById.mockReturnValue(new Promise(() => {}))
    render(<WorkOrderDetailsPage />)
    expect(screen.getByText('Ładowanie danych...')).toBeInTheDocument()
  })

  it('wyświetla błąd gdy fetchWorkOrderById rzuci wyjątek', async () => {
    mockFetchWorkOrderById.mockRejectedValue(new Error('Nie udało się pobrać zlecenia'))
    render(<WorkOrderDetailsPage />)
    await flush()
    expect(screen.getByText('Nie udało się pobrać zlecenia')).toBeInTheDocument()
  })

  it('renderuje tytuł zlecenia', async () => {
    render(<WorkOrderDetailsPage />)
    await flush()
    expect(screen.getByText('Awaria pompy')).toBeInTheDocument()
  })

  it('renderuje status i priorytet', async () => {
    render(<WorkOrderDetailsPage />)
    await flush()
    expect(screen.getAllByText('Nowe')[0]).toBeInTheDocument()
    expect(screen.getAllByText('Średni')[0]).toBeInTheDocument()
  })

  it('renderuje nazwę maszyny i zgłaszającego', async () => {
    render(<WorkOrderDetailsPage />)
    await flush()
    expect(screen.getByText('Tokarka CNC')).toBeInTheDocument()
    expect(screen.getByText('Jan Operator')).toBeInTheDocument()
  })

  it('renderuje BHP: Wymaga potwierdzenia gdy bhpConfirmed=false', async () => {
    render(<WorkOrderDetailsPage />)
    await flush()
    expect(screen.getByText('❌ Wymaga potwierdzenia')).toBeInTheDocument()
  })

  it('renderuje BHP: Potwierdzono gdy bhpConfirmed=true', async () => {
    mockFetchWorkOrderById.mockResolvedValue({ ...sampleOrder, bhpConfirmed: true })
    render(<WorkOrderDetailsPage />)
    await flush()
    expect(screen.getByText('✅ Potwierdzono')).toBeInTheDocument()
  })

  it('wyświetla "Brak wiadomości." gdy lista pusta', async () => {
    render(<WorkOrderDetailsPage />)
    await flush()
    expect(screen.getByText('Brak wiadomości.')).toBeInTheDocument()
  })

  it('renderuje wiadomości', async () => {
    mockFetchMessages.mockResolvedValue([sampleMessage])
    render(<WorkOrderDetailsPage />)
    await flush()
    expect(screen.getByText('Sprawdzam usterkę')).toBeInTheDocument()
    expect(screen.getByText('Admin')).toBeInTheDocument()
  })

  it('wyświetla "Nie dodano jeszcze żadnych części." gdy lista pusta', async () => {
    render(<WorkOrderDetailsPage />)
    await flush()
    expect(screen.getByText('Nie dodano jeszcze żadnych części.')).toBeInTheDocument()
  })

  it('renderuje użyte części', async () => {
    mockFetchWorkOrderParts.mockResolvedValue([samplePart])
    render(<WorkOrderDetailsPage />)
    await flush()
    expect(screen.getByText('Śruba M8')).toBeInTheDocument()
    expect(screen.getByText('3 szt.')).toBeInTheDocument()
  })

  it('ADMIN widzi select Zmień status i Przypisz', async () => {
    render(<WorkOrderDetailsPage />)
    await flush()
    expect(screen.getByText('Zmień status:')).toBeInTheDocument()
    expect(screen.getByText('Przypisz:')).toBeInTheDocument()
  })

  it('ADMIN widzi formularz dodawania części', async () => {
    render(<WorkOrderDetailsPage />)
    await flush()
    expect(screen.getByText('Dodaj zużyte części')).toBeInTheDocument()
  })

  it('OPERATOR nie widzi Zmień status ani Przypisz', async () => {
    mockUseAuth.mockReturnValue({ user: operatorUser, isLoading: false } as any)
    render(<WorkOrderDetailsPage />)
    await flush()
    expect(screen.queryByText('Zmień status:')).not.toBeInTheDocument()
    expect(screen.queryByText('Przypisz:')).not.toBeInTheDocument()
  })

  it('OPERATOR nie widzi formularza dodawania części', async () => {
    mockUseAuth.mockReturnValue({ user: operatorUser, isLoading: false } as any)
    render(<WorkOrderDetailsPage />)
    await flush()
    expect(screen.queryByText('Dodaj zużyte części')).not.toBeInTheDocument()
  })

  it('TECHNICIAN przypisany widzi Zmień status ale nie Przypisz', async () => {
    mockUseAuth.mockReturnValue({ user: technicianUser, isLoading: false } as any)
    render(<WorkOrderDetailsPage />)
    await flush()
    expect(screen.getByText('Zmień status:')).toBeInTheDocument()
    expect(screen.queryByText('Przypisz:')).not.toBeInTheDocument()
  })

  it('TECHNICIAN nieprzypisany nie widzi Zmień status', async () => {
    mockUseAuth.mockReturnValue({ user: { ...technicianUser, id: 'other-tech' }, isLoading: false } as any)
    render(<WorkOrderDetailsPage />)
    await flush()
    expect(screen.queryByText('Zmień status:')).not.toBeInTheDocument()
  })

  it('TECHNICIAN widzi "Potwierdź zapoznanie z BHP" gdy bhpConfirmed=false', async () => {
    mockUseAuth.mockReturnValue({ user: technicianUser, isLoading: false } as any)
    render(<WorkOrderDetailsPage />)
    await flush()
    expect(screen.getByText('Potwierdź zapoznanie z BHP')).toBeInTheDocument()
  })

  it('TECHNICIAN nie widzi "Potwierdź zapoznanie z BHP" gdy bhpConfirmed=true', async () => {
    mockUseAuth.mockReturnValue({ user: technicianUser, isLoading: false } as any)
    mockFetchWorkOrderById.mockResolvedValue({ ...sampleOrder, bhpConfirmed: true })
    render(<WorkOrderDetailsPage />)
    await flush()
    expect(screen.queryByText('Potwierdź zapoznanie z BHP')).not.toBeInTheDocument()
  })

  it('handleStatusChange wywołuje updateWorkOrderStatus', async () => {
    const updatedOrder = { ...sampleOrder, status: WorkOrderStatus.CANCELLED }
    mockUpdateWorkOrderStatus.mockResolvedValue(updatedOrder)
    render(<WorkOrderDetailsPage />)
    await flush()
    await act(async () => {
      fireEvent.change(screen.getByDisplayValue('Nowe'), { target: { value: WorkOrderStatus.CANCELLED } })
    })
    expect(mockUpdateWorkOrderStatus).toHaveBeenCalledWith('wo-1', WorkOrderStatus.CANCELLED)
  })

  it('handleConfirmBhp wywołuje confirmBhp', async () => {
    mockUseAuth.mockReturnValue({ user: technicianUser, isLoading: false } as any)
    mockConfirmBhp.mockResolvedValue({ ...sampleOrder, bhpConfirmed: true })
    vi.spyOn(window, 'alert').mockImplementation(() => {})
    render(<WorkOrderDetailsPage />)
    await flush()
    await act(async () => {
      fireEvent.click(screen.getByText('Potwierdź zapoznanie z BHP'))
    })
    expect(mockConfirmBhp).toHaveBeenCalledWith('wo-1')
  })

  it('handleSendMessage wywołuje addMessage i czyści textarea', async () => {
    const newMsg = { ...sampleMessage, id: 'msg-2', content: 'Nowa wiadomość' }
    mockAddMessage.mockResolvedValue(newMsg)
    render(<WorkOrderDetailsPage />)
    await flush()
    fireEvent.change(screen.getByPlaceholderText('Wpisz nową wiadomość lub notatkę...'), {
      target: { value: 'Nowa wiadomość' }
    })
    await act(async () => {
      fireEvent.click(screen.getByText('Wyślij'))
    })
    expect(mockAddMessage).toHaveBeenCalledWith('wo-1', 'Nowa wiadomość')
  })

  it('handleAddPart wywołuje addPartToWorkOrder', async () => {
    mockFetchAllParts.mockResolvedValue([{ id: 'p1', name: 'Śruba M8', stockQuantity: 10, unitPrice: '5.00' }])
    mockAddPartToWorkOrder.mockResolvedValue(samplePart)
    render(<WorkOrderDetailsPage />)
    await flush()
    fireEvent.change(screen.getByDisplayValue('Wybierz część z magazynu...'), { target: { value: 'p1' } })
    await act(async () => {
      fireEvent.click(screen.getByText('Dodaj'))
    })
    expect(mockAddPartToWorkOrder).toHaveBeenCalledWith('wo-1', 'p1', 1)
  })

  it('wywołuje fetchTechnicians i fetchAllParts dla ADMIN', async () => {
    render(<WorkOrderDetailsPage />)
    await flush()
    expect(mockFetchTechnicians).toHaveBeenCalledTimes(1)
    expect(mockFetchAllParts).toHaveBeenCalledTimes(1)
  })

  it('wywołuje tylko fetchAllParts dla TECHNICIAN', async () => {
    mockUseAuth.mockReturnValue({ user: technicianUser, isLoading: false } as any)
    render(<WorkOrderDetailsPage />)
    await flush()
    expect(mockFetchTechnicians).not.toHaveBeenCalled()
    expect(mockFetchAllParts).toHaveBeenCalledTimes(1)
  })
})
