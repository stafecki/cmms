'use client'

import React from 'react'
import { useAuth } from '@/context/AuthContext'

function LocationsGuard({ children }: { children: React.ReactNode }) {
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

export default function LocationsLayout({ children }: { children: React.ReactNode }) {
  return (
    <LocationsGuard>
      {children}
    </LocationsGuard>
  )
}