const { ethers } = require('ethers');
const logger = require('../config/logger');
const policyAbi = require('../abis/PolicyAndClaims.json');

class PolicyService {
  constructor() {
    this.provider = new ethers.JsonRpcProvider(process.env.PHAROS_RPC_URL);
    this.ownerWallet = new ethers.Wallet(process.env.PRIVATE_KEY, this.provider);
    this.contract = new ethers.Contract(process.env.POLICY_CONTRACT_ADDRESS, policyAbi, this.ownerWallet);
  }

  async purchasePolicy(walletAddress, policyType) {
    try {
      const typeMap = { daily: 1, weekly: 2, monthly: 3 };
      const policyEnum = typeMap[policyType];
      const price = await this.contract.policyPrices(policyEnum);
      const tx = await this.contract.purchasePolicy(policyEnum, { value: price, from: walletAddress });
      const receipt = await tx.wait();
      logger.info(`Policy purchased for ${walletAddress}: ${policyType}, Tx: ${tx.hash}`);
      return tx.hash;
    } catch (error) {
      logger.error('Policy purchase error:', error);
      throw error;
    }
  }

  async submitClaim(walletAddress, amountInEth, description) {
    try {
      const amount = ethers.parseEther(amountInEth.toString());
      const tx = await this.contract.submitClaim(amount, description, { from: walletAddress });
      const receipt = await tx.wait();
      logger.info(`Claim submitted for ${walletAddress}, Tx: ${tx.hash}`);
      return tx.hash;
    } catch (error) {
      logger.error('Claim submission error:', error);
      throw error;
    }
  }
}

module.exports = new PolicyService();