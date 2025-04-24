import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Transactions from './pages/Transactions';
import TransactionDetail from './pages/TransactionDetail';
import Reports from './pages/Reports';
import PaymentMethods from './pages/PaymentMethods';
import NotFound from './pages/NotFound';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Transactions />} />
        <Route path="/new-transaction" element={<TransactionDetail />} />
        <Route path="/payment-methods" element={<PaymentMethods />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
