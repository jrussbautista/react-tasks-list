import classNames from 'classnames';

import { Todo } from '../types';

import styles from './TodoItem.module.css';

interface Props {
  todo: Todo;
  onDeleteTodo(todo: Todo): void;
  onCompleteTodo(todo: Todo): void;
}

const TodoItem: React.FC<Props> = ({ todo, onDeleteTodo, onCompleteTodo }) => {
  return (
    <li>
      <div>
        <input
          type="checkbox"
          name="completeTodo"
          checked={todo.isCompleted}
          onChange={() => onCompleteTodo(todo)}
        />
      </div>
      <h3 className={classNames({ [styles.completed]: todo.isCompleted })}>{todo.title}</h3>
      <p>{todo.description}</p>
      <button type="button" aria-label="Delete todo item" onClick={() => onDeleteTodo(todo)}>
        X
      </button>
    </li>
  );
};

export default TodoItem;
