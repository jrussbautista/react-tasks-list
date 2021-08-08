import React, { createContext, useContext, useReducer } from 'react';

import todoReducer, { Action, State } from './todo-reducer';

interface Context extends State {
  dispatch: React.Dispatch<Action>;
}

const initialState: State = {
  todoItems: [],
  todosStatus: 'loading',
  error: '',
};

const TodoContext = createContext<Context | undefined>(undefined);

export const TodoProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(todoReducer, initialState);

  const value = { ...state, dispatch };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};

export const useTodo = () => {
  const context = useContext(TodoContext);

  if (!context) {
    throw new Error(`useTodo must be used within a TodoProvider`);
  }

  return context;
};
