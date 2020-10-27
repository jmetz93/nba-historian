import React from 'react';
import { Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import { HomeView, DetailsView, TeamsView, AuthView } from '../views';
import { Navbar } from '../common';

const Router = (props) => {
  const { user } = props;
  const authStatus = user.hasOwnProperty('id') ? 'auth' : 'noAuth';
  const loggedIn = user.hasOwnProperty('id');

  return (
    <div>
      <Navbar authStatus={authStatus} />
      <Route exact path='/' render={() => <HomeView { ...props} />} />
      <PrivateRoute path='/favorites' component={HomeView} isAuth={loggedIn} {...props} />
      <Route path='/login' render={() => <AuthView formType={'login'} { ...props} />} />
      <Route path='/register' render={() => <AuthView formType={'register'} { ...props} />} />
      <Route path='/player_details' render={() => <DetailsView { ...props} />} />
      <Route path='/team_details' render={() => <DetailsView { ...props} />} />
      <Route path='/teams' render={() => <TeamsView { ...props }/>} />
    </div>
  )
};

export default Router;