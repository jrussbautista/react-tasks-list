import classNames from 'classnames';
import { useState } from 'react';
import { IoTrash } from 'react-icons/io5';

import { Todo } from '../../../types';
import { deleteTodo, toggleCompleteTodo } from '../context/todo-actions';
import { useTodo } from '../context/TodoContext';

import styles from './TodoItem.module.css';

interface Props {
  todo: Todo;
}

const TodoItem: React.FC<Props> = ({ todo }) => {
  const { dispatch } = useTodo();

  const [deleting, setDeleting] = useState(false);
  const [updating, setUpdating] = useState(false);

  const handleDelete = async () => {
    try {
      setDeleting(true);
      await deleteTodo(dispatch, todo);
    } catch (error) {
      console.log(error);
      setDeleting(false);
    }
  };

  const handleComplete = async () => {
    try {
      setUpdating(true);
      await toggleCompleteTodo(dispatch, todo);
      setUpdating(false);
    } catch (error) {
      console.log(error);
      setUpdating(false);
    }
  };

  return (
    <li className="rounded border bg-white shadow mb-5 p-4">
      <div className="flex">
        <div>
          <input
            id={`todo-item-${todo.id}`}
            type="checkbox"
            name="completeTodo"
            checked={todo.isCompleted}
            onChange={handleComplete}
            disabled={updating}
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
          onClick={handleDelete}
          disabled={deleting}
        >
          <IoTrash />
        </button>
      </div>
    </li>
  );
};

export default TodoItem;
