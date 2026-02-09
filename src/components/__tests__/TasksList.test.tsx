import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import TasksList from '@/components/TasksList';

// Mock redux hooks
jest.mock('@/state/hooks', () => ({
  useAppDispatch: () => jest.fn(),
  useAppSelector: jest.fn(),
}));

// Mock getTasks function
jest.mock('@/state/user/userSlice', () => ({
  getTasks: jest.fn(),
}));

// Mock TaskItem component
jest.mock('@/components/TaskItem', () => () => <li>Mocked Item</li>);

import { useAppSelector } from '@/state/hooks';

describe('TasksList', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Shows loading message when loading is true', () => {
    (useAppSelector as jest.Mock).mockReturnValue({
      user: null,
      tasks: [],
      loading: true,
      error: null,
    });

    render(<TasksList />);

    expect(screen.getByText(/cargando tareas/i)).toBeInTheDocument();
  });
  
  test('Shows an error message when an error is in the state', () => {
    (useAppSelector as jest.Mock).mockReturnValue({
      user: null,
      tasks: [],
      loading: false,
      error: 'Server error.',
    });

    render(<TasksList />);

    const errorElement = screen.getByText(/server error/i);
    expect(errorElement).toBeInTheDocument();
  });

  test('Renders a TaskItem for each task in the state', () => {
    (useAppSelector as jest.Mock).mockReturnValue({
      user: { id: 'a3964', name: 'John' },
      tasks: [
        { id: '1', state: 'por hacer', description: 'Tarea 1' },
        { id: '2', state: 'completada', description: 'Tarea 2' },
      ],
      loading: false,
      error: null,
    });

    render(<TasksList />);

    const items = screen.getAllByText('Mocked Item');
    expect(items).toHaveLength(2);
  });
});
