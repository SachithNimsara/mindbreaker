import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  Slider,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import { PlayArrow, Pause, Replay } from '@mui/icons-material';

const timerPresets = [
  { label: 'Pomodoro (25 min)', value: 25 * 60 },
  { label: 'Short Break (5 min)', value: 5 * 60 },
  { label: 'Long Break (15 min)', value: 15 * 60 },
];

export default function BreakTimer() {
  const [seconds, setSeconds] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState(0);

  useEffect(() => {
    let interval;
    if (isActive && seconds > 0) {
      interval = setInterval(() => setSeconds((s) => s - 1), 1000);
    } else if (isActive && seconds === 0) {
      setIsActive(false);
      // Play sound or show notification
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  const handlePresetChange = (e) => {
    const index = e.target.value;
    setSelectedPreset(index);
    setSeconds(timerPresets[index].value);
    setIsActive(false);
  };

  const handleSliderChange = (e, newValue) => {
    setSeconds(newValue);
    setIsActive(false);
    setSelectedPreset(-1); // Custom value
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <Paper sx={{ p: 3, borderRadius: 3 }}>
      <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
        Mindful Break Timer
      </Typography>

      <Box sx={{ textAlign: 'center', mb: 3 }}>
        <Typography variant="h2" sx={{ fontWeight: 300, letterSpacing: 4 }}>
          {formatTime(seconds)}
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 3 }}>
        <Button
          variant="contained"
          size="large"
          startIcon={isActive ? <Pause /> : <PlayArrow />}
          onClick={() => setIsActive(!isActive)}
          sx={{ px: 4 }}
        >
          {isActive ? 'Pause' : 'Start'}
        </Button>
        <Button
          variant="outlined"
          size="large"
          startIcon={<Replay />}
          onClick={() => {
            setIsActive(false);
            setSeconds(selectedPreset >= 0 ? timerPresets[selectedPreset].value : seconds);
          }}
        >
          Reset
        </Button>
      </Box>

      <FormControl fullWidth sx={{ mb: 3 }}>
        <InputLabel>Preset Timers</InputLabel>
        <Select
          value={selectedPreset}
          onChange={handlePresetChange}
          label="Preset Timers"
        >
          {timerPresets.map((preset, index) => (
            <MenuItem key={index} value={index}>
              {preset.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Typography gutterBottom>Custom Duration</Typography>
      <Slider
        value={seconds}
        onChange={handleSliderChange}
        min={60} // 1 minute
        max={3600} // 60 minutes
        step={60}
        valueLabelDisplay="auto"
        valueLabelFormat={(value) => `${value / 60} min`}
        sx={{ mb: 3 }}
      />

      {seconds === 0 && (
        <Paper sx={{ p: 2, bgcolor: 'success.light', textAlign: 'center' }}>
          <Typography color="success.contrastText">
            Time's up! Take a deep breath and stretch.
          </Typography>
        </Paper>
      )}
    </Paper>
  );
}