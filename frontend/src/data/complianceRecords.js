export const generateComplianceRecord = (transaction) => ({
  recordId: `CMP-${transaction.id}`,
  transactionId: transaction.id,
  senderName: transaction.senderName,
  senderEmail: transaction.senderEmail,
  senderCountry: transaction.senderCountry,
  recipientName: transaction.recipientName,
  recipientCountry: transaction.recipientCountry,
  amount: transaction.amount,
  currency: transaction.currency,
  purpose: transaction.purpose || 'Family Support',
  kycStatus: 'VERIFIED',
  amlStatus: 'CLEARED',
  sanctionsCheck: 'PASSED',
  riskScore: 'LOW',
  reviewedAt: transaction.createdAt,
  reviewedBy: 'AUTOMATED_SYSTEM',
});

export const mockHederaRefs = {
  topicId: '0.0.9617780',
  sequenceNumber: '1',
  consensusTimestamp: '2026-07-17T20:52:51.834087104Z',
  mirrorNodeUrl: 'https://testnet.mirrornode.hedera.com',
  explorerUrl: 'https://hashscan.io/testnet',
  transactionUrl: 'https://hashscan.io/testnet/transaction/1784321571.834087104',
};
