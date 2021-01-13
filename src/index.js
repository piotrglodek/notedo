import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
// router
import { BrowserRouter as Router } from 'react-router-dom';
// theme provider
import { ThemeProvider } from './theme';
// redux store provider
import { StoreProvider } from './store/store';

ReactDOM.render(
  <StoreProvider>
    <Router>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </Router>
  </StoreProvider>,
  document.getElementById('root')
);
