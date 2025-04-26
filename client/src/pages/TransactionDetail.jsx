import { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';

import { mockCategories, mockPaymentMethods } from '../lib/mockTransactions';

import './TransactionDetail.css';

const TransactionDetail = () => {
    const localDateTime = useMemo(() => {
        const now = new Date();
        return new Date(now.getTime() - now.getTimezoneOffset() * 60000);
    }, []);

    // const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const { transaction } = location.state || {};
    console.log(transaction);
    const defaultDateTime = transaction?.datetime || localDateTime.toISOString().slice(0, 16);
    
    const [transactionType, setTransactionType] = useState(transaction?.transactionType || 'income');
    const [dateTime, setDateTime] = useState(defaultDateTime);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(transaction?.paymentMethod.id || '');
    // const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(transaction?.category.id || '');
    const [amount, setAmount] = useState(transaction?.amount || '');
    const [description, setDescription] = useState(transaction?.description || '');
    
    // TODO: fetch payment methods and categories from API
    const paymentMethods = mockPaymentMethods;
    const categories = mockCategories.filter(category => category.type === transactionType);

    const handleSave = () => {
        // Logic to save the transaction
        console.log({ transactionType, dateTime, selectedPaymentMethod, selectedCategory, amount, description });
    };

    const handleCancel = () => {
        navigate(-1); // Navigate to the previous page
    };

    return (
        <div className="transaction-detail-page">
            <div className="header">
                <button 
                    className={`transaction-type-btn income-btn ${transactionType === 'income' ? 'active' : ''}`} 
                    onClick={() => setTransactionType('income')}
                >
                    Income
                </button>
                <button 
                    className={`transaction-type-btn expense-btn ${transactionType === 'expense' ? 'active' : ''}`} 
                    onClick={() => setTransactionType('expense')}
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
                        value={selectedPaymentMethod} 
                        onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                    >
                        <option value="">Select Payment Method</option>
                        {paymentMethods.map(method => (
                            <option key={method.id} value={method.id}>
                                {method.name}
                            </option>
                        ))}
                    </select>
                </label>

                <label>
                    Category:
                    <select 
                        value={selectedCategory} 
                        onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                        <option value="">Select Category</option>
                        {categories.map(category => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </label>

                <label>
                    Amount:
                    <div className="currency-input">
                        <span className="currency-symbol">$</span>
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