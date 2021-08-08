import { BrowserRouter as Router } from 'react-router-dom';

import { TodoProvider } from '../features/todo/context/TodoContext';

interface Props {
  children: React.ReactNode;
}

export const AppProvider = ({ children }: Props) => {
  return (
    <TodoProvider>
      <Router>{children}</Router>
    </TodoProvider>
  );
};
