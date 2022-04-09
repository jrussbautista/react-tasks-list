import { rest } from 'msw';
import { v4 as uuid } from 'uuid';

import { API_URL } from 'app/constants';

import { mockTasks } from '../mockData';

interface AddTaskRequestBody {
  title: string;
}

interface UpdateTaskRequestBody {
  title: string;
  isCompleted: boolean;
}

export const handlers = [
  rest.get(`${API_URL}/tasks`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockTasks));
  }),

  rest.post<AddTaskRequestBody>(`${API_URL}/tasks`, (req, res, ctx) => {
    const { title } = req.body;

    const newTodo = {
      id: uuid(),
      title,
    };
    return res(ctx.status(200), ctx.json(newTodo));
  }),

  rest.delete(`${API_URL}/tasks/:id`, (req, res, ctx) => {
    return res(ctx.status(200));
  }),

  rest.patch<UpdateTaskRequestBody>(`${API_URL}/tasks/:id`, (req, res, ctx) => {
    const id = req.params.id as string;
    const task = mockTasks.find((mockTask) => mockTask.id === id);
    if (!task) {
      return res(ctx.status(404), ctx.json({ message: 'Not Found' }));
    }
    const newTask = { ...task, ...req.body };
    return res(ctx.status(200), ctx.json(newTask));
  }),
];
