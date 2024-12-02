const express = require('express');
const { loginToSpotify, spotifyCallback, getMusicByMood } = require('../controllers/spotify/spotifyController');

const router = express.Router();

// Spotify Authentication Routes
router.get('/login', loginToSpotify);
router.get('/callback', spotifyCallback);

// Fetch Music Recommendations Route
router.get('/recommendations', getMusicByMood);

module.exports = router;
