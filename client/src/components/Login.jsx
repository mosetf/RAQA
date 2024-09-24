import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('/api/login', { email, password });
      console.log('Login successful:', response.data);
      // Handle successful login (e.g., redirect to dashboard)
    } catch (error) {
      console.error('Login failed:', error);
      // Handle login error
    }
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100vh" bgcolor="grey.100">
      <Box bgcolor="white" p={4} borderRadius="8px" boxShadow={3}>
        <Typography variant="h4" gutterBottom>
          Login
        </Typography>
        <TextField label="Email" variant="outlined" fullWidth margin="normal" value={email} onChange={(e) => setEmail(e.target.value)} />
        <TextField label="Password" type="password" variant="outlined" fullWidth margin="normal" value={password} onChange={(e) => setPassword(e.target.value)} />
        <Button variant="contained" color="primary" fullWidth onClick={handleLogin}>
          Login
        </Button>
      </Box>
    </Box>
  );
};

export default Login;