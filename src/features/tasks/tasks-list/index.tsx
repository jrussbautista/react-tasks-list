import { EditOutlined } from '@ant-design/icons';
import { List, Card, Button, Alert, Spin } from 'antd';
import { useEffect } from 'react';

import { useAppSelector, useAppDispatch } from 'app/hooks';
import DeleteTask from 'features/tasks/delete-task';
import { fetchTasks, selectTask } from 'features/tasks/slice';
import ToggleCompleteTask from 'features/tasks/toggle-complete-task';
import { Task } from 'types/task';

import styles from './styles.module.css';

const TodoList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { status, items } = useAppSelector((state) => state.tasks);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchTasks());
    }
  }, [status, dispatch]);

  const isLoading = status === 'idle' || status === 'loading';

  const onSelectTask = (task: Task) => {
    dispatch(selectTask(task));
  };

  if (isLoading) {
    return (
      <div className={styles.loadingSpinner}>
        <Spin aria-label="loading..." />
      </div>
    );
  }

  if (status === 'failed') {
    return (
      <Alert
        message="Error"
        description="Unexpected error occurred. Please try again soon."
        type="error"
        showIcon
      />
    );
  }

  return (
    <Card>
      <List
        aria-label={'tasks list'}
        dataSource={items}
        locale={{ emptyText: 'Tasks list is still empty' }}
        renderItem={(item) => (
          <List.Item
            actions={[
              <Button
                onClick={() => onSelectTask(item)}
                key="task-edit"
                type="primary"
                icon={<EditOutlined />}
                size="small"
              >
                Edit
              </Button>,
              <DeleteTask key="task-delete" id={item.id} />,
            ]}
          >
            <div>
              <ToggleCompleteTask id={item.id} isCompleted={item.isCompleted} />
              <label htmlFor={`task-${item.id}`}> {item.title}</label>
            </div>
          </List.Item>
        )}
      ></List>
    </Card>
  );
};

export default TodoList;
