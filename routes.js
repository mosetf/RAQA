const express = require('express');
const router = express.Router();

// Define a route for registration (replace with your actual logic)
router.post('/register', (req, res) => {
  // Implement your user registration logic here
  res.send('Registration route!');
});

// Export the router object to be used in server.js
module.exports = router;
