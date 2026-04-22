'use client'

import React, { useState } from 'react';
import styles from './inventory.module.scss';
import Link from 'next/link';
import { useInventory } from './useInventory';
import { InventoryFilters } from './components/InventoryFilters';
import { InventoryModal } from './components/InventoryModal';

export default function InventoryPage() {
  const [activeTab, setActiveTab] = useState<'parts' | 'loans'>('parts');
  const [showFilters, setShowFilters] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
          </div>
        </div>

        <div className={styles.headerActions}>
          <div className={styles.searchBox}>
            <input type="text" placeholder="Szukaj..." className={styles.searchInput} value={inv.searchQuery} onChange={(e) => inv.setSearchQuery(e.target.value)} />
            <button className={`${styles.filterToggle} ${showFilters ? styles.active : ''}`} onClick={() => setShowFilters(!showFilters)}>Filtry</button>
          </div>
          <button className={styles.addBtn} onClick={() => setIsModalOpen(true)}>+</button>
        </div>
      </header>

      {showFilters && activeTab === 'parts' && (
        <InventoryFilters
          {...inv}
          resetFilters={() => { inv.setSearchQuery(''); inv.setFilterCategory(''); inv.setPriceFrom(''); inv.setPriceTo(''); inv.setMinStock(0); }}
        />
      )}

      {isModalOpen && <InventoryModal categories={inv.categories} onClose={() => setIsModalOpen(false)} onSuccess={inv.fetchData} />}

      {inv.loading ? (
        <p className={styles.loading}>Ładowanie...</p>
      ) : (
        <div className={styles.content}>
          {activeTab === 'parts' ? (
            <div className={styles.grid}>
              {inv.filteredParts.map(part => (
                <Link href={`/inventory/${part.id}`} key={part.id} className={styles.cardLink}>
                  <div className={`${styles.card} ${part.stockQuantity <= part.reorderPoint ? styles.lowStock : ''}`}>
                    <div className={styles.cardHeader}><span className={styles.categoryTag}>{part.category.name}</span></div>
                    <h3>{part.name}</h3>
                    <div className={styles.stats}>
                      <div className={styles.stat}><label>Dostępne</label><strong>{part.stockQuantity}</strong></div>
                      <div className={styles.stat}><label>Cena</label><span>{part.unitPrice} PLN</span></div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className={styles.tableWrapper}>
              <table className={styles.loanTable}>
                <thead><tr><th>Narzędzie</th><th>Użytkownik</th><th>Data</th><th>Akcje</th></tr></thead>
                <tbody>
                {inv.loans.map(loan => (
                  <tr key={loan.id}>
                    <td><strong>{loan.part.name}</strong></td>
                    <td>{loan.user.name}</td>
                    <td>{new Date(loan.loanedAt).toLocaleDateString()}</td>
                    <td><button onClick={() => inv.handleReturn(loan.id)} className={styles.returnBtn}>Zwrot</button></td>
                  </tr>
                ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}