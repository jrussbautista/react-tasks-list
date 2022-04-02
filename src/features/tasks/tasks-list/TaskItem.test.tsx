import { v4 as uuidv4 } from 'uuid';

import { render, screen } from 'test/test-utils';
import { Task } from 'types/task';

import TaskItem from './TaskItem';

test('renders task item properly', () => {
  const task: Task = {
    id: uuidv4(),
    isCompleted: false,
    title: 'Test Title',
  };

  render(<TaskItem task={task} />);

  expect(screen.getByText(task.title)).toBeInTheDocument();
  expect(screen.getByRole('checkbox')).toBeInTheDocument();
  expect(screen.getByRole('checkbox')).not.toBeChecked();
  expect(screen.getByRole('button', { name: /delete task item/i })).toBeInTheDocument();
});
