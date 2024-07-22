const express = require('express');
const authController = require('../controllers/authController');
const verifyToken = require('../middlewares/tokenMiddleware');

const router = express.Router();

router.post('/auth', authController.login);
router.post('/register', authController.register);
router.post('/token', authController.getToken);

module.exports = router;
