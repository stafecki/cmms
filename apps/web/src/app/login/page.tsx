'use client'

import styles from './login.module.scss'

export default function Login(){
  return (
    <div className={styles.cont}>
      <main className={styles.login}>
        <form method="post" action="/login" className={styles.loginForm}>
          <h1 className={styles.formHeader}>Zaloguj</h1>

          <div className={styles.fieldGroup}>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              required
            />
          </div>
          <div className={styles.fieldGroup}>
            <label htmlFor="password">Hasło:</label>
            <input
              type="password"
              id="password"
              name="password"
              required
            />
          </div>

          <button type="submit" className={styles.submitBtn}>
            Zaloguj
          </button>
        </form>
      </main>
      <main className={styles.register}>
        <form method="post" action="/register" className={styles.registerForm}>
          <h1 className={styles.formHeader}>Zarejestruj</h1>

          <div className={styles.fieldGroup}>
            <label htmlFor="reg-email">Email:</label>
            <input type="email" id="reg-email" name="email" placeholder="Email" required />
          </div>

          <div className={styles.fieldGroup}>
            <label htmlFor="username">Nazwa użytkownika:</label>
            <input type="text" id="username" name="username" placeholder="Nazwa użytkownika" required />
          </div>

          <div className={styles.fieldGroup}>
            <label htmlFor="first_name">Imię:</label>
            <input type="text" id="first_name" name="first_name" placeholder="Imię" required />
          </div>

          <div className={styles.fieldGroup}>
            <label htmlFor="last_name">Nazwisko:</label>
            <input type="text" id="last_name" name="last_name" placeholder="Nazwisko" required />
          </div>

          <div className={styles.fieldGroup}>
            <label htmlFor="reg-password">Hasło:</label>
            <input type="password" id="reg-password" name="password" required />
          </div>

          <div className={styles.fieldGroup}>
            <label htmlFor="repeatPassword">Powtórz hasło:</label>
            <input type="password" id="repeatPassword" name="repeatPassword" required />
          </div>

          <button type="submit" className={styles.submitBtn}>Zarejestruj</button>
        </form>
      </main>
    </div>

  )
}