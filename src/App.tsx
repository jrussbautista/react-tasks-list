import { Switch, Route } from 'react-router-dom';

import Header from './components/Header';
import About from './pages/About';
import NotFound from './pages/NotFound';
import TodoApp from './pages/TodoApp';

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
