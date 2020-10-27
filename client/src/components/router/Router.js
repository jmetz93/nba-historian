import React from 'react';
import { Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import { HomeView } from '../views';
import { Navbar } from '../common';

const Router = (props) => {
  const { user } = props;
  const authStatus = user.hasOwnProperty('id') ? 'auth' : 'noAuth';
  const loggedIn = user.hasOwnProperty('id');

  return (
    <div>
      <Navbar authStatus={authStatus} />
      <Route exact path='/' render={() => <HomeView { ...props} />}/>
      <PrivateRoute path='/favorites' component={HomeView} isAuth={loggedIn} {...props} />
      <Route path='/login' render={() => <HomeView { ...props} />}/>
      <Route path='/register' render={() => <HomeView { ...props} />}/>
    </div>
  )
};

export default Router;