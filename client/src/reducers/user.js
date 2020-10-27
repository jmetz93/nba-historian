import {
  FETCH_USER,
  FETCH_USER_DONE,
  FETCH_USER_FAIL,
} from '../constants';
import { setAccessToken, setRefreshToken, removeRefreshToken } from '../utils';

const user = (state={}, action) => {
  switch(action.type) {
    case FETCH_USER:
      return {
        ...state,
        fetchingUser: true,
      };
    case FETCH_USER_DONE:
      setAccessToken(action.access.token);
      setRefreshToken(action.access.refresh);
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
    default:
      return state;
  }
}

export default user;