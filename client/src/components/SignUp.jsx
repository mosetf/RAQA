import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const SignUp = () => {
  const [signUpName, setSignUpName] = useState('');
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [signUpConfirmPassword, setSignUpConfirmPassword] = useState('');

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const checkPasswordStrength = (password) => {
    // Add your password strength logic here
    return password.length >= 6;
  };

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    if (!validateEmail(signUpEmail)) {
      alert('Invalid email format');
      return;
    }

    if (!checkPasswordStrength(signUpPassword)) {
      alert('Password does not meet requirements');
      return;
    }

    if (signUpPassword !== signUpConfirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: signUpName, email: signUpEmail, password: signUpPassword })
      });

      if (!response.ok) {
        throw new Error('Failed to sign up. Please try again later.');
      }

      const result = await response.json();
      alert(result.message);
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while signing up. Please try again later.');
    }
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100vh" bgcolor="grey.100">
      <Box bgcolor="white" p={4} borderRadius="8px" boxShadow={3}>
        <Typography variant="h4" gutterBottom>
          Sign Up
        </Typography>
        <TextField label="Username" variant="outlined" fullWidth margin="normal" value={signUpName} onChange={(e) => setSignUpName(e.target.value)} />
        <TextField label="Email" variant="outlined" fullWidth margin="normal" value={signUpEmail} onChange={(e) => setSignUpEmail(e.target.value)} />
        <TextField label="Password" type="password" variant="outlined" fullWidth margin="normal" value={signUpPassword} onChange={(e) => setSignUpPassword(e.target.value)} />
        <TextField label="Confirm Password" type="password" variant="outlined" fullWidth margin="normal" value={signUpConfirmPassword} onChange={(e) => setSignUpConfirmPassword(e.target.value)} />
        <Button variant="contained" color="primary" fullWidth onClick={handleSignUpSubmit}>
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