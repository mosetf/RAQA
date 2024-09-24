import React from 'react';
import { Box, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';
import {
  Search as SearchIcon,
  Dashboard as DashboardIcon,
  AttachMoney as RevenueIcon,
  Notifications as NotificationsIcon,
  BarChart as AnalyticsIcon,
  Inventory as InventoryIcon,
  ExitToApp as LogoutIcon,
} from '@mui/icons-material';

const Sidebar = () => {
  return (
    <Box display="flex" flexDirection="column" width="250px" bgcolor="grey.100" p={2}>
      <Box display="flex" alignItems="center" gap={2} p={2} bgcolor="white" borderRadius="8px">
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
  );
};

export default Sidebar;