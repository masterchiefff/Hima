class PharosService {
    getExplorerLink(walletAddress) {
      return `https://pharosscan.xyz/address/${walletAddress}`;
    }
  }
  
  module.exports = new PharosService();