import React from 'react';
import { Box, Typography } from '@mui/material'; // Added Typography import
import TaskBoard from '../components/TaskBoard/TaskBoard';
import { useAuth } from '../context/AuthContext';

export default function TasksPage() {
  const { user } = useAuth();

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto' }}>
      {user ? (
        <TaskBoard />
      ) : (
        <Typography variant="body1" align="center" sx={{ mt: 4 }}>
          Please log in to view your tasks
        </Typography>
      )}
    </Box>
  );
}