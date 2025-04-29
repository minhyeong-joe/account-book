import { useState, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { mockCategories, mockPaymentMethods } from '../lib/mockTransactions';

import '../styles/TransactionDetail.css';

const TransactionDetail = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { transaction } = location.state || {};
    
    const localDateTime = useMemo(() => {
        const now = new Date();
        return new Date(now.getTime() - now.getTimezoneOffset() * 60000);
    }, []);
    const defaultDateTime = transaction?.datetime || localDateTime.toISOString().slice(0, 16);

    const [transactionType, setTransactionType] = useState(transaction?.transactionType || 'income');
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            dateTime: defaultDateTime,
            paymentMethodId: transaction?.paymentMethod.id || '',
            categoryId: transaction?.category.id || '',
            amount: transaction?.amount || '',
            description: transaction?.description || '',
        },
    });
    
    // TODO: fetch payment methods and categories from API
    const paymentMethods = mockPaymentMethods;
    const categories = mockCategories.filter(category => category.type === transactionType);

    const onSubmit = (formData) => {
        // Logic to save the transaction
        formData.transactionType = transactionType;
        console.log("Form submitted with data:");
        console.log(formData);
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

            <form className="form" onSubmit={handleSubmit(onSubmit)}>
                <label>
                    Date and Time:
                    <input 
                        type="datetime-local" 
                        {...register('dateTime', { required: true })}
                        aria-invalid={errors.dateTime ? 'true' : 'false'}
                        className={errors.dateTime ? 'error' : ''}
                    />
                </label>
                {errors.dateTime && <p role='alert' className='field-error-message'>Date and Time are required</p>}

                <label>
                    Payment Method:
                    <select 
                        {...register('paymentMethodId', { required: true })}
                        aria-invalid={errors.paymentMethodId ? 'true' : 'false'}
                        className={errors.paymentMethodId ? 'error' : ''}
                    >
                        <option value="">Select Payment Method</option>
                        {paymentMethods.map(method => (
                            <option key={method.id} value={method.id}>
                                {method.name}
                            </option>
                        ))}
                    </select>
                </label>
                {errors.paymentMethodId && <p role='alert' className='field-error-message'>Payment Method is required</p>}

                <label>
                    Category:
                    <select 
                        {...register('categoryId', { required: true })}
                        aria-invalid={errors.categoryId ? 'true' : 'false'}
                        className={errors.categoryId ? 'error' : ''}
                    >
                        <option value="">Select Category</option>
                        {categories.map(category => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </label>
                {errors.categoryId && <p role='alert' className='field-error-message'>Category is required</p>}

                <label>
                    Amount:
                    <div className="currency-input">
                        <span className="currency-symbol">$</span>
                        <input 
                            type="number"
                            {...register('amount', { required: true, min: 0 })}
                            min="0"
                            step="0.01"
                            aria-invalid={errors.amount ? 'true' : 'false'}
                            className={errors.amount ? 'error' : ''}
                            placeholder="0.00"
                        />
                    </div>
                </label>
                {errors.amount && <p role='alert' className='field-error-message'>Amount is required and must be a positive number</p>}

                <label>
                    Description:
                    <textarea 
                        {...register('description', { required: true, maxLength: 100 })}
                        placeholder="Enter a description for the transaction"
                        maxLength="100"
                        aria-invalid={errors.description ? 'true' : 'false'}
                        className={errors.description ? 'error' : ''}
                    />
                </label>
                {errors.description && <p role='alert' className='field-error-message'>Description is required and must be less than 100 characters</p>}

                <div className="footer">
                    <input className="save-btn" type="submit" value="Save"/>
                    <input className="cancel-btn" type="button" value="Cancel" onClick={handleCancel} />
                </div>
            </form>

        </div>
    );
};

export default TransactionDetail;