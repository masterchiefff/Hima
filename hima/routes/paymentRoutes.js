const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');
const auth = require('../middleware/auth');

router.post('/premium', auth, paymentController.buyPremium);
router.post('/mpesa/callback', paymentController.mpesaCallback);

module.exports = router;