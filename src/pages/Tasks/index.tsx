import { PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useState } from 'react';

import { useAppSelector, useAppDispatch } from 'app/hooks';
import AddTaskForm from 'features/tasks/AddTaskForm';
import TasksList from 'features/tasks/TasksList';
import { clearSelectedTask } from 'features/tasks/tasksSlice';
import UpdateTaskModal from 'features/tasks/UpdateTaskModal';

import styles from './Tasks.module.css';

const TasksPage = () => {
  const dispatch = useAppDispatch();
  const { selectedTask } = useAppSelector((state) => state.tasks);

  const [isOpenAddTaskForm, setIsOpenAddTaskForm] = useState(false);

  const handleCloseUpdateModal = () => {
    dispatch(clearSelectedTask());
  };

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
      <UpdateTaskModal onCancel={handleCloseUpdateModal} visible={Boolean(selectedTask)} />
    </>
  );
};

export default TasksPage;
