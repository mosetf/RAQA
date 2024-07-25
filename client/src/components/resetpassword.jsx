import React, { useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const query = new URLSearchParams(useLocation().search);
  const token = query.get('token');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/reset-password', { token, newPassword });
      alert('Password has been reset');
    } catch (error) {
      alert('Error resetting password');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Reset Password</h2>
      <input
        type="password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        placeholder="Enter new password"
        required
      />
      <button type="submit">Reset Password</button>
    </form>
  );
};

export default ResetPassword;
