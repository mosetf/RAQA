import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Box } from '@mui/material';
import Login from './components/Login';
import SignUp from './components/SignUp';
import UserPage from './components/UserPage';
import './global.css';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  console.log('isAuthenticated:', isAuthenticated);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/user" element={<UserPage />} />
        <Route path="/" element={
          isAuthenticated ? (
            <Navigate to="/user" />
          ) : (
            <Navigate to="/login" />
          )
        } />
      </Routes>
    </Router>
  );
};

export default App;