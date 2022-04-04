import { unwrapResult } from '@reduxjs/toolkit';
import { Form, Input, Button, notification } from 'antd';
import React, { useState } from 'react';

import { useAppDispatch } from 'app/hooks';
import { addTask } from 'features/tasks/slice';
import { AddTaskFields } from 'types/task';

import styles from './styles.module.css';

interface Props {
  onCancel(): void;
}

const initialValues: AddTaskFields = {
  title: '',
};

const AddTodoForm: React.FC<Props> = ({ onCancel }) => {
  const dispatch = useAppDispatch();

  const [addingTask, setAddingTask] = useState(false);

  const [form] = Form.useForm();

  const onFinish = async (values: AddTaskFields) => {
    try {
      setAddingTask(true);
      const res = await dispatch(addTask(values));
      unwrapResult(res);
      setAddingTask(false);
      form.resetFields();
      notification.success({ message: 'Success', description: 'Task is successfully added.' });
    } catch (error) {
      setAddingTask(false);
      notification.error({
        message: 'Error',
        description: 'Unable to add task right now. Please try again soon.',
      });
    }
  };

  return (
    <div className={styles.formContainer}>
      <Form
        form={form}
        initialValues={initialValues}
        onFinishFailed={(err) => console.log(err)}
        onFinish={onFinish}
        autoComplete="off"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
      >
        <Form.Item
          label="Title"
          id="title"
          name="title"
          rules={[{ required: true, message: 'Title is required.' }]}
        >
          <Input />
        </Form.Item>
        <div className={styles.formButtons}>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button onClick={onCancel}>Cancel</Button>
            <Button type="primary" htmlType="submit" disabled={addingTask} loading={addingTask}>
              Submit
            </Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};

export default AddTodoForm;
