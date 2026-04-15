import styles from './header.module.scss'
import Navbar from '../navbar/index'

export default function Header() {
  return (
    <header className={styles.Header}>
      <h1>CMMS</h1>
      <Navbar />
      <button>
        <a href={'/login'}>Logowanie</a>
      </button>
    </header>
  )
}