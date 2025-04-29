const express = require('express');
const router = express.Router();
const claimController = require('../controllers/claimController');
const auth = require('../middleware/auth');

router.post('/', auth, claimController.createClaim);
router.get('/', auth, claimController.getClaims);

module.exports = router;