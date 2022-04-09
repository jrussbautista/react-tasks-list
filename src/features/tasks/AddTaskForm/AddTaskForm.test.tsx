import userEvent from '@testing-library/user-event';
import { rest } from 'msw';

import { API_URL } from 'app/constants';
import { server } from 'test/server/server';
import { render, screen, waitFor } from 'test/testUtils';

import AddTaskForm from '.';

const onCancel = jest.fn();

describe('<AddTaskForm />', () => {
  test('display success message upon successfully adding new task', async () => {
    render(<AddTaskForm onCancel={onCancel} />);

    const task = {
      title: 'Test task title',
    };

    const inputField = screen.getByLabelText(/title/i);
    const submitButton = screen.getByRole('button', { name: /submit/i });
    userEvent.type(inputField, task.title);

    await waitFor(() => expect(inputField).toHaveValue(task.title));
    userEvent.click(submitButton);

    await waitFor(() =>
      expect(screen.getByText('Task is successfully added.')).toBeInTheDocument()
    );

    expect(inputField).toHaveValue('');
  });

  test('display error message when there is an error adding new task', async () => {
    server.use(
      rest.post(`${API_URL}/tasks`, (req, res, ctx) => {
        return res(ctx.status(500));
      })
    );

    render(<AddTaskForm onCancel={onCancel} />);

    const task = {
      title: 'Test task title',
    };

    const inputField = screen.getByLabelText(/title/i);
    const submitButton = screen.getByRole('button', { name: /submit/i });
    userEvent.type(inputField, task.title);

    await waitFor(() => expect(inputField).toHaveValue(task.title));
    userEvent.click(submitButton);

    await waitFor(() =>
      expect(
        screen.getByText('Unable to add task right now. Please try again soon.')
      ).toBeInTheDocument()
    );
  });
});
