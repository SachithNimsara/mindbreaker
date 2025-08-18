import React from 'react';
import {
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Checkbox,
  Typography,
} from '@mui/material';
import { Delete } from '@mui/icons-material';

export default function TaskCard({ task, onToggle, onDelete }) {
  return (
    <ListItem
      sx={{
        bgcolor: task.done ? 'action.hover' : 'background.paper',
        borderRadius: 1,
        mb: 1,
      }}
    >
      <Checkbox
        checked={task.done}
        onChange={() => onToggle(task.id)}
        color="primary"
      />
      <ListItemText
        primary={task.text}
        primaryTypographyProps={{
          color: task.done ? 'text.secondary' : 'text.primary',
          style: { textDecoration: task.done ? 'line-through' : 'none' },
        }}
        secondary={
          task.dueDate && (
            <Typography variant="caption" color="text.secondary">
              Due: {new Date(task.dueDate).toLocaleDateString()}
            </Typography>
          )
        }
      />
      <ListItemSecondaryAction>
        <IconButton edge="end" onClick={() => onDelete(task.id)}>
          <Delete color="error" />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
}