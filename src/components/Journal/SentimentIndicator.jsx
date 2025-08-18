import React from 'react';
import { Box, Typography, Chip } from '@mui/material';
import { Mood, MoodBad, SentimentNeutral } from '@mui/icons-material';

const sentimentColors = {
  positive: 'success',
  negative: 'error',
  neutral: 'warning',
};

const sentimentIcons = {
  positive: <Mood />,
  negative: <MoodBad />,
  neutral: <SentimentNeutral />,
};

export default function SentimentIndicator({ type, score, small = false }) {
  if (!type) return null;

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <Chip
        icon={sentimentIcons[type]}
        label={small ? type : `${type} (${score > 0 ? '+' : ''}${score})`}
        color={sentimentColors[type]}
        size={small ? 'small' : 'medium'}
        variant="outlined"
      />
    </Box>
  );
}