import {
  FETCH_USER,
  FETCH_USER_DONE,
  FETCH_USER_FAIL,
  CREATE_USER,
  CREATE_USER_DONE,
  CREATE_USER_FAIL,
  LOGIN_USER,
  LOGIN_USER_DONE,
  LOGIN_USER_FAIL,
  LOGOUT,
  LOGOUT_DONE,
  LOGOUT_FAILED,
} from '../constants';
import { getRefreshToken } from '../utils';
import { getUser, registerUser, loginUser, logoutUser } from '../services';

export const fetchUserAction = () => async dispatch => {
  dispatch({ type: FETCH_USER });
  const refreshToken = await getRefreshToken();
  const getUserResults = await getUser(refreshToken);

  if (getUserResults.user) {
    dispatch(fetchUserDone(getUserResults));
  } else {
    dispatch(fetchUserFailed(getUserResults));
  }
};

export const fetchUserDone = ({ user, access, refresh }) => async dispatch => dispatch({
  type: FETCH_USER_DONE,
  user,
  access,
  refresh,
});

export const fetchUserFailed = ({ message }) => async dispatch => dispatch({
  type: FETCH_USER_FAIL,
  message
});

export const loginAttemptAction = (username, password) => async dispatch => {
  dispatch({ type: LOGIN_USER });
  const loginResults = await loginUser(username, password);
  if (loginResults.user) {
    dispatch(loginAttemptDone(loginResults))
  } else {
    dispatch(loginAttemptFail(loginResults))
  }
};

export const loginAttemptDone = ({ user, tokens }) => async dispatch => dispatch({
  type: LOGIN_USER_DONE,
  user,
  tokens,
});

export const loginAttemptFail = ({ message }) => async dispatch => dispatch({
  type: LOGIN_USER_FAIL,
  message,
});

export const createUserAction = (username, password) => async dispatch => {
  dispatch({ type: CREATE_USER });
  const createUserResults = await registerUser(username, password);

  if (createUserResults.user) {
    dispatch(createUserDone(createUserResults));
  } else {
    dispatch(createUserFailed(createUserResults));
  }
};

export const createUserDone = ({ user, tokens }) => async dispatch => dispatch({
  type: CREATE_USER_DONE,
  user,
  tokens,
});

export const createUserFailed = ({ message }) => async dispatch => dispatch({
  type: CREATE_USER_FAIL,
  message,
});

export const logoutAction = () => async dispatch => {
  dispatch({ type: LOGOUT });
  const refreshToken = await getRefreshToken();
  const logoutResult = await logoutUser(refreshToken)

  if (logoutResult.success) {
    dispatch(logoutDone());
  } else {
    dispatch(logoutFailed(logoutResult))
  }
};

export const logoutDone = () => async dispatch => dispatch({
  type: LOGOUT_DONE
});

export const logoutFailed = ({ message }) => async dispatch => dispatch({
  type: LOGOUT_FAILED,
  message,
});



