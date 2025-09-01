import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import {
  CssBaseline,
  Box,
  useMediaQuery,
  ThemeProvider,
  createTheme,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Snackbar,
  Alert,
  Button
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  Task as TaskIcon,
  Book as JournalIcon,
  FreeBreakfast as BreakIcon,
  Login as LoginIcon
} from '@mui/icons-material';

// Import components from correct paths
import TaskBoard from './components/TaskBoard/TaskBoard';
import Journal from './components/Journal/Journal';
import BreakTimer from './components/BreakTimer/BreakTimer';
import DashboardPage from './pages/DashboardPage';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import { AuthProvider, useAuth } from './context/AuthContext';

// Create a custom theme
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
      default: '#F9FAFB',
      paper: '#FFFFFF',
    },
    success: {
      main: '#4CAF50',
    },
    warning: {
      main: '#FF9800',
    },
    error: {
      main: '#F44336',
    },
  },
  typography: {
    fontFamily: '"Inter", sans-serif',
    h4: {
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
          padding: '8px 16px',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.05)',
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          '&.MuiListItem-button': {
            '&:hover': {
              backgroundColor: 'rgba(93, 95, 239, 0.08)',
            },
          },
        },
      },
    },
  },
});

// Navbar Component
const Navbar = ({ handleDrawerToggle, handleLogin }) => {
  const { user, logout } = useAuth();
  
  return (
    <AppBar
      position="fixed"
      sx={{
        width: { sm: `calc(100%)` },
        ml: { sm: `0px` },
        backgroundColor: 'primary.main'
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { sm: 'none' } }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
          Productivity App
        </Typography>
        {user ? (
          <Button color="inherit" onClick={logout}>
            Logout
          </Button>
        ) : (
          <Button color="inherit" onClick={handleLogin} startIcon={<LoginIcon />}>
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

// Sidebar Component
const Sidebar = ({ mobileOpen, handleDrawerToggle }) => {
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { user } = useAuth();
  
  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
    { text: 'Tasks', icon: <TaskIcon />, path: '/tasks' },
    { text: 'Journal', icon: <JournalIcon />, path: '/journal' },
    { text: 'Breaks', icon: <BreakIcon />, path: '/breaks' },
  ];
  
  const drawer = (
    <div>
      <Toolbar />
      <List>
        {menuItems.map((item) => (
          <ListItem 
            button 
            key={item.text} 
            component="a" 
            href={item.path}
            sx={{
              '&:hover': {
                backgroundColor: 'rgba(93, 95, 239, 0.08)',
              },
            }}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </div>
  );
  
  if (!user) return null;
  
  return (
    <Box
      component="nav"
      sx={{ width: { sm: 240 }, flexShrink: { sm: 0 } }}
    >
      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        open={isMobile ? mobileOpen : true}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          '& .MuiDrawer-paper': { 
            boxSizing: 'border-box', 
            width: 240,
            top: isMobile ? 0 : 64,
            height: isMobile ? '100%' : 'calc(100% - 64px)'
          },
        }}
      >
        {drawer}
      </Drawer>
    </Box>
  );
};

// Login Page Component
const LoginPage = ({ onLogin }) => {
  return (
    <Box 
      sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center',
        height: '100vh',
        gap: 2
      }}
    >
      <Typography variant="h4" gutterBottom>
        Welcome to Productivity App
      </Typography>
      <Button 
        variant="contained" 
        size="large" 
        onClick={onLogin}
        startIcon={<LoginIcon />}
      >
        Login to Continue
      </Button>
    </Box>
  );
};

// Custom Snackbar Provider
const CustomSnackbarProvider = ({ children }) => {
  const [snackbars, setSnackbars] = useState([]);

  const addSnackbar = (message, severity = 'info') => {
    const newSnackbar = {
      id: Date.now(),
      message,
      severity,
      open: true
    };
    setSnackbars(prev => [...prev, newSnackbar]);
  };

  const handleClose = (id) => {
    setSnackbars(prev => 
      prev.map(snack => 
        snack.id === id ? { ...snack, open: false } : snack
      )
    );
    
    // Remove after animation completes
    setTimeout(() => {
      setSnackbars(prev => prev.filter(snack => snack.id !== id));
    }, 500);
  };

  return (
    <>
      {React.Children.map(children, child => 
        React.cloneElement(child, { addSnackbar })
      )}
      {snackbars.map(snack => (
        <Snackbar
          key={snack.id}
          open={snack.open}
          autoHideDuration={6000}
          onClose={() => handleClose(snack.id)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        >
          <Alert 
            onClose={() => handleClose(snack.id)} 
            severity={snack.severity}
            sx={{ width: '100%' }}
          >
            {snack.message}
          </Alert>
        </Snackbar>
      ))}
    </>
  );
};

// Main App Content
function AppContent({ addSnackbar }) {
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, login } = useAuth();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogin = () => {
    login({ name: 'User', email: 'user@example.com' });
    addSnackbar('Successfully logged in!', 'success');
  };

  if (!user) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Navbar handleDrawerToggle={handleDrawerToggle} handleLogin={handleLogin} />
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
          <Route path="/tasks" element={
            <ProtectedRoute>
              <TaskBoard addSnackbar={addSnackbar} />
            </ProtectedRoute>
          } />
          <Route path="/journal" element={
            <ProtectedRoute>
              <Journal addSnackbar={addSnackbar} />
            </ProtectedRoute>
          } />
          <Route path="/breaks" element={
            <ProtectedRoute>
              <BreakTimer addSnackbar={addSnackbar} />
            </ProtectedRoute>
          } />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <DashboardPage addSnackbar={addSnackbar} />
            </ProtectedRoute>
          } />
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Box>
    </Box>
  );
}

// Main App Component
function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <CustomSnackbarProvider>
            <AppContent />
          </CustomSnackbarProvider>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;