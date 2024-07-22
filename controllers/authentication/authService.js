const jwt = require('jsonwebtoken');
const User = require('../../models/User');
const crypto = require('crypto');
const { sendPasswordResetEmail } = require('../utils/mailer');

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
    await User.updateOne(
      { _id: userId },
      {
        resetPasswordToken: token,
        resetPasswordExpires: Date.now() + 3600000, // 1 hour
      }
    );
  };
  
  exports.verifyPasswordResetToken = async (token) => {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });
    return user ? user._id : null;
  };
  
  exports.updatePassword = async (userId, newPassword) => {
    const user = await User.findById(userId);
    user.password = newPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();
  };

  exports.forgotPassword = async (email) => {
    const user = await this.findUserByEmail(email);
    if (!user) {
      throw new Error('User not found');
    }
  
    const token = crypto.randomBytes(20).toString('hex');
    await this.savePasswordResetToken(user._id, token);
  
    const resetLink = `http://yourdomain.com/reset-password?token=${token}`;
    await sendPasswordResetEmail(email, resetLink);
  };
  
  exports.resetPassword = async (token, newPassword) => {
    const userId = await this.verifyPasswordResetToken(token);
    if (!userId) {
      throw new Error('Invalid or expired token');
    }
  
    await this.updatePassword(userId, newPassword);
  };