import React from 'react';
// react-router-dom
import { Switch, Route } from 'react-router-dom';
// page
import { Home } from './pages/Home';

function App() {
  return (
    <div className='app-container'>
      <Switch>
        <Route exact path='/' component={Home} />
      </Switch>
    </div>
  );
}

export default App;
