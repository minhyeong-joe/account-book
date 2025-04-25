import { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';

import './TransactionDetail.css';

const TransactionDetail = () => {
    const localDateTime = useMemo(() => {
        const now = new Date();
        return new Date(now.getTime() - now.getTimezoneOffset() * 60000);
    }, []);

    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const { transaction } = location.state || {};
    console.log(id);
    console.log(transaction);

    const [transactionType, setTransactionType] = useState('Income');
    const [dateTime, setDateTime] = useState(localDateTime.toISOString().slice(0, 16));
    const [paymentMethod, setPaymentMethod] = useState('');
    const [category, setCategory] = useState('');
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [currency, setCurrency] = useState('$');

    useEffect(() => {
        if (transaction) {
            setTransactionType(transaction.amount > 0 ? 'Income' : 'Expense');
            const dateTime = transaction.date + 'T' + transaction.time;
            setDateTime(dateTime || localDateTime.toISOString().slice(0, 16));
            setPaymentMethod(transaction.paymentMethod || '');
            setCategory(transaction.category || '');
            setAmount(Math.abs(transaction.amount) || '');
            setDescription(transaction.description || '');
        }
    }, [transaction, localDateTime]);

    const handleSave = () => {
        // Logic to save the transaction
        console.log({ transactionType, dateTime, paymentMethod, category, amount, description });
    };

    const handleCancel = () => {
        navigate(-1); // Navigate to the previous page
    };

    return (
        <div className="transaction-detail-page">
            <div className="header">
                <button 
                    className={`transaction-type-btn income-btn ${transactionType === 'Income' ? 'active' : ''}`} 
                    onClick={() => setTransactionType('Income')}
                >
                    Income
                </button>
                <button 
                    className={`transaction-type-btn expense-btn ${transactionType === 'Expense' ? 'active' : ''}`} 
                    onClick={() => setTransactionType('Expense')}
                >
                    Expense
                </button>
            </div>

            <div className="form">
                <label>
                    Date and Time:
                    <input 
                        type="datetime-local" 
                        value={dateTime} 
                        onChange={(e) => setDateTime(e.target.value)} 
                    />
                </label>

                <label>
                    Payment Method:
                    <select 
                        value={paymentMethod} 
                        onChange={(e) => setPaymentMethod(e.target.value)}
                    >
                        <option value="">Select Payment Method</option>
                        <option value="Visa">Visa...1234</option>
                        <option value="MasterCard">MasterCard...5678</option>
                    </select>
                </label>

                <label>
                    Category:
                    <select 
                        value={category} 
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option value="">Select Category</option>
                        <option value="Grocery">Grocery</option>
                        <option value="Entertainment">Entertainment</option>
                    </select>
                </label>

                <label>
                    Amount:
                    <div className="currency-input">
                        <span className="currency-symbol">{currency}</span>
                        <input 
                            type="number" 
                            value={amount} 
                            onChange={(e) => setAmount(e.target.value)} 
                        />
                    </div>
                </label>

                <label>
                    Description:
                    <textarea 
                        value={description} 
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </label>
            </div>

            <div className="footer">
                <button className="save-btn" onClick={handleSave}>Save</button>
                <button className="cancel-btn" onClick={handleCancel}>Cancel</button>
            </div>
        </div>
    );
};

export default TransactionDetail;