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
  topicId: '0.0.4891234',
  sequenceNumber: '847',
  consensusTimestamp: '2026-07-18T11:30:00.123456789Z',
  mirrorNodeUrl: 'https://mainnet-public.mirrornode.hedera.com',
  explorerUrl: 'https://hashscan.io',
};
