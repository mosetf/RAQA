const express = require('express');
const router = express.Router();
const authController = require('../controllers/authentication/authController');
const regController = require('../controllers/registration/regController');
const { sendPasswordResetEmail } = require('../utils/mailer');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const logger = require('../utils/logger');

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

router.use(express.json());

router.use((req, res, next) => {
    logger.info(`${req.method} ${req.url}`);
    next();
});

router.post('/login', authController.login);
router.post('/register', regController.register);

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
        logger.error(err.message);
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
        logger.error(err.message);
        res.status(500).send('Internal server error');
    }
});

module.exports = router;
