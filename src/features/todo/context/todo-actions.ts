import { AddTodoFields, Todo } from '../../../types';
import * as TodoAPI from '../api/TodoAPI';

import { Action, ActionType } from './todo-reducer';

export const loadTodos = async (dispatch: React.Dispatch<Action>) => {
  try {
    const { data } = await TodoAPI.getTodos();
    dispatch({ type: ActionType.GetTodos, payload: data });
  } catch (error) {
    dispatch({ type: ActionType.GetTodosFailed, error: error.message });
  }
};

export const addTodo = async (dispatch: React.Dispatch<Action>, fields: AddTodoFields) => {
  const { data } = await TodoAPI.addTodo(fields);
  dispatch({ type: ActionType.AddTodo, payload: data });
};

export const deleteTodo = async (dispatch: React.Dispatch<Action>, todo: Todo) => {
  await TodoAPI.deleteTodo(todo);
  dispatch({ type: ActionType.RemoveTodo, payload: todo });
};

export const toggleCompleteTodo = async (dispatch: React.Dispatch<Action>, todo: Todo) => {
  await TodoAPI.toggleCompleteTodo(todo);
  dispatch({ type: ActionType.ToggleCompleteTodo, payload: todo });
};
