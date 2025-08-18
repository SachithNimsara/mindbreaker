import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
} from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import StatsCard from './StatsCard';

const data = [
  { day: 'Mon', productivity: 70, mood: 65, tasks: 5 },
  { day: 'Tue', productivity: 50, mood: 40, tasks: 8 },
  { day: 'Wed', productivity: 90, mood: 80, tasks: 4 },
  { day: 'Thu', productivity: 60, mood: 70, tasks: 6 },
  { day: 'Fri', productivity: 80, mood: 75, tasks: 5 },
  { day: 'Sat', productivity: 40, mood: 60, tasks: 2 },
  { day: 'Sun', productivity: 30, mood: 50, tasks: 1 },
];

const calculateAverages = () => {
  const sum = data.reduce((acc, curr) => {
    return {
      productivity: acc.productivity + curr.productivity,
      mood: acc.mood + curr.mood,
      tasks: acc.tasks + curr.tasks,
    };
  }, { productivity: 0, mood: 0, tasks: 0 });

  return {
    productivity: Math.round(sum.productivity / data.length),
    mood: Math.round(sum.mood / data.length),
    tasks: Math.round(sum.tasks / data.length),
  };
};

const averages = calculateAverages();

export default function ScoreDashboard() {
  return (
    <Box>
      <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
        Weekly Insights
      </Typography>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={4}>
          <StatsCard
            title="Average Productivity"
            value={`${averages.productivity}%`}
            change={+5}
            icon="📈"
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <StatsCard
            title="Average Mood"
            value={`${averages.mood}/100`}
            change={+2}
            icon="😊"
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <StatsCard
            title="Tasks Completed"
            value={averages.tasks}
            change={-1}
            icon="✅"
          />
        </Grid>
      </Grid>

      <Paper sx={{ p: 3, mb: 3, borderRadius: 3 }}>
        <Typography variant="h6" gutterBottom>
          Productivity vs Mood
        </Typography>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis yAxisId="left" domain={[0, 100]} />
            <YAxis yAxisId="right" orientation="right" domain={[0, 10]} />
            <Tooltip />
            <Legend />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="productivity"
              stroke="#5D5FEF"
              strokeWidth={2}
              activeDot={{ r: 8 }}
              name="Productivity (%)"
            />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="mood"
              stroke="#EF5DA8"
              strokeWidth={2}
              name="Mood Score"
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="tasks"
              stroke="#4CAF50"
              strokeWidth={2}
              name="Tasks Completed"
            />
          </LineChart>
        </ResponsiveContainer>
      </Paper>

      <Paper sx={{ p: 3, borderRadius: 3 }}>
        <Typography variant="h6" gutterBottom>
          Weekly Summary
        </Typography>
        <Typography>
          Your best day was Wednesday with 90% productivity. You tend to be more productive 
          when your mood score is above 70. Try completing fewer tasks on weekends to maintain 
          better balance.
        </Typography>
      </Paper>
    </Box>
  );
}