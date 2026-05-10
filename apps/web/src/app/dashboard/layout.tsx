'use client'

import React from 'react'
import { AuthProvider } from '../../context/AuthContext'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  )
}