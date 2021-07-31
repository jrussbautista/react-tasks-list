import { render, screen } from '@testing-library/react';

import mockTodos from '../../mocks/todos';
import TodoList from '../TodoList';

describe('TodoList', () => {
  it('renders empty message when there are no todos', () => {
    const handleCompleteTodo = jest.fn();
    const onDeleteTodo = jest.fn();

    render(<TodoList todos={[]} onCompleteTodo={handleCompleteTodo} onDeleteTodo={onDeleteTodo} />);

    expect(screen.getByText(/todo list is still empty/i)).toBeInTheDocument();
  });

  it('renders title of todo items', () => {
    const handleCompleteTodo = jest.fn();
    const onDeleteTodo = jest.fn();
    render(
      <TodoList todos={mockTodos} onCompleteTodo={handleCompleteTodo} onDeleteTodo={onDeleteTodo} />
    );

    const listItems = screen.getAllByRole('listitem');
    expect(listItems.length).toBe(mockTodos.length);

    const listItemTitles = listItems.map((listItemTitle) => listItemTitle.textContent);
    expect(listItemTitles).toMatchInlineSnapshot(`
      Array [
        "Eat breakfast",
        "Do laundry",
        "Take out the trash",
        "Write a blog post",
        "Go out for a walk",
      ]
    `);
  });
});
