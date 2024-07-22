const express = require('express');
const renegotiationController = require('../controllers/renegotiationController');
const verifyToken = require('../middlewares/tokenMiddleware');

const router = express.Router();

router.get('/renegotiations', verifyToken, renegotiationController.getRenegotiations);

module.exports = router;
