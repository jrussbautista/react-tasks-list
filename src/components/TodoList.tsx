import { Todo } from '../types';

import TodoItem from './TodoItem';

interface Props {
  todos: Todo[];
  onDeleteTodo(todo: Todo): void;
  onCompleteTodo(todo: Todo): void;
}

const TodoList: React.FC<Props> = ({ todos, onDeleteTodo, onCompleteTodo }) => {
  if (!todos.length) {
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
      {todos.map((todo) => (
        <TodoItem
          todo={todo}
          key={todo.id}
          onDeleteTodo={onDeleteTodo}
          onCompleteTodo={onCompleteTodo}
        />
      ))}
    </ul>
  );
};

export default TodoList;
