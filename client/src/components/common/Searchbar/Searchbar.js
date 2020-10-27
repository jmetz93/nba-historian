import React from 'react';
import './Searchbar.css';

const SearchBar = ({ searchInput, placeholder, setSearchInput }) => (
  <input 
    className={"searchbar"}
    value={searchInput}
    placeholder={placeholder}
    onChange={(e) => setSearchInput(e.target.value)}
  />
);


export default SearchBar