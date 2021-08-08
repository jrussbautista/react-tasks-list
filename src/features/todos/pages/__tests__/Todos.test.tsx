import { rest } from 'msw';

import { API_URL } from '../../../../constants';
import { mockTodos } from '../../../../test/mock-data';
import { server } from '../../../../test/server/server';
import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
  userEvent,
} from '../../../../test/test-utils';
import Todos from '../Todos';

describe('Todos Page', () => {
  test('open and close add todo form', async () => {
    render(<Todos />);

    await waitForElementToBeRemoved(() => screen.getByText(/loading.../i));

    const buttonAddNewTodo = screen.getByRole('button', { name: /add new todo/i });
    // open add new todo form
    userEvent.click(buttonAddNewTodo);

    const buttonCancel = screen.getByRole('button', { name: /cancel/i });
    const titleElement = screen.getByLabelText(/title/i);

    expect(buttonAddNewTodo).not.toBeInTheDocument();
    expect(titleElement).toBeInTheDocument();

    // close add new todo form
    userEvent.click(buttonCancel);

    expect(screen.getByRole('button', { name: /add new todo/i })).toBeInTheDocument();
    expect(buttonCancel).not.toBeInTheDocument();
    expect(titleElement).not.toBeInTheDocument();
  });

  test('add a new todo item on the todo list', async () => {
    render(<Todos />);

    const fields = {
      title: 'Test Todo title',
    };

    await waitForElementToBeRemoved(() => screen.getByText(/loading.../i));

    const buttonAddNewTodo = screen.getByRole('button', { name: /add new todo/i });
    // this will show add todo form
    userEvent.click(buttonAddNewTodo);

    const inputField = screen.getByLabelText(/title/i);
    const submitButton = screen.getByRole('button', { name: /add task/i });
    userEvent.type(inputField, fields.title);
    userEvent.click(submitButton);

    expect(submitButton).toBeDisabled();

    await waitFor(() => expect(submitButton).toBeEnabled());

    expect(screen.getByText(fields.title)).toBeInTheDocument();

    const listItemsElement = screen.getAllByRole('listitem');
    const currentTodosCount = mockTodos.length + 1;
    expect(listItemsElement.length).toBe(currentTodosCount);
  });

  test('display error message when there is an error adding new todo', async () => {
    server.use(
      rest.post(`${API_URL}/todos`, (req, res, ctx) => {
        return res(ctx.status(500));
      })
    );

    render(<Todos />);

    const fields = {
      title: 'Test Todo title',
    };

    await waitForElementToBeRemoved(() => screen.getByText(/loading.../i));

    const buttonAddNewTodo = screen.getByRole('button', { name: /add new todo/i });
    // this will show the add todo form
    userEvent.click(buttonAddNewTodo);

    const inputTitleElement = screen.getByLabelText(/title/i);
    const submitButton = screen.getByRole('button', { name: /add task/i });

    userEvent.type(inputTitleElement, fields.title);
    userEvent.click(submitButton);

    const alertErrorElement = await screen.findByRole('alert');

    expect(alertErrorElement).toHaveTextContent(
      'Unable to add todo right now. Please try again soon.'
    );
  });
});
