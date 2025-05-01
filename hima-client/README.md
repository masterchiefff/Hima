# Hima Insurance Frontend

Modern web interface for the Hima Insurance platform built with Next.js.

## Tech Stack

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS
- Radix UI Components
- Ethers.js
- SWR for data fetching

## Project Structure

```
hima-client/
├── app/              # App router pages
├── components/       # Reusable UI components
├── contexts/        # React context providers
├── hooks/           # Custom React hooks
├── lib/             # Utility functions
├── public/          # Static assets
├── styles/          # Global styles
└── types/           # TypeScript declarations
```

## Prerequisites

- Node.js v18+
- npm or yarn
- Backend API server running

## Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_WALLET_CONNECT_ID=your_wallet_connect_id
NEXT_PUBLIC_CONTRACT_ADDRESS=your_contract_address
```

## Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Features

- Responsive dashboard
- Policy management interface
- Claims submission
- Payment integration
- Wallet connection
- Real-time notifications

## Component Library

Key reusable components:
- `Button` - Custom button components
- `Card` - Policy and claim cards
- `Form` - Form components with validation
- `Modal` - Popup dialogs
- `Navigation` - Header and sidebar
- `Wallet` - Crypto wallet integration

## State Management

- React Context for global state
- SWR for server state
- Local storage for persistence

## Testing

```bash
# Run unit tests
npm test

# Run e2e tests
npm run test:e2e
```

## Using the Application

### 1. Account Setup
1. Visit [http://localhost:3000](http://localhost:3000)
2. Click "Sign Up" to create a new account
3. Fill in required details:
   - Full name
   - Email address
   - Password
   - Phone number for M-Pesa integration
4. Verify your email address via the confirmation link

### 2. Connecting Your Wallet
1. Click "Connect Wallet" in the top navigation
2. Choose your preferred wallet (MetaMask, WalletConnect)
3. Follow the wallet prompts to connect
4. Your wallet address will appear in the header

### 3. Purchasing Insurance
1. Navigate to "Policies" section
2. Select your desired insurance type:
   - Health Insurance
   - Life Insurance
   - Property Insurance
3. Choose coverage amount and duration
4. Review policy details and premium amount
5. Click "Purchase Policy"
6. Complete payment via:
   - M-Pesa: Enter phone number and follow prompts
   - Crypto: Confirm transaction in your wallet

### 4. Managing Your Policies
1. View active policies in "My Policies" dashboard
2. Access policy details:
   - Coverage information
   - Premium payment schedule
   - Policy documents
3. Set up automatic premium payments
4. Enable policy notifications

### 5. Filing Claims
1. Go to "Claims" section
2. Click "New Claim"
3. Select affected policy
4. Fill claim details:
   - Incident date
   - Description
   - Supporting documents
5. Submit claim
6. Track claim status in claims dashboard

### 6. Account Management
1. Access "Settings" from profile menu
2. Update personal information
3. Manage payment methods
4. Set notification preferences
5. View transaction history

### 7. Getting Help
- Use "Live Chat" for immediate assistance
- Visit "Help Center" for guides and FAQs
- Contact support via:
  - Email: support@hima.com
  - Phone: +254 700 000000
  - In-app messaging

## Contributing

1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Open pull request

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build production bundle
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm test` - Run tests
- `npm run type-check` - Run TypeScript checks


