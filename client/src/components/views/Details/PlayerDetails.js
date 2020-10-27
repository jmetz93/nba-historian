import React from 'react';
import { Link } from 'react-router-dom';

const PlayerDetails = ({ player }) => (
  <div>
    <ul>
      <li className="detail-item"><span className="detail-item-title">Name:</span> {player.firt_name} {player.last_name}</li>
      <li className="detail-item">
        <span className="detail-item-title">Team: {' '}</span>
        <Link to={{
          pathname: '/team_details',
          state: {
            data: player.team,
            type: 'teams'
          }
        }}>
           {player.team.full_name}
        </Link>
      </li>
      <li className="detail-item"><span className="detail-item-title">Height:</span> {player.height_feet}' {player.height_inches}''</li>
      <li className="detail-item"><span className="detail-item-title">Weight:</span> {player.weight_pounds}</li>
      <li className="detail-item"><span className="detail-item-title">Position:</span> {player.position}</li>
    </ul>
  </div>
)

export default PlayerDetails;