const regService = require('./regService');
const logger = require('../../utils/logger');

exports.register = async (req, res) => {
    logger.info('Attempting to register a new user');
    try {
        const response = await regService.registerUser(req.body);
        logger.info('Registration successful');
        res.json(response);
    } catch (error) {
        logger.error('Registration failed: ' + error.message);
        res.status(500).json({ error: 'Registration failed', message: error.message });
    }
};
