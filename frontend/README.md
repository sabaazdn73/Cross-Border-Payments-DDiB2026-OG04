# Borderless — Walletless Cross-Border Settlement

A complete, modern, responsive frontend application for cross-border payments powered by Hedera blockchain settlement — without requiring users to interact with a crypto wallet.

## 🌐 Live Demo Features

- Send money internationally with a normal payment form
- Blockchain settlement happens automatically behind the scenes
- Compliance records anchored on Hedera HCS (mock)
- Tamper detection via hash comparison
- Full transaction tracking and receipt generation

## 🛠 Technology Stack

- **React 18** + **Vite**
- **Tailwind CSS v3** (custom dark theme with glassmorphism)
- **React Router DOM v6**
- **React Hook Form** + **Zod** (form validation)
- **Lucide React** (icons)
- **Axios** (API service structure for future backend)
- **Vitest** + **React Testing Library** (tests)
- **LocalStorage** (demo persistence)

## 📋 Prerequisites

- Node.js 18+ and npm

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be available at **http://localhost:5173**

## 🧪 Running Tests

```bash
# Run all tests once
npm test

# Run tests in watch mode
npm run test:watch
```

## 📁 Project Structure

```
src/
├── assets/              # Static assets
├── components/
│   ├── layout/         # Navbar, MobileMenu, Footer
│   ├── transaction/    # TransferSummaryCard, TransactionStepper, etc.
│   └── ui/             # Reusable UI primitives
├── context/            # TransactionContext (shared form state)
├── data/               # Mock data: countries, currencies, rates, etc.
├── hooks/              # Custom React hooks
├── pages/              # All 10 application pages
├── routes/             # AppRoutes.jsx
├── services/           # API service layer (Axios)
├── tests/              # Vitest unit tests
└── utils/              # formatters, calculations, generators, hashUtils, storage
```

## 🗺 Application Routes

| Route | Page |
|-------|------|
| `/` | Home |
| `/send-money` | Send Money Form |
| `/review-transfer` | Review Transfer |
| `/payment` | Sandbox Payment |
| `/transaction/:id` | Transaction Status |
| `/transaction/:id/receipt` | Receipt |
| `/transaction/:id/verify` | Compliance Verification |
| `/tamper-demo` | Tamper Detection Demo |
| `/track` | Track Transaction |
| `*` | 404 Not Found |

## 💳 Test Payment Card

Use the following details in the Sandbox Payment page:

| Field | Value |
|-------|-------|
| Card Number | `4242 4242 4242 4242` |
| Expiry | `12/28` |
| CVV | `123` |

## 🔍 Demo Transaction

Track an existing demo transaction using ID: **`TXN-9KF3XQ2`**

## ⚠️ Disclaimer

This is a **sandbox demonstration only**. No real payments are processed. No real Hedera transactions are submitted. No real KYC/AML checks are performed. All blockchain references are mock data.

## 🏗 Future Backend Integration

The service layer in `src/services/api.js` is pre-structured with Axios for easy backend connection. Replace the mock implementations with real API calls when ready.
