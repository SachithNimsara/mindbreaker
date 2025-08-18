import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CssBaseline, Box, useMediaQuery } from '@mui/material';
import Navbar from './components/layout/Navbar';
import Sidebar from './components/layout/Sidebar';
import TasksPage from './pages/TasksPage';
import JournalPage from './pages/JournalPage';
import BreaksPage from './pages/BreaksPage';
import DashboardPage from './pages/DashboardPage';
import ThemeProvider from './components/layout/ThemeProvider';
import { AuthProvider } from './context/AuthContext'; // Updated import
import { SnackbarProvider } from 'notistack';

function App() {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Router>
      <ThemeProvider>
        <AuthProvider> {/* Now using named export */}
          <SnackbarProvider maxSnack={3}>
            <Box sx={{ display: 'flex' }}>
              <CssBaseline />
              <Navbar handleDrawerToggle={handleDrawerToggle} />
              <Sidebar 
                mobileOpen={mobileOpen} 
                handleDrawerToggle={handleDrawerToggle} 
              />
              <Box
                component="main"
                sx={{
                  flexGrow: 1,
                  p: 3,
                  width: { sm: `calc(100% - ${isMobile ? 0 : 240}px)` },
                  marginTop: { xs: '56px', sm: '64px' },
                }}
              >
                <Routes>
                  <Route path="/tasks" element={<TasksPage />} />
                  <Route path="/journal" element={<JournalPage />} />
                  <Route path="/breaks" element={<BreaksPage />} />
                  <Route path="/dashboard" element={<DashboardPage />} />
                  <Route path="*" element={<Navigate to="/tasks" replace />} />
                </Routes>
              </Box>
            </Box>
          </SnackbarProvider>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;