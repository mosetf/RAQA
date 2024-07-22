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

exports.savePasswordResetToken = async (userId, token) => {
    // Save the token in the database with an expiration time
    await User.updateOne({ _id: userId }, { resetPasswordToken: token, resetPasswordExpires: Date.now() + 3600000 }); // 1 hour
};

exports.verifyPasswordResetToken = async (token) => {
    const user = await User.findOne({ resetPasswordToken: token, resetPasswordExpires: { $gt: Date.now() } });
    return user ? user._id : null;
};

exports.updatePassword = async (userId, newPassword) => {
    const user = await User.findById(userId);
    user.password = newPassword; // Assume you hash the password before saving
    await user.save();
};