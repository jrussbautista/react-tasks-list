import { API_URL } from '../../../constants/index';
import apiClient from '../../../lib/api-client';
import { AddTodoFields, Todo } from '../../../types/index';

export const getTodos = () => {
  return apiClient.get('/todos');
};

export const addTodo = (fields: AddTodoFields) => {
  return apiClient.post(`${API_URL}/todos`, fields);
};

export const deleteTodo = (todo: Todo) => {
  return apiClient.delete(`${API_URL}/todos/${todo.id}`);
};

export const toggleCompleteTodo = (todo: Todo) => {
  return apiClient.put(`${API_URL}/todos/${todo.id}`, { ...todo, isCompleted: !todo.isCompleted });
};
