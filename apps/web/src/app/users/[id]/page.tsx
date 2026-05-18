'use client'

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '../../../context/AuthContext';
import {
  fetchUserById,
  deleteUser,
  updateUser,
  fetchCertifications,
  removeCertification,
  addCertification
} from '../users.api';
import { User, UpdateUserInput, Certification, CreateCertificationInput } from '../types';
import EditUserModal from '../components/EditUserModal';
import AddCertificationModal from '../components/AddCertificationModal';
import styles from './userDetails.module.scss';

export default function UserDetailsPage() {
  const { id } = useParams() as { id: string };
  const router = useRouter();
  const { user: currentUser } = useAuth();

  const [targetUser, setTargetUser] = useState<User | null>(null);
  const [certs, setCerts] = useState<Certification[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCertModalOpen, setIsCertModalOpen] = useState(false);

  const loadAllData = async () => {
    try {
      setLoading(true);
      const [userData, certsData] = await Promise.all([
        fetchUserById(id),
        fetchCertifications(id)
      ]);
      setTargetUser(userData);
      setCerts(certsData);
    } catch (err: any) {
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAllData();
  }, [id]);

  const handleDeleteCert = async (certId: string) => {
    if (confirm('Czy na pewno chcesz usunąć ten certyfikat?')) {
      try {
        await removeCertification(id, certId);
        setCerts(prev => prev.filter(c => c.id !== certId));
      } catch (err: any) {
        alert(err.message);
      }
    }
  };

  const handleAddCert = async (data: CreateCertificationInput) => {
    const newCert = await addCertification(id, data);
    setCerts(prev => [...prev, newCert]);
  };

  const handleDeactivate = async () => {
    if (confirm('Czy na pewno chcesz dezaktywować ten profil?')) {
      try {
        await deleteUser(id);

        setTargetUser(prev => prev ? { ...prev, isActive: false } : null);
        alert('Profil został pomyślnie zdezaktywowany.');
      } catch (err: any) {
        alert(err.message || 'Wystąpił błąd podczas dezaktywacji.');
      }
    }
  };

  if (loading) return <div className={styles.container}>Ładowanie...</div>;
  if (!targetUser) return <div className={styles.container}>Użytkownik nie znaleziony</div>;

  return (
    <div className={styles.container}>
      <button onClick={() => router.back()} className={styles.backLink}>&larr; Powrót</button>

      <div className={styles.header}>
        <div className={styles.titleRow}>
          <h1 className={styles.title}>{targetUser.name}</h1>
          <span className={`${styles.statusBadge} ${targetUser.isActive ? styles.statusActive : styles.statusInactive}`}>
            {targetUser.isActive ? 'AKTYWNY' : 'NIEAKTYWNY'}
          </span>
        </div>
        {/* ... metaGrid z email, rola ... */}
      </div>

      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Certyfikaty i Uprawnienia</h2>
          {currentUser?.role === 'ADMIN' && (
            <button
              className={styles.addCertBtn}
              onClick={() => setIsCertModalOpen(true)}
            >
              + Dodaj nowy
            </button>
          )}
        </div>

        <div className={styles.certGrid}>
          {certs.length === 0 ? (
            <p className={styles.emptyState}>Brak aktywnych certyfikatów.</p>
          ) : (
            certs.map(cert => (
              <div key={cert.id} className={styles.certCard}>
                <div className={styles.certMain}>
                  <span className={styles.certIcon}>📜</span>
                  <div>
                    <h4 className={styles.certTypeName}>{cert.type}</h4>
                    <p className={styles.certDates}>
                      Wydano: {new Date(cert.issuedAt).toLocaleDateString()} <br />
                      Wygasa: {new Date(cert.expiresAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className={styles.certStatusArea}>
                  <span className={cert.isValid ? styles.valid : styles.invalid}>
                    {cert.isValid ? 'Ważny' : 'Nieważny'}
                  </span>
                  {currentUser?.role === 'ADMIN' && (
                    <button
                      onClick={() => handleDeleteCert(cert.id)}
                      className={styles.deleteCertSmall}
                      title="Usuń certyfikat"
                    >
                      usuń
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Akcje Admina */}
      {currentUser?.role === 'ADMIN' && targetUser && (
        <div className={styles.actionsRow}>
          <button
            onClick={() => setIsEditModalOpen(true)}
            className={styles.editButton}
          >
            Edytuj Dane
          </button>

          {/* Przycisk pojawia się tylko, gdy użytkownik jest aktywny */}
          {targetUser.isActive && (
            <button
              onClick={handleDeactivate}
              className={styles.deleteButton}
            >
              Dezaktywuj Profil
            </button>
          )}
        </div>
      )}

      <EditUserModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        user={targetUser}
        onSubmit={async (data) => {
          const updated = await updateUser(id, data);
          setTargetUser(prev => ({ ...prev!, ...updated }));
        }}
      />

      <AddCertificationModal
        isOpen={isCertModalOpen}
        onClose={() => setIsCertModalOpen(false)}
        onSubmit={handleAddCert}
      />
    </div>
  );
}