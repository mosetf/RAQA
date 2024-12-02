import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Avatar } from '@mui/material';
import ProfilePictureUpload from './ProfilePictureUpload';

const Dashboard = ({ user, setUser }) => {
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [profilePicture, setProfilePicture] = useState(user.profilePicture);

  const handleProfilePictureUpdate = async (newProfilePicture) => {
    const formData = new FormData();
    formData.append('profilePicture', newProfilePicture);  // Assuming newProfilePicture is a file
    await updateUserDetails(formData, true);  // Pass true to indicate it's a file update
  };

  const handleUsernameUpdate = async () => {
    await updateUserDetails({ username });
  };

  const handleEmailUpdate = async () => {
    await updateUserDetails({ email });
  };

  const updateUserDetails = async (updatedFields, isFile = false) => {
    try {
      const token = localStorage.getItem('token');
      
      let requestOptions = {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      };
  
      if (isFile) {
        // When updating profile picture, send FormData without setting Content-Type (browser handles it)
        requestOptions.body = updatedFields; 
      } else {
        // For JSON-based updates (username, email)
        requestOptions.headers['Content-Type'] = 'application/json';
        requestOptions.body = JSON.stringify(updatedFields);
      }
  
      const response = await fetch('/api/update-user', requestOptions);
      const result = await response.json();
  
      if (response.ok) {
        alert('User details updated successfully');
        
        // Update the user state with the new details
        setUser(prevUser => ({
          ...prevUser,
          ...updatedFields
        }));
  
        // Update user information in localStorage
        localStorage.setItem('user', JSON.stringify({
          ...user,
          ...updatedFields
        }));
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
      <Avatar 
      src={profilePicture ? profilePicture : "/avatar.png"} 
      sx={{ width: 100, height: 100 }} 
      />
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
