import { Todo, Status } from '../../../types';

export enum ActionType {
  GetTodos = 'GET_TODOS',
  GetTodosFailed = 'GET_TODOS_FAILED',
  RemoveTodo = 'REMOVE_TODO',
  AddTodo = 'ADD_TODO',
  ToggleCompleteTodo = 'TOGGLE_COMPLETE_TODO',
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

export interface State {
  todoItems: Todo[];
  todosStatus: Status;
  error: string;
}

export type Action = GetTodos | GetTodosFailed | RemoveTodo | AddTodo | CompleteTodo;

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

    default:
      throw new Error('Unknown action type');
  }
};

export default todoReducer;
