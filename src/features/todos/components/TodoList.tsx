import { useEffect } from 'react';

import { loadTodos } from '../context/todo-actions';
import { useTodo } from '../context/TodoContext';

import TodoItem from './TodoItem';

const TodoList: React.FC = () => {
  const { todoItems, todosStatus, dispatch } = useTodo();

  useEffect(() => {
    if (todosStatus === 'loading') {
      loadTodos(dispatch);
    }
  }, [todosStatus, dispatch]);

  if (todosStatus === 'loading') {
    return (
      <div role="alert" className="text-center mt-5">
        Loading...
      </div>
    );
  }

  if (todosStatus === 'failed') {
    return (
      <div className="container mx-auto my-5">
        <div
          role="alert"
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-5"
        >
          Unexpected error occured. Please try again soon.
        </div>
      </div>
    );
  }

  if (!todoItems.length) {
    return (
      <div
        role="alert"
        className="mt-5 flex items-center bg-blue-500 text-white text-sm font-bold px-4 py-3 rounded"
      >
        Todo list is still empty: (
      </div>
    );
  }

  return (
    <ul className="mt-5">
      {todoItems.map((todo) => (
        <TodoItem todo={todo} key={todo.id} />
      ))}
    </ul>
  );
};

export default TodoList;
