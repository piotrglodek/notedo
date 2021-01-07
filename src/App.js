import { useEffect } from 'react';
// router
import { Switch, Route } from 'react-router-dom';
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
        <Route exact path='/' component={Home} />
        <PrivateRoute path='/notedo' component={Notedo} />
      </Switch>
    </>
  );
}

export default App;
