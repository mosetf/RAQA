import React, { useState } from 'react';
import { Box, Typography, Avatar, Button } from '@mui/material';
import SpotifyPlayer from './SpotifyPlayer';

const moods = ['Happy', 'Sad', 'Motivated', 'Relaxed'];

const UserPage = ({ user }) => {
  const [selectedMood, setSelectedMood] = useState(null);

  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100vh" bgcolor="grey.100">
      <Typography variant="h4" gutterBottom>
        Select Your Mood
      </Typography>
      <Avatar 
        src={user.profilePicture ? user.profilePicture : "/avatar.png"} 
        sx={{ width: 100, height: 100 }} 
      />
      <Typography variant="h6" gutterBottom>
        {user.username}
      </Typography>
      <Box display="flex" justifyContent="center" gap={2} marginTop={2}>
        {moods.map((mood) => (
          <Button key={mood} variant="contained" onClick={() => setSelectedMood(mood)}>
            {mood}
          </Button>
        ))}
      </Box>
      {selectedMood && <SpotifyPlayer mood={selectedMood.toLowerCase()} />}
    </Box>
  );
};

export default UserPage;
