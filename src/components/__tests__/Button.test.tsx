import { render, screen } from '@testing-library/react'

const Button = () => <button>Click me</button>

test('renders button text', () => {
  render(<Button />)
  expect(screen.getByText('Click me')).toBeInTheDocument()
})
