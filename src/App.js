// router
import { Switch, Route, Redirect } from 'react-router-dom';
// page
import { Home } from './pages';

function App() {
  return (
    <Switch>
      <Route exact path='/' component={Home} />
      <Route path='*'>
        <Redirect to='/' />
      </Route>
    </Switch>
  );
}

export default App;
