import React, { useState } from 'react';
import { Box, Button, Typography, Avatar } from '@mui/material';
import ProfilePictureUpload from './ProfilePictureUpload';

const Dashboard = ({ user }) => {
  const [profilePicture, setProfilePicture] = useState(user.profilePicture);

  const handleProfilePictureUpdate = async (newProfilePicture) => {
    setProfilePicture(newProfilePicture);
    await updateUserDetails({ profilePicture: newProfilePicture });
  };

  const updateUserDetails = async (updatedFields) => {
    try {
      // Retrieve the token from localStorage
      const token = localStorage.getItem('token');
      console.log('Token:', token); // Log the token

      const response = await fetch('/api/update-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
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
    </Box>
  );
};

export default Dashboard;