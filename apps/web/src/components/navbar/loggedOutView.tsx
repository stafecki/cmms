import Link from 'next/link'

export default function LoggedOutView(){
  return (
    <>
      <li>
        <Link href="/">Strona główna</Link>
      </li>
      <li>
        <Link href="/about">O nas</Link>
      </li>

    </>
  )
}