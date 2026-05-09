'use client'
import React from 'react';
import styles from './FilterPanel.module.scss';

interface FilterPanelProps {
  onReset: () => void;
  children: React.ReactNode;
}

export const FilterPanel = ({ onReset, children }: FilterPanelProps) => (
  <div className={styles.filterPanel}>
    {children}
    <button className={styles.resetBtn} onClick={onReset}>Resetuj filtry</button>
  </div>
);

// Pomocniczy komponent do owijania labelki i inputa
export const FilterGroup = ({ label, children }: { label: React.ReactNode, children: React.ReactNode }) => (
  <div className={styles.filterGroup}>
    <label>{label}</label>
    {children}
  </div>
);