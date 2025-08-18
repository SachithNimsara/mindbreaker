import React from 'react';
import { Box } from '@mui/material';
import BreakTimer from '../components/BreakTimer/BreakTimer';

export default function BreaksPage() {
  return (
    <Box sx={{ maxWidth: 600, mx: 'auto' }}>
      <BreakTimer />
    </Box>
  );
}