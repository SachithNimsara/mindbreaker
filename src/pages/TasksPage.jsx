import React from 'react';
import { Box } from '@mui/material';
import TaskBoard from '../components/TaskBoard/TaskBoard';

export default function TasksPage() {
  return (
    <Box sx={{ maxWidth: 800, mx: 'auto' }}>
      <TaskBoard />
    </Box>
  );
}