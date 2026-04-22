import React from 'react';
import styles from '../inventory.module.scss';
import { Category } from '../types';

interface FiltersProps {
  categories: Category[];
  filterCategory: string;
  setFilterCategory: (val: string) => void;
  priceFrom: number | '';
  setPriceFrom: (val: number | '') => void;
  priceTo: number | '';
  setPriceTo: (val: number | '') => void;
  minStock: number;
  setMinStock: (val: number) => void;
  resetFilters: () => void;
}

export const InventoryFilters = ({
                                   categories, filterCategory, setFilterCategory,
                                   priceFrom, setPriceFrom, priceTo, setPriceTo,
                                   minStock, setMinStock, resetFilters
                                 }: FiltersProps) => (
  <div className={styles.filterPanel}>
    <div className={styles.filterGroup}>
      <label>Kategoria</label>
      <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
        <option value="">Wszystkie kategorie</option>
        {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
      </select>
    </div>
    <div className={styles.filterGroup}>
      <label>Cena (PLN)</label>
      <div className={styles.inputRange}>
        <input type="number" placeholder="Od" value={priceFrom} onChange={(e) => setPriceFrom(e.target.value === '' ? '' : Number(e.target.value))} />
        <input type="number" placeholder="Do" value={priceTo} onChange={(e) => setPriceTo(e.target.value === '' ? '' : Number(e.target.value))} />
      </div>
    </div>
    <div className={styles.filterGroup}>
      <label>Min. ilość sztuk: <strong>{minStock}</strong></label>
      <input type="range" min="0" max="100" value={minStock} onChange={(e) => setMinStock(Number(e.target.value))} className={styles.slider} />
    </div>
    <button className={styles.resetBtn} onClick={resetFilters}>Resetuj filtry</button>
  </div>
);