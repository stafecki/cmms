'use client';

import { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import { useAuth } from '../../context/AuthContext';
import styles from './work-orders.module.scss';
import { WorkOrder, WorkOrderStatus, Priority, CreateWorkOrderInput } from './types';
import { fetchWorkOrders, createWorkOrder } from './work-orders.api';

import { SearchBar } from '../../components/searchBar/SearchBar';
import { FilterPanel, FilterGroup } from '../../components/filterPanel/FilterPanel';
import { WorkOrderModal } from './components/WorkOrderModal';

export default function WorkOrdersPage() {
  const { user, isLoading: isAuthLoading } = useAuth();

  const [orders, setOrders] = useState<WorkOrder[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filtry
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);

  const canCreate = user?.role === 'ADMIN' || user?.role === 'MANAGER' || user?.role === 'OPERATOR';

  useEffect(() => {
    if (!isAuthLoading && user) {
      loadData();
    } else if (!isAuthLoading && !user) {
      setError('Brak autoryzacji. Zaloguj się ponownie.');
      setIsLoading(false);
    }
  }, [isAuthLoading, user]);

  const loadData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchWorkOrders();
      setOrders(data);
    } catch (err: any) {
      setError(err.message || 'Wystąpił błąd podczas ładowania zleceń.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreate = async (data: CreateWorkOrderInput) => {
    await createWorkOrder(data);
    await loadData(); // Odśwież listę po dodaniu
  };

  // --- LOGIKA FILTROWANIA Z UWZGLĘDNIENIEM RÓL ---
  const filteredOrders = useMemo(() => {
    return orders.filter(order => {
      // 1. Sprawdzenie uprawnień na podstawie roli
      let matchesRole = false;

      if (user?.role === 'ADMIN' || user?.role === 'MANAGER') {
        matchesRole = true; // Widzą wszystko
      } else if (user?.role === 'TECHNICIAN') {
        // Technik widzi tylko zlecenia do niego przypisane
        matchesRole = order.assignedToId === user.id || order.assignedTo?.id === user.id;
      } else if (user?.role === 'OPERATOR') {
        // Operator widzi tylko zlecenia zgłoszone przez siebie
        matchesRole = order.reportedById === user.id || order.reportedBy?.id === user.id;
      }

      // 2. Standardowe filtry (wyszukiwarka, status, priorytet)
      const matchesSearch =
        order.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.machine?.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter ? order.status === statusFilter : true;
      const matchesPriority = priorityFilter ? order.priority === priorityFilter : true;

      // Zwracamy zlecenie tylko, jeśli spełnia warunki roli ORAZ pozostałe filtry
      return matchesRole && matchesSearch && matchesStatus && matchesPriority;
    });
  }, [orders, searchQuery, statusFilter, priorityFilter, user]);

  const getStatusLabel = (status: WorkOrderStatus) => {
    const labels: Record<WorkOrderStatus, string> = {
      NEW: 'Nowe',
      IN_PROGRESS: 'W trakcie',
      WAITING_FOR_PARTS: 'Oczekuje na części',
      COMPLETED: 'Zakończone',
      CANCELLED: 'Anulowane',
    };
    return labels[status] || status;
  };

  const getPriorityLabel = (priority: Priority) => {
    const labels: Record<Priority, string> = {
      LOW: 'Niski',
      MEDIUM: 'Średni',
      HIGH: 'Wysoki',
      CRITICAL: 'Krytyczny',
    };
    return labels[priority] || priority;
  };

  if (isAuthLoading) {
    return <div className={styles.loading}>Sprawdzanie uprawnień...</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Zlecenia Pracy</h1>
        {canCreate && (
          <button className={styles.newButton} onClick={() => setIsModalOpen(true)}>
            + Nowe Zlecenie
          </button>
        )}
      </div>

      <div className={styles.filters}>
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Szukaj zlecenia lub maszyny..."
        />
        <button
          className={`${styles.newButton} ${showFilters ? styles.active : ''}`}
          onClick={() => setShowFilters(!showFilters)}
        >
          {showFilters ? 'Ukryj filtry' : 'Pokaż filtry'}
        </button>
      </div>

      {showFilters && (
        <FilterPanel onReset={() => {
          setStatusFilter('');
          setPriorityFilter('');
        }}>

          <FilterGroup label="Status">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">Wszystkie statusy</option>
              <option value={WorkOrderStatus.NEW}>Nowe</option>
              <option value={WorkOrderStatus.IN_PROGRESS}>W trakcie</option>
              <option value={WorkOrderStatus.WAITING_FOR_PARTS}>Oczekuje na części</option>
              <option value={WorkOrderStatus.COMPLETED}>Zakończone</option>
              <option value={WorkOrderStatus.CANCELLED}>Anulowane</option>
            </select>
          </FilterGroup>

          <FilterGroup label="Priorytet">
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className={styles.filterSelect}
            >
              <option value="">Wszystkie priorytety</option>
              <option value={Priority.LOW}>Niski</option>
              <option value={Priority.MEDIUM}>Średni</option>
              <option value={Priority.HIGH}>Wysoki</option>
              <option value={Priority.CRITICAL}>Krytyczny</option>
            </select>
          </FilterGroup>

        </FilterPanel>
      )}

      {isLoading ? (
        <div className={styles.loading}>Ładowanie danych...</div>
      ) : error ? (
        <div className={styles.error}>{error}</div>
      ) : filteredOrders.length === 0 ? (
        <div className={styles.empty}>Brak zleceń pracy spełniających kryteria.</div>
      ) : (
        <div className={styles.grid}>
          {filteredOrders.map(order => (
            <div key={order.id} className={styles.card}>
              <div className={styles.cardHeader}>
                <h3>{order.title}</h3>
                <div className={styles.badges}>
                  <span className={`${styles.badge} ${styles[`status-${order.status}`]}`}>
                    {getStatusLabel(order.status)}
                  </span>
                  <span className={`${styles.badge} ${styles[`priority-${order.priority}`]}`}>
                    {getPriorityLabel(order.priority)}
                  </span>
                </div>
              </div>

              <span className={styles.machineTag}>{order.machine?.name || 'Brak przypisanej maszyny'}</span>

              <div className={styles.details}>
                <div className={styles.infoRow}>
                  <span className={styles.label}>Zgłoszone przez:</span>
                  <span className={styles.value}>{order.reportedBy?.name || '-'}</span>
                </div>

                <div className={styles.infoRow}>
                  <span className={styles.label}>Przypisane do:</span>
                  <span className={styles.value}>{order.assignedTo?.name || 'Brak'}</span>
                </div>

                <div className={styles.infoRow}>
                  <span className={styles.label}>Utworzono:</span>
                  <span className={styles.value}>
                    {new Date(order.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <div className={styles.description}>
                {order.description}
              </div>

              <div className={styles.cardFooter}>
                <Link href={`/work-orders/${order.id}`} className={styles.actionButton}>
                  Szczegóły
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      {canCreate && (
        <WorkOrderModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleCreate}
        />
      )}
    </div>
  );
}