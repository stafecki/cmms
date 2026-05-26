'use client'

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '../../context/AuthContext';
import { fetchUsers, createUser } from './users.api';
import { PaginatedUsers, CreateUserInput } from './types';
import UserModal from './components/UserModal';
import styles from './users.module.scss';

export default function UsersPage() {
  const { user, isLoading } = useAuth();
  const [data, setData] = useState<PaginatedUsers | null>(null);
  const [loadingData, setLoadingData] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const loadUsers = async () => {
    try {
      setLoadingData(true);
      const res = await fetchUsers();
      setData(res);
      setError(null);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoadingData(false);
    }
  };

  useEffect(() => {
    if (user && (user.role === 'ADMIN' || user.role === 'MANAGER')) {
      loadUsers();
    } else if (user) {
      setLoadingData(false);
    }
  }, [user]);

  const handleAddUser = async (formData: CreateUserInput) => {
    await createUser(formData);
    await loadUsers(); // Odśwież tabelę po dodaniu
  };

  if (isLoading || (loadingData && user)) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>Ładowanie danych...</div>
      </div>
    );
  }

  if (!user || (user.role !== 'ADMIN' && user.role !== 'MANAGER')) {
    return (
      <div className={styles.container}>
        <div className={styles.accessDenied}>
          <h2 className={styles.errorTitle}>Brak uprawnień</h2>
          <p className={styles.errorMessage}>Wymagana rola to ADMIN lub MANAGER.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.headerTitle}>Zarządzanie Użytkownikami</h1>
        {user.role === 'ADMIN' && (
          <button
            className={styles.newButton}
            onClick={() => setIsAddModalOpen(true)}
          >
            Dodaj Użytkownika
          </button>
        )}
      </header>

      {error && <div className={styles.errorContainer}>{error}</div>}

      <div className={styles.tableWrapper}>
        <table className={styles.usersTable}>
          <thead>
          <tr>
            <th className={styles.th}>Imię i nazwisko</th>
            <th className={styles.th}>Email</th>
            <th className={styles.th}>Rola</th>
            <th className={styles.th}>Status</th>
            <th className={styles.th}>Akcje</th>
          </tr>
          </thead>
          <tbody>
          {data?.data.map((u) => (
            <tr key={u.id} className={styles.tr}>
              <td className={styles.td}>{u.name}</td>
              <td className={styles.td}>{u.email}</td>
              <td className={styles.td}>{u.role}</td>
              <td className={styles.td}>
                  <span className={`${styles.statusBadge} ${u.isActive ? styles.statusActive : styles.statusInactive}`}>
                    {u.isActive ? 'Aktywny' : 'Nieaktywny'}
                  </span>
              </td>
              <td className={styles.td}>
                <Link href={`/users/${u.id}`} className={styles.actionLink}>
                  Szczegóły
                </Link>
              </td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>

      <UserModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddUser}
      />
    </div>
  );
}