require('dotenv').config();
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const passport = require('passport');
const { sendPasswordResetEmail } = require('../utils/mailer');

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

router.use(express.json());

router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).send('Please fill in all fields');
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send('Email already in use');
    }

    const hashedPassword = await bcrypt.hash(password, 7);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    res.status(201).send('Registration successful!');
  } catch (err) {
    res.status(500).send('Internal server error');
  }
});

router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return res.status(500).json({ success: false, message: 'Internal server error' });
    }
    if (!user) {
      return res.status(401).json({ success: false, message: info.message });
    }
    req.logIn(user, (err) => {
      if (err) {
        return res.status(500).json({ success: false, message: 'Internal server error' });
      }
      const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });
      res.status(200).json({ success: true, token, user: { id: user._id, username: user.username, email: user.email } });
    });
  })(req, res, next);
});

router.post('/forgot_password', async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send('No account with that email found');
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
    const resetLink = `http://localhost:3000/reset_password.html?token=${token}`;

    await sendPasswordResetEmail(user.email, resetLink);

    res.send('Password reset link sent to your email');
  } catch (err) {
    res.status(500).send('Internal server error');
  }
});

router.post('/reset_password', async (req, res) => {
  const { password, confirmPassword, token } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).send('Passwords do not match');
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(400).send('Invalid token');
    }

    const hashedPassword = await bcrypt.hash(password, 7);
    user.password = hashedPassword;
    await user.save();

    res.send('Password has been reset successfully');
  } catch (err) {
    res.status(500).send('Internal server error');
  }
});

module.exports = router;
