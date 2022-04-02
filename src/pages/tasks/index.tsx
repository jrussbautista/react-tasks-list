import { useState } from 'react';
import { IoIosAdd } from 'react-icons/io';

import AddTaskForm from 'features/tasks/add-task-form';
import TasksList from 'features/tasks/tasks-list';

const TasksListPage = () => {
  const [isOpenAddTaskForm, setIsOpenAddTaskForm] = useState(false);

  return (
    <div className="container mx-auto my-5">
      <TasksList />
      {isOpenAddTaskForm ? (
        <AddTaskForm onCancel={() => setIsOpenAddTaskForm(false)} />
      ) : (
        <div className="mt-5">
          <button type="submit" onClick={() => setIsOpenAddTaskForm(true)}>
            <IoIosAdd size={25} />
            <span> Add New Task</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default TasksListPage;
