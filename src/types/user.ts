export type TaskState = 'por-hacer' | 'en-progreso' | 'completada';

export interface Task {
  id: string;
  owner: string;
  state: TaskState;
  description: string;
}

export interface User {
  id: string;
  name: string;
}

export interface UserStateType {
  user: User | null;
  tasks: Task[];
  loading: boolean;
  error: string;
}