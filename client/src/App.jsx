import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Box, CircularProgress } from '@mui/material';
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
  const [user, setUser] = useState({
    username: '',
    email: '',
    profilePicture: ''
  });
  const [loading, setLoading] = useState(true); // Add loading state

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    // Check localStorage for authentication status and user information
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    if (token && storedUser) {
      setIsAuthenticated(true);
      setUser(JSON.parse(storedUser));
    }
    setLoading(false); // Set loading to false after checking localStorage
  }, []);

  useEffect(() => {
    // Fetch user data if authenticated
    if (isAuthenticated) {
      const token = localStorage.getItem('token');
      fetch('/api/user', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
        .then(response => response.json())
        .then(data => {
          setUser({
            username: data.username,
            email: data.email,
            profilePicture: data.profilePicture
          });
          // Store user information in localStorage
          localStorage.setItem('user', JSON.stringify(data));
        })
        .catch(error => {
          console.error('Error fetching user data:', error);
        });
    }
  }, [isAuthenticated]);

  const updateUserDetails = async (updatedFields) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/update-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updatedFields),
      });

      const result = await response.json();
      if (response.ok) {
        alert('User details updated successfully');
        // Update the user state with the new details
        setUser(prevUser => ({
          ...prevUser,
          ...updatedFields
        }));
        // Update user information in localStorage
        localStorage.setItem('user', JSON.stringify({
          ...user,
          ...updatedFields
        }));
      } else {
        alert(result.error);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while updating user details.');
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Router>
      {/* Main layout including Header and Sidebar */}
      <Header
        toggleSidebar={toggleSidebar}
        isAuthenticated={isAuthenticated}
        username={user.username}
        profilePicture={user.profilePicture}
      />
      <Box display="flex">
        {isAuthenticated && <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} setIsAuthenticated={setIsAuthenticated} setUser={setUser} />}
        <Box flexGrow={1} padding={2}>
          <Routes>
            <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} setUser={setUser} />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/maincontent" element={<MainContent />} />
            <Route path="/user" element={isAuthenticated ? <UserPage user={user} /> : <Navigate to="/login" />} />
            <Route path="/dashboard" element={isAuthenticated ? <Dashboard user={user} updateUserDetails={updateUserDetails} /> : <Navigate to="/login" />} />
            <Route
              path="/"
              element={
                isAuthenticated ? (
                  <UserPage user={user} />
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