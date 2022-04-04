import { PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useState } from 'react';

import AddTaskForm from 'features/tasks/add-task-form';
import TasksList from 'features/tasks/tasks-list';

import styles from './styles.module.css';

const TasksPage = () => {
  const [isOpenAddTaskForm, setIsOpenAddTaskForm] = useState(false);

  return (
    <>
      {isOpenAddTaskForm ? (
        <AddTaskForm onCancel={() => setIsOpenAddTaskForm(false)} />
      ) : (
        <div className={styles.btnActionContainer}>
          <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsOpenAddTaskForm(true)}>
            Add New Task
          </Button>
        </div>
      )}

      <TasksList />
    </>
  );
};

export default TasksPage;
