const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const walletService = require('../services/walletService');
const logger = require('../config/logger');

class AuthController {
  async signup(req, res) {
    const { phoneNumber, email, fullName, password } = req.body;
    try {
      if (!phoneNumber || !email || !fullName || !password) {
        return res.status(400).json({ message: 'All fields are required' });
      }

      let user = await User.findOne({ phoneNumber });
      if (user) return res.status(400).json({ message: 'User already exists' });

      const { address: walletAddress, txHash } = await walletService.createWallet(phoneNumber);
      user = new User({ phoneNumber, email, fullName, password, walletAddress });
      await user.save();

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.status(201).json({ token, walletAddress, txHash });
    } catch (error) {
      logger.error('Signup error:', error);
      throw error;
    }
  }

  async login(req, res) {
    const { phoneNumber, password } = req.body;
    try {
      if (!phoneNumber || !password) {
        return res.status(400).json({ message: 'Phone number and password are required' });
      }

      const user = await User.findOne({ phoneNumber });
      if (!user) return res.status(401).json({ message: 'Invalid credentials' });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ token, walletAddress: user.walletAddress });
    } catch (error) {
      logger.error('Login error:', error);
      throw error;
    }
  }
}

module.exports = new AuthController();