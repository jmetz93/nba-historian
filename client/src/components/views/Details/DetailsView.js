import React, { useState, useEffect } from 'react';
import { Ring } from 'react-awesome-spinners';
import PlayerDetails from './PlayerDetails';
import './DetailsView.css';
import TeamDetails from './TeamDetails';

const DetailsView = (props) => {
  const [render, setRender] = useState(0);
  const [seasonStats, setSeasonStats] = useState(null);
  const [loadingStats, setLoadingStats] = useState(false);

  const {
    location
  } = props;
  const { type, data } = location.state;

  useEffect(() => {
    setRender(1);
  }, [type, data.id]);

  console.log("detail props: ", props)
  return (
    <div className="details-view-container">
      <h1 className="details-title">{type === 'players' ? 'Player Details' : 'Team Details'}</h1>
      {type === 'players' 
        ? <PlayerDetails player={data} />
        : <TeamDetails team={data} />
      }
    </div>
  )
};

export default DetailsView;