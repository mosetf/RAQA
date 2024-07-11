const express = require('express');
const regController = require('./regController');
const router = express.Router();

router.post('/register', regController.register);

module.exports = router;