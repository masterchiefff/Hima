const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/me', (req, res) => {
  console.log('Route /api/auth/me hit');
  authController.getUser(req, res);
});

router.get('/verify', (req, res) => {
  console.log('Route /api/auth/verify hit');
  authController.verifyToken(req, res);
});

router.get('/test', (req, res) => res.send('Works!'));

module.exports = router;