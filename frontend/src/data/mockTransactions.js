export const mockTransactionRecords = [
  {
    id: 'TXN-9KF3XQ2',
    senderName: 'James Okafor',
    senderEmail: 'james@example.com',
    senderCountry: 'US',
    recipientName: 'Amara Diallo',
    recipientEmail: 'amara@example.com',
    recipientCountry: 'NG',
    amount: 500,
    currency: 'USD',
    receivingCurrency: 'NGN',
    recipientAmount: 790000,
    fee: 4.99,
    exchangeRate: 1580,
    payoutMethod: 'bank_transfer',
    purpose: 'Family Support',
    status: 'completed',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    completedAt: new Date(Date.now() - 80000000).toISOString(),
    estimatedDelivery: '1-2 business days',
    // Real Hedera testnet data, taken directly from this project's
    // own captured evidence (docs/reference/testnet-evidence.md),
    // which itself records the actual demo-modular.mjs run output --
    // not re-derived or guessed. This is the real compliance-anchor
    // transaction (sequence #2 on this project's topic), not a
    // placeholder.
    hederaTxRef: '0.0.8762554@1784361892.460950287',
    hederaTopicId: '0.0.9617780',
    hederaSequenceNumber: '2',
    hederaConsensusTimestamp: '2026-07-18T08:04:57.785443Z',
    hederaTransactionHash: 'sha256:4bbddf329febc65ad...(see docs/reference/testnet-evidence.md for the captured run)',
    hashscanUrl: 'https://hashscan.io/testnet/transaction/0.0.8762554@1784361892.460950287',
    complianceStatus: 'verified',
    settlementStatus: 'settled',
    payoutStatus: 'paid',
  },
];
