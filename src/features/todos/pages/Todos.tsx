import { useState } from 'react';
import { IoIosAdd } from 'react-icons/io';

import AddTodoForm from '../components/AddTodoForm';
import TodoList from '../components/TodoList';

const TodosPage = () => {
  const [isOpenAddTodoForm, setIsOpenAddTodoForm] = useState(false);

  return (
    <div className="container mx-auto my-5">
      <TodoList />
      {isOpenAddTodoForm ? (
        <AddTodoForm onCancel={() => setIsOpenAddTodoForm(false)} />
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

export default TodosPage;
