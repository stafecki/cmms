import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Footer from '../footer'

describe('Footer', () => {
  it('renderuje element footer', () => {
    render(<Footer />)
    expect(screen.getByRole('contentinfo')).toBeInTheDocument()
  })

  it('renderuje nagłówek sekcji kontakt', () => {
    render(<Footer />)
    expect(screen.getByText('Kontakt')).toBeInTheDocument()
  })

  it('renderuje adres', () => {
    render(<Footer />)
    expect(screen.getByText('ul. Fredry 13')).toBeInTheDocument()
    expect(screen.getByText('61-714 Poznań')).toBeInTheDocument()
  })

  it('renderuje link email', () => {
    render(<Footer />)
    const emailLink = screen.getByRole('link', { name: 'biuro@cmms.pl' })
    expect(emailLink).toHaveAttribute('href', 'mailto:biuro@cmms.pl')
  })

  it('renderuje link telefon', () => {
    render(<Footer />)
    const phoneLink = screen.getByRole('link', { name: '+48 000 000 000' })
    expect(phoneLink).toHaveAttribute('href', 'tel:+48000000000')
  })

  it('renderuje nagłówek sekcji social media', () => {
    render(<Footer />)
    expect(screen.getByText('Social Media')).toBeInTheDocument()
  })

  it('renderuje link do Instagram', () => {
    render(<Footer />)
    const instagramLink = screen.getByRole('link', { name: 'Instagram' })
    expect(instagramLink).toHaveAttribute('href', 'https://www.instagram.com/')
  })

  it('renderuje link do LinkedIn', () => {
    render(<Footer />)
    const linkedinLink = screen.getByRole('link', { name: 'LinkedIn' })
    expect(linkedinLink).toHaveAttribute('href', 'https://pl.linkedin.com/')
  })

  it('renderuje informację o prawach autorskich', () => {
    render(<Footer />)
    expect(screen.getByText('© 2026 CMMS')).toBeInTheDocument()
  })
})
