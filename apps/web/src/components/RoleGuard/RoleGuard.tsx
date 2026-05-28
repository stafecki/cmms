'use client'

import React, { ReactNode, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import { useRouter } from 'next/navigation'

interface RoleGuardProps {
  allowedRoles: Array<'ADMIN' | 'MANAGER' | 'TECHNICIAN' | 'WAREHOUSE' | 'OPERATOR'>
  children: ReactNode
  fallback?: ReactNode
}

export default function RoleGuard({ allowedRoles, children, fallback }: RoleGuardProps) {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/auth/login')
    }
  }, [isLoading, user, router])

  if (isLoading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        background: '#060D0C',
        color: '#F0EDE5'
      }}>
        <p>Inicjalizacja profilu...</p>
      </div>
    )
  }

  if (!user) return null

  if (!allowedRoles.includes(user.role)) {
    return <>{fallback}</>
  }

  return <>{children}</>
}