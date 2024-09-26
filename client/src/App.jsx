import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Box } from '@mui/material';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import Login from './components/Login';
import SignUp from './components/SignUp';
import UserPage from './components/UserPage';
import Dashboard from './components/Dashboard'; 
import './global.css';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [profilePicture, setProfilePicture] = useState('');

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    // Fetch user data if authenticated
    if (isAuthenticated) {
      fetch('/api/user')
        .then(response => response.json())
        .then(data => {
          setUsername(data.username);
          setEmail(data.email);
          setProfilePicture(data.profilePicture);
        });
    }
  }, [isAuthenticated]);

  return (
    <Router>
      {/* Main layout including Header and Sidebar */}
      <Header
        toggleSidebar={toggleSidebar}
        isAuthenticated={isAuthenticated}
        username={username}
        profilePicture={profilePicture}
      />
      <Box display="flex">
        {isAuthenticated && <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />}
        <Box flexGrow={1} padding={2}>
          <Routes>
            <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} setUsername={setUsername} />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/maincontent" element={<MainContent />} />
            <Route path="/user" element={isAuthenticated ? <UserPage /> : <Navigate to="/login" />} />
            <Route path="/dashboard" element={isAuthenticated ? <Dashboard user={{ username, email, profilePicture }} /> : <Navigate to="/login" />} />
            <Route
              path="/"
              element={
                isAuthenticated ? (
                  <UserPage />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
          </Routes>
        </Box>
      </Box>
    </Router>
  );
};

export default App;