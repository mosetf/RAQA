const axios = require('axios');
const querystring = require('querystring');

const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const redirect_uri = 'http://localhost:3000/api/spotify/callback'; // Adjust based on deployment

// Function to get Spotify authorization URL
const getSpotifyAuthUrl = () => {
  const scope = 'user-read-private user-read-email';
  return `https://accounts.spotify.com/authorize?${querystring.stringify({
    response_type: 'code',
    client_id: client_id,
    scope: scope,
    redirect_uri: redirect_uri,
  })}`;
};

// Function to get Spotify token using authorization code
const getSpotifyToken = async (code) => {
  const response = await axios.post(
    'https://accounts.spotify.com/api/token',
    querystring.stringify({
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: redirect_uri,
      client_id: client_id,
      client_secret: client_secret,
    })
  );
  return response.data;
};

module.exports = { getSpotifyAuthUrl, getSpotifyToken };
