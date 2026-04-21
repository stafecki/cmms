import Link from 'next/link'
import styles from '@/components/navbar/navbar.module.scss'

interface LoggedInViewProps {
  onOpenSidebar: () => void;
}

export default function LoggedInView({ onOpenSidebar }: LoggedInViewProps) {
  return (
    <>
      {}
      <li className={styles.burgerItem} onClick={onOpenSidebar}>
        <div className={styles.burgerIcon}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </li>

      <li>
        <Link href="/dashboard" className={styles.authLink}>
          Panel główny
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