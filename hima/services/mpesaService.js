const axios = require('axios');
const logger = require('../config/logger');

class MpesaService {
  async initiatePayment(phoneNumber, amount, premiumType) {
    const shortcode = process.env.MPESA_SHORTCODE; 
    const passkey = process.env.MPESA_PASSKEY; 
    const consumerKey = process.env.MPESA_CONSUMER_KEY;
    const consumerSecret = process.env.MPESA_CONSUMER_SECRET;
    const callbackUrl = process.env.MPESA_CALLBACK_URL; 

    // Generate OAuth token
    const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64');
    const { data } = await axios.get('https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials', {
      headers: { Authorization: `Basic ${auth}` },
    });
    const accessToken = data.access_token;

    // Generate timestamp and password
    const timestamp = new Date().toISOString().replace(/[-T:\.Z]/g, '').slice(0, 14);
    const password = Buffer.from(`${shortcode}${passkey}${timestamp}`).toString('base64');

    // Initiate STK Push
    const response = await axios.post(
      'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest',
      {
        BusinessShortCode: shortcode,
        Password: password,
        Timestamp: timestamp,
        TransactionType: 'CustomerPayBillOnline',
        Amount: amount,
        PartyA: phoneNumber, 
        PartyB: shortcode,
        PhoneNumber: phoneNumber,
        CallBackURL: callbackUrl,
        AccountReference: `premium-${premiumType}`,
        TransactionDesc: `Premium ${premiumType} purchase`,
      },
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );

    if (response.data.ResponseCode === '0') {
      logger.info(`STK Push initiated for ${phoneNumber}, premium: ${premiumType}`);
    } else {
      throw new Error(`STK Push failed: ${response.data.ResponseDescription}`);
    }
  }
}

module.exports = new MpesaService();