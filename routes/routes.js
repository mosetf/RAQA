const express = require('express');
const router = express.Router();
const authController = require('../controllers/authentication/authController');
const regController = require('../controllers/registration/regController');
const logger = require('../utils/logger');
const passport = require('../config/passport');
const Quote = require('../models/Quote'); 


// Middleware to parse JSON bodies
router.use(express.json());

// Middleware to log requests
router.use((req, res, next) => {
    logger.info(`${req.method} ${req.url}`);
    next();
});

// Quotes endpoint
router.get('/quotes', async (req, res) => {
    try {
      const quotes = await Quote.find();
      res.status(200).send(quotes);
    } catch (error) {
      res.status(500).send({ error: 'Error fetching quotes' });
    }
  });

// Authentication routes
router.post('/login', passport.authenticate('local', { failureRedirect: '/login' }), authController.login);
router.post('/register', regController.register);
router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password', authController.resetPassword);

module.exports = router;