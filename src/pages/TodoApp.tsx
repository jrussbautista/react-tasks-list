import { useState, useEffect } from 'react';
import { IoIosAdd } from 'react-icons/io';

import AddTodoForm from '../components/AddTodoForm';
import TodoList from '../components/TodoList';
import TodoService from '../services/TodoService';
import { AddTodoFields, Todo } from '../types';

const TodoApp = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todosStatus, setTodosStatus] = useState('loading');
  const [isOpenAddTodoForm, setIsOpenAddTodoForm] = useState(false);

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
    return (
      <div role="alert" className="text-center mt-5">
        Loading...
      </div>
    );
  }

  if (todosStatus === 'failed') {
    return (
      <div className="container mx-auto my-5">
        <div
          role="alert"
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-5"
        >
          Unexpected error occured. Please try again soon.
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto my-5">
      <TodoList todos={todos} onDeleteTodo={handleDeleteTodo} onCompleteTodo={handleCompleteTodo} />
      {isOpenAddTodoForm ? (
        <AddTodoForm onAddTodo={handleAddTodo} onCancel={() => setIsOpenAddTodoForm(false)} />
      ) : (
        <div className="mt-5">
          <button type="submit" className="flex" onClick={() => setIsOpenAddTodoForm(true)}>
            <IoIosAdd size={25} />
            <span className="mx-3 items-center text-gray-500"> Add New Todo</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default TodoApp;
