import React from 'react';
import { Box, Avatar, Typography, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu'; // Import the MenuIcon for the hamburger

const Header = ({ toggleSidebar }) => {
  return (
    <Box display="flex" alignItems="center" justifyContent="space-between" p={2} bgcolor="primary.main" color="white">
      <IconButton onClick={toggleSidebar} color="inherit"> {/* Button to toggle the sidebar */}
        <MenuIcon />
      </IconButton>
      <Box display="flex" alignItems="center" gap={2}>
        <Avatar src="/avatar.png" sx={{ width: 56, height: 56 }} />
        <Box>
          <Typography variant="h6" fontWeight="bold">
            Raqa
          </Typography>
          <Typography variant="body2">Hello</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Header;
