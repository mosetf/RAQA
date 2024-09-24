import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import MainContent from './MainContent';

const moods = ['Happy', 'Sad', 'Motivated', 'Relaxed'];

const UserPage = () => {
  return (
    <Box display="flex" height="100vh">
      {/* Sidebar */}
      <Box width="250px" bgcolor="grey.100">
        <Sidebar />
      </Box>

      {/* Main Content Area */}
      <Box flex={1} display="flex" flexDirection="column">
        {/* Header */}
        <Header />

        {/* Main Content / Dashboard */}
        <Box flex={1} bgcolor="grey.50" p={3} display="flex" flexDirection="column" alignItems="center" justifyContent="center">
          {/* Mood Selection */}
          <Typography variant="h4" gutterBottom>
            Select Your Mood
          </Typography>
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
      </Box>
    </Box>
  );
};

export default UserPage;
