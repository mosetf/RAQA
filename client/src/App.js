import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ForgotPassword from '../src/components/forgotpassword';
import ResetPassword from '../src/components/resetpassword';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/forgot-password" component={ForgotPassword} />
        <Route path="/reset-password" component={ResetPassword} />
        {/* Add other routes here */}
      </Routes>
    </Router>
  );
};

export default App;