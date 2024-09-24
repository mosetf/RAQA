import React from 'react';
import { Box, List, ListItem, ListItemIcon, ListItemText, Drawer, IconButton, Typography } from '@mui/material';
import {
  Search as SearchIcon,
  Dashboard as DashboardIcon,
  AttachMoney as RevenueIcon,
  Notifications as NotificationsIcon,
  BarChart as AnalyticsIcon,
  Inventory as InventoryIcon,
  ExitToApp as LogoutIcon,
  Close as CloseIcon // Import Close icon
} from '@mui/icons-material';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <Drawer anchor="right" open={isOpen} onClose={toggleSidebar}>
      <Box width="250px" role="presentation" display="flex" flexDirection="column" height="100vh">
        <Box display="flex" justifyContent="space-between" alignItems="center" p={2} bgcolor="primary.main">
          <Typography variant="h6" color="white">Menu</Typography>
          <IconButton onClick={toggleSidebar} color="inherit">
            <CloseIcon />
          </IconButton>
        </Box>
        <Box p={2} display="flex" alignItems="center" gap={2} bgcolor="grey.100" borderRadius="8px">
          <SearchIcon />
          <Typography variant="body1">Search...</Typography>
        </Box>
        <List>
          <ListItem button>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <RevenueIcon />
            </ListItemIcon>
            <ListItemText primary="Revenue" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <NotificationsIcon />
            </ListItemIcon>
            <ListItemText primary="Notifications" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <AnalyticsIcon />
            </ListItemIcon>
            <ListItemText primary="Analytics" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <InventoryIcon />
            </ListItemIcon>
            <ListItemText primary="Inventory" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
