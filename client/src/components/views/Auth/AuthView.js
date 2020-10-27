import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom';
import { Form } from '../../common';
import { userActions } from '../../../actions';
import './AuthView.css';

const AuthView = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [authenticated, setAuthenticaed] = useState(false);

  const {
    user,
    userActions,
    formType
  } = props;
  // const formType = location.state.formType;
  console.log('form props: ', props)

  useEffect(() => {
    if (user.id) {
      setAuthenticaed(true);
    }
  }, [user]);

  const signUp = (e) => {
    e.preventDefault();

  };

  const login = (e) => {
    e.preventDefault();
    userActions.loginAttemptAction(username, password);
  };

  const canSubmit = () => {
    const usernameEntered = username.length > 0;
    const passwordEntered = password.length > 8;
    if (!usernameEntered || !passwordEntered) {
      return true;
    }
    return false;
  }

  return (
    <div class="auth-container">
      <Form
        formType={formType}
        onUsernameChange={setUsername}
        onPasswordChange={setPassword}
        canSubmit={canSubmit()}
        submitHandler={formType === 'login' ? login : signUp}
      />
      {authenticated && <Redirect push to='/' />}
    </div>
  )
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
)(AuthView);
