import React, { useState } from 'react';

import TodoService from '../services/TodoService';
import { AddTodoFields } from '../types';

interface Props {
  onAddTodo(fields: AddTodoFields): void;
}

const initialFields: AddTodoFields = {
  title: '',
};

const AddTodoForm: React.FC<Props> = ({ onAddTodo }) => {
  const [fields, setFields] = useState(initialFields);
  const [addTodoError, setAddTodoError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFields({ ...fields, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await TodoService.addTodo(fields);
      onAddTodo(fields);
      setFields(initialFields);
    } catch (error) {
      setAddTodoError('Unable to add todo right now. Please try again soon.');
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
            type="submit"
            className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Submit
          </button>
        </div>
      </form>
      {addTodoError && <div role="alert">{addTodoError}</div>}
    </>
  );
};

export default AddTodoForm;
