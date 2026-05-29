'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '../../../context/AuthContext';
import styles from './work-order-details.module.scss';
import {
  WorkOrder,
  WorkOrderMessage,
  WorkOrderPart,
  WorkOrderStatus,
  Priority,
  User
} from '../types';
import {
  fetchWorkOrderById,
  updateWorkOrderStatus,
  assignTechnician,
  confirmBhp,
  fetchMessages,
  addMessage,
  fetchWorkOrderParts,
  addPartToWorkOrder,
  fetchTechnicians,
  fetchAllParts
} from '../work-orders.api';

const VALID_TRANSITIONS: Record<WorkOrderStatus, WorkOrderStatus[]> = {
  [WorkOrderStatus.NEW]: [WorkOrderStatus.IN_PROGRESS, WorkOrderStatus.CANCELLED],
  [WorkOrderStatus.IN_PROGRESS]: [WorkOrderStatus.WAITING_FOR_PARTS, WorkOrderStatus.COMPLETED, WorkOrderStatus.CANCELLED],
  [WorkOrderStatus.WAITING_FOR_PARTS]: [WorkOrderStatus.IN_PROGRESS, WorkOrderStatus.CANCELLED],
  [WorkOrderStatus.COMPLETED]: [],
  [WorkOrderStatus.CANCELLED]: [],
};

const STATUS_LABELS: Record<WorkOrderStatus, string> = {
  [WorkOrderStatus.NEW]: 'Nowe',
  [WorkOrderStatus.IN_PROGRESS]: 'W trakcie',
  [WorkOrderStatus.WAITING_FOR_PARTS]: 'Oczekuje na części',
  [WorkOrderStatus.COMPLETED]: 'Zakończone',
  [WorkOrderStatus.CANCELLED]: 'Anulowane',
};

const PRIORITY_LABELS: Record<Priority, string> = {
  [Priority.LOW]: 'Niski',
  [Priority.MEDIUM]: 'Średni',
  [Priority.HIGH]: 'Wysoki',
  [Priority.CRITICAL]: 'Krytyczny',
};

