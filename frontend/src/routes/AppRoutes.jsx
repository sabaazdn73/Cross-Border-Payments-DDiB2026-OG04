import { Routes, Route, useNavigate } from 'react-router-dom';
import Home from '../pages/Home';
import Landing from '../pages/Landing';
import SendMoney from '../pages/SendMoney';
import ReviewTransfer from '../pages/ReviewTransfer';
import Payment from '../pages/Payment';
import TransactionStatus from '../pages/TransactionStatus';
import TransactionReceipt from '../pages/TransactionReceipt';
import ComplianceVerification from '../pages/ComplianceVerification';
import TamperDemo from '../pages/TamperDemo';
import TrackTransaction from '../pages/TrackTransaction';
import NotFound from '../pages/NotFound';
import AppShell from '../components/app/AppShell';
import AppHome from '../pages/app/AppHome';
import AppTransfers from '../pages/app/AppTransfers';
import AppVerify from '../pages/app/AppVerify';
import AppProfile from '../pages/app/AppProfile';
import AppSendMoneyFlow from '../components/app/AppSendMoneyFlow';

function AppHomeRoute() {
  return <AppShell><AppHome /></AppShell>;
}
function AppTransfersRoute() {
  const navigate = useNavigate();
  return <AppShell title="Transfers" showBack onBack={() => navigate('/app')}><AppTransfers /></AppShell>;
}
function AppVerifyRoute() {
  const navigate = useNavigate();
  return <AppShell title="Verify" showBack onBack={() => navigate('/app')}><AppVerify /></AppShell>;
}
function AppProfileRoute() {
  const navigate = useNavigate();
  return <AppShell title="Profile" showBack onBack={() => navigate('/app')}><AppProfile /></AppShell>;
}
function AppSendRoute() {
  const navigate = useNavigate();
  return <AppShell title="Send money" showBack onBack={() => navigate('/app')}><AppSendMoneyFlow /></AppShell>;
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/landing" element={<Landing />} />
      <Route path="/app" element={<AppHomeRoute />} />
      <Route path="/app/transfers" element={<AppTransfersRoute />} />
      <Route path="/app/verify" element={<AppVerifyRoute />} />
      <Route path="/app/profile" element={<AppProfileRoute />} />
      <Route path="/app/send" element={<AppSendRoute />} />
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
