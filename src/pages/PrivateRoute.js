import { Redirect, Route } from 'react-router-dom';
// redux
import { useSelector } from 'react-redux';
import { selectAuthState } from '../store/reducers/authSlice';

export const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
  const auth = useSelector(selectAuthState);
  return (
    <Route
      {...rest}
      render={routeProps =>
        auth ? <RouteComponent {...routeProps} /> : <Redirect to='/' />
      }
    />
  );
};
