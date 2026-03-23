import Header from '@/components/dashboard/header/header'
import Main from '@/components/dashboard/main/main'
import Nav from '@/components/dashboard/nav/nav'
import styles from "./dashboard.module.scss"

export default function dashboardPage(){
  return (
    <section className={styles.section}>
      <Nav/>
      <Header/>
      <Main/>
    </section>

  )
}