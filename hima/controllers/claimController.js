const User = require('../models/User');
const Claim = require('../models/Claim');
const logger = require('../config/logger');

class ClaimController {
  async createClaim(req, res) {
    const { description, amount } = req.body;
    const userId = req.userId;

    try {
      const user = await User.findById(userId);
      if (!user) return res.status(404).json({ message: 'User not found' });
      if (user.premium === 'none' || new Date() > user.premiumExpiry) {
        return res.status(403).json({ message: 'Active premium required to file a claim' });
      }

      const claim = new Claim({ userId, description, amount });
      await claim.save();

      logger.info(`Claim created: ${claim._id} by user ${userId}`);
      res.status(201).json({ claimId: claim._id, status: claim.status });
    } catch (error) {
      throw error;
    }
  }

  async getClaims(req, res) {
    const userId = req.userId;
    try {
      const claims = await Claim.find({ userId }).sort({ createdAt: -1 });
      res.json(claims);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new ClaimController();