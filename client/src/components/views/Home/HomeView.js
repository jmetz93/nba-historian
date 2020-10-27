import React, { useState } from 'react';
import { Ring } from 'react-awesome-spinners';
import { Searchbar, Button } from '../../common';
import { searchPlayers } from '../../../services';
import './HomeView.css';


const HomeView = (props) => {
  const [searchText, setSearchText] = useState(null);
  const [searchResults, setSearchResults] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searching, setSearching] = useState(false);

  const searchAttempt = async () => {
    if (!!searchText) {
      setSearching(true);
      const playersSearchResults = await searchPlayers(searchText);
      setSearchResults(playersSearchResults);
      setSearching(false);
    }
  };
  console.log({searchResults})
  return (
    <div class="home-container">
      <h1 className="search-header">Player Lookup</h1>
      <p className="search-details">Enter the name of the player you would like to search</p>
      <Searchbar 
        searchInput={searchText}
        placeholder={"Ex: Lebron James"}
        setSearchInput={setSearchText}
      />
      <Button 
        disabled={!searchText}
        clickHandler={searchAttempt}
        buttonText={'Search'}
      />
      {searching && <Ring />}
    </div>
  )
};

export default HomeView;