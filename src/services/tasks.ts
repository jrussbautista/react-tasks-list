import { API_URL } from 'app/constants';
import apiClient from 'lib/api-client';
import { AddTaskFields, Task, UpdateTaskFields } from 'types/task';

export const getTasks = async (): Promise<Task[]> => {
  const res = await apiClient.get('/tasks');
  return res.data;
};

export const addTask = async (fields: AddTaskFields): Promise<Task> => {
  const res = await apiClient.post(`${API_URL}/tasks`, fields);
  return res.data;
};

export const deleteTask = async (id: string): Promise<string> => {
  await apiClient.delete(`${API_URL}/tasks/${id}`);
  return id;
};

export const updateTask = async (id: string, fields: UpdateTaskFields): Promise<Task> => {
  const res = await apiClient.patch(`${API_URL}/tasks/${id}`, fields);
  return res.data;
};
