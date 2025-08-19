import React, { useState, createContext, useContext } from 'react';
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
  Alert
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  Task as TaskIcon,
  Book as JournalIcon,
  FreeBreakfast as BreakIcon
} from '@mui/icons-material';

// Create Auth Context
const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  
  const value = {
    user,
    login: (userData) => setUser(userData),
    logout: () => setUser(null)
  };
  
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

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
  },
});

// Navbar Component
const Navbar = ({ handleDrawerToggle }) => {
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
        <Typography variant="h6" noWrap component="div">
          Productivity App
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

// Sidebar Component
const Sidebar = ({ mobileOpen, handleDrawerToggle }) => {
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
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
          <ListItem button key={item.text}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </div>
  );
  
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

// Page Components
const TasksPage = () => (
  <Box>
    <Typography variant="h4" gutterBottom>
      Tasks
    </Typography>
    <Typography>
      Manage your tasks here.
    </Typography>
  </Box>
);

const JournalPage = () => (
  <Box>
    <Typography variant="h4" gutterBottom>
      Journal
    </Typography>
    <Typography>
      Write your journal entries here.
    </Typography>
  </Box>
);

const BreaksPage = () => (
  <Box>
    <Typography variant="h4" gutterBottom>
      Breaks
    </Typography>
    <Typography>
      Schedule and track your breaks here.
    </Typography>
  </Box>
);

const DashboardPage = () => (
  <Box>
    <Typography variant="h4" gutterBottom>
      Dashboard
    </Typography>
    <Typography>
      View your productivity dashboard here.
    </Typography>
  </Box>
);

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
function AppContent() {
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
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