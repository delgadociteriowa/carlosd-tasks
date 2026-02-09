import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import MainSection from '@/components/MainSection';

// Mock redux hooks
jest.mock('@/state/hooks', () => ({
  useAppSelector: jest.fn(),
  useAppDispatch: jest.fn(),
}));

// Mock TaskManager and LoginMessage
jest.mock('@/components/TaskManager', () => () => <div>TaskManager Mock</div>);
jest.mock('@/components/LoginMessage', () => () => <div>LoginMessage Mock</div>);

import { useAppSelector } from '@/state/hooks';

test('renders TaskManager when id exists', () => {
  // Mocks an id
  (useAppSelector as jest.Mock).mockReturnValue('123');

  render(<MainSection />);

  // Verifies TaskManager gets rendered 
  expect(screen.getByText('TaskManager Mock')).toBeInTheDocument();

  // Verifies LoginMessage doesn't get rendered 
  expect(screen.queryByText('LoginMessage Mock')).not.toBeInTheDocument();
});

test('renders LoginMessage when id is null', () => {
  // Mocks an id
  (useAppSelector as jest.Mock).mockReturnValue(null);

  render(<MainSection />);

  // Verifies TaskManager gets rendered 
  expect(screen.getByText('LoginMessage Mock')).toBeInTheDocument();

  // Verifies LoginMessage doesn't get rendered 
  expect(screen.queryByText('TaskManager Mock')).not.toBeInTheDocument();
});
