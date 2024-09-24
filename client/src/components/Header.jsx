import React from 'react';
import { Box, Avatar, Typography } from '@mui/material';

const Header = () => {
  return (
    <Box display="flex" alignItems="center" gap={2} p={2} bgcolor="primary.main" color="white">
      <Avatar src="/avatar.png" sx={{ width: 56, height: 56 }} />
      <Box>
        <Typography variant="h6" fontWeight="bold">
          Duck UI
        </Typography>
        <Typography variant="body2">
          Duckui@demo.com
        </Typography>
      </Box>
    </Box>
  );
};

export default Header;