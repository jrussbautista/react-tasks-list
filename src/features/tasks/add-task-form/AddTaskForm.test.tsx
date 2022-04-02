import userEvent from '@testing-library/user-event';

import { render, screen } from 'test/test-utils';

import AddTaskForm from '.';

test('render form input correctly', async () => {
  const fields = {
    title: 'Test task',
  };

  const onCancel = jest.fn();
  render(<AddTaskForm onCancel={onCancel} />);

  const buttonSubmit = screen.getByRole('button', { name: /add task/i });
  const titleElement = screen.getByLabelText(/title/i) as HTMLInputElement;

  userEvent.type(titleElement, fields.title);

  expect(titleElement.value).toBe(fields.title);
  expect(buttonSubmit).toBeInTheDocument();
});
