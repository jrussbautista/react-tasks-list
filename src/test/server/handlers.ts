import { rest } from 'msw';

import { API_URL } from '../../constants';
import { mockTodos } from '../mock-data';

export const handlers = [
  rest.get(`${API_URL}/todos`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockTodos));
  }),
  rest.post(`${API_URL}/todos`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockTodos));
  }),
];
