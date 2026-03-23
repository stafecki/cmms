'use client'
import { IoIosAddCircleOutline } from "react-icons/io";
import {HiOutlineBell} from "react-icons/hi";
import styles from './header.module.scss'


export default function Header(){
  return (
    <header className={styles.header}>
        <button>
          <HiOutlineBell size={20}/>
        </button>
      <a href="/new-ticket">
        <IoIosAddCircleOutline size={15} />
        Nowe zgloszenie
      </a>
    </header>
  )
}