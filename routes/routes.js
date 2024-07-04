const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const User = require('../models/User');

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret'; // Use a secure and unique value for your application

router.use(express.json());

// Add email configuration for nodemailer
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL, // Replace with your email
    pass: process.env.EMAIL_PASSWORD, // Replace with your email password
  },
});

// Registration Route
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  console.log('Received registration data:', req.body);

  if (!username || !email || !password) {
    return res.status(400).send('Please fill in all fields');
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('Email already in use:', email);
      return res.status(400).send('Email already in use');
    }

    const hashedPassword = await bcrypt.hash(password, 7);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    console.log('New user registered:', newUser);
    res.status(201).send('Registration successful!');
  } catch (err) {
    console.error('Error during registration:', err);
    res.status(500).send('Internal server error');
  }
});

// Login Route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  console.log('Login attempt with email:', email);

  try {
    const user = await User.findOne({ email });
    if (!user) {
      console.log('User not found for email:', email);
      return res.status(401).json({ success: false, message: 'Invalid email' });
    }

    console.log('Stored Hashed Password for user:', user.password);
    const isMatch = await bcrypt.compare(password, user.password);
    console.log('Password Match result for email:', email, 'is', isMatch);

    if (!isMatch) {
      console.log('Password mismatch for email:', email);
      return res.status(401).json({ success: false, message: 'Incorrect password' });
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ success: true, token, user: { id: user._id, username: user.username, email: user.email } });
  } catch (err) {
    console.error('Error during login attempt for email:', email, err);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// Forgot Password Route
router.post('/forgot_password', async (req, res) => {
  const { email } = req.body;
  console.log('Password reset request for email:', email);

  try {
    const user = await User.findOne({ email });
    if (!user) {
      console.log('No account with that email found:', email);
      return res.status(400).send('No account with that email found');
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
    const resetLink = `http://localhost:3000/reset_password.html?token=${token}`;

    await transporter.sendMail({
      to: user.email,
      from: 'no-reply@quotegenerator.com',
      subject: 'Password Reset',
      html: `<p>You requested a password reset</p><p>Click this <a href="${resetLink}">link</a> to reset your password</p>`,
    });

    console.log('Password reset link sent to email:', email);
    res.send('Password reset link sent to your email');
  } catch (err) {
    console.error('Error during password reset request for email:', email, err);
    res.status(500).send('Internal server error');
  }
});

// Reset Password Route
router.post('/reset_password', async (req, res) => {
  const { password, confirmPassword, token } = req.body;
  console.log('Password reset attempt with token:', token);

  if (password !== confirmPassword) {
    console.log('Passwords do not match');
    return res.status(400).send('Passwords do not match');
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.userId);
    if (!user) {
      console.log('Invalid token');
      return res.status(400).send('Invalid token');
    }

    const hashedPassword = await bcrypt.hash(password, 7);
    user.password = hashedPassword;
    await user.save();

    console.log('Password has been reset successfully for user:', user.email);
    res.send('Password has been reset successfully');
  } catch (err) {
    console.error('Error during password reset for token:', token, err);
    res.status(500).send('Internal server error');
  }
});

module.exports = router;
