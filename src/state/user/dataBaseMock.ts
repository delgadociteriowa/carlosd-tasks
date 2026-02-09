import {
  User,
  Task,
} from "../../types/user";

interface UserCredentials extends User {
  login: string;
  password: string;
}

export const dataBaseMockUsers: UserCredentials[] = [
  {
    id: 'a3964',
    name: 'John',
    login: 'john',
    password: '123456',
  },
  {
    id: 'b3964',
    name: 'Jane',
    login: 'jane',
    password: '123456',
  },
];

export const dataBaseMockTasks: Task[] = [
  {
    id: 'a55b53cb-3964-4db1-acca-546dce772e60',
    owner: 'a3964',
    state: 'completada',
    description: 'Crear función'
  },
  {
    id: 'b55b53cb-3964-4db1-acca-546dce772e60',
    owner: 'b3964',
    state: 'en-progreso',
    description: 'Arreglar bugs'
  },
  {
    id: 'c55b53cb-3964-4db1-acca-546dce772e60',
    owner: 'a3964',
    state: 'por-hacer',
    description: 'Crear componente'
  },
  {
    id: 'd55b53cb-3964-4db1-acca-546dce772e60',
    owner: 'b3964',
    state: 'completada',
    description: 'Ajustar UI'
  },
]