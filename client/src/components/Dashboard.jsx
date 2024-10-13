import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Avatar } from '@mui/material';
import ProfilePictureUpload from './ProfilePictureUpload';

const Dashboard = ({ user }) => {
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [profilePicture, setProfilePicture] = useState(user.profilePicture);

  const handleProfilePictureUpdate = async (newProfilePicture) => {
    setProfilePicture(newProfilePicture);
    await updateUserDetails({ profilePicture: newProfilePicture });
  };

  const handleUsernameUpdate = async () => {
    await updateUserDetails({ username });
  };

  const handleEmailUpdate = async () => {
    await updateUserDetails({ email });
  };

  const updateUserDetails = async (updatedFields) => {
    try {
      const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage
      const response = await fetch('/api/update-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updatedFields),
      });
  
      const result = await response.json();
      if (response.ok) {
        alert('User details updated successfully');
      } else {
        alert(result.error);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while updating user details.');
    }
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" p={2}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Avatar src={profilePicture || "/avatar.png"} sx={{ width: 100, height: 100 }} />
      <ProfilePictureUpload onProfilePictureUpdate={handleProfilePictureUpdate} />
      <Box component="form" display="flex" flexDirection="column" gap={2} mt={2}>
        <TextField
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <Button onClick={handleUsernameUpdate} variant="contained" color="primary">
          Update Username
        </Button>
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Button onClick={handleEmailUpdate} variant="contained" color="primary">
          Update Email
        </Button>
      </Box>
    </Box>
  );
};

export default Dashboard;