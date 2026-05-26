'use client'

import React from 'react'
import { useAuth } from '@/context/AuthContext'

function InventoryGuard({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '2rem', color: '#F0EDE5' }}>
        Weryfikacja uprawnień...
      </div>
    )
  }

  if (!user) return null

  return <>{children}</>
}

export default function InventoryLayout({ children }: { children: React.ReactNode }) {
  return (
    <InventoryGuard>
      {children}
    </InventoryGuard>
  )
}