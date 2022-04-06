import { unwrapResult } from '@reduxjs/toolkit';
import { Modal, Form, Input, notification } from 'antd';
import { useState, useEffect } from 'react';

import { useAppDispatch, useAppSelector } from 'app/hooks';
import { updateTask } from 'features/tasks/slice';
import { UpdateTaskFields } from 'types/task';

type UpdateTaskModalProps = {
  visible: boolean;
  onCancel(): void;
};

const UpdateTaskModal = ({ visible, onCancel }: UpdateTaskModalProps) => {
  const [updatingTask, setUpdatingTask] = useState(false);

  const dispatch = useAppDispatch();
  const { selectedTask } = useAppSelector((state) => state.tasks);

  const initialValues = {
    title: selectedTask?.title || '',
  };

  const [form] = Form.useForm<UpdateTaskFields>();

  useEffect(() => {
    if (selectedTask) {
      form.setFieldsValue({ title: selectedTask.title });
    }
  }, [selectedTask, form]);

  const onFinish = async (values: UpdateTaskFields) => {
    if (!selectedTask) {
      return;
    }

    try {
      setUpdatingTask(true);
      const res = await dispatch(updateTask({ id: selectedTask.id, fields: values }));
      unwrapResult(res);
      setUpdatingTask(false);
      form.resetFields();
      notification.success({ message: 'Success', description: 'Task is successfully updated.' });
      onCancel();
    } catch (error) {
      setUpdatingTask(false);
      notification.error({
        message: 'Error',
        description: 'Unable to update task right now. Please try again soon.',
      });
    }
  };

  return (
    <Modal
      visible={visible}
      onOk={() => form.submit()}
      confirmLoading={updatingTask}
      onCancel={onCancel}
      title="Update Task"
    >
      <Form form={form} initialValues={initialValues} onFinish={onFinish} autoComplete="off">
        <Form.Item
          label="Title"
          id="title"
          name="title"
          rules={[{ required: true, message: 'Title is required.' }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateTaskModal;
