import React from 'react';
import { Box, Typography } from '@mui/material';

const MainContent = () => {
  return (
    <Box flex={1} p={2}>
      <Typography variant="h4" gutterBottom>
        Main Content
      </Typography>
      <Typography variant="body1">
        This is the main content area.
      </Typography>
    </Box>
  );
};

export default MainContent;