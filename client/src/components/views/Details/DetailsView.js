import React, { useState, useEffect } from 'react';
import { Ring } from 'react-awesome-spinners';
import { Button } from '../../common';
import PlayerDetails from './PlayerDetails'
import './DetailsView.css';

const DetailsView = (props) => {
  const [render, setRender] = useState(0);
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
      {type === 'players' && <PlayerDetails player={data} />}
    </div>
  )
};

export default DetailsView;