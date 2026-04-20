'use client'

import styles from './register.module.scss'
import { useState } from 'react'

export default function Register() {

  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)
    setError(null)

    const formData = new FormData(event.currentTarget)
    const data = Object.fromEntries(formData.entries())

    if (data.password !== data.repeatPassword) {
      setError("Hasła nie są jendakowe")
      setLoading(false)
      return
    }

    try {
      const response = await fetch('http://localhost:3000/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          password: data.password,
          role: "OPERATOR"
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        setError(result.message || "Błąd rejestracji");
        return;
      }

      console.log('Zarejestrowano pomyslnie', result);
      window.location.href = '/auth/login';

    } catch (err: any) {
      setError("Problem z połączeniem z serwerem");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.cont}>
      <div className={styles.imgContLeft}></div>

      <main className={styles.register}>
        <form onSubmit={handleSubmit} className={styles.registerForm}>
          <h1 className={styles.formHeader}>Zarejestruj</h1>

          {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

          <div className={styles.fieldGroup}>
            <label htmlFor="reg-email">Email:</label>
            <input type="email" id="reg-email" name="email" placeholder="jan.kowalski@example.com" required />
          </div>

          <div className={styles.fieldGroup}>
            <label htmlFor="name">Nazwa użytkownika (Imię i Nazwisko):</label>
            <input type="text" id="name" name="name" placeholder="Jan Kowalski" required />
          </div>
          <div className={`${styles.fieldGroup} ${styles.half}`}>
            <label htmlFor="reg-password">Hasło:</label>
            <input type="password" id="reg-password" name="password" required />
          </div>

          <div className={`${styles.fieldGroup} ${styles.half}`}>
            <label htmlFor="repeatPassword">Powtórz hasło:</label>
            <input type="password" id="repeatPassword" name="repeatPassword" required />
          </div>

          <button type="submit" className={styles.submitBtn} disabled={loading}>
            {loading ? 'Rejestrowanie...' : 'Zarejestruj'}
          </button>

          <div className={styles.footerLink}>
            <p>Masz już konto?</p>
            <a href={"/auth/login"}>Zaloguj się</a>
          </div>
        </form>
      </main>

      <div className={styles.imgContRight}></div>
    </div>
  )
}
