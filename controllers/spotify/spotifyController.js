const { getSpotifyAuthUrl, getSpotifyToken } = require('../../utils/spotifyAuth');
const { getRecommendations } = require('./spotifyService');

// Redirect user to Spotify login
const loginToSpotify = (req, res) => {
  const authUrl = getSpotifyAuthUrl();
  res.redirect(authUrl);
};

// Handle Spotify callback and get access token
const spotifyCallback = async (req, res) => {
  const { code } = req.query;

  try {
    const tokenData = await getSpotifyToken(code);
    res.json({ access_token: tokenData.access_token });
  } catch (error) {
    console.error('Error fetching token:', error);
    res.status(500).json({ error: 'Failed to get token' });
  }
};

// Fetch music recommendations based on mood
const getMusicByMood = async (req, res) => {
  const { mood, access_token } = req.query;

  try {
    const recommendations = await getRecommendations(mood, access_token);
    res.json(recommendations);
  } catch (error) {
    console.error('Error fetching recommendations:', error);
    res.status(500).json({ error: 'Failed to fetch music' });
  }
};

module.exports = { loginToSpotify, spotifyCallback, getMusicByMood };
