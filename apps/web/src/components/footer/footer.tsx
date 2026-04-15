import styles from './footer.module.scss'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <div className={styles.grid}>
          <div className={styles.contactInfo}>
            <h3>Kontakt</h3>
            <p>ul. Fredry 13</p>
            <p>61-714 Poznań</p>
            <a href="mailto:biuro@cmms.pl">biuro@cmms.pl</a>
            <a href="tel:+48000000000">+48 000 000 000</a>
          </div>

          <div className={styles.socials}>
            <h3>Social Media</h3>
            <ul>
              <li><a href="https://www.instagram.com/">Instagram</a></li>
              <li><a href="https://pl.linkedin.com/">LinkedIn</a></li>
            </ul>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>© 2026 Twoja Firma</p>
        </div>
      </div>
    </footer>
  )
}
