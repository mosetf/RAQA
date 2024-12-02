import React, { useState } from 'react';
import { Box, TextField, Button, Typography, List, ListItem, ListItemText } from '@mui/material';

const MusicPlayer = () => {
  const [mood, setMood] = useState('');
  const [tracks, setTracks] = useState([]);
  const [playingTrack, setPlayingTrack] = useState(null);

  const fetchMusic = async () => {
    try {
      const response = await fetch(`/api/spotify/recommendations?mood=${mood}`);
      const data = await response.json();
      setTracks(data);
    } catch (error) {
      console.error('Error fetching music:', error);
    }
  };

  const playTrack = (track) => {
    setPlayingTrack(track);
  };

  const handleSpotifyAuth = () => {
    window.location.href = '/api/spotify/login';
  };

  return (
    <Box>
      <Typography variant="h4">Music Player</Typography>
      <TextField
        label="Enter Mood"
        variant="outlined"
        value={mood}
        onChange={(e) => setMood(e.target.value)}
      />
      <Button variant="contained" color="primary" onClick={fetchMusic}>
        Fetch Music
      </Button>
      <Button variant="contained" color="secondary" onClick={handleSpotifyAuth}>
        Connect to Spotify
      </Button>
      <List>
        {tracks.map((track) => (
          <ListItem button key={track.id} onClick={() => playTrack(track)}>
            <ListItemText primary={track.name} secondary={track.artists.map(artist => artist.name).join(', ')} />
          </ListItem>
        ))}
      </List>
      {playingTrack && (
        <Box>
          <Typography variant="h6">Now Playing: {playingTrack.name}</Typography>
          <audio controls src={playingTrack.preview_url} autoPlay />
        </Box>
      )}
    </Box>
  );
};

export default MusicPlayer;