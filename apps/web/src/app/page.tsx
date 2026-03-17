import styles from './homepage.module.scss'
import magazyn from './assets/magazyn.png'
import Image from 'next/image'

export default function Home() {
  return (
    <div className={styles.homepageContainer}>
      <div className={styles.slider}>
        <div className={styles.sliderHeader}>
          <h1>
            System CMMS dla Twojej firmy
          </h1>

        </div>
        <main className={styles.sliderMain}>
          <div className={styles.btns}>
            <button>
              <a href={'/register'}>Dołącz do nas</a>
            </button>
            <button>
              <a href={"/about"}>Dowiedz się więcej</a>
            </button>

          </div>

        </main>
      </div>
    </div>

  )
}
