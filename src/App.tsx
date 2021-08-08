import { Switch, Route } from 'react-router-dom';

import Header from './components/Header';
import About from './features/misc/About';
import NotFound from './features/misc/NotFound';
import TodoApp from './features/todo/pages/Todo';

const App = () => {
  return (
    <>
      <Header />
      <Switch>
        <Route exact path="/about">
          <About />
        </Route>
        <Route exact path="/">
          <TodoApp />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </>
  );
};

export default App;
