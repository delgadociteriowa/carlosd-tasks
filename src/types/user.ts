export interface Task {
  id: string;
  owner: string;
  state: 'por-hacer' | 'en-progreso' | 'completada';
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