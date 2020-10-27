import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Ring } from 'react-awesome-spinners';
import { SearchResultsList } from '../../common';
import { teamsActions } from '../../../actions';

const TeamsView = (props) => {
  const [teamsLoaded, setTeamsLoaded] = useState(false);
  const {
    teams,
    teamsActions
  } = props;

  useEffect(() => {
    const loaded = teams.fetchingTeams === false && teamsLoaded === false;
    if (loaded) {
      setTeamsLoaded(true);
    } else if (teams.fetchingTeams === undefined) {
      teamsActions.fetchTeamsAction();
    }
  }, [teams.fetchingTeams]);
  console.log({teams})
  return (
    <div class="home-container">
      <h1 className="search-header">All Nba Teams</h1>
      {teamsLoaded 
        ? <SearchResultsList 
            list={teams.list}
            pathname={'/team_details'}
            type='teams'
          />
        : <Ring />
      }
    </div>
  )
};

const mapStateToProps = ({ teams }) => ({
  teams
});

const mapDispatchToProps = (dispatch) => ({
  teamsActions: bindActionCreators(teamsActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TeamsView);