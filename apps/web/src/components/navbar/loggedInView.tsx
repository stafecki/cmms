import Link from 'next/link'
import styles from '@/components/navbar/navbar.module.scss'

export default function LoggedInView() {
  return (
    <>
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