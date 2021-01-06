import { useEffect } from 'react';
// router
import { Switch, Route, Redirect } from 'react-router-dom';
// page
import { Home, Notedo, PrivateRoute } from './pages';
// components
import { Header } from './components';
// redux
import { useDispatch } from 'react-redux';
import { authUser, logOutUser } from './store/reducers/authSlice';
// firebase
import { auth } from './firebase';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        dispatch(authUser());
      } else {
        dispatch(logOutUser());
      }
    });
    return () => unsubscribe();
  }, [dispatch]);

  return (
    <>
      <Header />
      <Switch>
        <PrivateRoute exact path='/notedo'>
          <Notedo />
        </PrivateRoute>
        <Route exact path='/' component={Home} />
        <Route path='*'>
          <Redirect to='/' />
        </Route>
      </Switch>
    </>
  );
}

export default App;
