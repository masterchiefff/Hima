# Hima Insurance Backend

Backend service for the Hima Insurance platform providing REST APIs for insurance policy management and payments.

## Features

- Authentication & Authorization
- Policy Management
- Claims Processing
- M-Pesa Integration
- Crypto Wallet Integration
- Logging & Error Handling

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Ethers.js
- Winston Logger
- JSON Web Tokens

## Project Structure

```
hima/
├── abis/              # Smart contract ABIs
├── config/            # Configuration files
├── controllers/       # Request handlers
├── middleware/        # Express middleware
├── models/           # MongoDB models
├── routes/           # API routes
├── services/         # Business logic
├── utils/            # Utility functions
└── logs/             # Application logs
```

## Prerequisites

- Node.js v16+
- MongoDB
- M-Pesa API credentials
- Ethereum node access (Pharos)

## Environment Variables

Create a `.env` file in the root directory:

```env
# Server
PORT=5000
NODE_ENV=development

# MongoDB
MONGO_URI=mongodb://localhost:27017
MONGO_DB_NAME=hima

# JWT
JWT_SECRET=your_jwt_secret

# Blockchain
PHAROS_RPC_URL=your_rpc_url
PRIVATE_KEY=your_private_key

# M-Pesa
MPESA_CONSUMER_KEY=your_consumer_key
MPESA_CONSUMER_SECRET=your_consumer_secret
MPESA_PASSKEY=your_passkey
MPESA_SHORTCODE=your_shortcode
```

## Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Start production server
npm start
```

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - User login

### Policies
- `GET /api/policies` - List user policies
- `POST /api/policies` - Create new policy

### Claims
- `POST /api/claims` - Submit new claim
- `GET /api/claims` - Get user claims

### Payments
- `POST /api/premium` - Initialize premium payment
- `POST /api/payments/callback` - M-Pesa callback

## Error Handling

Errors are logged using Winston logger:
- Error logs: `logs/error.log`
- Combined logs: `logs/combined.log`

## Security

- CORS enabled
- Helmet security headers
- Rate limiting
- JWT authentication
- Request validation

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request