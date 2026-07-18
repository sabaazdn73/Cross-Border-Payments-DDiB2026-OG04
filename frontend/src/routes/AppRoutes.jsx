import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import SendMoney from '../pages/SendMoney';
import ReviewTransfer from '../pages/ReviewTransfer';
import Payment from '../pages/Payment';
import TransactionStatus from '../pages/TransactionStatus';
import TransactionReceipt from '../pages/TransactionReceipt';
import ComplianceVerification from '../pages/ComplianceVerification';
import TamperDemo from '../pages/TamperDemo';
import TrackTransaction from '../pages/TrackTransaction';
import NotFound from '../pages/NotFound';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/send-money" element={<SendMoney />} />
      <Route path="/review-transfer" element={<ReviewTransfer />} />
      <Route path="/payment" element={<Payment />} />
      <Route path="/transaction/:id" element={<TransactionStatus />} />
      <Route path="/transaction/:id/receipt" element={<TransactionReceipt />} />
      <Route path="/transaction/:id/verify" element={<ComplianceVerification />} />
      <Route path="/tamper-demo" element={<TamperDemo />} />
      <Route path="/track" element={<TrackTransaction />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
