'use client';
import { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from '@/state/hooks';
import { addTask, editTask } from "@/state/user/userSlice";
import { Task, TaskState } from "@/types/user";

const TaskForm = () => {
  const dispatch = useAppDispatch();

  const {
    editMode,
    editTaskState,
    editTaskDescription
  } = useAppSelector(
    (state) => state.user
  )

  const [taskState, setTaskState] = useState<TaskState>("completada");
  const [description, setDescription] = useState('');

  useEffect(() => {
    if(editMode) {
      setTaskState(editTaskState as TaskState);
      setDescription(editTaskDescription);
    } else {
      setTaskState("completada");
      setDescription('');
    }
  }, [editMode])

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!description || !taskState) return;

    const newTask: Task = {
      id: crypto.randomUUID(),
      owner: '',
      state: taskState,
      description,
    };

    if(!editMode) {
      dispatch(addTask(newTask));
    } else {
      dispatch(editTask({newState: taskState, newDescription: description}));
    }

    setTaskState("completada");
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-wrap md:flex-nowrap gap-3 mb-6">
        <input
          type="text"
          placeholder="Agregar tarea"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full md:w-[70%] px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"/>
        <select
          className="w-full md:w-[15%] px-3 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={taskState}
          onChange={(e) => setTaskState(e.target.value as TaskState)}
        >
          <option value="por-hacer">Por hacer</option>
          <option value="en-progreso">En progreso</option>
          <option value="completada">Completada</option>
        </select>
        <button type="submit" className={`${editMode ? 'bg-yellow-600 hover:bg-yellow-500' : 'bg-indigo-600 hover:bg-indigo-500'} w-full md:w-[15%]  py-3 rounded-2xl text-stone-100 text-lg tracking-[2px] shadow-xl/10 transition-colors cursor-pointer`}>
          {editMode ? 'Editar' : 'Agregar'}
        </button>
      </div>
    </form>
  )
};

export default TaskForm;