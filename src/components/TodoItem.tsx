import classNames from 'classnames';
import { IoTrash } from 'react-icons/io5';

import { Todo } from '../types';

import styles from './TodoItem.module.css';

interface Props {
  todo: Todo;
  onDeleteTodo(todo: Todo): void;
  onCompleteTodo(todo: Todo): void;
}

const TodoItem: React.FC<Props> = ({ todo, onDeleteTodo, onCompleteTodo }) => {
  return (
    <li className="rounded border bg-white shadow mb-5 p-4">
      <div className="flex">
        <div>
          <input
            id={`todo-item-${todo.id}`}
            type="checkbox"
            name="completeTodo"
            checked={todo.isCompleted}
            onChange={() => onCompleteTodo(todo)}
          />
        </div>
        <div className="px-5 flex-1">
          <label
            htmlFor={`todo-item-${todo.id}`}
            className={classNames({ [styles.completed]: todo.isCompleted })}
          >
            {todo.title}
          </label>
        </div>

        <button
          className="text-red-500"
          type="button"
          aria-label="Delete todo item"
          onClick={() => onDeleteTodo(todo)}
        >
          <IoTrash />
        </button>
      </div>
    </li>
  );
};

export default TodoItem;
