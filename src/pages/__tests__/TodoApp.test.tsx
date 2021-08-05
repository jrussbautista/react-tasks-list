import userEvent from '@testing-library/user-event';
import { rest } from 'msw';

import App from '../../App';
import { API_URL } from '../../constants';
import { mockTodos } from '../../test/mock-data';
import { server } from '../../test/server/server';
import { fireEvent, render, screen, waitForElementToBeRemoved } from '../../test/test-utils';

describe('TodoApp', () => {
  test('display list of todo items when successfully get todos', async () => {
    render(<App />);

    expect(screen.getByText(/loading.../i)).toBeInTheDocument();

    await waitForElementToBeRemoved(() => screen.getByText(/loading.../i));

    const listItems = screen.getAllByRole('listitem');
    expect(listItems.length).toBe(5);

    mockTodos.forEach((todo) => {
      expect(screen.getByText(todo.title)).toBeInTheDocument();
    });
  });

  test('display error message when there is an error getting todos', async () => {
    server.use(
      rest.get(`${API_URL}/todos`, (req, res, ctx) => {
        return res(ctx.status(500));
      })
    );

    render(<App />);

    await waitForElementToBeRemoved(() => screen.getByText(/loading.../i));

    expect(screen.getByRole('alert')).toHaveTextContent(
      'Unexpected error occured. Please try again soon.'
    );
  });

  test('open and close add todo form', async () => {
    render(<App />);

    await waitForElementToBeRemoved(() => screen.getByText(/loading.../i));

    const buttonAddNewTodo = screen.getByRole('button', { name: /add new todo/i });
    // open add new todo form
    fireEvent.click(buttonAddNewTodo);

    const buttonCancel = screen.getByRole('button', { name: /cancel/i });
    const titleElement = screen.getByLabelText(/title/i);

    expect(buttonAddNewTodo).not.toBeInTheDocument();
    expect(titleElement).toBeInTheDocument();

    // close add new todo form
    fireEvent.click(buttonCancel);

    expect(screen.getByRole('button', { name: /add new todo/i })).toBeInTheDocument();
    expect(buttonCancel).not.toBeInTheDocument();
    expect(titleElement).not.toBeInTheDocument();
  });

  test('add a new todo item on the todo list', async () => {
    render(<App />);

    const fields = {
      title: 'Test Todo title',
    };

    await waitForElementToBeRemoved(() => screen.getByText(/loading.../i));

    const buttonAddNewTodo = screen.getByRole('button', { name: /add new todo/i });
    // this will show add todo form
    fireEvent.click(buttonAddNewTodo);

    const inputTitleElement = screen.getByLabelText(/title/i);
    const submitButton = screen.getByRole('button', { name: /submit/i });
    userEvent.type(inputTitleElement, fields.title);
    userEvent.click(submitButton);

    const titleElement = await screen.findByText(fields.title);

    expect(titleElement).toBeInTheDocument();

    const listItemsElement = screen.getAllByRole('listitem');
    expect(listItemsElement.length).toBe(6);
  });

  test('display error message when there is an error adding new todo', async () => {
    server.use(
      rest.post(`${API_URL}/todos`, (req, res, ctx) => {
        return res(ctx.status(500));
      })
    );

    render(<App />);

    const fields = {
      title: 'Test Todo title',
    };

    await waitForElementToBeRemoved(() => screen.getByText(/loading.../i));

    const buttonAddNewTodo = screen.getByRole('button', { name: /add new todo/i });
    // this will show add todo form
    fireEvent.click(buttonAddNewTodo);

    const inputTitleElement = screen.getByLabelText(/title/i);
    const submitButton = screen.getByRole('button', { name: /submit/i });

    userEvent.type(inputTitleElement, fields.title);
    userEvent.click(submitButton);

    const alertErrorElement = await screen.findByRole('alert');

    expect(alertErrorElement).toHaveTextContent(
      'Unable to add todo right now. Please try again soon.'
    );
  });

  test('remove todo item from the todo list', async () => {
    render(<App />);

    await waitForElementToBeRemoved(() => screen.getByText(/loading.../i));

    const deleteButtons = screen.getAllByRole('button', { name: /delete todo item/i });
    const listItems = screen.getAllByRole('listitem');

    userEvent.click(deleteButtons[0]);

    expect(deleteButtons[0]).not.toBeInTheDocument();
    expect(listItems[0]).not.toBeInTheDocument();
  });

  test('todo item should be crossed out after checking checkbox', async () => {
    render(<App />);

    await waitForElementToBeRemoved(() => screen.getByText(/loading.../i));

    const completeCheckboxes = screen.getAllByRole('checkbox');

    userEvent.click(completeCheckboxes[0]);

    expect(screen.getByText(/eat breakfast/i)).toHaveClass('completed');
  });

  test('todo item should remove crossed out after unchecking checkbox', async () => {
    render(<App />);

    await waitForElementToBeRemoved(() => screen.getByText(/loading.../i));

    const completeCheckboxes = screen.getAllByRole('checkbox');

    userEvent.click(completeCheckboxes[1]);

    expect(screen.getByText(/do laundry/i)).not.toHaveClass('completed');
  });
});
