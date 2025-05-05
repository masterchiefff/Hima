const { ethers } = require('ethers');
const Policy = require('../models/Policy');
const User = require('../models/User'); // Assumed User model
const logger = require('../databases/logger');

const contractABI = [
  "function purchasePolicy(uint8 policyType) external payable",
  "event PolicyPurchased(address indexed user, uint256 policyIndex, uint8 policyType)",
  "function getPolicies(address user) external view returns (tuple(bool active, uint256 lastClaimTimestamp, uint8 policyType)[])"
];

// Environment variables
const providerUrl = process.env.PHAROS_PROVIDER_URL; // Pharos Network RPC URL
const contractAddress = process.env.HIMA_INSURANCE_CONTRACT_ADDRESS;
const privateKey = process.env.SIGNER_PRIVATE_KEY; // Backend signer key

// Initialize ethers provider and signer
const provider = new ethers.JsonRpcProvider(providerUrl);
const wallet = new ethers.Wallet(privateKey, provider);
const contract = new ethers.Contract(contractAddress, contractABI, wallet);

class PolicyController {
  async createPolicy(req, res) {
    try {
      const { policyType } = req.body; // Expected: 'Accident', 'Theft', 'Medical'
      const userId = req.user.userId;

      // Validate policy type
      const policyTypeMap = {
        Accident: 0,
        Theft: 1,
        Medical: 2
      };
      if (!(policyType in policyTypeMap)) {
        return res.status(400).json({ message: 'Invalid policy type' });
      }
      const policyTypeEnum = policyTypeMap[policyType];

      // Fetch user address from User model
      const user = await User.findById(userId);
      if (!user || !user.address) {
        return res.status(400).json({ message: 'User address not found' });
      }
      const userAddress = user.address;

      // Determine policy details
      const policyDetails = {
        Accident: {
          cost: ethers.parseEther('0.05'), // 0.05 ether ≈ $0.50
          premiumAmount: 0.50, // USD equivalent for display
          title: 'HashGuard Accident Micro',
          type: 'rider',
          benefits: [
            { name: 'Accident Coverage', description: 'Covers medical expenses from accidents', coverageLimit: 5 } // $5 equivalent
          ]
        },
        Theft: {
          cost: ethers.parseEther('0.03'), // 0.03 ether ≈ $0.30
          premiumAmount: 0.30,
          title: 'HashGuard Theft Micro',
          type: 'motorcycle',
          benefits: [
            { name: 'Theft Coverage', description: 'Covers motorcycle theft', coverageLimit: 3 } // $3 equivalent
          ]
        },
        Medical: {
          cost: ethers.parseEther('0.07'), // 0.07 ether ≈ $0.70
          premiumAmount: 0.70,
          title: 'HashGuard Medical Micro',
          type: 'rider',
          benefits: [
            { name: 'Medical Coverage', description: 'Covers hospitalization and treatment', coverageLimit: 7 } // $7 equivalent
          ]
        }
      };
      const details = policyDetails[policyType];

      // Generate policy number (e.g., HG1234)
      const randomNum = Math.floor(1000 + Math.random() * 9000);
      const policyNo = `HG${randomNum}`;

      // Calculate due date (30 days from now)
      const dueDate = new Date();
      dueDate.setDate(dueDate.getDate() + 30);

      // Call purchasePolicy on the contract
      const tx = await contract.purchasePolicy(policyTypeEnum, {
        value: details.cost,
        gasLimit: 200000,
        from: userAddress // Ensure transaction is sent from user address
      });

      // Wait for transaction confirmation
      const receipt = await tx.wait();
      console.log(`Transaction confirmed: ${receipt.transactionHash}`);

      // Extract policy index from PolicyPurchased event
      const event = receipt.logs
        .map(log => contract.interface.parseLog(log))
        .find(e => e && e.name === 'PolicyPurchased');
      if (!event) {
        throw new Error('PolicyPurchased event not found');
      }
      const policyIndex = Number(event.args.policyIndex);

      // Save policy to database
      const newPolicy = new Policy({
        userId,
        title: details.title,
        policyNo,
        dueDate,
        type: details.type,
        premiumType: 'daily', // Micron insurance, daily payments
        premiumAmount: details.premiumAmount,
        benefits: details.benefits,
        status: 'active'
      });
      await newPolicy.save();

      res.status(201).json({ message: 'Policy created successfully', policy: newPolicy });
    } catch (error) {
      console.log(`Error creating policy: ${error.message}`, error.stack);
      res.status(500).json({ message: 'Server error' });
    }
  }

  async getPolicies(req, res) {
    try {
      const policies = await Policy.find({ userId: req.user.userId });
      res.json(policies);
    } catch (error) {
      console.log(`Error fetching policies: ${error.message}`, error.stack);
      res.status(500).json({ message: 'Server error' });
    }
  }
}

module.exports = new PolicyController();