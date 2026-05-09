'use client'

import { AuthProvider, useAuth } from '../context/AuthContext'

// Pomocniczy komponent, żeby nie mieszać logiki w samym Providerze
function InventoryGuard({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth()

  if (isLoading) return <div className="loading-screen">Weryfikacja uprawnień...</div>
  if (!user) return null

  return <>{children}</>
}

export default function InventoryLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <InventoryGuard>
        {children}
      </InventoryGuard>
    </AuthProvider>
  )
}