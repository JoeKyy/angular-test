const express = require('express');
const authController = require('../controllers/authController');
const verifyToken = require('../middlewares/tokenMiddleware');

const router = express.Router();

router.post('/auth', verifyToken, authController.login);
router.post('/register', verifyToken, authController.register);
router.post('/token', authController.getToken);

module.exports = router;
