const { ethers } = require('ethers');
const logger = require('../databases/logger');

class WalletService {
  constructor() {
    this.provider = new ethers.JsonRpcProvider(process.env.PHAROS_RPC_URL);
    this.ownerWallet = new ethers.Wallet(process.env.PRIVATE_KEY, this.provider);
  }

  async createWallet(phoneNumber, retries = 3) {
    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        const seed = ethers.keccak256(
          ethers.toUtf8Bytes(`${phoneNumber}${process.env.PRIVATE_KEY}`)
        );
        const derivedPrivateKey = ethers.keccak256(seed);
        const wallet = new ethers.Wallet(derivedPrivateKey, this.provider);

        const amountInEth = '0.1';
        const tx = await this.ownerWallet.sendTransaction({
          to: wallet.address,
          value: ethers.parseEther(amountInEth),
        });

        const receipt = await tx.wait();
        console.log(`Wallet created and funded: ${wallet.address}, Tx: ${tx.hash}`);
        return {
          address: wallet.address,
          txHash: tx.hash,
        };
      } catch (error) {
        console.log(`Attempt ${attempt} failed: ${error.message}`);
        if (attempt === retries) {
          throw new Error(`Failed to create wallet after ${retries} attempts: ${error.message}`);
        }
        await new Promise(resolve => setTimeout(resolve, 1000 * attempt)); // Exponential backoff
      }
    }
  }

  async fundWallet(walletAddress, amountInEth) {
    try {
      const tx = await this.ownerWallet.sendTransaction({
        to: walletAddress,
        value: ethers.parseEther(amountInEth.toString()),
      });
      const receipt = await tx.wait();
      console.log(`Wallet funded: ${walletAddress}, Amount: ${amountInEth} ETH, Tx: ${tx.hash}`);
      return tx.hash;
    } catch (error) {
      console.log('Wallet funding error:', error);
      throw error;
    }
  }

  getWalletDetails(phoneNumber) {
    const seed = ethers.keccak256(
      ethers.toUtf8Bytes(`${phoneNumber}${process.env.PRIVATE_KEY}`)
    );
    const derivedPrivateKey = ethers.keccak256(seed);
    const wallet = new ethers.Wallet(derivedPrivateKey);
    return {
      address: wallet.address,
      privateKey: wallet.privateKey,
    };
  }
}

module.exports = new WalletService();