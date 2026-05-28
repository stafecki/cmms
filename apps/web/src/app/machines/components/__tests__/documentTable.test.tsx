import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import DocumentTable from '../documentTable'
import { MachineDocument } from '../../types'

const mockDocuments: MachineDocument[] = [
  {
    id: 'doc-1',
    machineId: 'machine-1',
    uploadedById: 'user-1',
    filename: 'instrukcja.pdf',
    filePath: 'uploads/instrukcja.pdf',
    version: 2,
    isLatest: true,
    uploadedAt: '2024-03-15T10:00:00Z',
  },
  {
    id: 'doc-2',
    machineId: 'machine-1',
    uploadedById: 'user-1',
    filename: 'schemat.pdf',
    filePath: 'uploads/schemat.pdf',
    version: 1,
    isLatest: false,
    uploadedAt: '2023-01-20T08:00:00Z',
  },
]

describe('DocumentTable', () => {
  describe('brak dokumentów', () => {
    it('wyświetla komunikat gdy documents jest pustą tablicą', () => {
      render(<DocumentTable documents={[]} />)
      expect(screen.getByText('Brak załączonych dokumentów dla tej maszyny.')).toBeInTheDocument()
    })

    it('wyświetla komunikat gdy documents jest undefined', () => {
      render(<DocumentTable />)
      expect(screen.getByText('Brak załączonych dokumentów dla tej maszyny.')).toBeInTheDocument()
    })
  })

  describe('renderowanie dokumentów', () => {
    it('renderuje nazwy plików', () => {
      render(<DocumentTable documents={mockDocuments} />)
      expect(screen.getByText('instrukcja.pdf')).toBeInTheDocument()
      expect(screen.getByText('schemat.pdf')).toBeInTheDocument()
    })

    it('renderuje wersje dokumentów', () => {
      render(<DocumentTable documents={mockDocuments} />)
      expect(screen.getByText(/v2/)).toBeInTheDocument()
      expect(screen.getByText(/v1/)).toBeInTheDocument()
    })

    it('wyświetla badge Najnowsza dla isLatest=true', () => {
      render(<DocumentTable documents={mockDocuments} />)
      expect(screen.getByText('Najnowsza')).toBeInTheDocument()
    })

    it('nie wyświetla badge Najnowsza dla isLatest=false', () => {
      render(<DocumentTable documents={[mockDocuments[1]]} />)
      expect(screen.queryByText('Najnowsza')).not.toBeInTheDocument()
    })

    it('renderuje datę dodania', () => {
      render(<DocumentTable documents={[mockDocuments[0]]} />)
      expect(screen.getByText(new Date('2024-03-15T10:00:00Z').toLocaleDateString())).toBeInTheDocument()
    })

    it('renderuje linki Pobierz do każdego dokumentu', () => {
      render(<DocumentTable documents={mockDocuments} />)
      const links = screen.getAllByRole('link', { name: 'Pobierz' })
      expect(links).toHaveLength(2)
    })

    it('link Pobierz otwiera się w nowej karcie', () => {
      render(<DocumentTable documents={[mockDocuments[0]]} />)
      const link = screen.getByRole('link', { name: 'Pobierz' })
      expect(link).toHaveAttribute('target', '_blank')
      expect(link).toHaveAttribute('rel', 'noopener noreferrer')
    })
  })

  describe('nagłówki tabeli', () => {
    it('renderuje nagłówki kolumn', () => {
      render(<DocumentTable documents={mockDocuments} />)
      expect(screen.getByText('Nazwa pliku')).toBeInTheDocument()
      expect(screen.getByText('Wersja')).toBeInTheDocument()
      expect(screen.getByText('Data dodania')).toBeInTheDocument()
      expect(screen.getByText('Akcje')).toBeInTheDocument()
    })
  })
})
