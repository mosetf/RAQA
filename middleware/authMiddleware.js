const jwt = require('jsonwebtoken');
const User = require('../models/User');


const authMiddleware = async (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    console.log('Token:', token); // Log the token
  
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log('Decoded:', decoded); // Log the decoded token
  
      const user = await User.findById(decoded.id);
      if (!user) {
        return res.status(401).json({ error: 'User not found' });
      }
  
      req.user = user;
      next();
    } catch (error) {
      console.error('Error:', error); // Log the error
      res.status(401).json({ error: 'Invalid token' });
    }
  };
  
  module.exports = authMiddleware;