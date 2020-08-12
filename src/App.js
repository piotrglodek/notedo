import React from 'react';
// react-router-dom
import { Switch, Route } from 'react-router-dom';
// page
import { Home } from './pages/Home';
import { PageNotFound } from './pages/PageNotFound';

function App() {
  return (
    <div className='app-container'>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='*' component={PageNotFound} />
      </Switch>
    </div>
  );
}

export default App;
