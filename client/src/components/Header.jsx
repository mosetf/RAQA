import React from 'react';
import { Box, Avatar, Typography, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu'; // Import the MenuIcon for the hamburger

const Header = ({ toggleSidebar, isAuthenticated, username, profilePicture }) => {
  const getGreeting = () => {
    const hours = new Date().getHours();
    if (hours < 12) return 'Good morning';
    if (hours < 18) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <Box display="flex" alignItems="center" justifyContent="space-between" p={2} bgcolor="primary.main" color="white">
      <Box display="flex" alignItems="center" gap={2}>
        <Avatar src={profilePicture || "/avatar.png"} sx={{ width: 56, height: 56 }} />
        <Box>
          <Typography variant="h6" fontWeight="bold">
            Raqa
          </Typography>
          {isAuthenticated && (
            <Typography variant="body2">
              {`${getGreeting()}, ${username}`}
            </Typography>
          )}
        </Box>
      </Box>
      {isAuthenticated && (
        <IconButton onClick={toggleSidebar} color="inherit"> {/* Button to toggle the sidebar */}
          <MenuIcon />
        </IconButton>
      )}
    </Box>
  );
};

export default Header;
