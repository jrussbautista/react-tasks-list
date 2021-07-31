import { Todo } from '../types';

import TodoItem from './TodoItem';

interface Props {
  todos: Todo[];
  onDeleteTodo(todo: Todo): void;
  onCompleteTodo(todo: Todo): void;
}

const TodoList: React.FC<Props> = ({ todos, onDeleteTodo, onCompleteTodo }) => {
  return (
    <ul>
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
