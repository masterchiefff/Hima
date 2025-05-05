const axios = require('axios');
const logger = require('../databases/logger');

class EthConverter {
  async getEthPriceInKsh() {
    try {
      const response = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=kes,usd');
      return {
        ksh: response.data.ethereum.kes,
        usd: response.data.ethereum.usd,
      };
    } catch (error) {
      console.log('ETH price fetch error:', error);
      throw error;
    }
  }

  async convertKshToEth(amountInKsh) {
    const { ksh } = await this.getEthPriceInKsh();
    return amountInKsh / ksh;
  }
}

module.exports = new EthConverter();