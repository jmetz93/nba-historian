import {
  FETCH_TEAMS,
  FETCH_TEAMS_DONE,
  FETCH_TEAMS_FAILED,
} from '../constants';
import {
  getTeams
} from '../services';

export const fetchTeamsAction = () => async dispatch => {
  dispatch({ type: FETCH_TEAMS });
  const fetchTeamsResults = await getTeams();
  const success = fetchTeamsResults.teamInfo;

  if (success) {
    dispatch(fetchTeamsDone(fetchTeamsResults.teamInfo.data));
  } else {
    dispatch(fetchTeamsFailed(fetchTeamsResults));
  }
};

export const fetchTeamsDone = (teams) => async dispatch => dispatch({
  type: FETCH_TEAMS_DONE,
  teams,
});

export const fetchTeamsFailed = ({ message }) => async dispatch => dispatch({
  type: FETCH_TEAMS_FAILED,
  message,
});