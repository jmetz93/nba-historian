import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, isAuth, path, ...rest }) => (
  <Route path={path} render={(props) => (
    isAuth
      ? <Component {...props} {...rest} />
      : <Redirect to='/' />
  )}></Route>
);

export default PrivateRoute;