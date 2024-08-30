import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './components/mainPage';
import ForgotPassword from './components/forgotpassword';
import ResetPassword from './components/resetpassword';
import UserPage from './components/UserPage';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './components/Dashboard';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/user" element={<ProtectedRoute element={UserPage} />} />
        <ProtectedRoute path="/dashboard" component={Dashboard} />
      </Routes>
    </Router>
  );
};

export default App; 