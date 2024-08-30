import React, { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import MainContent from './MainContent';
import './Dashboard.css';

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState('home');

  return (
    <div className="dashboard">
      <Header />
      <div className="dashboard-body">
        <Sidebar setActiveSection={setActiveSection} />
        <MainContent activeSection={activeSection} />
      </div>
    </div>
  );
};

export default Dashboard;
