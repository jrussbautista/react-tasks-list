import { Todo, Status } from '../../../types';

export enum ActionType {
  GetTodos = 'GET_TODOS',
  GetTodosFailed = 'GET_TODOS_FAILED',
  RemoveTodo = 'REMOVE_TODO',
  AddTodo = 'ADD_TODO',
  ToggleCompleteTodo = 'TOGGLE_COMPLETE_TODO',
  MoveDownTodo = 'MOVE_DOWN_TODO',
  MoveUpTodo = 'MOVE_UP_TODO',
}

interface GetTodos {
  type: ActionType.GetTodos;
  payload: Todo[];
}

interface GetTodosFailed {
  type: ActionType.GetTodosFailed;
  error: string;
}

interface AddTodo {
  type: ActionType.AddTodo;
  payload: Todo;
}

interface RemoveTodo {
  type: ActionType.RemoveTodo;
  payload: Todo;
}

interface CompleteTodo {
  type: ActionType.ToggleCompleteTodo;
  payload: Todo;
}

interface MoveDownTodo {
  type: ActionType.MoveDownTodo;
  payload: Todo;
}

interface MoveUpTodo {
  type: ActionType.MoveUpTodo;
  payload: Todo;
}

export interface State {
  todoItems: Todo[];
  todosStatus: Status;
  error: string;
}

export type Action =
  | GetTodos
  | GetTodosFailed
  | RemoveTodo
  | AddTodo
  | CompleteTodo
  | MoveDownTodo
  | MoveUpTodo;

const todoReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ActionType.GetTodos:
      return {
        ...state,
        todoItems: action.payload,
        todosStatus: 'succeed',
        error: '',
      };
    case ActionType.GetTodosFailed:
      return {
        ...state,
        todosStatus: 'failed',
        error: action.error,
      };
    case ActionType.AddTodo:
      return {
        ...state,
        todoItems: [...state.todoItems, action.payload],
      };
    case ActionType.RemoveTodo: {
      const filteredTodos = state.todoItems.filter((todoItem) => todoItem.id !== action.payload.id);
      return { ...state, todoItems: filteredTodos };
    }

    case ActionType.ToggleCompleteTodo: {
      const updatedTodos = state.todoItems.map((todoItem) =>
        todoItem.id === action.payload.id
          ? { ...todoItem, isCompleted: !todoItem.isCompleted }
          : todoItem
      );
      return {
        ...state,
        todoItems: updatedTodos,
      };
    }

    case ActionType.MoveDownTodo: {
      const selectedTodo = action.payload;
      const currentTodoItems = [...state.todoItems];

      const currentIndex = state.todoItems.findIndex((todoItem) => todoItem.id === selectedTodo.id);
      const nextIndex = currentIndex + 1;

      const filteredTodoItems = currentTodoItems.filter(
        (todoItem) => todoItem.id !== selectedTodo.id
      );

      if (currentIndex === state.todoItems.length - 1) {
        const todoItems = [selectedTodo, ...filteredTodoItems];
        return {
          ...state,
          todoItems,
        };
      }

      const start = filteredTodoItems.slice(0, nextIndex);

      const end = filteredTodoItems.slice(nextIndex);

      const todoItems = [...start, selectedTodo, ...end];

      return {
        ...state,
        todoItems,
      };
    }
    case ActionType.MoveUpTodo: {
      const selectedTodo = action.payload;
      const currentTodoItems = [...state.todoItems];

      const currentIndex = state.todoItems.findIndex((todoItem) => todoItem.id === selectedTodo.id);
      const prevIndex = currentIndex - 1;

      const filteredTodoItems = currentTodoItems.filter(
        (todoItem) => todoItem.id !== selectedTodo.id
      );

      if (currentIndex === 0) {
        const todoItems = [...filteredTodoItems, selectedTodo];
        return {
          ...state,
          todoItems,
        };
      }

      const start = filteredTodoItems.slice(0, prevIndex);

      const end = filteredTodoItems.slice(prevIndex);

      const todoItems = [...start, selectedTodo, ...end];

      return {
        ...state,
        todoItems,
      };
    }

    default:
      throw new Error('Unknown action type');
  }
};

export default todoReducer;
