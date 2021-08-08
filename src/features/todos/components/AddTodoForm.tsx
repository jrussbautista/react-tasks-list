import React, { useState } from 'react';

import { AddTodoFields } from '../../../types';
import { addTodo } from '../context/todo-actions';
import { useTodo } from '../context/TodoContext';

interface Props {
  onCancel(): void;
}

const initialFields: AddTodoFields = {
  title: '',
};

const AddTodoForm: React.FC<Props> = ({ onCancel }) => {
  const [fields, setFields] = useState(initialFields);
  const [addTodoError, setAddTodoError] = useState('');
  const [addingTodo, setAddingTodo] = useState(false);

  const { dispatch } = useTodo();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFields({ ...fields, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setAddingTodo(true);
      await addTodo(dispatch, fields);
      setFields(initialFields);
      setAddingTodo(false);
    } catch (error) {
      setAddTodoError('Unable to add todo right now. Please try again soon.');
      setAddingTodo(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">
            Title
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="title"
            name="title"
            type="text"
            onChange={handleChange}
            value={fields.title}
          />
        </div>

        <div>
          <button
            type="button"
            onClick={onCancel}
            className="mx-3 mt-2 bg-white  text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Cancel
          </button>
          <button
            disabled={addingTodo}
            type="submit"
            className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            {addingTodo ? 'Adding task...' : 'Add Task'}
          </button>
        </div>
      </form>
      {addTodoError && <div role="alert">{addTodoError}</div>}
    </>
  );
};

export default AddTodoForm;
