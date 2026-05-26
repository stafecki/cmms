'use client'

import styles from './documents.module.scss'
import { MachineDocument } from '../types'

interface DocumentTableProps {
  documents?: MachineDocument[]
}

export default function DocumentTable({ documents }: DocumentTableProps) {
  if (!documents || documents.length === 0) {
    return (
      <div className={styles.noData}>
        Brak załączonych dokumentów dla tej maszyny.
      </div>
    )
  }

  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
        <tr>
          <th>Nazwa pliku</th>
          <th>Wersja</th>
          <th>Data dodania</th>
          <th>Akcje</th>
        </tr>
        </thead>
        <tbody>
        {documents.map((doc) => (
          <tr key={doc.id}>
            <td>
              <span className={styles.filename}>{doc.filename}</span>
            </td>
            <td>
              v{doc.version}
              {doc.isLatest && <span className={styles.badge}>Najnowsza</span>}
            </td>
            <td>{new Date(doc.uploadedAt).toLocaleDateString()}</td>
            <td>
              <a
                href={`${process.env.NEXT_PUBLIC_API_URL}/${doc.filePath}`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.downloadBtn}
              >
                Pobierz
              </a>
            </td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  )
}