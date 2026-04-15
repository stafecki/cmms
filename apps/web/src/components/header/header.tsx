import styles from './header.module.scss'
import Navbar from '../navbar/index'
import Link from 'next/link'

export default function Header() {
  return (
    <header className={styles.Header}>
      <div className={styles.logo}>
        <h1>CMMS</h1>
      </div>
      <Navbar />
      <div className={styles.actions}>
        <Link href='/login' className={styles.loginBtn}>
          Logowanie
        </Link>
      </div>
    </header>
  )
}
