import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import AddTodoForm from '../AddTodoForm';

test('render form input correctly', async () => {
  const onAddTodo = jest.fn();
  const onCancel = jest.fn();

  render(<AddTodoForm onAddTodo={onAddTodo} onCancel={onCancel} />);

  const fields = {
    title: 'Test todo',
  };

  const titleElement = screen.getByLabelText(/title/i) as HTMLInputElement;
  userEvent.type(titleElement, fields.title);

  expect(titleElement.value).toBe(fields.title);

  userEvent.click(screen.getByRole('button', { name: /submit/i }));

  await waitFor(() => expect(onAddTodo).toHaveBeenCalledTimes(1));
});
