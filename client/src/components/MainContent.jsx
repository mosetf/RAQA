import React from 'react';
import QuotesWidget from './QuotesWidget';
import './MainContent.css';

const MainContent = ({ activeSection }) => {
  const renderContent = () => {
    switch (activeSection) {
      case 'home':
        return <div>Welcome to your Dashboard!</div>;
      case 'profile':
        return <div>Profile Information</div>;
      case 'quotes':
        return <QuotesWidget />;
      case 'settings':
        return <div>Settings</div>;
      default:
        return <div>Welcome to your Dashboard!</div>;
    }
  };

  return (
    <div className="main-content">
      {renderContent()}
    </div>
  );
};

export default MainContent;
