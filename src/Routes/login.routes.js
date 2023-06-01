const express = require('express');
const router = express.Router();
const LoginController = require('../Controllers/login.controller.js');

router.post('/login',LoginController.login);
router.post('/verify',LoginController.tokenVerify,LoginController.verify);

module.exports = router;