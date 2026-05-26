'use client'

import React, { useState } from 'react';
import styles from './inventory.module.scss';
import Link from 'next/link';
import { useInventory } from './useInventory';
import { useAuth } from '@/context/AuthContext';
import { InventoryModal } from './components/InventoryModal';
import { AdjustStockModal } from './components/AdjustStockModal';
import { LowStockPanel } from './components/LowStockPanel';
import { CategoriesPanel } from './components/CategoriesPanel';
import { SearchBar } from '@/components/searchBar';
import { FilterPanel, FilterGroup } from '@/components/filterPanel';
import { Part } from './types';

export default function InventoryPage() {
  const [activeTab, setActiveTab] = useState<'parts' | 'loans' | 'myLoans'>('parts');
  const [showFilters, setShowFilters] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showLowStock, setShowLowStock] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const [adjustPart, setAdjustPart] = useState<Part | null>(null);

  const inv = useInventory();
  const { user } = useAuth(); // Pobieramy zalogowanego użytkownika

  const canAddPart = user?.role === 'ADMIN' || user?.role === 'MANAGER' || user?.role === 'WAREHOUSE';
  const canManageCategories = user?.role === 'ADMIN';
  const canViewAllLoans = user?.role === 'ADMIN' || user?.role === 'WAREHOUSE' || user?.role === 'MANAGER';
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.titleSection}>
          <h1>Magazyn <span>Części i Narzędzi</span></h1>
          <div className={styles.tabs}>
            <button
              className={activeTab === 'parts' ? styles.activeTab : ''}
              onClick={() => setActiveTab('parts')}
            >
              Stan ({inv.parts.length})
            </button>
            {canViewAllLoans && (
              <button
                className={activeTab === 'loans' ? styles.activeTab : ''}
                onClick={() => setActiveTab('loans')}
              >
                Wszystkie wypożyczenia ({inv.loans.length})
              </button>
            )}
            <button
              className={activeTab === 'myLoans' ? styles.activeTab : ''}
              onClick={() => setActiveTab('myLoans')}
            >
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
          {canManageCategories && (
            <button className={styles.catBtn} onClick={() => setShowCategories(!showCategories)}>Kategorie</button>
          )}
          {canAddPart && (
            <button className={styles.addBtn} onClick={() => setIsModalOpen(true)}>+</button>
          )}
        </div>
      </header>

      {showLowStock && (
        <LowStockPanel parts={inv.lowStockParts} onClose={() => setShowLowStock(false)} />
      )}

      {showCategories && canManageCategories && (
        <CategoriesPanel
          categories={inv.categories}
          onDelete={inv.handleDeleteCategory}
          onClose={() => setShowCategories(false)}
        />
      )}

      {showFilters && activeTab === 'parts' && (
        <FilterPanel onReset={() => {
          inv.setSearchQuery('');
          inv.setFilterCategory('');
        }}>
          <FilterGroup label="Kategoria">
            <select value={inv.filterCategory} onChange={(e) => inv.setFilterCategory(e.target.value)}>
              <option value="">Wszystkie kategorie</option>
              {inv.categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </FilterGroup>
        </FilterPanel>
      )}

      {isModalOpen && canAddPart && (
        <InventoryModal
          categories={inv.categories}
          onClose={() => setIsModalOpen(false)}
          onSuccess={inv.fetchData}
        />
      )}

      {adjustPart && (
        <AdjustStockModal
          part={adjustPart}
          onClose={() => setAdjustPart(null)}
          onSuccess={() => { inv.fetchData(); setAdjustPart(null); }}
        />
      )}

      {inv.loading ? (
        <p className={styles.loading}>Ładowanie danych z magazynu...</p>
      ) : (
        <div className={styles.content}>

          {activeTab === 'parts' && (
            <div className={styles.grid}>
              {inv.filteredParts.map(part => {

                const cardContent = (
                  <div className={`${styles.card} ${part.stockQuantity <= part.reorderPoint ? styles.lowStock : ''}`}>
                    <div className={styles.cardHeader}>
                      <span className={styles.categoryTag}>{part.category.name}</span>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        {canAddPart && (
                          <button
                            className={styles.quickLoanBtn}
                            style={{ fontSize: '0.75rem', padding: '0.3rem 0.6rem' }}
                            onClick={(e) => {
                              e.preventDefault();
                              setAdjustPart(part);
                            }}
                          >
                            Koryguj
                          </button>
                        )}
                        {part.stockQuantity > 0 && (
                          <button
                            className={styles.quickLoanBtn}
                            onClick={(e) => {
                              e.preventDefault();
                              inv.handleLoan(part.id);
                            }}
                          >
                            + Wypożycz
                          </button>
                        )}
                      </div>
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
                );

                return canAddPart ? (
                  <Link href={`/inventory/${part.id}`} key={part.id} className={styles.cardLink}>
                    {cardContent}
                  </Link>
                ) : (
                  <div key={part.id} className={styles.cardLink} style={{ cursor: 'default' }}>
                    {cardContent}
                  </div>
                );
              })}
            </div>
          )}

          {(activeTab === 'loans' || activeTab === 'myLoans') && (
            <div className={styles.tableWrapper}>
              <table className={styles.loanTable}>
                <thead>
                <tr>
                  <th>Narzędzie</th>
                  <th>{activeTab === 'loans' ? 'Użytkownik' : 'Kod QR'}</th>
                  <th>Data wypożyczenia</th>
                  <th>Akcje</th>
                </tr>
                </thead>
                <tbody>
                {(activeTab === 'loans' ? inv.loans : inv.myLoans).length === 0 ? (
                  <tr><td colSpan={4} className={styles.noResults}>Brak aktywnych wypożyczeń.</td></tr>
                ) : (
                  (activeTab === 'loans' ? inv.loans : inv.myLoans).map(loan => {

                    const canReturn = user?.id === loan.user.id;

                    return (
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
                          {canReturn ? (
                            <button
                              onClick={() => inv.handleReturn(loan.id)}
                              className={styles.returnBtn}
                            >
                              {activeTab === 'myLoans' ? 'Zwróć teraz' : 'Zwrot'}
                            </button>
                          ) : (
                            <span className={styles.othersLoanBadge}>W posiadaniu</span>
                          )}
                        </td>
                      </tr>
                    );
                  })
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