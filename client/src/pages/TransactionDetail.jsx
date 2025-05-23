import { useState, useMemo, useEffect, useCallback } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useFlash } from '../contexts/FlashContext';

import { Card, TransactionTypeBtnGroup } from '../components';
import { getPaymentMethodName, toDatetimeLocal } from '../lib/utils';
import { getPaymentMethods } from '../apis/paymentMethods';
import { getCategories } from '../apis/category';
import { createTransaction, updateTransaction, getTransactionById } from '../apis/transaction';

import '../styles/Form.css';
import '../styles/TransactionDetail.css';


const TransactionDetail = () => {
    const { id:transactionId } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const { transaction:stateTransaction } = location.state || {};
    const { showFlash } = useFlash();

    const [transaction, setTransaction] = useState(stateTransaction);
    
    const localDateTime = useMemo(() => {
        const now = new Date();
        return new Date(now.getTime() - now.getTimezoneOffset() * 60000);
    }, []);
    const defaultDateTime = localDateTime.toISOString().slice(0, 16);
    
    const [transactionType, setTransactionType] = useState(transaction?.transactionType || 'income');
    const [paymentMethods, setPaymentMethods] = useState([]);
    const [allCategories, setAllCategories] = useState([]);
    const [categories, setCategories] = useState([]);

    const getFormDefaultValues = useCallback(() => ({
        datetime: toDatetimeLocal(transaction?.datetime) || defaultDateTime,
        paymentMethod: transaction?.paymentMethod || '',
        category: transaction?.category || '',
        amount: transaction?.amount || '',
        description: transaction?.description || '',
    }), [transaction, defaultDateTime]);

    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        defaultValues: getFormDefaultValues(),
    });

    // Fetch payment methods and categories on mount
    useEffect(() => {
        // fetch transaction on edit if transaction is undefined (ie. through manual URL entry)
        if (transactionId && !transaction) {
            const fetchTransaction = async () => {
                try {
                    const transactionData = await getTransactionById(transactionId);
                    setTransaction(transactionData);
                    setTransactionType(transactionData.transactionType)
                } catch (error) {
                    showFlash(error.message || 'Error fetching transaction', 'error');
                    return;
                }
            };
            fetchTransaction();
        }
        const fetchData = async () => {
            try {
                const [methods, allCats] = await Promise.all([
                    getPaymentMethods(),
                    getCategories()
                ]);
                setPaymentMethods(methods);
                setAllCategories(allCats);
                // Filter categories by transaction type
                setCategories(allCats.filter(cat => cat.type === (transaction?.transactionType || 'income')));
            } catch (error) {
                showFlash(error.message || 'Error fetching data', 'error');
            }
        };
        fetchData();
    }, [transaction?.transactionType, showFlash, transactionId, transaction]);

    // filter categories and ensure removed category is included for existing transaction
    useEffect(() => {
        let filteredCategories = allCategories.filter(item => item.type === transactionType);
        // If editing a transaction and its category is missing, add it ONLY if transactionType matches
        if (
            transaction &&
            transaction.category &&
            transaction.transactionType === transactionType &&
            !filteredCategories.some(cat => cat.name === transaction.category)
        ) {
            filteredCategories = [
                { _id: 'removed', name: transaction.category, type: transactionType, removed: true },
                ...filteredCategories
            ];
        }
        setCategories(filteredCategories);
    }, [transactionType, allCategories, transaction]);
    
    // ensure removed payment method is included for existing transaction
    useEffect(() => {
        let methods = paymentMethods;
        if (
            transaction &&
            transaction.paymentMethod &&
            !paymentMethods.some(method => getPaymentMethodName(method) === transaction.paymentMethod)
        ) {
            methods = [
                { _id: 'removed', name: transaction.paymentMethod, removed: true },
                ...paymentMethods
            ];
        }
        setPaymentMethods(methods);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [paymentMethods.length, transaction]);

    useEffect(() => {
        if (transaction && paymentMethods.length > 0 && categories.length > 0) {
            reset(getFormDefaultValues());
        }
    }, [reset, paymentMethods, categories, getFormDefaultValues, transaction]);

    const onSubmit = async (formData) => {
        formData.transactionType = transactionType;
        formData.amount = Number(formData.amount);
        try {
            if (transaction) {
                // update existing transaction
                await updateTransaction(transaction._id, formData);
            } else {
                // create new transaction
                await createTransaction(formData);
            }
        } catch (error) {
            showFlash(error.message || 'Error saving transaction', 'error');
            return;
        }
        
        showFlash('Transaction saved successfully', 'success');
        navigate('/transactions');
    };

    const handleCancel = () => {
        navigate('/transactions');
    };

    return (
        <Card>
            <TransactionTypeBtnGroup
                type={transactionType}
                setType={setTransactionType}
            />
            <form className="form" onSubmit={handleSubmit(onSubmit)}>
                <label>
                    Date and Time:
                    <input 
                        type="datetime-local" 
                        {...register('datetime', { required: true })}
                        aria-invalid={errors.datetime ? 'true' : 'false'}
                        className={errors.datetime ? 'error' : ''}
                    />
                </label>
                {errors.datetime && <p role='alert' className='field-error-message'>Date and Time are required</p>}

                <label>
                    Payment Method:
                    <select 
                        {...register('paymentMethod', { required: true })}
                        aria-invalid={errors.paymentMethod ? 'true' : 'false'}
                        className={errors.paymentMethod ? 'error' : ''}
                    >
                        <option value="">Select Payment Method</option>
                        {paymentMethods.map(method => (
                            <option key={method._id} value={getPaymentMethodName(method)}>
                                {getPaymentMethodName(method)}{method.removed ? ' (removed)' : ''}
                            </option>
                        ))}
                    </select>
                </label>
                {errors.paymentMethodId && <p role='alert' className='field-error-message'>Payment Method is required</p>}

                <label>
                    Category:
                    <select 
                        {...register('category', { required: true })}
                        aria-invalid={errors.category ? 'true' : 'false'}
                        className={errors.category ? 'error' : ''}
                    >
                        <option value="">Select Category</option>
                        {categories.map(category => (
                            <option key={category._id} value={category.name}>
                                {category.name}{category.removed ? ' (removed)' : ''}
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

                <div className="form-footer">
                    <input className="save-btn" type="submit" value="Save"/>
                    <input className="cancel-btn" type="button" value="Cancel" onClick={handleCancel} />
                </div>
            </form>
        </Card>
    );
};

export default TransactionDetail;