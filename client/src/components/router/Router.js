import React from 'react';
import { Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import { HomeView } from '../views';

const Router = (props) => (
  <div>
    <Route exact path='/' render={() => <HomeView { ...props} />}/>
  </div>
);

export default Router;