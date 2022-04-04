import { Switch, Route } from 'react-router-dom';

import Layout from 'app/layout';
import AboutPage from 'pages/about';
import NotFoundPage from 'pages/not-found';
import TasksListPage from 'pages/tasks';

const App = () => {
  return (
    <Layout>
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
    </Layout>
  );
};

export default App;
