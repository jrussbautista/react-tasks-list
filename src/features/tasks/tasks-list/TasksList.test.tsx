import { rest } from 'msw';

import { API_URL } from 'app/constants';
import { mockTasks } from 'test/mock-data';
import { server } from 'test/server/server';
import { render, screen, waitForElementToBeRemoved, userEvent, waitFor } from 'test/test-utils';

import { tasksInitialState } from '../slice';

import TasksList from '.';

test('display list of task items when successfully get tasks', async () => {
  render(<TasksList />), { preloadedState: { tasks: tasksInitialState } };

  expect(screen.getByText(/loading.../i)).toBeInTheDocument();

  await waitForElementToBeRemoved(() => screen.getByText(/loading.../i));

  const listItems = screen.getAllByRole('listitem');
  expect(listItems.length).toBe(mockTasks.length);

  mockTasks.forEach((task) => {
    expect(screen.getByText(task.title)).toBeInTheDocument();
  });
});

test('display error message when there is an error getting tasks', async () => {
  server.use(
    rest.get(`${API_URL}/tasks`, (req, res, ctx) => {
      return res(ctx.status(500));
    })
  );

  render(<TasksList />);

  await waitForElementToBeRemoved(() => screen.getByText(/loading.../i));

  expect(screen.getByRole('alert')).toHaveTextContent(
    'Unexpected error occurred. Please try again soon.'
  );
});

test('renders empty message when there are no tasks', async () => {
  server.use(
    rest.get(`${API_URL}/tasks`, (req, res, ctx) => {
      return res(ctx.status(200), ctx.json([]));
    })
  );
  render(<TasksList />), { preloadedState: { tasks: tasksInitialState } };

  await waitForElementToBeRemoved(() => screen.getByText(/loading.../i));

  expect(screen.getByText(/tasks list is still empty/i)).toBeInTheDocument();
});

test('remove tasks item from the tasks list', async () => {
  render(<TasksList />, { preloadedState: { tasks: tasksInitialState } });

  await waitForElementToBeRemoved(() => screen.getByText(/loading.../i));

  const deleteButtons = screen.getAllByRole('button', { name: /delete task item/i });
  const listItems = screen.getAllByRole('listitem');

  const firstDeleteButton = deleteButtons[0];

  userEvent.click(firstDeleteButton);

  await waitFor(() => expect(firstDeleteButton).not.toBeInTheDocument());

  expect(listItems[0]).not.toBeInTheDocument();
});

test('task item checkbox should be toggle correctly', async () => {
  render(<TasksList />);

  await waitForElementToBeRemoved(() => screen.getByText(/loading.../i));

  const mockTask = mockTasks[0];

  const checkboxes = screen.getAllByRole('checkbox');

  // get first checkbox
  const firstCheckbox = checkboxes[0];
  // on first click on checkbox

  userEvent.click(screen.getByText(mockTask.title));

  await waitFor(() => expect(firstCheckbox).toBeEnabled());

  // title should be crossed out
  expect(screen.getByText(mockTask.title)).toHaveClass('line-through');

  // on click again on checkbox
  userEvent.click(firstCheckbox);

  await waitFor(() => expect(firstCheckbox).toBeEnabled());

  // title should removed the crossed out
  expect(screen.getByText(mockTask.title)).not.toHaveClass('line-through');
});
