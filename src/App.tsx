import { Switch, Route } from 'react-router-dom';

import Layout from 'app/Layout';
import AboutPage from 'pages/About';
import NotFoundPage from 'pages/NotFound';
import TasksListPage from 'pages/Tasks';

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
