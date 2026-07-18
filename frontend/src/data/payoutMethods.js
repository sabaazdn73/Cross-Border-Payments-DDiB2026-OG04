export const payoutMethods = [
  {
    id: 'bank_transfer',
    label: 'Bank Transfer',
    description: 'Direct deposit to recipient bank account',
    icon: 'Building2',
    deliveryTime: '1-2 business days',
    fee: 0,
  },
  {
    id: 'mobile_money',
    label: 'Mobile Money',
    description: 'Send to M-Pesa, MTN, Airtel Money, etc.',
    icon: 'Smartphone',
    deliveryTime: 'Within minutes',
    fee: 0.5,
  },
  {
    id: 'cash_pickup',
    label: 'Cash Pickup',
    description: 'Recipient picks up cash at a local agent',
    icon: 'Banknote',
    deliveryTime: 'Same day',
    fee: 1.0,
  },
  {
    id: 'wallet',
    label: 'Digital Wallet',
    description: 'Deposit to a digital wallet (PayPal, etc.)',
    icon: 'Wallet',
    deliveryTime: 'Within hours',
    fee: 0.5,
  },
];

export const getPayoutMethodById = (id) => payoutMethods.find((m) => m.id === id);

export const transferPurposes = [
  'Family Support',
  'Education',
  'Business Payment',
  'Rent / Housing',
  'Medical Expenses',
  'Savings',
  'Investment',
  'Gift',
  'Other',
];
