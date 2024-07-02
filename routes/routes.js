const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');

router.use(express.json());

router.post('/register', async (req, res) => {
  console.log('Received data:', req.body);
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).send('Please fill in all fields');
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send('Email already in use');
    }
  } catch (err) {
    console.error(err);
    return res.status(500).send('Internal server error');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  console.log('Raw Password:', password);
  console.log('Hashed Password:', hashedPassword);

  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });

  try {
    await newUser.save();
    res.status(201).send('Registration successful!');
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal server error');
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  console.log('Login attempt with email:', email);
  console.log('Login password:', password);

  try {
    const user = await User.findOne({ email });
    if (!user) {
      console.log('User not found for email:', email);
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    console.log('Stored Hashed Password for user:', user.password);

    // Hash the login attempt password for logging purposes
    const hashedLoginPassword = await bcrypt.hash(password, 10);
    console.log('Hashed Login Password (for logging):', hashedLoginPassword);

    const isMatch = await bcrypt.compare(password, user.password);
    console.log('Password Match result for email:', email, 'is', isMatch);

    if (!isMatch) {
      console.log('Password mismatch for email:', email);
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    res.status(200).json({ success: true, message: 'Login successful' });
  } catch (err) {
    console.error('Error during login attempt for email:', email, err);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

module.exports = router;
