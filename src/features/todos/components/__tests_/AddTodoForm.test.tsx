import userEvent from '@testing-library/user-event';

import { render, screen } from '../../../../test/test-utils';
import AddTodoForm from '../AddTodoForm';

test('render form input correctly', async () => {
  const fields = {
    title: 'Test todo',
  };

  const onCancel = jest.fn();
  render(<AddTodoForm onCancel={onCancel} />);

  const buttonSubmit = screen.getByRole('button', { name: /add task/i });
  const titleElement = screen.getByLabelText(/title/i) as HTMLInputElement;

  userEvent.type(titleElement, fields.title);

  expect(titleElement.value).toBe(fields.title);
  expect(buttonSubmit).toBeInTheDocument();
});
