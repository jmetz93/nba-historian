import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import logo from './kobeFavicon.jpg';
import { navOptions } from '../../../constants';
import './Navbar.css';

const Navbar = (props) => {
  const { authStatus } = props;
  console.log({authStatus})

  return (
    <nav className="NavbarItems">
      <div className="logo-container">
        <img id="kobe-logo" src={logo}/>
        <h1 className="navbar-logo">Nba Historian</h1>
      </div>
      <div className="menu-icon">
        <i classname=""></i>
      </div>
      <ul className="nav-menu">
        {navOptions[authStatus].map(option => (
          <li><NavLink className="nav-links" to={option.route}>{option.name}</NavLink></li>
        ))}
      </ul>
    </nav>
  )
};

export default Navbar;