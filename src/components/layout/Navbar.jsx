import * as React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Box, Button } from '@mui/material';
import { Spa, TaskAlt, Book, Dashboard } from '@mui/icons-material';

const navItems = [
  { label: 'Tasks', path: '/tasks', icon: <TaskAlt /> },
  { label: 'Journal', path: '/journal', icon: <Book /> },
  { label: 'Breaks', path: '/breaks', icon: <Spa /> },
  { label: 'Dashboard', path: '/dashboard', icon: <Dashboard /> },
];

export default function Navbar() {
  const location = useLocation();

  return (
    <AppBar position="static" elevation={0} sx={{ bgcolor: 'background.paper' }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography variant="h6" color="primary" sx={{ fontWeight: 700 }}>
          MindfulTracker
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          {navItems.map((item) => (
            <Button
              key={item.path}
              component={Link}
              to={item.path}
              startIcon={item.icon}
              sx={{
                color: location.pathname === item.path ? 'primary.main' : 'text.secondary',
                fontWeight: location.pathname === item.path ? 600 : 400,
              }}
            >
              {item.label}
            </Button>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
}