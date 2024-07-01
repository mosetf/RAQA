const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');

router.use(express.json());

router.post('/register', async (req, res) => {
  console.log('Received data:', req.body);
  const { username, email, password } = req.body;

  // Basic validation
  if (!username || !email || !password) {
    return res.status(400).send('Please fill in all fields');
  }

  // Check for existing user
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send('Email already in use');
    }
  } catch (err) {
    console.error(err);
    return res.status(500).send('Internal server error');
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create new user
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
  console.log('Login attempt:', email); // Add this line for debugging

  // 1. Find user by email
  try {
    const user = await User.findOne({ email });
    if (!user) {
      console.log('User not found'); // Add this line for debugging
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    // 2. Compare password hashes
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log('Password mismatch'); // Add this line for debugging
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    // 3. Login successful (optional: generate session token)
    res.status(200).json({ success: true, message: 'Login successful' });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

module.exports = router;
