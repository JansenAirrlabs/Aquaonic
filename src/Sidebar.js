import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css'; // Import the CSS file

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  return (
    <nav className={`navbar ${collapsed ? 'collapsed' : ''}`}>
      <div className="navbar-brand">E-Eight</div>
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
      <button className="toggle-collapse" onClick={toggleCollapse}>
        <i className={collapsed ? 'fas fa-chevron-right' : 'fas fa-chevron-left'}></i>
      </button>
    </nav>
  );
};

export default Sidebar;
