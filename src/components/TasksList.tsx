'use client';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/state/hooks';
import { getTasks } from '@/state/user/userSlice';
import TaskItem from './TaskItem';

const TasksList = () => {
  const dispatch = useAppDispatch();
  const { user, tasks, loading, error } = useAppSelector(
    (state) => state.user
  )

  useEffect(() => {
    if (user?.id) {
      dispatch(getTasks(user.id));
    }
  }, [dispatch, user?.id]);

  if (loading) {
    return <p>Cargando tareas...</p>;
  }
  
  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <ul>
      {tasks.map(task => (
        <TaskItem
          key={task.id}
          id={task.id}
          state={task.state}
          description={task.description}
        />
      ))}
    </ul>
  )
}

export default TasksList