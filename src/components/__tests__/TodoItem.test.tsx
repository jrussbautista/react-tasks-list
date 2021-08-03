import { render, screen } from '@testing-library/react';
import { v4 as uuidv4 } from 'uuid';

import { Todo } from '../../types';
import TodoItem from '../TodoItem';

test('renders todo item properly', () => {
  const mockTodoItem: Todo = {
    id: uuidv4(),
    isCompleted: false,
    title: 'Test Title',
  };

  const handleCompleteTodo = jest.fn();
  const handleDeleteTodo = jest.fn();

  render(
    <TodoItem
      todo={mockTodoItem}
      onCompleteTodo={handleCompleteTodo}
      onDeleteTodo={handleDeleteTodo}
    />
  );

  expect(screen.getByText(mockTodoItem.title)).toBeInTheDocument();
  expect(screen.getByRole('checkbox')).toBeInTheDocument();
  expect(screen.getByRole('checkbox')).not.toBeChecked();
  expect(screen.getByRole('button', { name: /delete todo item/i })).toBeInTheDocument();
});
