import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import axios from 'axios';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async () => {
    try {
      const response = await axios.post('/api/signup', { name, email, password });
      console.log('Sign-up successful:', response.data);
      // Handle successful sign-up (e.g., redirect to login)
    } catch (error) {
      console.error('Sign-up failed:', error);
      // Handle sign-up error
    }
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100vh" bgcolor="grey.100">
      <Box bgcolor="white" p={4} borderRadius="8px" boxShadow={3}>
        <Typography variant="h4" gutterBottom>
          Sign Up
        </Typography>
        <TextField label="Name" variant="outlined" fullWidth margin="normal" value={name} onChange={(e) => setName(e.target.value)} />
        <TextField label="Email" variant="outlined" fullWidth margin="normal" value={email} onChange={(e) => setEmail(e.target.value)} />
        <TextField label="Password" type="password" variant="outlined" fullWidth margin="normal" value={password} onChange={(e) => setPassword(e.target.value)} />
        <Button variant="contained" color="primary" fullWidth onClick={handleSignUp}>
          Sign Up
        </Button>
        <Typography variant="body2" align="center" marginTop={2}>
          Already have an account? <Link to="/login">Login</Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default SignUp;