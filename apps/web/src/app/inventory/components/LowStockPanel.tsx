import React from 'react';
import styles from '../inventory.module.scss';
import { Part } from '../types';
import Link from 'next/link';

interface LowStockPanelProps {
  parts: Part[];
  onClose: () => void;
}

export const LowStockPanel = ({ parts, onClose }: LowStockPanelProps) => {
  return (
    <div className={styles.alertPanel}>
      <div className={styles.alertHeader}>
        <h3>Krytyczny stan magazynowy ({parts.length})</h3>
        <button onClick={onClose}>&times;</button>
      </div>
      <div className={styles.alertList}>
        {parts.length === 0 ? (
          <p className={styles.emptyAlerts}>Wszystkie stany są w normie.</p>
        ) : (
          parts.map(part => (
            <div key={part.id} className={styles.alertItem}>
              <div className={styles.alertInfo}>
                <span className={styles.partName}>{part.name}</span>
                <span className={styles.partStock}>
                  Stan: <strong>{part.stockQuantity}</strong> / min: {part.reorderPoint}
                </span>
              </div>
              <Link href={`/inventory/${part.id}`} className={styles.orderBtn}>
                Zamów / Edytuj
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
};