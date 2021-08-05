import { BrowserRouter as Router } from 'react-router-dom';

interface Props {
  children: React.ReactNode;
}

export const AppProvider = ({ children }: Props) => {
  return <Router>{children}</Router>;
};
