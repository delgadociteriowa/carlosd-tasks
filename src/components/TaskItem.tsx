'use client';

import { useAppSelector, useAppDispatch} from '@/state/hooks';
import { deleteTask, selectTaskToEdit } from '@/state/user/userSlice';

interface TaskItemProps {
  id: string;
  state: 'por-hacer' | 'en-progreso' | 'completada';
  description: string;
}

const TaskItem = ({id, state, description} : TaskItemProps) => {
  const dispatch = useAppDispatch();

  const { editMode } = useAppSelector((state) => state.user)

  const handleSelectToEdit = () => {
    dispatch(selectTaskToEdit(id));
  };

  const handleDelete = () => {
    const confirmDelete = window.confirm(
    `¿Seguro que deseas borrar la tarea: "${description}"?`
    );

    if (!confirmDelete) return;
    dispatch(deleteTask(id));
  };

  return (
    <li className="w-full px-4 py-3 rounded-xl border border-gray-300 flex items-center justify-between group mb-2">
      <div className="flex items-center gap-4">
        <span className={`
          text-white text-sm px-3 py-1 rounded-lg w-26 text-center
          ${state === 'por-hacer' && 'bg-red-500'}
          ${state === 'en-progreso' && 'bg-yellow-500'}
          ${state === 'completada' && 'bg-green-500'}
          `}>
          {state === 'por-hacer' && 'Por hacer'}
          {state === 'en-progreso' && 'En Progreso'}
          {state === 'completada' && 'Completada'}
        </span>
        <p className="text-gray-800">
          {description}
        </p>
      </div>
      <div className="flex items-center gap-4">
        <div className="relative group/edit">
          <button onClick={handleSelectToEdit} className={`${editMode ? 'cursor-not-allowed' : 'cursor-pointer'} p-2 rounded-full hover:bg-gray-100 transition`} disabled={editMode}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-8 w-8 ${editMode ? 'text-yellow-100' : 'text-yellow-500'}`}
              fill="none"
              viewBox="0 0 24 20"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.232 5.232l3.536 3.536M9 11l6.232-6.232a2.5 2.5 0 013.536 3.536L12.536 14.536A2.5 2.5 0 0110.768 15H9v-1.768A2.5 2.5 0 019.732 11z"
              />
            </svg>
          </button>
          <span className="absolute -top-9 left-1/2 -translate-x-1/2 scale-0 group-hover/edit:scale-100 transition text-xs bg-gray-800 text-white px-2 py-1 rounded-md whitespace-nowrap">
            Editar
          </span>
        </div>
        <div className="relative group/delete">
          <button onClick={handleDelete}  className={`${editMode ? 'cursor-not-allowed' : 'cursor-pointer'} p-2 rounded-full hover:bg-gray-100 transition`} disabled={editMode}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-6 w-6 ${editMode ? 'text-red-100' : 'text-red-500'}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M9 7h6m2 0H7m2-3h6a1 1 0 011 1v1H8V5a1 1 0 011-1z"
              />
            </svg>
          </button>
          <span className="absolute -top-9 left-1/2 -translate-x-1/2 scale-0 group-hover/delete:scale-100 transition text-xs bg-gray-800 text-white px-2 py-1 rounded-md whitespace-nowrap">
            Borrar
          </span>
        </div>
      </div>
    </li>
  )
};

export default TaskItem;