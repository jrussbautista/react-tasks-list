import { Switch, Route } from 'react-router-dom';

import Header from './components/Header';
import About from './features/misc/About';
import NotFound from './features/misc/NotFound';
import Todos from './features/todos/pages/Todos';

const App = () => {
  return (
    <>
      <Header />
      <Switch>
        <Route exact path="/">
          <Todos />
        </Route>
        <Route exact path="/about">
          <About />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </>
  );
};

export default App;
