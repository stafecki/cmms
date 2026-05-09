'use client'
import React from 'react';
import styles from './searchbar.module.scss';

interface SearchBarProps {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  showFilterToggle?: boolean;
  isFilterActive?: boolean;
  onToggleFilters?: () => void;
}

export const SearchBar = ({
                            value,
                            onChange,
                            placeholder = "Szukaj...",
                            showFilterToggle = false,
                            isFilterActive = false,
                            onToggleFilters
                          }: SearchBarProps) => {
  return (
    <div className={styles.searchBox}>
      <input
        type="text"
        placeholder={placeholder}
        className={styles.searchInput}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {showFilterToggle && onToggleFilters && (
        <button
          className={`${styles.filterToggle} ${isFilterActive ? styles.active : ''}`}
          onClick={onToggleFilters}
        >
          Filtry
        </button>
      )}
    </div>
  );
};