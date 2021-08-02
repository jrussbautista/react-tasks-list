import { rest } from 'msw';

import { API_URL } from './../constants';
import { todos } from './data';
// src/mocks/handlers.js

export const handlers = [
  // Handles a GET /user request
  rest.get(`${API_URL}/todos`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(todos));
  }),
  rest.post(`${API_URL}/todos`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(todos));
  }),
];
