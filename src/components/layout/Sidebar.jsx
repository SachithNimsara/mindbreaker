import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { 
  TaskAlt as TasksIcon, 
  Book as JournalIcon, 
  Spa as BreaksIcon, 
  Dashboard as DashboardIcon 
} from '@mui/icons-material';
import { Link, useLocation } from 'react-router-dom';

const drawerWidth = 240;

const menuItems = [
  { text: 'Tasks', icon: <TasksIcon />, path: '/tasks' },
  { text: 'Journal', icon: <JournalIcon />, path: '/journal' },
  { text: 'Breaks', icon: <BreaksIcon />, path: '/breaks' },
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          borderRight: 'none',
        },
      }}
    >
      <List>
        {menuItems.map((item) => (
          <ListItem
            button
            key={item.text}
            component={Link}
            to={item.path}
            selected={location.pathname === item.path}
            sx={{
              '&.Mui-selected': {
                backgroundColor: 'primary.light',
                '&:hover': {
                  backgroundColor: 'primary.light',
                },
              },
            }}
          >
            <ListItemIcon sx={{ color: location.pathname === item.path ? 'primary.main' : 'inherit' }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText 
              primary={item.text} 
              primaryTypographyProps={{
                fontWeight: location.pathname === item.path ? 'medium' : 'normal'
              }}
            />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}