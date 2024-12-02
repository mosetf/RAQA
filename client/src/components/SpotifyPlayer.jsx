import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SpotifyPlayer = ({ mood }) => {
  const [tracks, setTracks] = useState([]);
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    const fetchAccessToken = async () => {
      try {
        const response = await axios.get('/api/spotify/login');
        setAccessToken(response.data.access_token);
      } catch (error) {
        console.error('Error fetching access token:', error);
      }
    };

    fetchAccessToken();
  }, []);

  useEffect(() => {
    if (accessToken && mood) {
      const fetchMusic = async () => {
        try {
          const response = await axios.get('/api/spotify/recommendations', {
            params: { mood, access_token: accessToken },
          });
          setTracks(response.data.tracks);
        } catch (error) {
          console.error('Error fetching music:', error);
        }
      };

      fetchMusic();
    }
  }, [accessToken, mood]);

  return (
    <div>
      <h2>Music for your mood: {mood}</h2>
      {tracks.length ? (
        tracks.map((track) => (
          <div key={track.id}>
            <p>{track.name} by {track.artists[0].name}</p>
            <audio controls src={track.preview_url}></audio>
          </div>
        ))
      ) : (
        <p>Loading music...</p>
      )}
    </div>
  );
};

export default SpotifyPlayer;
