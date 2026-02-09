import { logout } from '@/state/user/userSlice';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Navigation from '@/components/Navigation';

// Mock redux hooks
jest.mock('@/state/hooks', () => ({
  useAppSelector: jest.fn(),
  useAppDispatch: jest.fn(),
}));

// Mock logout thunk
jest.mock('@/state/user/userSlice', () => ({
  logout: jest.fn(),
}));

// Mock next/link and next/image 
jest.mock('next/link', () => ({ children, href }: any) => <a href={href}>{children}</a>);
jest.mock('next/image', () => (props: any) => <img {...props} />);

import { useAppSelector, useAppDispatch } from '@/state/hooks';

test('renders Login Link when user is not logged in', () => {
  // Mock state without id
  (useAppSelector as jest.Mock).mockReturnValue(null);

  render(<Navigation />);

  // Verifies loginLink gets rendered
  const loginLink = screen.getByText('Login');
  expect(loginLink).toBeInTheDocument();

  // Verifies Logout button doesn't render
  expect(screen.queryByText('Logout')).not.toBeInTheDocument();
});

test('renders Logout button when user is logged in', () => {
  const mockDispatch = jest.fn();
  (useAppSelector as jest.Mock).mockReturnValue({ id: '123' });
  (useAppDispatch as jest.Mock).mockReturnValue(mockDispatch);

  render(<Navigation />);

  //  Verifies Logout button gets rendered
  const logoutButton = screen.getByText('Logout');
  expect(logoutButton).toBeInTheDocument();

  // Verifies loginLink doesn't render
  expect(screen.queryByText('Login')).not.toBeInTheDocument();
});

test('dispatches logout when user clicks Logout and confirms', () => {
  const mockDispatch = jest.fn();
  (useAppDispatch as jest.Mock).mockReturnValue(mockDispatch);

  // Initial state with user
  (useAppSelector as jest.Mock).mockReturnValue({ id: '123' });

  // Mocks cofirm ok
  jest.spyOn(window, 'confirm').mockImplementation(() => true);

  render(<Navigation />);

  const logoutButton = screen.getByText('Logout');
  expect(logoutButton).toBeInTheDocument();

  // Click in Logout
  fireEvent.click(logoutButton);

  // Dispatch gets called
  expect(mockDispatch).toHaveBeenCalledTimes(1);

  // logout action gets called
  expect(logout).toHaveBeenCalled();

  // Restore window.confirm
  (window.confirm as jest.Mock).mockRestore();
});

