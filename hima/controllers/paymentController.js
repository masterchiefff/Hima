const User = require('../models/User');
const mpesaService = require('../services/mpesaService');
const walletService = require('../services/walletService');
const policyService = require('../services/policyService');
const ethConverter = require('../utils/ethConverter');
const pharosService = require('../services/pharosService');
const logger = require('../databases/logger');

class PaymentController {
  async buyPremium(req, res) {
    const { phoneNumber, premiumType } = req.body;
    const premiumPrices = { daily: 1, weekly: 300, monthly: 1000 }; // KSH
    const durations = { daily: 1, weekly: 7, monthly: 30 }; // Days
    const amountInKsh = premiumPrices[premiumType];

    if (!amountInKsh) return res.status(400).json({ message: 'Invalid premium type' });

    try {
      const user = await User.findOne({ phoneNumber });
      if (!user) return res.status(404).json({ message: 'User not found' });

      await mpesaService.initiatePayment(phoneNumber, amountInKsh, premiumType);
      res.json({ message: 'Payment initiated, check your phone for STK push' });
    } catch (error) {
      throw error;
    }
  }

  async mpesaCallback(req, res) {
    const { ResultCode, ResultDesc, CallbackMetadata } = req.body.Body.stkCallback;
    if (ResultCode !== 0) {
      console.log(`M-Pesa callback failed: ${ResultDesc}`);
      return res.status(200).send('Callback processed');
    }

    const amount = CallbackMetadata.Item.find(item => item.Name === 'Amount').Value;
    const phoneNumber = CallbackMetadata.Item.find(item => item.Name === 'PhoneNumber').Value;
    const premiumType = req.body.AccountReference?.split('-')[1] || 'unknown';

    try {
      const user = await User.findOne({ phoneNumber });
      if (!user) throw new Error('User not found in callback');

      const amountInEth = await ethConverter.convertKshToEth(amount);
      await walletService.fundWallet(user.walletAddress, amountInEth);

      // Purchase policy on-chain
      const txHash = await policyService.purchasePolicy(user.walletAddress, premiumType);

      const expiry = new Date();
      expiry.setDate(expiry.getDate() + (durations[premiumType] || 0));
      user.premium = premiumType;
      user.premiumExpiry = expiry;
      await user.save();

      console.log(`Premium purchased: ${phoneNumber}, Type: ${premiumType}, Tx: ${txHash}`);
    } catch (error) {
      console.log('M-Pesa callback processing error:', error);
    }
    res.status(200).send('Callback processed');
  }
}

module.exports = new PaymentController();