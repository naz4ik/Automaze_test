import { Task } from '@/types/Task';
import { client } from '@/lib/fetchClient';

const BASE = '/tasks';

interface GetTasksParams {
  search?: string;
  status?: 'done' | 'undone';
  sortOrder?: 'asc' | 'desc';
}

export const getTasks = ({ search, status, sortOrder }: GetTasksParams = {}) => {
  const params = new URLSearchParams();

  if (search) params.append('search', search);
  if (status) params.append('status', status);
  if (sortOrder) params.append('sortOrder', sortOrder);

  const query = params.toString();

  return client.get<Task[]>(`${BASE}${query ? `?${query}` : ''}`);
};

export const createTask = (data: { title: string; priority: number; dueDate?: string | null }) => {
  return client.post<Task>(`${BASE}/createTask`, data);
};

export const deleteTask = (taskId: number) => {
  return client.delete(`${BASE}/${taskId}`);
};

export const updateTask = (
  taskId: number,
  data: Partial<Pick<Task, 'title' | 'priority' | 'dueDate'>>,
) => {
  return client.put<Task>(`${BASE}/${taskId}`, data);
};

export const toggleTaskDone = (taskId: number) => {
  return client.put<Task>(`${BASE}/${taskId}/toggle`);
};

export const toggleAllTasks = () => {
  return client.put<void>(`${BASE}/toggleAll`);
};

export const deleteCompletedTasks = () => {
  return client.delete(`${BASE}/completed`);
};