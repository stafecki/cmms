'use client'

import styles from './register.module.scss'

export default function Register() {
  return (
    <div className={styles.cont}>
      <div className={styles.imgContLeft}></div>

      <main className={styles.register}>
        <form method="post" action="/register" className={styles.registerForm}>
          <h1 className={styles.formHeader}>Zarejestruj</h1>

          <div className={styles.fieldGroup}>
            <label htmlFor="reg-email">Email:</label>
            <input type="email" id="reg-email" name="email" placeholder="jan.kowalski@example.com" required />
          </div>

          <div className={styles.fieldGroup}>
            <label htmlFor="username">Nazwa użytkownika:</label>
            <input type="text" id="username" name="username" placeholder="jankowalski" required />
          </div>

          <div className={`${styles.fieldGroup} ${styles.half}`}>
            <label htmlFor="first_name">Imię:</label>
            <input type="text" id="first_name" name="first_name" placeholder="Jan" required />
          </div>

          <div className={`${styles.fieldGroup} ${styles.half}`}>
            <label htmlFor="last_name">Nazwisko:</label>
            <input type="text" id="last_name" name="last_name" placeholder="Kowalski" required />
          </div>

          <div className={`${styles.fieldGroup} ${styles.half}`}>
            <label htmlFor="reg-password">Hasło:</label>
            <input type="password" id="reg-password" name="password" required />
          </div>

          <div className={`${styles.fieldGroup} ${styles.half}`}>
            <label htmlFor="repeatPassword">Powtórz hasło:</label>
            <input type="password" id="repeatPassword" name="repeatPassword" required />
          </div>

          <button type="submit" className={styles.submitBtn}>Zarejestruj</button>

          <div className={styles.footerLink}>
            <p>Masz już konto?</p>
            <a href={"/login"}>Zaloguj się</a>
          </div>
        </form>
      </main>

      <div className={styles.imgContRight}></div>
    </div>
  )
}
