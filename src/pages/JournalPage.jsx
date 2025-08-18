import React from 'react';
import { Box } from '@mui/material';
import Journal from '../components/Journal/Journal';

export default function JournalPage() {
  return (
    <Box sx={{ maxWidth: 800, mx: 'auto' }}>
      <Journal />
    </Box>
  );
}