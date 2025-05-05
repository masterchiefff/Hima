const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const walletService = require('../services/walletService');
// const logger = require('../databases/logger');

class AuthController {
  async signup(req, res) {
    try {
      const { phoneNumber, email, fullName, password } = req.body;

      if (!phoneNumber || !email || !fullName || !password) {
        return res.status(400).json({ message: 'All fields are required' });
      }

      let user = await User.findOne({ phoneNumber });
      if (user) {
        return res.status(400).json({ message: 'User already exists' });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      let walletAddress, txHash;
      try {
        const walletResult = await walletService.createWallet(phoneNumber);
        walletAddress = walletResult.address;
        txHash = walletResult.txHash;
      } catch (walletError) {
        console.log(`Wallet creation error: ${walletError.message}`, walletError.stack);
        return res.status(500).json({ message: 'Failed to create wallet' });
      }

      user = new User({ phoneNumber, email, fullName, password: hashedPassword, walletAddress });
      await user.save();

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.status(201).json({ token, walletAddress, txHash });
    } catch (error) {
      console.log(`Signup error: ${error.message}`, error.stack);
      res.status(500).json({ message: 'Server error' });
    }
  }

  async login(req, res) {
    try {
      const { phoneNumber, password } = req.body;

      if (!phoneNumber || !password) {
        return res.status(400).json({ message: 'Phone number and password are required' });
      }

      const user = await User.findOne({ phoneNumber });
      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      console.log(`User ${user.fullName} logged in successfully`);

      
      res.json({ token, walletAddress: user.walletAddress });
    } catch (error) {
      console.log(`Login error: ${error.message}`, error.stack);
      res.status(500).json({ message: 'Server error' });
    }
  }

  async getUser(req, res) {
    try {
      console.log('Processing /api/auth/me request');
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) {
        console.log('No token provided for /api/auth/me');
        return res.status(401).json({ message: 'No token provided' });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log(`Decoded JWT for user ID: ${decoded.id}`);
      const user = await User.findById(decoded.id).select('fullName walletAddress');
      if (!user) {
        console.log(`User not found for ID: ${decoded.id}`);
        return res.status(404).json({ message: 'User not found' });
      }

      console.log(`Returning user data for ${user.fullName}`);
      res.json({ fullName: user.fullName, walletAddress: user.walletAddress });
    } catch (error) {
      console.log(`Get user error: ${error.message}`, error.stack);
      if (error.name === 'JsonWebTokenError') {
        return res.status(401).json({ message: 'Invalid token' });
      }
      res.status(500).json({ message: 'Server error' });
    }
  }
}

module.exports = new AuthController();