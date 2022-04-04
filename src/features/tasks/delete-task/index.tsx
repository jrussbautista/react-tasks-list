import { DeleteOutlined } from '@ant-design/icons';
import { unwrapResult } from '@reduxjs/toolkit';
import { Popconfirm, Button, notification } from 'antd';
import { useState } from 'react';

import { useAppDispatch } from 'app/hooks';
import { deleteTask } from 'features/tasks/slice';

type DeleteTaskProps = {
  id: string;
};

const DeleteTask = ({ id }: DeleteTaskProps) => {
  const dispatch = useAppDispatch();

  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    try {
      setDeleting(true);
      const res = await dispatch(deleteTask(id));
      unwrapResult(res);
      notification.success({ message: 'Success', description: 'Task is successfully deleted.' });
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Unable to delete task right now. Please try again soon.',
      });
      setDeleting(false);
    }
  };

  return (
    <Popconfirm
      okButtonProps={{ loading: deleting }}
      title="Are you sure yo want to delete this task？"
      okText="Yes"
      cancelText="No"
      onConfirm={handleDelete}
    >
      <Button key="task-delete" danger type="primary" icon={<DeleteOutlined />} size="small">
        Delete
      </Button>
    </Popconfirm>
  );
};

export default DeleteTask;
