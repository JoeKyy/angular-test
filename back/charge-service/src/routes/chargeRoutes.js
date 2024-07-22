const express = require('express');
const chargeController = require('../controllers/chargeController');
const verifyToken = require('../middlewares/tokenMiddleware');

const router = express.Router();

router.get('/charges', verifyToken, chargeController.getCharges);

module.exports = router;
