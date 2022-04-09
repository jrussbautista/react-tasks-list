import { unwrapResult } from '@reduxjs/toolkit';
import { Checkbox, notification } from 'antd';
import { useState } from 'react';

import { useAppDispatch } from 'app/hooks';
import { updateTask } from 'features/tasks/tasksSlice';

type ToggleCompleteTaskProps = {
  id: string;
  isCompleted: boolean;
};

const ToggleCompleteTask = ({ id, isCompleted }: ToggleCompleteTaskProps) => {
  const [isUpdating, setIsUpdating] = useState(false);

  const dispatch = useAppDispatch();

  const onChange = async () => {
    try {
      setIsUpdating(true);
      const res = await dispatch(updateTask({ id, fields: { isCompleted: !isCompleted } }));
      unwrapResult(res);
      setIsUpdating(false);
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Unable to update task right now. Please try again soon.',
      });
      setIsUpdating(false);
    }
  };

  return (
    <Checkbox id={`task-${id}`} disabled={isUpdating} onChange={onChange} checked={isCompleted} />
  );
};

export default ToggleCompleteTask;
