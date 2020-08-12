import React from 'react';
// react-router-dom
import { Switch, Route } from 'react-router-dom';
// page
import { Home } from './pages/Home';
import { PageNotFound } from './pages/PageNotFound';
import { Notedo } from './pages/Notedo';

function App() {
  return (
    <div className='app-container'>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/notedo' component={Notedo} />
        <Route path='*' component={PageNotFound} />
        <Route exact path='/notedo/note/:noteId' component={SingleNotePage} />
      </Switch>
    </div>
  );
}

export default App;
