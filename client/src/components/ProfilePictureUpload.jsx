import React, { useState } from 'react';
import { Box, Button, TextField } from '@mui/material';

const ProfilePictureUpload = ({ onProfilePictureUpdate }) => {
  const [file, setFile] = useState(null);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (file) formData.append('profilePicture', file); // Add profile picture to formData
    if (username) formData.append('username', username); // Add username if provided
    if (email) formData.append('email', email); // Add email if provided

    // Retrieve the token from localStorage
    const token = localStorage.getItem('token');

    try {
      const response = await fetch('/api/update-user', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`, // Use Bearer token for authentication
        },
        body: formData, // Send formData containing the file and other details
      });

      const result = await response.json();
      if (response.ok) {
        alert('User details updated successfully');

        // Update profile picture in the parent component
        if (result.user.profilePicture) {
          onProfilePictureUpdate(result.user.profilePicture); // Call the callback with the new profile picture URL
        }
      } else {
        console.error('Error:', result.error); // Log error in console
        alert(result.error); // Show error message
      }
    } catch (error) {
      console.error('Error:', error); // Log error
      alert('An error occurred while updating user details.');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <TextField 
        label="Username" 
        value={username} 
        onChange={(e) => setUsername(e.target.value)} 
        fullWidth 
        margin="normal" 
      />
      <TextField 
        label="Email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
        fullWidth 
        margin="normal" 
      />
      <TextField 
        type="file" 
        onChange={handleFileChange} 
        fullWidth 
        margin="normal" 
      />
      <Button type="submit" variant="contained" color="primary">
        Update
      </Button>
    </Box>
  );
};

export default ProfilePictureUpload;
