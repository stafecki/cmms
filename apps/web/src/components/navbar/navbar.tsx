import styles from "./navbar.module.scss"
import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <ul>
        <li>
          <Link href="/">Strona główna</Link>
        </li>
        <li>
          <Link href="/about">O nas</Link>
        </li>
      </ul>
    </nav>
  )
}
