const regService = require('./regService');

exports.register = async (req, res) => {
    try {
        const response = await regService.registerUser(req.body);
        res.json(response);
    } catch (error) {
        res.status(500).json({ error: 'Registration failed' });
    }
};