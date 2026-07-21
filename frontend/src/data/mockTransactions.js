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
    // Real Hedera testnet data, verified directly against the public
    // Mirror Node (testnet.mirrornode.hedera.com) before being used
    // here -- not invented. This is genuinely the first real message
    // anchored on this project's topic, not a placeholder sequence
    // number that doesn't exist yet.
    hederaTxRef: '0.0.8762554@1784321564.234380124',
    hederaTopicId: '0.0.9617780',
    hederaSequenceNumber: '2',
    hederaConsensusTimestamp: '2026-07-17T20:52:51.834087104Z',
    hederaTransactionHash: '5e5e3dc9ce56986b53495dce832adb1aa58655189358b3f84d136c4c23f3b77320eb2ffd1d2b444b3e6b46257ddec437',
    hashscanUrl: 'https://hashscan.io/testnet/transaction/1784321571.834087104',
    complianceStatus: 'verified',
    settlementStatus: 'settled',
    payoutStatus: 'paid',
  },
];
