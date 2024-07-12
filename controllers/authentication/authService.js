const jwt = require('jsonwebtoken');
const User = require('../../models/User');

exports.login = async (user) => {
    const token = jwt.sign({ id: user.id }, 'your_jwt_secret', { expiresIn: '1h' });
    console.log('Logged in successfully');
    return { message: 'Logged in successfully', token };
};

exports.logout = (req) => {
    req.logout();
    return { message: 'Logged out successfully' };
};

exports.findUserByEmail = async (email) => {
    return await User.findOne({ email });
};