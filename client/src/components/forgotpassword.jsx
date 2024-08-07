import React, { useState } from 'react';
import axios from 'axios';
import './forgotpassword.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFeedbackMessage('');
    setErrorMessage('');
    try {
      await axios.post('/api/forgot-password', { email });
      setFeedbackMessage('Password reset link sent');
    } catch (error) {
      setErrorMessage('Error sending password reset link');
    }
  };

  return (
    <div className="forgot-password-container">
      <form className="forgot-password-form" onSubmit={handleSubmit}>
        <h2>Forgot Password</h2>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
        />
        <button type="submit">Send Reset Link</button>
        {feedbackMessage && <div className="feedback-message">{feedbackMessage}</div>}
        {errorMessage && <div className="error-message">{errorMessage}</div>}
      </form>
    </div>
  );
};

export default ForgotPassword;