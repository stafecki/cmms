'use client'

import { useEffect, useRef } from 'react'
import styles from './about.module.scss'

export default function About() {
  const sectionsRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.visible)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.5 }
    )
    const currentSections = sectionsRef.current
    currentSections.forEach(section => {
      if (section) observer.observe(section)
    })
    return () => {
      currentSections.forEach(section => {
      if (section) observer.unobserve(section)
      })
    }
  }, [])

  const addToRefs = (element: never) => {
    if (element && !sectionsRef.current.includes(element)) {
      sectionsRef.current.push(element);
    }
  };

  return (

    <main className={styles.main}>

      <section ref={addToRefs} className={ `${styles.mainSection} ${styles.hiddenUp}` }>
        <h1>O aplikacji CMMS</h1>

        <p>
          CMMS (Computerized Maintenance Management System) to aplikacja webowa
          służąca do zarządzania utrzymaniem ruchu w przedsiębiorstwach.
          System umożliwia ewidencjonowanie maszyn, zgłaszanie usterek,
          planowanie przeglądów oraz monitorowanie historii serwisowej urządzeń.
        </p>

        <p>
          Celem aplikacji jest usprawnienie zarządzania infrastrukturą techniczną
          oraz ograniczenie przestojów wynikających z awarii sprzętu.
        </p>
      </section>

      <section ref={addToRefs} className={`${styles.section} ${styles.hiddenLeft}`}>
        <h2>Najważniejsze funkcjonalności</h2>

        <ul>
          <li>zarządzanie maszynami i urządzeniami</li>
          <li>rejestrowanie zgłoszeń usterek</li>
          <li>planowanie przeglądów technicznych</li>
          <li>prowadzenie historii napraw i serwisów</li>
          <li>zarządzanie użytkownikami systemu</li>
        </ul>

      </section>

      <section ref={addToRefs} className={`${styles.section} ${styles.hiddenRight}`}>
        <h2>Dla kogo przeznaczony jest system</h2>

        <p>
          Aplikacja przeznaczona jest dla działów utrzymania ruchu,
          techników serwisowych, administratorów systemu
          oraz osób zarządzających infrastrukturą techniczną w firmie.
        </p>

      </section>

      <section ref={addToRefs} className={`${styles.section} ${styles.hiddenLeft}`}>
        <h2>Korzyści z używania systemu</h2>

        <ul>
          <li>lepsza kontrola nad stanem technicznym maszyn</li>
          <li>szybsze reagowanie na awarie</li>
          <li>łatwy dostęp do historii serwisowej</li>
          <li>uporządkowana dokumentacja techniczna</li>
        </ul>

      </section>

      <section ref={addToRefs} className={`${styles.section} ${styles.hiddenRight}`}>
        <h2>Informacje o projekcie</h2>

        <p>
          Aplikacja została stworzona jako projekt systemu
          do zarządzania utrzymaniem ruchu w środowisku webowym.
        </p>

        <p>
          Najnowsza wersja systemu: X.X
        </p>

        <p>
          III 2026
        </p>

      </section>

    </main>
  )
}