'use client'
import styles from './nav.module.scss'
import { FaMoneyBills } from "react-icons/fa6";
import { GrDomain } from "react-icons/gr";


export default function nav(){
  return(
    <nav className={styles.nav}>
      <div className={styles.logoContainer}>Logo container</div>
      <p className={styles.mainLabel}>Główne</p>
      <div className={styles.panelLink}>
        <GrDomain size={15}/>
        <a href="">Panel Główny</a>
      </div>
    </nav>
  )
}