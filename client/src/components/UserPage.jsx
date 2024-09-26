import React from 'react';
import { Box, Typography, Avatar, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const moods = ['Happy', 'Sad', 'Motivated', 'Relaxed'];

const UserPage = ({ user }) => {
  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100vh" bgcolor="grey.100">
      <Typography variant="h4" gutterBottom>
        Select Your Mood
      </Typography>
      <Avatar src={user.profilePicture || "/avatar.png"} sx={{ width: 100, height: 100 }} />
      <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
        {moods.map((mood) => (
          <Button
            key={mood}
            variant="contained"
            color="primary"
            component={Link}
            to={`/maincontent?mood=${mood}`}
          >
            {mood}
          </Button>
        ))}
      </Box>
    </Box>
  );
};

export default UserPage;
