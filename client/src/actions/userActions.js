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




