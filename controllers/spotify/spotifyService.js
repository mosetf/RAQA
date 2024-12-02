const axios = require('axios');

const getRecommendations = async (mood, accessToken) => {
  const response = await axios.get('https://api.spotify.com/v1/recommendations', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    params: {
      seed_genres: mood,
      limit: 10,
    },
  });

  return response.data;
};

module.exports = { getRecommendations };
