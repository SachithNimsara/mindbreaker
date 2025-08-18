import React from 'react';
import { Button } from '@mui/material';
import { PlayArrow, Pause, Replay } from '@mui/icons-material';

export default function TimerControls({ isActive, onToggle, onReset }) {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 3 }}>
      <Button
        variant="contained"
        size="large"
        startIcon={isActive ? <Pause /> : <PlayArrow />}
        onClick={onToggle}
        sx={{ px: 4 }}
      >
        {isActive ? 'Pause' : 'Start'}
      </Button>
      <Button
        variant="outlined"
        size="large"
        startIcon={<Replay />}
        onClick={onReset}
      >
        Reset
      </Button>
    </Box>
  );
}