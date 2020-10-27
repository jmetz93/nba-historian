import React from 'react'

const TeamDetails = ({ team }) => (
  <div>
    <ul style={{ listStyleType: 'none' }}>
      <li className="detail-item"><span className="detail-item-title">Name: </span>{team.full_name}</li>
      <li className="detail-item"><span className="detail-item-title">Abbreviation: </span>{team.abbreviation}</li>
      <li className="detail-item"><span className="detail-item-title">Conference: </span>{team.conference}</li>
      <li className="detail-item"><span className="detail-item-title">Division: </span>{team.division}</li>
    </ul>
  </div>
);

export default TeamDetails;