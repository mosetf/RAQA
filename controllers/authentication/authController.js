const authService = require('./authService');

exports.login = async (req, res) => {
    try {
        const user = req.user;
        const response = await authService.login(user);
        res.json(response);
    } catch (error) {
        res.status(500).json({ error: 'Login failed' });
    }
};

exports.logout = (req, res) => {
    try {
        const response = authService.logout(req);
        res.json(response);
    } catch (error) {
        res.status(500).json({ error: 'Logout failed' });
    }
};