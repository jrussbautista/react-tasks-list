import { unwrapResult } from '@reduxjs/toolkit';
import classNames from 'classnames';
import { useState } from 'react';
import { IoTrash } from 'react-icons/io5';

import { useAppDispatch } from 'app/hooks';
import { deleteTask, updateTask } from 'features/tasks/slice';
import { Task } from 'types/task';

interface Props {
  task: Task;
}

const TaskItem: React.FC<Props> = ({ task }) => {
  const dispatch = useAppDispatch();

  const [deleting, setDeleting] = useState(false);
  const [updating, setUpdating] = useState(false);

  const handleDelete = async () => {
    try {
      setDeleting(true);
      const res = await dispatch(deleteTask(task.id));
      unwrapResult(res);
    } catch (error) {
      console.log(error);
      setDeleting(false);
    }
  };

  const handleComplete = async () => {
    try {
      setUpdating(true);
      const res = await dispatch(
        updateTask({ id: task.id, fields: { isCompleted: !task.isCompleted } })
      );
      unwrapResult(res);
      setUpdating(false);
    } catch (error) {
      console.log(error);
      setUpdating(false);
    }
  };

  return (
    <li>
      <div>
        <div>
          <input
            id={`task-item-${task.id}`}
            type="checkbox"
            name="completeTask"
            checked={task.isCompleted}
            onChange={handleComplete}
            disabled={updating}
          />
        </div>
        <div>
          <label
            htmlFor={`task-item-${task.id}`}
            className={classNames({ 'line-through': task.isCompleted })}
          >
            {task.title}
          </label>
        </div>
        <button
          type="button"
          aria-label="Delete task item"
          onClick={handleDelete}
          disabled={deleting}
        >
          <IoTrash />
        </button>
      </div>
    </li>
  );
};

export default TaskItem;
