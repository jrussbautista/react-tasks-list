import './App.css';
import { useState } from 'react';

import AddTodoForm from './components/AddTodoForm';
import TodoList from './components/TodoList';
import { Todo } from './types';

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);

  const handleAddTodo = (todo: Todo) => {
    setTodos([...todos, todo]);
  };

  const handleDeleteTodo = (todoToDelete: Todo) => {
    const filterTodos = todos.filter((todo) => todo.id !== todoToDelete.id);
    setTodos(filterTodos);
  };

  return (
    <div className="App">
      <AddTodoForm onAddTodo={handleAddTodo} />
      <TodoList todos={todos} onDeleteTodo={handleDeleteTodo} />
    </div>
  );
}

export default App;
