import React from 'react';
import { Paper, Typography, Box } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

export default function StatsCard({ title, value, change, icon }) {
  const isPositive = change >= 0;

  return (
    <Paper sx={{ p: 3, height: '100%' }}>
      <Typography variant="subtitle2" color="text.secondary" gutterBottom>
        {title}
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Typography variant="h4" component="div">
          {value}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {isPositive ? (
            <TrendingUpIcon color="success" />
          ) : (
            <TrendingDownIcon color="error" />
          )}
          <Typography
            variant="body2"
            color={isPositive ? 'success.main' : 'error.main'}
            sx={{ ml: 0.5 }}
          >
            {Math.abs(change)}%
          </Typography>
        </Box>
      </Box>
      <Box sx={{ mt: 1, display: 'flex', alignItems: 'center' }}>
        <Typography variant="h5" sx={{ mr: 1 }}>
          {icon}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {isPositive ? 'Up from last week' : 'Down from last week'}
        </Typography>
      </Box>
    </Paper>
  );
}