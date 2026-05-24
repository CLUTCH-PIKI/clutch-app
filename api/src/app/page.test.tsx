import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import Home from './page'

// Mock next/image
vi.mock('next/image', () => ({
  __esModule: true,
  default: (props: { src: string; alt: string; fill?: boolean; priority?: boolean; width?: number; height?: number }) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} alt={props.alt} fill={props.fill ? "true" : undefined} priority={props.priority ? "true" : undefined} />
  },
}))

describe('Home', () => {
  it('renders get started heading', () => {
    render(<Home />)
    expect(screen.getByText(/To get started/i)).toBeInTheDocument()
  })

  it('renders deployment link', () => {
    render(<Home />)
    expect(screen.getByText(/Deploy Now/i)).toBeInTheDocument()
  })
})