export default function WorkOrderDetailsPage() {
  const { id } = useParams() as { id: string };
  const { user, isLoading: isAuthLoading } = useAuth();

  const [order, setOrder] = useState<WorkOrder | null>(null);
  const [messages, setMessages] = useState<WorkOrderMessage[]>([]);
  const [parts, setParts] = useState<WorkOrderPart[]>([]);

  const [technicians, setTechnicians] = useState<User[]>([]);
  const [availableParts, setAvailableParts] = useState<any[]>([]);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [newMessage, setNewMessage] = useState('');
  const [isSendingMessage, setIsSendingMessage] = useState(false);

  const [selectedPart, setSelectedPart] = useState('');
  const [partQuantity, setPartQuantity] = useState(1);
  const [isAddingPart, setIsAddingPart] = useState(false);

  const isManagerOrAdmin = user?.role === 'ADMIN' || user?.role === 'MANAGER';
  const isTechnician = user?.role === 'TECHNICIAN';
  const isAssigned = order?.assignedToId === user?.id;

  const selectedPartDetails = availableParts.find(p => p.id === selectedPart);
  const maxAvailableStock = selectedPartDetails ? selectedPartDetails.stockQuantity : 1;

  const getAvailableStatuses = (currentStatus: WorkOrderStatus, bhpConfirmed: boolean) => {
    let available = VALID_TRANSITIONS[currentStatus] || [];
    if (!bhpConfirmed) {
      available = available.filter(s => s !== WorkOrderStatus.IN_PROGRESS);
    }
    return available;
  };

  useEffect(() => {
    if (!isAuthLoading && user) {
      loadData();
    }
  }, [id, isAuthLoading, user]);

  const loadData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const orderData = await fetchWorkOrderById(id);
      setOrder(orderData);

      const [messagesData, partsData] = await Promise.all([
        fetchMessages(id),
        fetchWorkOrderParts(id)
      ]);
      setMessages(messagesData);
      setParts(partsData);

      if (isManagerOrAdmin) {
        const techs = await fetchTechnicians();
        setTechnicians(techs);
      }

      if (isManagerOrAdmin || isTechnician) {
        const allParts = await fetchAllParts();
        setAvailableParts(allParts);
      }

    } catch (err: any) {
      setError(err.message || 'Wystąpił błąd podczas ładowania zlecenia.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusChange = async (newStatus: WorkOrderStatus) => {
    try {
      const updated = await updateWorkOrderStatus(id, newStatus);
      setOrder(updated);
    } catch (err: any) {
      alert(err.message || 'Nie udało się zmienić statusu.');
    }
  };

  const handleAssign = async (technicianId: string) => {
    try {
      const updated = await assignTechnician(id, technicianId);
      setOrder(updated);
    } catch (err: any) {
      alert(err.message || 'Nie udało się przypisać technika.');
    }
  };

  const handleConfirmBhp = async () => {
    try {
      const updated = await confirmBhp(id);
      setOrder(updated);
      alert('Potwierdzono zapoznanie się z warunkami BHP.');
    } catch (err: any) {
      alert(err.message || 'Nie udało się potwierdzić BHP.');
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    try {
      setIsSendingMessage(true);
      const msg = await addMessage(id, newMessage);
      setMessages([...messages, msg]);
      setNewMessage('');
    } catch (err: any) {
      alert(err.message || 'Nie udało się wysłać wiadomości.');
    } finally {
      setIsSendingMessage(false);
    }
  };

  const handleAddPart = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPart || partQuantity < 1) return;
    if (partQuantity > maxAvailableStock) {
      alert('Nie masz wystarczającej ilości w magazynie!');
      return;
    }

    try {
      setIsAddingPart(true);
      const newPart = await addPartToWorkOrder(id, selectedPart, partQuantity);
      setParts([...parts, newPart]);
      setSelectedPart('');
      setPartQuantity(1);

      setAvailableParts(prevParts => prevParts.map(p =>
        p.id === selectedPart
          ? { ...p, stockQuantity: p.stockQuantity - partQuantity }
          : p
      ));

    } catch (err: any) {
      alert(err.message || 'Nie udało się dodać części.');
    } finally {
      setIsAddingPart(false);
    }
  };

  if (isLoading || isAuthLoading) return <div className={styles.loading}>Ładowanie danych...</div>;
  if (error || !order) return <div className={styles.error}>{error || 'Zlecenie nie zostało znalezione.'}</div>;

  return (
    <div className={styles.container}>
      <Link href="/work-orders" className={styles.backLink}>← Wróć do listy zleceń</Link>

      <div className={styles.header}>
        <div className={styles.titleRow}>
          <h1>{order.title}</h1>
          <div className={styles.badges}>
            <span className={`${styles.badge} ${styles[`status-${order.status}`]}`}>
              {STATUS_LABELS[order.status]}
            </span>
            <span className={`${styles.badge} ${styles[`priority-${order.priority}`]}`}>
              {PRIORITY_LABELS[order.priority]}
            </span>
          </div>
        </div>

        <div className={styles.metaGrid}>
          <div className={styles.metaItem}>
            <span className={styles.label}>Maszyna</span>
            <span className={styles.value}>{order.machine?.name || '-'}</span>
          </div>
          <div className={styles.metaItem}>
            <span className={styles.label}>Zgłaszający</span>
            <span className={styles.value}>{order.reportedBy?.name || '-'}</span>
          </div>
          <div className={styles.metaItem}>
            <span className={styles.label}>Przypisany technik</span>
            <span className={styles.value}>{order.assignedTo?.name || 'Brak przypisania'}</span>
          </div>
          <div className={styles.metaItem}>
            <span className={styles.label}>BHP</span>
            <span className={styles.value}>{order.bhpConfirmed ? '✅ Potwierdzono' : '❌ Wymaga potwierdzenia'}</span>
          </div>
        </div>

        <div className={styles.description}>
          {order.description}
        </div>

        <div className={styles.actionRow}>
          {(isManagerOrAdmin || isAssigned) && (
            <div>
              <span className={styles.statusLabel}>Zmień status:</span>
              <select
                value={order.status}
                onChange={e => handleStatusChange(e.target.value as WorkOrderStatus)}
                disabled={getAvailableStatuses(order.status, order.bhpConfirmed).length === 0}
              >
                <option value={order.status}>{STATUS_LABELS[order.status]}</option>
                {getAvailableStatuses(order.status, order.bhpConfirmed).map(status => (
                  <option key={status} value={status}>{STATUS_LABELS[status]}</option>
                ))}
              </select>
            </div>
          )}

          {isManagerOrAdmin && (
            <div >
              <span className={styles.statusLabel}>Przypisz:</span>
              <select
                value={order.assignedToId || ''}
                onChange={e => handleAssign(e.target.value)}
              >
                <option value="" disabled>Wybierz technika...</option>
                {technicians.map(tech => (
                  <option key={tech.id} value={tech.id}>{tech.name}</option>
                ))}
              </select>
            </div>
          )}

          {isTechnician && !order.bhpConfirmed && (
            <button className={styles.btn} onClick={handleConfirmBhp} >
              Potwierdź zapoznanie z BHP
            </button>
          )}
        </div>
      </div>

      <div className={styles.contentGrid}>
        <div className={styles.section}>
          <h2>Czat i notatki zlecenia</h2>
          <div className={styles.messageList}>
            {messages.length === 0 ? (
              <p>Brak wiadomości.</p>
            ) : (
              messages.map(msg => (
                <div key={msg.id} className={styles.message}>
                  <div className={styles.messageHeader}>
                    <span className={styles.author}>{msg.user?.name || 'Użytkownik'}</span>
                    <span className={styles.date}>{new Date(msg.sentAt).toLocaleString()}</span>
                  </div>
                  <div className={styles.messageContent}>{msg.content}</div>
                </div>
              ))
            )}
          </div>

          <form className={styles.messageForm} onSubmit={handleSendMessage}>
            <textarea
              value={newMessage}
              onChange={e => setNewMessage(e.target.value)}
              placeholder="Wpisz nową wiadomość lub notatkę..."
              required
            />
            <button type="submit" className={styles.btn} disabled={isSendingMessage}>
              Wyślij
            </button>
          </form>
        </div>

        <div className={styles.section}>
          <h2>Użyte części</h2>
          <div className={styles.partsList}>
            {parts.length === 0 ? (
              <p>Nie dodano jeszcze żadnych części.</p>
            ) : (
              <table>
                <thead>
                <tr>
                  <th>Nazwa</th>
                  <th>Ilość</th>
                </tr>
                </thead>
                <tbody>
                {parts.map(part => (
                  <tr key={part.id}>
                    <td>{part.part?.name || 'Nieznana część'}</td>
                    <td>{part.quantity} szt.</td>
                  </tr>
                ))}
                </tbody>
              </table>
            )}
          </div>

          {(isManagerOrAdmin || isAssigned) && (
            <form className={styles.addPartForm} onSubmit={handleAddPart}>
              <h3>Dodaj zużyte części</h3>
              <select
                value={selectedPart}
                onChange={e => {
                  setSelectedPart(e.target.value);
                  setPartQuantity(1);
                }}
                required
              >
                <option value="">Wybierz część z magazynu...</option>
                {availableParts.map(p => (
                  <option
                    key={p.id}
                    value={p.id}
                    disabled={p.stockQuantity === 0}
                  >
                    {p.name} (w mag: {p.stockQuantity})
                  </option>
                ))}
              </select>
              <div >
                <input
                  type="number"
                  min="1"
                  max={maxAvailableStock}
                  value={partQuantity}
                  onChange={e => {
                    const value = parseInt(e.target.value) || 1;

                    if (value > maxAvailableStock) {
                      setPartQuantity(maxAvailableStock);
                    } else {
                      setPartQuantity(value);
                    }
                  }}
                  disabled={!selectedPart}
                  required
                />
                <button type="submit" className={styles.btn} disabled={isAddingPart || !selectedPart || maxAvailableStock === 0}>
                  Dodaj
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}