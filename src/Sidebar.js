import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css'; // Import the CSS file

const Sidebar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand"><strong>E-Eight</strong></div>
      <ul className="navbar-menu">
        <li>
          <Link to="/" className="navbar-link">
            Home
          </Link>
        </li>
        <li>
          <Link to="/tables" className="navbar-link">
            Tables
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
