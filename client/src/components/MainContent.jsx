import React from 'react';
import { Box, Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';

const quotes = {
  Happy: "Happiness is not something ready-made. It comes from your own actions.",
  Sad: "Tears come from the heart and not from the brain.",
  Motivated: "The only way to do great work is to love what you do.",
  Relaxed: "Relaxation means releasing all concern and tension and letting the natural order of life flow through one's being."
};

const MainContent = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const mood = params.get('mood');

  return (
    <Box flex={1} p={2}>
      <Typography variant="h4" gutterBottom>
        {mood} Quote
      </Typography>
      <Typography variant="body1">
        {quotes[mood] || "Select a mood to get a quote."}
      </Typography>
    </Box>
  );
};

export default MainContent;