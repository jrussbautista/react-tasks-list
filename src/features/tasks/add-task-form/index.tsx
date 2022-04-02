import { unwrapResult } from '@reduxjs/toolkit';
import React, { useState } from 'react';

import { useAppDispatch } from 'app/hooks';
import { addTask } from 'features/tasks/slice';
import { AddTaskFields } from 'types/task';

interface Props {
  onCancel(): void;
}

const initialFields: AddTaskFields = {
  title: '',
};

const AddTodoForm: React.FC<Props> = ({ onCancel }) => {
  const dispatch = useAppDispatch();

  const [fields, setFields] = useState(initialFields);
  const [error, setError] = useState('');
  const [addingTask, setAddingTask] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFields({ ...fields, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setAddingTask(true);
      const res = await dispatch(addTask(fields));
      unwrapResult(res);
      setFields(initialFields);
      setAddingTask(false);
    } catch (error) {
      setError('Unable to add task right now. Please try again soon.');
      setAddingTask(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title">Title</label>
          <input id="title" name="title" type="text" onChange={handleChange} value={fields.title} />
        </div>

        <div>
          <button type="button" onClick={onCancel}>
            Cancel
          </button>
          <button disabled={addingTask} type="submit">
            {addingTask ? 'Adding task...' : 'Add Task'}
          </button>
        </div>
      </form>
      {error && <div role="alert">{error}</div>}
    </>
  );
};

export default AddTodoForm;
