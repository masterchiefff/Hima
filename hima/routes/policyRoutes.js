const express = require('express');
const router = express.Router();
const policyController = require('../controllers/policyController');
const auth = require('../middleware/auth');

router.get('/', auth, policyController.getPolicies);

module.exports = router;