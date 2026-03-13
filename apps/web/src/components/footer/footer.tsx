import styles from './footer.module.scss'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <p>Version: 0.0.0</p>
      </div>
    </footer>
  )
}