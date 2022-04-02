import { useEffect } from 'react';

import { useAppSelector, useAppDispatch } from 'app/hooks';
import { fetchTasks } from 'features/tasks/slice';

import TaskItem from './TaskItem';

const TodoList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { status, items } = useAppSelector((state) => state.tasks);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchTasks());
    }
  }, [status, dispatch]);

  if (status === 'idle' || status === 'loading') {
    return <div role="alert">Loading...</div>;
  }

  if (status === 'failed') {
    return (
      <div>
        <div role="alert">Unexpected error occurred. Please try again soon.</div>
      </div>
    );
  }

  return (
    <ul aria-label="tasks-list">
      {items.map((task) => (
        <TaskItem task={task} key={task.id} />
      ))}

      {items.length === 0 && <div role="alert">Tasks list is still empty: (</div>}
    </ul>
  );
};

export default TodoList;
