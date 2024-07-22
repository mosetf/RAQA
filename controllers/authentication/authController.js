const authService = require('./authService');
const logger = require('../../utils/logger');
const emailService = require('../../utils/mailer');
const crypto = require('crypto');

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

exports.forgotPassword = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await authService.findUserByEmail(email);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const token = crypto.randomBytes(20).toString('hex');
        await authService.savePasswordResetToken(user.id, token);

        const resetLink = `http://yourdomain.com/reset-password?token=${token}`;
        await emailService.sendPasswordResetEmail(email, resetLink);

        res.json({ message: 'Password reset email sent' });
    } catch (error) {
        logger.error('Forgot password failed: ' + error.message);
        res.status(500).json({ error: 'Forgot password failed' });
    }
};

exports.resetPassword = async (req, res) => {
    const { token, newPassword } = req.body;
    try {
        const userId = await authService.verifyPasswordResetToken(token);
        if (!userId) {
            return res.status(400).json({ error: 'Invalid or expired token' });
        }

        await authService.updatePassword(userId, newPassword);
        res.json({ message: 'Password reset successful' });
    } catch (error) {
        logger.error('Reset password failed: ' + error.message);
        res.status(500).json({ error: 'Reset password failed' });
    }
};