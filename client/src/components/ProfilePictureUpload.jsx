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
    if (file) formData.append('profilePicture', file);
    if (username) formData.append('username', username);
    if (email) formData.append('email', email);

    // Retrieve the token from localStorage
    const token = localStorage.getItem('token');
    console.log('Token:', token); // Log the token

    try {
      const response = await fetch('/api/update-user', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      const result = await response.json();
      if (response.ok) {
        alert('User details updated successfully');
        onProfilePictureUpdate(result.user.profilePicture); // Call the callback with the new profile picture URL
      } else {
        console.error('Error:', result.error); // Log the error
        alert(result.error);
      }
    } catch (error) {
      console.error('Error:', error); // Log the error
      alert('An error occurred while updating user details.');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <TextField label="Username" value={username} onChange={(e) => setUsername(e.target.value)} fullWidth margin="normal" />
      <TextField label="Email" value={email} onChange={(e) => setEmail(e.target.value)} fullWidth margin="normal" />
      <TextField type="file" onChange={handleFileChange} fullWidth margin="normal" />
      <Button type="submit" variant="contained" color="primary">
        Update
      </Button>
    </Box>
  );
};

export default ProfilePictureUpload;