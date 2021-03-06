import React, { useState, useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  Switch,
  withRouter
} from 'react-router-dom';
import { Ring } from 'react-awesome-spinners';
import { Router } from '../../router';
import { userActions } from '../../../actions';
import './App.css';
import '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';

const App = (props) => {
  const [userLoaded, setUserLoaded] = useState(false);
  const {
    user,
    userActions,
  } = props;

  useEffect(() => {
    if (!user.fetchingUser && !userLoaded) {
      setUserLoaded(true);
    } else if (user.fetchingUser && userLoaded) {
      setUserLoaded(false);
    }
  }, [user.fetchingUser])
  
  return(
    <div className="App">
      {userLoaded ? <Switch>
        <Router 
          user={user}
          userActions={userActions}
        />
      </Switch> : <Ring />}
    </div>
  );
};

const mapStateToProps = ({ user }) => ({
  user
});

const mapDispatchToProps = (dispatch) => ({
  userActions: bindActionCreators(userActions, dispatch),
});


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(App));
