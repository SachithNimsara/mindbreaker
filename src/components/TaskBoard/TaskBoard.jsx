import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Checkbox,
  Paper,
  Typography,
  Tabs,
  Tab,
} from '@mui/material';
import { Add, Delete } from '@mui/icons-material';

export default function TaskBoard() {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Complete project proposal', done: false },
    { id: 2, text: 'Meditation session', done: true },
    { id: 3, text: 'Read research papers', done: false },
  ]);
  const [newTask, setNewTask] = useState('');
  const [tabValue, setTabValue] = useState(0);

  const addTask = () => {
    if (!newTask.trim()) return;
    setTasks([...tasks, { id: Date.now(), text: newTask, done: false }]);
    setNewTask('');
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, done: !task.done } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const filteredTasks = tabValue === 0 
    ? tasks 
    : tabValue === 1 
      ? tasks.filter(task => !task.done) 
      : tasks.filter(task => task.done);

  return (
    <Paper sx={{ p: 3, borderRadius: 3 }}>
      <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
        Task Manager
      </Typography>
      
      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <TextField
          fullWidth
          variant="outlined"
          size="small"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task..."
          onKeyPress={(e) => e.key === 'Enter' && addTask()}
        />
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={addTask}
          disabled={!newTask.trim()}
        >
          Add
        </Button>
      </Box>

      <Tabs value={tabValue} onChange={(e, newValue) => setTabValue(newValue)} sx={{ mb: 2 }}>
        <Tab label="All" />
        <Tab label="Active" />
        <Tab label="Completed" />
      </Tabs>

      <List>
        {filteredTasks.length === 0 ? (
          <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 4 }}>
            {tabValue === 0 
              ? "No tasks yet. Add one above!" 
              : tabValue === 1 
                ? "All tasks completed! 🎉" 
                : "No completed tasks yet"}
          </Typography>
        ) : (
          filteredTasks.map((task) => (
            <ListItem
              key={task.id}
              sx={{
                bgcolor: task.done ? 'action.hover' : 'background.paper',
                borderRadius: 1,
                mb: 1,
                textDecoration: task.done ? 'line-through' : 'none',
              }}
            >
              <Checkbox
                checked={task.done}
                onChange={() => toggleTask(task.id)}
                color="primary"
              />
              <ListItemText
                primary={task.text}
                primaryTypographyProps={{
                  color: task.done ? 'text.secondary' : 'text.primary',
                }}
              />
              <ListItemSecondaryAction>
                <IconButton edge="end" onClick={() => deleteTask(task.id)}>
                  <Delete color="error" />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))
        )}
      </List>
    </Paper>
  );
}