export const transactionProgressSteps = [
  {
    id: 'payment_received',
    title: 'Payment Received',
    description: 'Your fiat payment has been received and confirmed.',
    icon: 'CheckCircle',
    completedAt: null,
  },
  {
    id: 'compliance_check',
    title: 'Compliance Check Completed',
    description: 'KYC/AML screening passed. Compliance record anchored on Hedera HCS.',
    icon: 'ShieldCheck',
    completedAt: null,
  },
  {
    id: 'stablecoin_initiated',
    title: 'Stablecoin Settlement Initiated',
    description: 'Equivalent stablecoin value locked for settlement routing.',
    icon: 'Zap',
    completedAt: null,
  },
  {
    id: 'hedera_completed',
    title: 'Hedera Settlement Completed',
    description: 'Transaction finalized on the Hedera network. Immutable record created.',
    icon: 'Globe',
    completedAt: null,
  },
  {
    id: 'payout_processing',
    title: 'Local Payout Processing',
    description: 'Converting to local currency and initiating payout to recipient.',
    icon: 'ArrowRightLeft',
    completedAt: null,
  },
  {
    id: 'transfer_completed',
    title: 'Transfer Completed',
    description: 'Funds successfully delivered to recipient.',
    icon: 'PartyPopper',
    completedAt: null,
  },
];
