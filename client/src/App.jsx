import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PaymentMethodTypesProvider } from './contexts/PaymentMethodTypesContext';
import Transactions from './pages/Transactions';
import TransactionDetail from './pages/TransactionDetail';
import Reports from './pages/Reports';
import PaymentMethods from './pages/PaymentMethods';
import PaymentMethodDetail from './pages/PaymentMethodDetail';
import Categories from './pages/Categories';
import NotFound from './pages/NotFound';
import { Navbar } from './components';

function App() {
  return (
    <PaymentMethodTypesProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Transactions />} />
          <Route path="/new-transaction" element={<TransactionDetail />} />
          <Route path="/transaction/:id" element={<TransactionDetail />} />
          <Route path="/payment-methods" element={<PaymentMethods />} />
          <Route path="/payment-method/:id" element={<PaymentMethodDetail />} />
          <Route path="/payment-method/new" element={<PaymentMethodDetail />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </PaymentMethodTypesProvider>
  );
}

export default App;
