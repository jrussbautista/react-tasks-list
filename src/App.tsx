import { useState, useEffect } from 'react';

import AddTodoForm from './components/AddTodoForm';
import TodoList from './components/TodoList';
import TodoService from './services/TodoService';
import { AddTodoFields, Todo } from './types';

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todosStatus, setTodosStatus] = useState('loading');

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const { data } = await TodoService.getTodos();
        setTodos(data);
        setTodosStatus('succeed');
      } catch (error) {
        setTodosStatus('failed');
      }
    };
    fetchTodos();
  }, []);

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

  if (todosStatus === 'loading') {
    return <p>Loading...</p>;
  }

  if (todosStatus === 'failed') {
    return <div role="alert">Unexpected error occured. Please try again soon.</div>;
  }

  return (
    <div className="container mx-auto my-5">
      <TodoList todos={todos} onDeleteTodo={handleDeleteTodo} onCompleteTodo={handleCompleteTodo} />
      <AddTodoForm onAddTodo={handleAddTodo} />
    </div>
  );
}

export default App;
