require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const connectDB = require('./databases/db');
const authRoutes = require('./routes/authRoutes');
const cors = require('cors');
const paymentRoutes = require('./routes/paymentRoutes');
const claimRoutes = require('./routes/claimRoutes');
// const rateLimiter = require('./middleware/rateLimiter');
const errorHandler = require('./utils/errorHandler');
const logger = require('./databases/logger');

const app = express();

//connect to db
connectDB()


console.log(authRoutes)

// Log all incoming requests
app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.originalUrl}`);
  next();
});

app.use(cors({
  origin: (origin, callback) => {
    const allowedOrigins = [
      'http://localhost:3000',
      'https://hima-omega.vercel.app',
      'https://new-web-app.com'
    ];
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use(helmet());
app.use(express.json());
// app.use(rateLimiter);

// Routes
console.log('Registering routes...');
app.use('/api/auth', authRoutes);
app.use('/api', paymentRoutes);
app.use('/api/claims', claimRoutes);

// Test route
app.get('/api/auth/test', (req, res) => {
  console.log('Test route /api/auth/test hit');
  res.json({ message: 'Auth test route working' });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Error Handling
app.use(errorHandler);

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} in ${process.env.NODE_ENV} mode`); });

// const startServer = async () => {
//   try {
//     await connectDB();
//     const server = app.listen(PORT, () => {
//       console.log(`Server running on port ${PORT} in ${process.env.NODE_ENV} mode`);
//     });

//     process.on('SIGTERM', () => {
//       console.log('SIGTERM received, shutting down gracefully');
//       server.close(() => {
//         process.exit(0);
//       });
//     });
//   } catch (error) {
//     console.log('Server startup error:', error);
//     process.exit(1);
//   }
// };

// startServer();