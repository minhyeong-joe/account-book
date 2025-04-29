import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Transactions from './pages/Transactions';
import TransactionDetail from './pages/TransactionDetail';
import Reports from './pages/Reports';
import PaymentMethods from './pages/PaymentMethods';
import PaymentMethodDetail from './pages/PaymentMethodDetail';
import NotFound from './pages/NotFound';
import { Navbar } from './components';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Transactions />} />
        <Route path="/new-transaction" element={<TransactionDetail />} />
        <Route path="/transaction/:id" element={<TransactionDetail />} />
        <Route path="/payment-methods" element={<PaymentMethods />} />
        <Route path="/payment-method/:id" element={<PaymentMethodDetail />} />
        <Route path="/payment-method/new" element={<PaymentMethodDetail />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
