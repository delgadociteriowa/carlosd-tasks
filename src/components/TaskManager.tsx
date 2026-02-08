'use client';
import TaskForm from "./TaskForm";
import TasksList from "./TasksList";
import { useAppSelector } from '@/state/hooks';

const TaskManager = () => {
  const  user  = useAppSelector(
    (state) => state.user.user?.name
  )

  return (
    <div className="w-[90%] md:w-[50%] p-6 rounded-2xl mb-10 mx-auto">
      <TaskForm />
      <p className="ml-4 mt-6 mb-2">Tareas de {user}</p>
      <TasksList />
    </div>
  )
}

export default TaskManager;