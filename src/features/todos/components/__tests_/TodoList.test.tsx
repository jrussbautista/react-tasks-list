import { rest } from 'msw';

import { API_URL } from '../../../../constants';
import { mockTodos } from '../../../../test/mock-data';
import { server } from '../../../../test/server/server';
import {
  render,
  screen,
  waitForElementToBeRemoved,
  userEvent,
  waitFor,
} from '../../../../test/test-utils';
import TodoList from '../TodoList';

test('display list of todo items when successfully get todos', async () => {
  render(<TodoList />);

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

  render(<TodoList />);

  await waitForElementToBeRemoved(() => screen.getByText(/loading.../i));

  expect(screen.getByRole('alert')).toHaveTextContent(
    'Unexpected error occured. Please try again soon.'
  );
});

test('renders empty message when there are no todos', async () => {
  server.use(
    rest.get(`${API_URL}/todos`, (req, res, ctx) => {
      return res(ctx.status(200), ctx.json([]));
    })
  );
  render(<TodoList />);

  await waitForElementToBeRemoved(() => screen.getByText(/loading.../i));

  expect(screen.getByText(/todo list is still empty/i)).toBeInTheDocument();
});

test('remove todo item from the todo list', async () => {
  render(<TodoList />);

  await waitForElementToBeRemoved(() => screen.getByText(/loading.../i));

  const deleteButtons = screen.getAllByRole('button', { name: /delete todo item/i });
  const listItems = screen.getAllByRole('listitem');

  const firstDeleteButton = deleteButtons[0];

  userEvent.click(firstDeleteButton);

  await waitFor(() => expect(firstDeleteButton).not.toBeInTheDocument());

  expect(listItems[0]).not.toBeInTheDocument();
});

test('todo item checkbox should be toggle correctly', async () => {
  render(<TodoList />);

  await waitForElementToBeRemoved(() => screen.getByText(/loading.../i));

  const mockTodo = mockTodos[0];

  const checkboxes = screen.getAllByRole('checkbox');

  // get first checkbox
  const firstCheckbox = checkboxes[0];
  // on first click on checkbox
  userEvent.click(firstCheckbox);
  await waitFor(() => expect(firstCheckbox).toBeEnabled());

  // title should be crossed out
  expect(screen.getByText(mockTodo.title)).toHaveClass('line-through');

  // on click again on checkbox
  userEvent.click(firstCheckbox);

  await waitFor(() => expect(firstCheckbox).toBeEnabled());

  // title should removed the crossed out
  expect(screen.getByText(mockTodo.title)).not.toHaveClass('line-through');
});
