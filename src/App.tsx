import { Switch, Route } from 'react-router-dom';

import Header from 'app/header';
import AboutPage from 'pages/about';
import NotFoundPage from 'pages/not-found';
import TasksListPage from 'pages/tasks';

const App = () => {
  return (
    <>
      <Header />
      <Switch>
        <Route exact path="/">
          <TasksListPage />
        </Route>
        <Route exact path="/about">
          <AboutPage />
        </Route>
        <Route path="*">
          <NotFoundPage />
        </Route>
      </Switch>
    </>
  );
};

export default App;
