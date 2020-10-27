import { combineReducers } from 'redux';
import user from './user';
import teams from './teams';

const rootReducer = combineReducers({
  user,
  teams
});

export default rootReducer;