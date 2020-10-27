import {
  FETCH_USER,
  FETCH_USER_DONE,
  FETCH_USER_FAIL,
  LOGIN_USER,
  LOGIN_USER_DONE,
  LOGIN_USER_FAIL,
  CREATE_USER,
  CREATE_USER_DONE,
  CREATE_USER_FAIL,
  LOGOUT,
  LOGOUT_DONE,
  LOGOUT_FAILED,
} from '../constants';
import { setAccessToken, setRefreshToken, removeRefreshToken } from '../utils';

const user = (state = {}, action) => {
  switch(action.type) {
    case FETCH_USER:
      return {
        ...state,
        fetchingUser: true,
      };
    case FETCH_USER_DONE:
      setAccessToken(action.access.token);
      setRefreshToken(action.refresh.token);
      return {
        ...state,
        ...action.user,
        fetchingUser: false,
      };
    case FETCH_USER_FAIL:
      setAccessToken('');
      removeRefreshToken();
      return {
        ...state,
        fetchingUser: false,
        fetchErrorMessage: action.message,
      };
    case LOGIN_USER:
      return {
        ...state,
        loginAttempting: true,
      }
    case LOGIN_USER_DONE:
      setAccessToken(action.tokens.access.token);
      setRefreshToken(action.tokens.refresh.token);
      return {
        ...state,
        ...action.user,
        loginAttempting: false,
      };
    case LOGIN_USER_FAIL:
      return {
        ...state,
        loginAttempting: false,
        errorMessage: action.message
      }
    case CREATE_USER:
      return {
        ...state,
        creatingUser: true,
      }
    case CREATE_USER_DONE:
      setAccessToken(action.tokens.access.token);
      setRefreshToken(action.tokens.refresh.token);
      return {
        ...state,
        ...action.user,
        creatingUser: false,
      }
    case CREATE_USER_FAIL:
      return {
        ...state,
        creatingUser: false,
        errorMessage: action.message,
      }
    case LOGOUT:
      return {
        ...state,
        loggingOut: true,
        fetchingUser: true,
      }
    case LOGOUT_DONE:
      return {
        fetchingUser: false
      }
    case LOGOUT_FAILED:
      return {
        fetchingUser: false,
        errorMessage: action.message,
      }
    default:
      return state;
  }
}

export default user;