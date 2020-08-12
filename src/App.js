import React from 'react';
// react-router-dom
import { Switch, Route } from 'react-router-dom';
// page
import { Home } from './pages/Home';
import { PageNotFound } from './pages/PageNotFound';
import { Notedo } from './pages/Notedo';
// redux
import { SingleNotePage } from './redux/components/SingleNotePage';

function App() {
  return (
    <div className='app-container'>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/notedo' component={Notedo} />
        <Route exact path='/notedo/note/:noteId' component={SingleNotePage} />
        <Route path='*' component={PageNotFound} />
      </Switch>
    </div>
  );
}

export default App;
