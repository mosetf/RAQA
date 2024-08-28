import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './components/mainPage';
import ForgotPassword from './components/forgotpassword';
import ResetPassword from './components/resetpassword';
import HomePage from './components/HomePage';
import UserPage from './components/UserPage';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/home" element={<ProtectedRoute element={HomePage} />} />
        <Route path="/user" element={<ProtectedRoute element={UserPage} />} />
      </Routes>
    </Router>
  );
};

export default App;