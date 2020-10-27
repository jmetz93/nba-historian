import React, { useState, useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Ring } from 'react-awesome-spinners';
import { 
  Searchbar, 
  Button, 
  SearchResultsList,
  Pagination 
} from '../../common';
import { userActions } from '../../../actions';
import { searchPlayers } from '../../../services';
import './HomeView.css';


const HomeView = ({ location, isAuth, userActions }) => {
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [searching, setSearching] = useState(false);
  const [lastSearchAttempt, setLastSearchAttempt] = useState('');

  useEffect(() => {
    if (!!location.state && location.state.signOut && isAuth) {
      
    }
  }, [location.state]);

  const searchAttempt = async () => {
    if (!!searchText) {
      setCurrentPage(1);
      search(searchText, 1);
    }
  };

  const search = async (player, page) => {
    setSearching(true);
    const results = await searchPlayers(player, page);
    setSearchResults(results.playerResults);
    setLastSearchAttempt(player);
    setSearching(false);
  };

  const changePage = (newPage) => {
    setCurrentPage(newPage);
    search(lastSearchAttempt, newPage);
  };

  const resultsExist = searchResults.hasOwnProperty('data') && searchResults.data.length > 0;
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
      {searching ? <Ring />
        : resultsExist 
          ? <div>
              <Pagination 
                currentPage={currentPage}
                pageRange={searchResults.meta.total_pages}
                pageChangeHandler={changePage}
                nextAvailable={currentPage < searchResults.meta.total_pages}
                previousAvailable={currentPage > 1}
              />
                <SearchResultsList 
                  list={searchResults.data}
                  pathname='/player_details'
                  type='players'
                />
              <Pagination 
                currentPage={currentPage}
                pageRange={searchResults.meta.total_pages}
                pageChangeHandler={changePage}
                nextAvailable={currentPage < searchResults.meta.total_pages}
                previousAvailable={currentPage > 1}
              />
            </div>
          : <div>No Results Found</div>
      }
    </div>
  )
};

const mapStateToProps = ({ user }) => ({
  user
});

const mapDispatchToProps = (dispatch) => ({
  userActions: bindActionCreators(userActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeView);