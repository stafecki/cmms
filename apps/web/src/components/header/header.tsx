import styles from './header.module.scss'
import Navbar from '../navbar/index'
import AuthBtn from '../authBtn/index'

export default function Header() {
  return (
    <header className={styles.Header}>
      <div className={styles.logo}>
        <h1>CMMS</h1>
      </div>
      <Navbar />
      <div className={styles.actions}>
        <AuthBtn/>
      </div>
    </header>
  )
}
