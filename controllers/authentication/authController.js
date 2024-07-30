const authService = require('./authService');
const logger = require('../../utils/logger');

exports.login = async (req, res) => {
    logger.info('Attempting to log in');
    try {
        const user = req.user;
        if (!user) {
            logger.error('Invalid email or password');
            return res.status(401).json({ error: 'Invalid email or password' });
        }
        const response = await authService.login(user);
        logger.info('Login successful');
        res.json(response);
    } catch (error) {
        logger.error('Login failed: ' + error.message);
        res.status(500).json({ error: 'Login failed' });
    }
};

/**
 * TO DO
 * Implement email verification during user registration process
 * 
 */

exports.forgotPassword = async (req, res) => {
    const { email } = req.body;
    try {
      await authService.forgotPassword(email);
      res.json({ message: 'Password reset email sent' });
    } catch (error) {
      logger.error('Forgot password failed: ' + error.message);
      res.status(500).json({ error: 'Forgot password failed' });
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
  