import { rest } from 'msw';

import { API_URL } from 'app/constants';
import { mockTasks } from 'test/mock-data';
import { server } from 'test/server/server';
import { render, screen, waitFor, waitForElementToBeRemoved, userEvent } from 'test/test-utils';

import Tasks from '.';

describe('Tasks Page', () => {
  test('should open or close add task form', async () => {
    render(<Tasks />);

    await waitForElementToBeRemoved(() => screen.getByText(/loading.../i));

    const buttonAddNewTask = screen.getByRole('button', { name: /add new task/i });
    // open add new task form
    userEvent.click(buttonAddNewTask);

    const buttonCancel = screen.getByRole('button', { name: /cancel/i });
    const titleElement = screen.getByLabelText(/title/i);

    expect(buttonAddNewTask).not.toBeInTheDocument();
    expect(titleElement).toBeInTheDocument();

    // close add new todo form
    userEvent.click(buttonCancel);

    expect(screen.getByRole('button', { name: /add new task/i })).toBeInTheDocument();
    expect(buttonCancel).not.toBeInTheDocument();
    expect(titleElement).not.toBeInTheDocument();
  });

  test('add a new task item on the tasks list', async () => {
    render(<Tasks />);

    const fields = {
      title: 'Test task title',
    };

    await waitForElementToBeRemoved(() => screen.getByText(/loading.../i));

    const buttonAddNewTask = screen.getByRole('button', { name: /add new task/i });
    // this will show add task form
    userEvent.click(buttonAddNewTask);

    const inputField = screen.getByLabelText(/title/i);
    const submitButton = screen.getByRole('button', { name: /add task/i });
    userEvent.type(inputField, fields.title);
    userEvent.click(submitButton);

    expect(submitButton).toBeDisabled();

    await waitFor(() => expect(submitButton).toBeEnabled());

    expect(screen.getByText(fields.title)).toBeInTheDocument();

    const listItemsElement = screen.getAllByRole('listitem');
    const tasksCount = mockTasks.length + 1;
    expect(listItemsElement.length).toBe(tasksCount);
  });

  test('display error message when there is an error adding new task', async () => {
    server.use(
      rest.post(`${API_URL}/tasks`, (req, res, ctx) => {
        return res(ctx.status(500));
      })
    );

    render(<Tasks />);

    const fields = {
      title: 'Test task title',
    };

    await waitForElementToBeRemoved(() => screen.getByText(/loading.../i));

    const buttonAddNewTodo = screen.getByRole('button', { name: /add new task/i });
    // this will show the add todo form
    userEvent.click(buttonAddNewTodo);

    const inputTitleElement = screen.getByLabelText(/title/i);
    const submitButton = screen.getByRole('button', { name: /add task/i });

    userEvent.type(inputTitleElement, fields.title);
    userEvent.click(submitButton);

    const alertErrorElement = await screen.findByRole('alert');

    expect(alertErrorElement).toHaveTextContent(
      'Unable to add task right now. Please try again soon.'
    );
  });
});
