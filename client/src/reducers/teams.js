import {
  FETCH_TEAMS,
  FETCH_TEAMS_DONE,
  FETCH_TEAMS_FAILED,
} from '../constants';

const teams = (state = {}, action) => {
  switch(action.type) {
    case FETCH_TEAMS:
      return {
        ...state,
        fetchingTeams: true,
      };
    case FETCH_TEAMS_DONE:
      return {
        ...state,
        fetchingTeams: false,
        list: action.teams
      };
    case FETCH_TEAMS_FAILED:
      return {
        ...state,
        fetchingTeams: false,
        errorMessage: action.message,
      };
    default:
      return state;
  }
};

export default teams;