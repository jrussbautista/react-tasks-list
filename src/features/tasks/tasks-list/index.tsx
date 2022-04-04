import { EditOutlined } from '@ant-design/icons';
import { List, Card, Button } from 'antd';
import { useEffect } from 'react';

import { useAppSelector, useAppDispatch } from 'app/hooks';
import DeleteTask from 'features/tasks/delete-task';
import { fetchTasks } from 'features/tasks/slice';

const TodoList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { status, items } = useAppSelector((state) => state.tasks);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchTasks());
    }
  }, [status, dispatch]);

  const isLoading = status === 'idle' || status === 'loading';

  if (isLoading) {
    return <p>loading...</p>;
  }

  if (status === 'failed') {
    return (
      <div>
        <div role="alert">Unexpected error occurred. Please try again soon.</div>
      </div>
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
              <Button key="task-edit" type="primary" icon={<EditOutlined />} size="small">
                Edit
              </Button>,
              <DeleteTask key="task-delete" id={item.id} />,
            ]}
          >
            <div>{item.title}</div>
          </List.Item>
        )}
      ></List>
    </Card>
  );
};

export default TodoList;
