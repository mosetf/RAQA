import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

const Login = ({ setIsAuthenticated, setUsername }) => {
  const [signInEmail, setSignInEmail] = useState('');
  const [signInPassword, setSignInPassword] = useState('');
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const handleSignInSubmit = async (e) => {
    e.preventDefault();
    if (!validateEmail(signInEmail)) {
      alert('Invalid email format');
      return;
    }

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: signInEmail, password: signInPassword })
      });

      if (!response.ok) {
        const result = await response.json();
        alert(result.error);
        return;
      }

      const result = await response.json();
      console.log('Login successful, storing token and redirecting...');
      localStorage.setItem('token', result.token); // Save the token
      console.log('Token stored:', result.token);
      setIsAuthenticated(true); // Set authentication status to true
      setUsername(result.user.username); // Set the username
      navigate('/user'); // Redirect to user page
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while signing in.');
    }
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100vh" bgcolor="grey.100">
      <Box bgcolor="white" p={4} borderRadius="8px" boxShadow={3}>
        <Typography variant="h4" gutterBottom>
          Login
        </Typography>
        <TextField label="Email" variant="outlined" fullWidth margin="normal" value={signInEmail} onChange={(e) => setSignInEmail(e.target.value)} />
        <TextField label="Password" type="password" variant="outlined" fullWidth margin="normal" value={signInPassword} onChange={(e) => setSignInPassword(e.target.value)} />
        <Button variant="contained" color="primary" fullWidth onClick={handleSignInSubmit}>
          Login
        </Button>
        <Typography variant="body2" align="center" marginTop={2}>
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default Login;