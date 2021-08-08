import { rest } from 'msw';
import { v4 as uuid } from 'uuid';

import { API_URL } from '../../constants';
import { mockTodos } from '../mock-data';

interface AddTodoRequestBody {
  title: string;
}

interface UpdateTodoRequestBody {
  title: string;
  isCompleted: boolean;
}

export const handlers = [
  rest.get(`${API_URL}/todos`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockTodos));
  }),
  rest.post<AddTodoRequestBody>(`${API_URL}/todos`, (req, res, ctx) => {
    const { title } = req.body;

    const newTodo = {
      id: uuid(),
      title,
    };
    return res(ctx.status(200), ctx.json(newTodo));
  }),
  rest.delete(`${API_URL}/todos/:id`, (req, res, ctx) => {
    return res(ctx.status(200));
  }),
  rest.put<UpdateTodoRequestBody>(`${API_URL}/todos/:id`, (req, res, ctx) => {
    const newTodo = {
      ...req.body,
      isCompleted: !req.body.isCompleted,
    };
    return res(ctx.status(200), ctx.json(newTodo));
  }),
];
