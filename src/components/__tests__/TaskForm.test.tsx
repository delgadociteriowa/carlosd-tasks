import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TaskForm from '@/components/TaskForm';

// Mock redux hooks
jest.mock('@/state/hooks', () => ({
  useAppSelector: jest.fn(),
  useAppDispatch: jest.fn(),
}));

// Mock actions
jest.mock('@/state/user/userSlice', () => {
  const originalModule = jest.requireActual('@/state/user/userSlice');
  return {
    ...originalModule,
    addTask: jest.fn(),
    editTask: jest.fn(),
  };
});

import { useAppSelector, useAppDispatch } from '@/state/hooks';
import { addTask } from '@/state/user/userSlice';

const mockedAddTask = addTask as unknown as jest.MockedFunction<typeof addTask>;

describe('TaskForm', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('adds a new task', () => {
    const mockDispatch = jest.fn();
    (useAppDispatch as jest.Mock).mockReturnValue(mockDispatch);

    // An initial state
    (useAppSelector as jest.Mock).mockReturnValue({
      editMode: false,
      editTaskState: '',
      editTaskDescription: '',
      tasks: [
        { id: '1', owner: '', state: 'completada', description: 'Tarea 1' },
        { id: '2', owner: '', state: 'por-hacer', description: 'Tarea 2' },
      ],
    });

    render(<TaskForm />);

    // The form gets filled
    const input = screen.getByPlaceholderText('Agregar tarea');
    fireEvent.change(input, { target: { value: 'Organizar libros' } });

    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'en-progreso' } });

    // Submit form
    const submitButton = screen.getByRole('button', { name: /Agregar/i });
    fireEvent.click(submitButton);

    // Dispatch gets called
    expect(mockDispatch).toHaveBeenCalledTimes(1);

    // addTask gets called with the new task
    expect(mockedAddTask).toHaveBeenCalledTimes(1);
    
    const dispatchedArg = mockedAddTask.mock.calls[0][0];

    // Verifies the send tasks is correct
    expect(dispatchedArg).toMatchObject({
      description: 'Organizar libros',
      state: 'en-progreso',
    });

    // Verifies the task has an id
    expect(dispatchedArg.id).toBeDefined();
  });
});
