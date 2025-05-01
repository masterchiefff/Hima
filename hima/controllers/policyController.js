const Policy = require('../models/Policy');
const logger = require('../config/logger');

class PolicyController {
  async getPolicies(req, res) {
    try {
      const policies = await Policy.find({ userId: req.user.userId });
      res.json(policies);
    } catch (error) {
      logger.error(`Error fetching policies: ${error.message}`, error.stack);
      res.status(500).json({ message: 'Server error' });
    }
  }
}

module.exports = new PolicyController();