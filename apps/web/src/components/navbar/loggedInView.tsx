'use client'

import Link from 'next/link'
import styles from '@/components/navbar/navbar.module.scss'
import { useAuth } from '../../context/AuthContext'
interface LoggedInViewProps {
  onOpenSidebar: () => void;
}

export default function LoggedInView({ onOpenSidebar }: LoggedInViewProps) {
  const { user } = useAuth()

  const hasDashboardAccess = user?.role === 'ADMIN' || user?.role === 'MANAGER'

  const mainLinkHref = hasDashboardAccess ? '/dashboard' : '/'
  const mainLinkText = hasDashboardAccess ? 'Panel główny' : 'Strona główna'

  return (
    <>
      <li className={styles.burgerItem} onClick={onOpenSidebar}>
        <div className={styles.burgerIcon}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </li>

      <li>
        <Link href={mainLinkHref} className={styles.authLink}>
          {mainLinkText}
        </Link>
      </li>
      <li>
        <Link href="/me" className={styles.authLink}>
          Mój profil
        </Link>
      </li>
    </>
  )
}