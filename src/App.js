import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CssBaseline, Box } from '@mui/material';
import Navbar from './components/layout/Navbar';
import TasksPage from './pages/TasksPage';
import JournalPage from './pages/JournalPage';
import BreaksPage from './pages/BreaksPage';
import DashboardPage from './pages/DashboardPage';
import ThemeProvider from './components/layout/ThemeProvider';

function App() {
  return (
    <Router>
      <ThemeProvider>
        <CssBaseline />
        <Navbar />
        <Box sx={{ p: 3 }}>
          <Routes>
            <Route path="/tasks" element={<TasksPage />} />
            <Route path="/journal" element={<JournalPage />} />
            <Route path="/breaks" element={<BreaksPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="*" element={<Navigate to="/tasks" replace />} />
          </Routes>
        </Box>
      </ThemeProvider>
    </Router>
  );
}

export default App;