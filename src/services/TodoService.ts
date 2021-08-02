import apiClient from '../lib/api-client';

import { API_URL } from './../constants/index';
import { AddTodoFields } from './../types/index';

const getTodos = () => {
  return apiClient.get('/todos');
};

const addTodo = (fields: AddTodoFields) => {
  return apiClient.post(`${API_URL}/todos`, fields);
};

const TodoService = {
  addTodo,
  getTodos,
};

export default TodoService;
