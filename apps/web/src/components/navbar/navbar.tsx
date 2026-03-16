import styles from "./navbar.module.scss"

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <ul >
        <li>
          <a href={"/"}>Home</a>
        </li>
        <li>
          <a href={"/about"}>About</a>
        </li>
        <li>
          <a href={"/contact"}>Contact</a>
        </li>
        <li>
          <a href={"/login"}>Login</a>
        </li>
        <li>
          <a href={"/register"}>Register</a>
        </li>

      </ul>
    </nav>

  )
}