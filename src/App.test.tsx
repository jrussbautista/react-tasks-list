import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from './App';

describe('TodoList App', () => {
  it('add a new todo item on the todo list', () => {
    render(<App />);

    const fields = {
      title: 'Test Todo title',
      description: 'Test todo description',
    };

    const titleElement = screen.getByLabelText(/title/i);
    const descriptionElement = screen.getByLabelText(/description/i);
    const submitButton = screen.getByRole('button', { name: /submit/i });

    userEvent.type(titleElement, fields.title);
    userEvent.type(descriptionElement, fields.description);
    userEvent.click(submitButton);

    expect(screen.getByText(fields.title)).toBeInTheDocument();
    expect(screen.getByText(fields.title)).toBeInTheDocument();

    const listItemsElement = screen.getAllByRole('listitem');
    expect(listItemsElement.length).toBe(6);
  });

  it('remove todo item from the todo list', () => {
    render(<App />);

    const deleteButtons = screen.getAllByRole('button', { name: /delete todo item/i });
    const listItems = screen.getAllByRole('listitem');

    userEvent.click(deleteButtons[0]);

    expect(deleteButtons[0]).not.toBeInTheDocument();
    expect(listItems[0]).not.toBeInTheDocument();
  });

  it('todo item should be crossed out after checking checkbox', () => {
    render(<App />);

    const completeCheckboxes = screen.getAllByRole('checkbox');

    userEvent.click(completeCheckboxes[0]);

    expect(screen.getByText(/eat breakfast/i)).toHaveClass('completed');
  });

  it('todo item should remove crossed out after unchecking checkbox', () => {
    render(<App />);

    const completeCheckboxes = screen.getAllByRole('checkbox');

    userEvent.click(completeCheckboxes[1]);

    expect(screen.getByText(/do laundry/i)).not.toHaveClass('completed');
  });
});
