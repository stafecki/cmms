'use client'

import styles from './login.module.scss'

export default function Login(){
  return (
    <div className={styles.cont}>
      <div className={styles.imgContLeft}>

      </div>
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
          <div className={styles.fieldGroup}>
            <p>Jeszcze z nami nie współpracujesz?</p>
            <a href={"/register"}>Zarejestruj się</a>
          </div>
        </form>
      </main>
      <div className={styles.imgContRight}>
      </div>
    </div>

  )
}