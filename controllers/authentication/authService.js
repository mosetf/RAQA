const jwt = require('jsonwebtoken');
const User = require('../../models/User');
const crypto = require('crypto');
const { sendPasswordResetEmail } = require('../../utils/mailer');
const logger = require('../../utils/logger'); // Import the logger

exports.login = async (user) => {
    const token = jwt.sign({ id: user.id }, 'your_jwt_secret', { expiresIn: '1h' });
    logger.info('Logged in successfully'); // Use logger instead of console.log
    return { message: 'Logged in successfully', token };
};

exports.logout = (req) => {
    req.logout();
    logger.info('Logged out successfully'); // Use logger
    return { message: 'Logged out successfully' };
};

exports.findUserByEmail = async (email) => {
    const user = await User.findOne({ email });
    logger.info(`User found by email: ${email}`); // Log user found
    return user;
};

exports.savePasswordResetToken = async (userId, token) => {
    await User.updateOne(
      { _id: userId },
      {
        resetPasswordToken: token,
        resetPasswordExpires: Date.now() + 3600000, // 1 hour
      }
    );
    logger.info(`Password reset token saved for user: ${userId}`); // Log token saved
};

exports.verifyPasswordResetToken = async (token) => {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });
    if (user) {
        logger.info(`Password reset token verified for user: ${user._id}`); // Log token verified
    } else {
        logger.warn(`Invalid or expired password reset token: ${token}`); // Log invalid token
    }
    return user ? user._id : null;
};

exports.updatePassword = async (userId, newPassword) => {
    const user = await User.findById(userId);
    user.password = newPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();
    logger.info(`Password updated for user: ${userId}`); // Log password updated
};

exports.forgotPassword = async (email) => {
  const user = await this.findUserByEmail(email);
  if (!user) {
      logger.error('User not found for email: ' + email); // Log user not found
      throw new Error('User not found');
  }

  const token = crypto.randomBytes(20).toString('hex');
  await this.savePasswordResetToken(user._id, token);

  const resetLink = `${process.env.BASE_URL}/reset-password?token=${token}`;
  await sendPasswordResetEmail(email, resetLink);
  logger.info(`Password reset email sent to: ${email}`);
};

exports.resetPassword = async (token, newPassword) => {
    const userId = await this.verifyPasswordResetToken(token);
    if (!userId) {
      logger.error('Invalid or expired token for password reset'); // Log invalid token
      throw new Error('Invalid or expired token');
    }
  
    await this.updatePassword(userId, newPassword);
    logger.info(`Password reset successfully for user: ${userId}`); // Log password reset
};