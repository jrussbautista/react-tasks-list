import './App.css';
import { useState } from 'react';

import AddTodoForm from './components/AddTodoForm';
import TodoList from './components/TodoList';
import { AddTodoFields, Todo } from './types';

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);

  const handleAddTodo = (fields: AddTodoFields) => {
    const newTodo: Todo = { ...fields, id: Date.now().toString(), isCompleted: false };
    setTodos([...todos, newTodo]);
  };

  const handleDeleteTodo = (todoToDelete: Todo) => {
    const filterTodos = todos.filter((todo) => todo.id !== todoToDelete.id);
    setTodos(filterTodos);
  };

  const handleCompleteTodo = (todoToComplete: Todo) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === todoToComplete.id ? { ...todo, isCompleted: !todo.isCompleted } : todo
    );
    setTodos(updatedTodos);
  };

  return (
    <div className="App">
      <AddTodoForm onAddTodo={handleAddTodo} />
      <TodoList todos={todos} onDeleteTodo={handleDeleteTodo} onCompleteTodo={handleCompleteTodo} />
    </div>
  );
}

export default App;
