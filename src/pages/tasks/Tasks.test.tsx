import { render, screen, userEvent } from 'test/test-utils';

import Tasks from '.';

describe('Tasks Page', () => {
  test('should open add task form', async () => {
    render(<Tasks />);

    const buttonAddNewTask = screen.getByRole('button', { name: /add new task/i });
    userEvent.click(buttonAddNewTask);

    const titleElement = screen.getByLabelText(/title/i);

    expect(buttonAddNewTask).not.toBeInTheDocument();
    expect(titleElement).toBeInTheDocument();
  });

  test('should close add task form', () => {
    render(<Tasks />);

    const buttonAddNewTask = screen.getByRole('button', { name: /add new task/i });
    userEvent.click(buttonAddNewTask);

    const buttonCancel = screen.getByRole('button', { name: /cancel/i });
    const titleElement = screen.getByLabelText(/title/i);

    userEvent.click(buttonCancel);

    expect(screen.getByRole('button', { name: /add new task/i })).toBeInTheDocument();
    expect(buttonCancel).not.toBeInTheDocument();
    expect(titleElement).not.toBeInTheDocument();
  });
});
