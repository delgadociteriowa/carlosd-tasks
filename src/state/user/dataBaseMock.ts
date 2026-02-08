import {
  User,
  Task,
} from "../../types/user";

export const dataBaseMockUsers: User[] = [
  {
    id: 'a3964',
    name: 'John'
  },
  {
    id: 'b3964',
    name: 'Jane'
  },
]

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