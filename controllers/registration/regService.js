const User = require('../../models/User');
const logger = require('../../utils/logger');

exports.registerUser = async (userData) => {
    try {
        const user = new User(userData);
        await user.save();
        logger.info('User saved successfully');
        return { message: 'Registration successful' };
    } catch (error) {
        logger.error('Error saving user: ' + error.message);
        throw new Error('Error saving user: ' + error.message);
    }
};

exports.findUserByEmail = async (email) => {
    return await User.findOne({ email });
};

exports.updateUserPassword = async (userId, newPassword) => {
    const user = await User.findById(userId);
    user.password = newPassword;
    await user.save();
    return { message: 'Password updated successfully' };
};
