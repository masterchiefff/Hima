// const rateLimit = require('express-rate-limit');
// const logger = require('../config/logger');

// const limiter = rateLimit({
//   windowMs: process.env.RATE_LIMIT_WINDOW_MS || 15 * 60 * 1000, // 15 minutes
//   max: process.env.RATE_LIMIT_MAX || 100, // Limit each IP to 100 requests per window
//   message: 'Too many requests from this IP, please try again later.',
//   onLimitReached: (req) => {
//     console.log(`Rate limit reached for IP: ${req.ip}`);
//   },
// });

// module.exports = limiter;