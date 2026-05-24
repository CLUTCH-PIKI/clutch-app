import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import App from './App'

describe('App', () => {
  it('renders app name in header', () => {
    render(<App />)
    const headerElement = screen.getAllByText(/Clutch/i)[0]
    expect(headerElement).toBeInTheDocument()
  })

  it('renders login button', () => {
    render(<App />)
    const loginButton = screen.getByRole('button', { name: /Connexion/i })
    expect(loginButton).toBeInTheDocument()
    expect(loginButton).toHaveClass('bg-orange-500')
  })

  it('renders navigation links in header', () => {
    render(<App />)
    const header = screen.getByRole('banner')
    expect(header).toHaveTextContent(/Accueil/i)
    expect(header).toHaveTextContent(/Loops/i)
    expect(header).toHaveTextContent(/Avis/i)
    expect(header).toHaveTextContent(/Marques/i)
    expect(header).toHaveTextContent(/UGC/i)
  })

  it('renders default home content', () => {
    render(<App />)
    expect(screen.getByText(/Bienvenue sur Clutch/i)).toBeInTheDocument()
  })

  it('renders footer links', () => {
    render(<App />)
    expect(screen.getByText(/À propos/i)).toBeInTheDocument()
    expect(screen.getByText(/Contact/i)).toBeInTheDocument()
    expect(screen.getByText(/Légal/i)).toBeInTheDocument()
    expect(screen.getByText(/Confidentialité/i)).toBeInTheDocument()
  })
})
