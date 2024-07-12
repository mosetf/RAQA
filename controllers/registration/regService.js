const User = require('../../models/User');

exports.registerUser = async (userData) => {
    const user = new User(userData);
    await user.save();
    console.log('Registration successful' );
    return { message: 'Registration successful' };
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