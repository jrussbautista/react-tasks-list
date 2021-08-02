import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';

import { server } from '../src/mocks/server';

import App from './App';
import { API_URL } from './constants';
import { todos } from './mocks/data';

describe('TodoList App', () => {
  it('display list of todo items when successfully get todos', async () => {
    render(<App />);

    expect(screen.getByText(/loading.../i)).toBeInTheDocument();

    await waitForElementToBeRemoved(() => screen.getByText(/loading.../i));

    const listItems = screen.getAllByRole('listitem');
    expect(listItems.length).toBe(5);

    todos.forEach((todo) => {
      expect(screen.getByText(todo.title)).toBeInTheDocument();
    });
  });

  it('display error message when there is an error getting todos', async () => {
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

  it('add a new todo item on the todo list', async () => {
    render(<App />);

    const fields = {
      title: 'Test Todo title',
    };

    await waitForElementToBeRemoved(() => screen.getByText(/loading.../i));

    const inputTitleElement = screen.getByLabelText(/title/i);

    const submitButton = screen.getByRole('button', { name: /submit/i });

    userEvent.type(inputTitleElement, fields.title);
    userEvent.click(submitButton);

    const titleElement = await screen.findByText(fields.title);

    expect(titleElement).toBeInTheDocument();

    const listItemsElement = screen.getAllByRole('listitem');
    expect(listItemsElement.length).toBe(6);
  });

  it('display error message when there is an error adding new todo', async () => {
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

    const inputTitleElement = screen.getByLabelText(/title/i);

    const submitButton = screen.getByRole('button', { name: /submit/i });

    userEvent.type(inputTitleElement, fields.title);
    userEvent.click(submitButton);

    const alertErrorElement = await screen.findByRole('alert');

    expect(alertErrorElement).toHaveTextContent(
      'Unable to add todo right now. Please try again soon.'
    );
  });

  it('remove todo item from the todo list', async () => {
    render(<App />);

    await waitForElementToBeRemoved(() => screen.getByText(/loading.../i));

    const deleteButtons = screen.getAllByRole('button', { name: /delete todo item/i });
    const listItems = screen.getAllByRole('listitem');

    userEvent.click(deleteButtons[0]);

    expect(deleteButtons[0]).not.toBeInTheDocument();
    expect(listItems[0]).not.toBeInTheDocument();
  });

  it('todo item should be crossed out after checking checkbox', async () => {
    render(<App />);

    await waitForElementToBeRemoved(() => screen.getByText(/loading.../i));

    const completeCheckboxes = screen.getAllByRole('checkbox');

    userEvent.click(completeCheckboxes[0]);

    expect(screen.getByText(/eat breakfast/i)).toHaveClass('completed');
  });

  it('todo item should remove crossed out after unchecking checkbox', async () => {
    render(<App />);

    await waitForElementToBeRemoved(() => screen.getByText(/loading.../i));

    const completeCheckboxes = screen.getAllByRole('checkbox');

    userEvent.click(completeCheckboxes[1]);

    expect(screen.getByText(/do laundry/i)).not.toHaveClass('completed');
  });
});
