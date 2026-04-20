'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'
import styles from './login.module.scss'

export default function Login() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsLoading(true)
    setError(null)

    const formData = new FormData(event.currentTarget)
    const payload = Object.fromEntries(formData.entries())

    try {
      const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.message || 'Błąd logowania')
      }

      Cookies.set('accessToken', result.tokens.accessToken, {
        expires: 1 / 96,
        secure: true,
        sameSite: 'strict'
      })
      Cookies.set('refreshToken', result.tokens.refreshToken, {
        expires: 7,
        secure: true,
        sameSite: 'strict'
      })

      localStorage.setItem('user', JSON.stringify(result.user))


      window.location.href = '/dashboard'

    } catch (err: any) {
      setError(err.message)
      setIsLoading(false)
    }finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={styles.cont}>
      <div className={styles.imgContLeft}></div>
      <main className={styles.login}>
        <form onSubmit={handleSubmit} className={styles.loginForm}>
          <h1 className={styles.formHeader}>Zaloguj</h1>

          {error && <div className={styles.errorBanner}>{error}</div>}

          <div className={styles.fieldGroup}>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              disabled={isLoading}
            />
          </div>

          <div className={styles.fieldGroup}>
            <label htmlFor="password">Hasło:</label>
            <input
              type="password"
              id="password"
              name="password"
              required
              disabled={isLoading}
            />
          </div>

          <button
            type="submit"
            className={styles.submitBtn}
            disabled={isLoading}
          >
            {isLoading ? 'Logowanie...' : 'Zaloguj'}
          </button>

          <div className={styles.fieldGroup}>
            <p>
              Nie masz konta? <a href="/auth/register">Zarejestruj się</a>
            </p>
          </div>
        </form>
      </main>
      <div className={styles.imgContRight}></div>
    </div>
  )
}
