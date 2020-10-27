import React from 'react';
import { Link } from 'react-router-dom';
import './SearchResultsList.css';

const SearchResultsList = ({ list, pathname, type }) => (
  <ul>
    {list.map(item => (
      <li class="list-item">
        <Link to={{
          pathname,
          state: {
            data: item,
            type
          }
        }}>
          {type === 'players' ? `${item.first_name} ${item.last_name}` : item.full_name}
        </Link>
      </li>
    ))}
  </ul>
)

export default SearchResultsList;