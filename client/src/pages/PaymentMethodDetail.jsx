import { useLocation } from 'react-router-dom';

import Card from '../components/Card';

import '../styles/PaymentMethodDetail.css';

const PaymentMethodDetail = () => {
    const { state } = useLocation();
    const { paymentMethod } = state || {};

    console.log(paymentMethod);
    

    return (
        <Card className="payment-method-detail-card">
            <h2>Payment Method Detail Page</h2>
        </Card>
    );
};

export default PaymentMethodDetail;