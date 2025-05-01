ge# Hima Insurance Platform

A full-stack insurance platform with a Next.js frontend and Node.js backend.

## Project Structure

The project consists of two main components:

- `hima/` - Backend API server built with Node.js
- `hima-client/` - Frontend application built with Next.js

### Backend (hima/)

The backend provides REST APIs for:
- Authentication
- Policy Management 
- Claims Processing
- Payments

Key directories:
- `controllers/` - Request handlers
- `models/` - Database models
- `routes/` - API route definitions
- `services/` - Business logic
- `config/` - Configuration files
- `abis/` - Smart contract ABIs

### Frontend (hima-client/)

Modern web interface built with:
- Next.js 15
- React 19
- Tailwind CSS
- Radix UI Components

## Getting Started

### Running the Backend

```bash
cd hima
npm install
npm start
```

### Running the Frontend

```bash
cd hima-client
npm install
npm run dev
```

The frontend will be available at [http://localhost:3000](http://localhost:3000)

## Development

Backend API server runs on Node.js with Express framework.
Frontend is built using Next.js with TypeScript support.

## Environment Variables

Backend (.env):
- Database configuration
- JWT secrets
- API keys

Frontend (.env):
- API endpoint URLs
- Public keys

