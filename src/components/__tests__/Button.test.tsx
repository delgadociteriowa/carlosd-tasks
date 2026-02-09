import { render, screen } from '@testing-library/react'

const Button = () => <button>Click me</button>

test('renders button text - base example test', () => {
  render(<Button />)
  expect(screen.getByText('Click me')).toBeInTheDocument()
})
