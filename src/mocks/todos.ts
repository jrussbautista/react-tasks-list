import { v4 as uuidv4 } from 'uuid';

import { Todo } from './../types';

const todos: Todo[] = [
  {
    id: uuidv4(),
    title: 'Eat breakfast',
    isCompleted: false,
    description: 'Lorem ipsum',
  },
  {
    id: uuidv4(),
    title: 'Do laundry',
    isCompleted: true,
    description: 'Lorem ipsum',
  },
  {
    id: uuidv4(),
    title: 'Take out the trash',
    isCompleted: false,
    description: 'Lorem ipsum',
  },
  {
    id: uuidv4(),
    title: 'Write a blog post',
    isCompleted: true,
    description: 'Lorem ipsum',
  },
  {
    id: uuidv4(),
    title: 'Go out for a walk',
    isCompleted: false,
    description: 'Lorem ipsum',
  },
];
export default todos;
