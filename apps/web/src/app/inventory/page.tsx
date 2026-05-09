'use client'

import React, { useState } from 'react';
import styles from './inventory.module.scss';
import Link from 'next/link';
import { useInventory } from './useInventory';
import { InventoryModal } from './components/InventoryModal';
import { LowStockPanel } from './components/LowStockPanel';

// Zwróć uwagę na czyste importy!
import { SearchBar } from '@/components/searchBar';
import { FilterPanel, FilterGroup } from '@/components/filterPanel';

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
          <SearchBar
            value={inv.searchQuery}
            onChange={inv.setSearchQuery}
            showFilterToggle={true}
            isFilterActive={showFilters}
            onToggleFilters={() => setShowFilters(!showFilters)}
            placeholder="Szukaj części..."
          />
          <button className={styles.addBtn} onClick={() => setIsModalOpen(true)}>+</button>
        </div>
      </header>

      {showLowStock && (
        <LowStockPanel parts={inv.lowStockParts} onClose={() => setShowLowStock(false)} />
      )}

      {showFilters && activeTab === 'parts' && (
        <FilterPanel onReset={() => {
          inv.setSearchQuery('');
          inv.setFilterCategory('');
          inv.setPriceFrom('');
          inv.setPriceTo('');
          inv.setMinStock(0);
        }}>
          <FilterGroup label="Kategoria">
            <select value={inv.filterCategory} onChange={(e) => inv.setFilterCategory(e.target.value)}>
              <option value="">Wszystkie kategorie</option>
              {inv.categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </FilterGroup>

          <FilterGroup label="Cena (PLN)">
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <input
                type="number"
                placeholder="Od"
                style={{ width: '100px' }}
                value={inv.priceFrom}
                onChange={(e) => inv.setPriceFrom(e.target.value === '' ? '' : Number(e.target.value))}
              />
              <input
                type="number"
                placeholder="Do"
                style={{ width: '100px' }}
                value={inv.priceTo}
                onChange={(e) => inv.setPriceTo(e.target.value === '' ? '' : Number(e.target.value))}
              />
            </div>
          </FilterGroup>

          <FilterGroup label={<>Min. ilość sztuk: <strong>{inv.minStock}</strong></>}>
            <input
              type="range"
              min="0"
              max="100"
              value={inv.minStock}
              onChange={(e) => inv.setMinStock(Number(e.target.value))}
            />
          </FilterGroup>
        </FilterPanel>
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