import React, { useState } from 'react';

import { AddTodoFields } from '../types';

interface Props {
  onAddTodo(fields: AddTodoFields): void;
}

const initialFields: AddTodoFields = {
  title: '',
  description: '',
};

const AddTodoForm: React.FC<Props> = ({ onAddTodo }) => {
  const [fields, setFields] = useState(initialFields);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFields({ ...fields, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddTodo(fields);
    setFields(initialFields);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title</label>
        <input type="text" name="title" id="title" onChange={handleChange} value={fields.title} />
      </div>
      <div>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          onChange={handleChange}
          value={fields.description}
        ></textarea>
      </div>
      <div>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
};

export default AddTodoForm;
