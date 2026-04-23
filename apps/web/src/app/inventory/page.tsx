'use client'

import React, { useState } from 'react';
import styles from './inventory.module.scss';
import Link from 'next/link';
import { useInventory } from './useInventory';
import { InventoryFilters } from './components/InventoryFilters';
import { InventoryModal } from './components/InventoryModal';
import { LowStockPanel } from './components/LowStockPanel';

export default function InventoryPage() {
  const [activeTab, setActiveTab] = useState<'parts' | 'loans' | 'myLoans'>('parts');
  const [showFilters, setShowFilters] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showLowStock, setShowLowStock] = useState(false);

  const inv = useInventory();

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.titleSection}>
          <h1>Magazyn <span>Części i Narzędzi</span></h1>
          <div className={styles.tabs}>
            <button className={activeTab === 'parts' ? styles.activeTab : ''} onClick={() => setActiveTab('parts')}>
              Stan ({inv.parts.length})
            </button>
            <button className={activeTab === 'loans' ? styles.activeTab : ''} onClick={() => setActiveTab('loans')}>
              Wypożyczenia ({inv.loans.length})
            </button>
            <button className={activeTab === 'myLoans' ? styles.activeTab : ''} onClick={() => setActiveTab('myLoans')}>
              Moje Zasoby ({inv.myLoans.length})
            </button>
          </div>
        </div>

        <div className={styles.headerActions}>
          <div className={styles.searchBox}>
            <input
              type="text"
              placeholder="Szukaj..."
              className={styles.searchInput}
              value={inv.searchQuery}
              onChange={(e) => inv.setSearchQuery(e.target.value)}
            />
            <button
              className={`${styles.filterToggle} ${showFilters ? styles.active : ''}`}
              onClick={() => setShowFilters(!showFilters)}
            >
              Filtry
            </button>
          </div>

          <button
            className={`${styles.alertBell} ${inv.lowStockParts.length > 0 ? styles.hasAlerts : ''}`}
            onClick={() => setShowLowStock(!showLowStock)}
          >
            <span className={styles.bellIcon}>🔔</span>
            {inv.lowStockParts.length > 0 && (
              <span className={styles.countBadge}>{inv.lowStockParts.length}</span>
            )}
          </button>

          <button className={styles.addBtn} onClick={() => setIsModalOpen(true)}>+</button>
        </div>
      </header>

      {showLowStock && (
        <LowStockPanel parts={inv.lowStockParts} onClose={() => setShowLowStock(false)} />
      )}

      {showFilters && activeTab === 'parts' && (
        <InventoryFilters
          {...inv}
          resetFilters={() => {
            inv.setSearchQuery(''); inv.setFilterCategory('');
            inv.setPriceFrom(''); inv.setPriceTo(''); inv.setMinStock(0);
          }}
        />
      )}

      {isModalOpen && (
        <InventoryModal
          categories={inv.categories}
          onClose={() => setIsModalOpen(false)}
          onSuccess={inv.fetchData}
        />
      )}

      {inv.loading ? (
        <p className={styles.loading}>Ładowanie...</p>
      ) : (
        <div className={styles.content}>
          {activeTab === 'parts' && (
            <div className={styles.grid}>
              {inv.filteredParts.map(part => (
                <Link href={`/inventory/${part.id}`} key={part.id} className={styles.cardLink}>
                  <div className={`${styles.card} ${part.stockQuantity <= part.reorderPoint ? styles.lowStock : ''}`}>
                    <div className={styles.cardHeader}>
                      <span className={styles.categoryTag}>{part.category.name}</span>
                      {part.stockQuantity > 0 && (
                        <button
                          className={styles.quickLoanBtn}
                          onClick={(e) => { e.preventDefault(); inv.handleLoan(part.id); }}
                        >
                          + Wypożycz
                        </button>
                      )}
                    </div>
                    <h3>{part.name}</h3>
                    <div className={styles.stats}>
                      <div className={styles.stat}>
                        <label>Dostępne</label>
                        <strong className={part.stockQuantity === 0 ? styles.outOfStock : ''}>
                          {part.stockQuantity}
                        </strong>
                      </div>
                      <div className={styles.stat}>
                        <label>Cena</label>
                        <span>{part.unitPrice} PLN</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {(activeTab === 'loans' || activeTab === 'myLoans') && (
            <div className={styles.tableWrapper}>
              <table className={styles.loanTable}>
                <thead>
                <tr>
                  <th>Narzędzie</th>
                  <th>{activeTab === 'loans' ? 'Użytkownik' : 'Kod QR'}</th>
                  <th>Data</th>
                  <th>Akcje</th>
                </tr>
                </thead>
                <tbody>
                {(activeTab === 'loans' ? inv.loans : inv.myLoans).length === 0 ? (
                  <tr><td colSpan={4} className={styles.noResults}>Brak aktywnych pozycji.</td></tr>
                ) : (
                  (activeTab === 'loans' ? inv.loans : inv.myLoans).map(loan => (
                    <tr key={loan.id}>
                      <td><strong>{loan.part.name}</strong></td>
                      <td>
                        {activeTab === 'loans'
                          ? loan.user.name
                          : <code className={styles.qrCodeSmall}>{loan.part.qrCode}</code>
                        }
                      </td>
                      <td>{new Date(loan.loanedAt).toLocaleDateString()}</td>
                      <td>
                        <button onClick={() => inv.handleReturn(loan.id)} className={styles.returnBtn}>
                          {activeTab === 'myLoans' ? 'Zwróć teraz' : 'Zwrot'}
                        </button>
                      </td>
                    </tr>
                  ))
                )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}