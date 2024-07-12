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
