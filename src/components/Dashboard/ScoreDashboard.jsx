import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  createTheme,
  ThemeProvider,
  CssBaseline
} from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

// Create a theme
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#5D5FEF',
    },
    secondary: {
      main: '#EF5DA8',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
        },
      },
    },
  },
});

// StatsCard Component
function StatsCard({ title, value, change, icon }) {
  const isPositive = change >= 0;

  return (
    <Paper sx={{ p: 3, height: '100%', transition: 'transform 0.2s', '&:hover': { transform: 'translateY(-4px)' } }}>
      <Typography variant="subtitle2" color="text.secondary" gutterBottom>
        {title}
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Typography variant="h4" component="div" sx={{ fontWeight: 600 }}>
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
            sx={{ ml: 0.5, fontWeight: 600 }}
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

// Sample data
const data = [
  { day: 'Mon', productivity: 70, mood: 65, tasks: 5 },
  { day: 'Tue', productivity: 50, mood: 40, tasks: 8 },
  { day: 'Wed', productivity: 90, mood: 80, tasks: 4 },
  { day: 'Thu', productivity: 60, mood: 70, tasks: 6 },
  { day: 'Fri', productivity: 80, mood: 75, tasks: 5 },
  { day: 'Sat', productivity: 40, mood: 60, tasks: 2 },
  { day: 'Sun', productivity: 30, mood: 50, tasks: 1 },
];

// Calculate averages function
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

// Main Dashboard Component
function ScoreDashboard() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ p: 3, maxWidth: 1200, margin: '0 auto' }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, mb: 3, color: 'primary.main' }}>
          Weekly Insights Dashboard
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

        <Paper sx={{ p: 3, mb: 3, backgroundColor: 'white' }}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: 'primary.dark' }}>
            Productivity vs Mood vs Tasks
          </Typography>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
              <XAxis dataKey="day" />
              <YAxis yAxisId="left" domain={[0, 100]} />
              <YAxis yAxisId="right" orientation="right" domain={[0, 10]} />
              <Tooltip 
                contentStyle={{ 
                  borderRadius: 8, 
                  border: '1px solid #e0e0e0',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                }} 
              />
              <Legend />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="productivity"
                stroke="#5D5FEF"
                strokeWidth={3}
                activeDot={{ r: 8 }}
                name="Productivity (%)"
              />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="mood"
                stroke="#EF5DA8"
                strokeWidth={3}
                name="Mood Score"
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="tasks"
                stroke="#4CAF50"
                strokeWidth={3}
                name="Tasks Completed"
              />
            </LineChart>
          </ResponsiveContainer>
        </Paper>

        <Paper sx={{ p: 3, backgroundColor: 'white' }}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: 'primary.dark' }}>
            Weekly Summary
          </Typography>
          <Typography sx={{ lineHeight: 1.6 }}>
            Your best day was <strong>Wednesday</strong> with <strong>90% productivity</strong>. You tend to be more productive 
            when your mood score is above 70. Try completing fewer tasks on weekends to maintain 
            better balance. Overall, your productivity increased by <strong>5%</strong> compared to last week.
          </Typography>
        </Paper>
      </Box>
    </ThemeProvider>
  );
}

export default ScoreDashboard;