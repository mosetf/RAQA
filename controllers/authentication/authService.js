const jwt = require('jsonwebtoken');
const User = require('../../models/User');
const crypto = require('crypto');
const transporter = require('../../utils/mailer');
const logger = require('../../utils/logger');

exports.login = async (user) => {
    const token = jwt.sign({ id: user.id }, 'your_jwt_secret', { expiresIn: '1h' });
    logger.info('Logged in successfully');
    return { message: 'Logged in successfully', token };
};

exports.logout = (req) => {
    req.logout();
    logger.info('Logged out successfully');
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
    logger.info(`Password reset token saved for user: ${userId}`);
};

exports.verifyPasswordResetToken = async (token) => {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });
    if (user) {
        logger.info(`Password reset token verified for user: ${user._id}`);
    } else {
        logger.warn(`Invalid or expired password reset token: ${token}`);
    }
    return user ? user._id : null;
};

exports.updatePassword = async (userId, newPassword) => {
  const user = await User.findById(userId);
  user.password = newPassword;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  await user.save();
  logger.info(`Password updated for user: ${userId}`);
};

exports.forgotPassword = async (email) => {
  const user = await this.findUserByEmail(email);
  if (!user) {
      logger.error('User not found for email: ' + email);
      throw new Error('User not found');
  }

  const token = crypto.randomBytes(20).toString('hex');
  await this.savePasswordResetToken(user._id, token);

  const resetLink = `${process.env.BASE_URL}/reset-password?token=${token}`;
  const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Password Reset',
      template: 'resetPassword',
      context: {
          name: user.name,
          resetLink: resetLink,
      },
  };

  await transporter.sendMail(mailOptions);
  logger.info(`Password reset email sent to: ${email}`);
};

exports.resetPassword = async (token, newPassword) => {
  const userId = await this.verifyPasswordResetToken(token);
  if (!userId) {
      logger.error('Invalid or expired token for password reset');
      throw new Error('Invalid or expired token');
  }

  await this.updatePassword(userId, newPassword);
  logger.info(`Password reset successfully for user: ${userId}`);
};