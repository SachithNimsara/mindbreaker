import React, { useState } from 'react';
import {
  Box,
  TextField,
  Typography,
  Paper,
  Button,
  CircularProgress,
} from '@mui/material';
import SentimentIndicator from './SentimentIndicator';
import { Mood, MoodBad, SentimentNeutral } from '@mui/icons-material';

export default function Journal() {
  const [entry, setEntry] = useState('');
  const [sentiment, setSentiment] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [entries, setEntries] = useState([]);

  const analyzeSentiment = () => {
    setIsAnalyzing(true);
    // Simulate API call
    setTimeout(() => {
      let score = 0;
      const positiveWords = ['happy', 'good', 'great', 'excited', 'joy'];
      const negativeWords = ['sad', 'bad', 'angry', 'upset', 'stress'];
      
      positiveWords.forEach(word => {
        if (entry.toLowerCase().includes(word)) score += 1;
      });
      
      negativeWords.forEach(word => {
        if (entry.toLowerCase().includes(word)) score -= 1;
      });

      let result;
      if (score > 0) result = { type: 'positive', score };
      else if (score < 0) result = { type: 'negative', score };
      else result = { type: 'neutral', score };

      setSentiment(result);
      setIsAnalyzing(false);
    }, 1000);
  };

  const saveEntry = () => {
    if (!entry.trim()) return;
    const newEntry = {
      id: Date.now(),
      text: entry,
      date: new Date().toISOString(),
      sentiment,
    };
    setEntries([newEntry, ...entries]);
    setEntry('');
    setSentiment(null);
  };

  return (
    <Paper sx={{ p: 3, borderRadius: 3 }}>
      <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
        Daily Reflection
      </Typography>
      
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Write about your day. We'll analyze your mood and help you reflect.
      </Typography>

      <TextField
        fullWidth
        multiline
        rows={6}
        variant="outlined"
        value={entry}
        onChange={(e) => setEntry(e.target.value)}
        placeholder="How are you feeling today? What's on your mind?"
        sx={{ mb: 2 }}
      />

      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'space-between' }}>
        <Button
          variant="outlined"
          onClick={analyzeSentiment}
          disabled={!entry.trim() || isAnalyzing}
          startIcon={
            isAnalyzing ? <CircularProgress size={20} /> : 
            sentiment?.type === 'positive' ? <Mood color="success" /> :
            sentiment?.type === 'negative' ? <MoodBad color="error" /> :
            <SentimentNeutral color="warning" />
          }
        >
          {isAnalyzing ? 'Analyzing...' : 'Check Mood'}
        </Button>

        {sentiment && (
          <SentimentIndicator type={sentiment.type} score={sentiment.score} />
        )}

        <Button
          variant="contained"
          onClick={saveEntry}
          disabled={!entry.trim()}
        >
          Save Entry
        </Button>
      </Box>

      {entries.length > 0 && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Previous Entries
          </Typography>
          {entries.map((item) => (
            <Paper key={item.id} sx={{ p: 2, mb: 2, bgcolor: 'background.paper' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="caption" color="text.secondary">
                  {new Date(item.date).toLocaleDateString()}
                </Typography>
                <SentimentIndicator type={item.sentiment.type} score={item.sentiment.score} small />
              </Box>
              <Typography>{item.text}</Typography>
            </Paper>
          ))}
        </Box>
      )}
    </Paper>
  );
}