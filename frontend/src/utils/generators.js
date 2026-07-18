export const generateTxnId = () => {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `TXN-${timestamp}-${random}`;
};

export const generateComplianceId = (txnId) => `CMP-${txnId}`;

export const generateHederaTxRef = () => {
  const accountId = `0.0.${Math.floor(Math.random() * 9000000 + 1000000)}`;
  const timestamp = Math.floor(Date.now() / 1000);
  const nanos = Math.floor(Math.random() * 999999999).toString().padStart(9, '0');
  return `${accountId}@${timestamp}.${nanos}`;
};

export const generateHederaTopicId = () =>
  `0.0.${Math.floor(Math.random() * 9000000 + 1000000)}`;

export const generateSequenceNumber = () =>
  Math.floor(Math.random() * 9000 + 1000).toString();

export const generateConsensusTimestamp = () =>
  new Date().toISOString().replace('Z', `${Math.floor(Math.random() * 999999999).toString().padStart(9, '0')}Z`);
