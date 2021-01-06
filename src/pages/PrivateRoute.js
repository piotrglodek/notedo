import { Redirect, Route } from 'react-router-dom';
// redux
import { useSelector } from 'react-redux';
import { selectAuthState } from '../store/reducers/authSlice';

export const PrivateRoute = ({ children, ...rest }) => {
  const auth = useSelector(selectAuthState);
  return (
    <Route {...rest} render={() => (auth ? children : <Redirect to='/' />)} />
  );
};

export default PrivateRoute;
