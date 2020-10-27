import React, { useState, useEffect } from 'react';
import { Ring } from 'react-awesome-spinners';
import PlayerDetails from './PlayerDetails';
import TeamDetails from './TeamDetails';
import { Button } from '../../common';
import { getStats } from '../../../services';
import './DetailsView.css';

const DetailsView = (props) => {
  const [seasonStats, setSeasonStats] = useState(null);
  const [loadingStats, setLoadingStats] = useState(false);
  const [statsLoaded, setStatsLoaded] = useState(false);

  const {
    location
  } = props;
  const { type, data } = location.state;

  useEffect(() => {
    setSeasonStats(null);
  }, [type, data.id]);

  const fetchStats = async () => {
    setLoadingStats(true);
    setStatsLoaded(true);
    const { playerStats } = await getStats(data.id);
    setSeasonStats(playerStats.data[0]);
    setLoadingStats(false);
  }

  console.log("stats: ", seasonStats);
  return (
    <div className="details-view-container">
      <h1 className="details-title">{type === 'players' ? 'Player Details' : 'Team Details'}</h1>
      {type === 'players' 
        ? <PlayerDetails player={data} />
        : <TeamDetails team={data} />
      }
      {type === 'players' && 
        <div className="stats-container">
          <Button 
            disabled={statsLoaded}
            clickHandler={fetchStats}
            buttonText={'Get Last Season Statistics'}
          />
          {statsLoaded &&
            (loadingStats 
              ? <Ring />
              : <div className="stats-list">
                  {!!seasonStats && Object.keys(seasonStats).length > 0 ? <ul>
                    <li className="detail-item"><span className="detail-item-title">Season: </span>2019-2020</li>
                    <li className="detail-item"><span className="detail-item-title">Games: </span>{seasonStats.games_played}</li>
                    <li className="detail-item"><span className="detail-item-title">Minutes Per Game: </span>{seasonStats.min}</li>
                    <li className="detail-item"><span className="detail-item-title">Points Per Game: </span>{seasonStats.pts}</li>
                    <li className="detail-item"><span className="detail-item-title">Assists Per Game: </span>{seasonStats.ast}</li>
                    <li className="detail-item"><span className="detail-item-title">Rebounds Per Game: </span>{seasonStats.reb}</li>
                    <li className="detail-item"><span className="detail-item-title">Steals Per Game: </span>{seasonStats.stl}</li>
                    <li className="detail-item"><span className="detail-item-title">Blocks Per Game: </span>{seasonStats.blk}</li>
                  </ul> : <h2>{data.first_name} {data.last_name} did not appear in any games this past season.</h2>}
                </div>) 
          }
        </div>
      }
    </div>
  )
};

export default DetailsView;