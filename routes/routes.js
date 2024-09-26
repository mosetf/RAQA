const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const authController = require('../controllers/authentication/authController');
const userController = require('../controllers/userController');
const regController = require('../controllers/registration/regController');
const logger = require('../utils/logger');
const Quote = require('../models/Quote'); 
const authMiddleware = require('../middleware/authMiddleware');



// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

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
router.post('/login', authController.login);
router.post('/register', regController.register);
router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password', authController.resetPassword);



// Update user details route
router.post('/update-user', authMiddleware, upload.single('profilePicture'), userController.updateUserDetails);

module.exports = router;