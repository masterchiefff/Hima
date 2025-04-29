require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const claimRoutes = require('./routes/claimRoutes');
const rateLimiter = require('./middleware/rateLimiter');
const errorHandler = require('./utils/errorHandler');
const logger = require('./config/logger');

const app = express();

// Security and Middleware
app.use(helmet());
app.use(express.json());
app.use(rateLimiter);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api', paymentRoutes);
app.use('/api/claims', claimRoutes);

// Error Handling
app.use(errorHandler);

// Start Server
const PORT = process.env.PORT || 5000;
const startServer = async () => {
  try {
    await connectDB();
    const server = app.listen(PORT, () => { // Define server here
      logger.info(`Server running on port ${PORT} in ${process.env.NODE_ENV} mode`);
    });

    // Graceful Shutdown
    process.on('SIGTERM', () => {
      logger.info('SIGTERM received, shutting down gracefully');
      server.close(() => {
        process.exit(0);
      });
    });
  } catch (error) {
    logger.error('Server startup error:', error);
    process.exit(1);
  }
};

startServer();