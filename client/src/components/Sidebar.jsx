import React from 'react';
import './Sidebar.css';

const Sidebar = ({ setActiveSection }) => {
  return (
    <div className="sidebar">
      <ul>
        <li onClick={() => setActiveSection('home')}>Home</li>
        <li onClick={() => setActiveSection('profile')}>Profile</li>
        <li onClick={() => setActiveSection('quotes')}>Quotes</li>
        <li onClick={() => setActiveSection('settings')}>Settings</li>
      </ul>
    </div>
  );
};

export default Sidebar;
