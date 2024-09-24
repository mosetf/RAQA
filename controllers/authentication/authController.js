const authService = require('./authService');
const validator = require('validator');
const logger = require('../../utils/logger');
const bcrypt = require('bcrypt');
const User = require('../../models/User');

exports.login = async (req, res) => {
    logger.info('Attempting to log in');
    
    const { email, password } = req.body;

    try {
        // Check if the user exists by email
        const user = await User.findOne({ email });
        if (!user) {
            logger.error('Invalid email or password');
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // Compare the provided password with the stored hashed password
        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            logger.error('Invalid email or password');
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // If email and password are valid, generate a JWT token
        const response = await authService.login(user);
        logger.info('Login successful');
        return res.json(response);
    } catch (error) {
        logger.error('Login failed: ' + error.message);
        return res.status(500).json({ error: 'Login failed' });
    }
};

/**
 * TO DO
 * Implement email verification during user registration process
 * 
 */

exports.forgotPassword = async (req, res) => {
    const { email } = req.body;
    if (!validator.isEmail(email)) {
      logger.error('Invalid email format: ' + email);
      return res.status(400).send({ error: 'Invalid email format' });
    }
    try {
      await authService.forgotPassword(email);
      res.status(200).send({ message: 'Password reset link sent' });
    } catch (error) {
      logger.error('Forgot password failed: ' + error.message);
      res.status(400).send({ error: error.message });
    }
  };
  
  exports.resetPassword = async (req, res) => {
    const { token, newPassword } = req.body;
    try {
      await authService.resetPassword(token, newPassword);
      res.json({ message: 'Password reset successful' });
    } catch (error) {
      logger.error('Reset password failed: ' + error.message);
      res.status(500).json({ error: 'Reset password failed' });
    }
  }
  