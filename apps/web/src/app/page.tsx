'use client'

import styles from './homepage.module.scss'
import Link from 'next/link'

export default function Home() {
  return (
    <div className={styles.homepageContainer}>
      <section className={styles.slider}>
        <div className={styles.overlay}></div>

        <div className={styles.content}>
          <div className={styles.sliderHeader}>
            <h1>System CMMS <br /> <span>dla Twojej firmy</span></h1>
            <p>Zarządzaj utrzymaniem ruchu, magazynem i serwisem w jednym miejscu.</p>
          </div>

          <div className={styles.btns}>
            <Link href="/register" className={styles.primaryBtn}>
              Dołącz do nas
            </Link>
            <Link href="/about" className={styles.secondaryBtn}>
              Dowiedz się więcej
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
