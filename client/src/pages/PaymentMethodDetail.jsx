import { useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';

import Card from '../components/Card';

import '../styles/Form.css';
import '../styles/PaymentMethodDetail.css';

import { mockPaymentTypes } from '../lib/mockTransactions';

const PaymentMethodDetail = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const { paymentMethod } = state || {};
    console.log(paymentMethod);
    const { register, handleSubmit, formState: { errors }, watch, setValue, getValues } = useForm({
        defaultValues: {
            name: paymentMethod?.name || '',
            typeId: paymentMethod?.type?.id || '',
            fullNumber: paymentMethod?.fullNumber || ''
        }
    });

    const getPaymentTypeById = (id) => mockPaymentTypes.find(paymentType => paymentType.id === id);
    const selectedTypeId = watch('typeId'); // Watch for changes in the dropdown
    const paymentMethodType = getPaymentTypeById(selectedTypeId);

    const [label, setLabel] = useState('Card/Account Number');
    const [showFullNumber, setShowFullNumber] = useState(true);

    // Add a utility function for formatting card numbers
    const formatCardNumber = (value) => {
        return value.replace(/[^0-9]/g, '').replace(/(\d{4})(?=\d)/g, '$1-');
    };

    // Add a utility function for sanitizing card numbers
    const sanitizeCardNumber = (value) => {
        return value.replace(/[^0-9]/g, '');
    };

    // Refactor the useEffect and onInput logic to use the utility functions
    useEffect(() => {
        if (paymentMethodType?.name === 'Cash') {
            setLabel('Card/Account Number');
            setShowFullNumber(false); // Hide fullNumber field
            setValue('fullNumber', ''); // Clear the fullNumber value
        } else if (['Credit Card', 'Debit Card'].includes(paymentMethodType?.name)) {
            setLabel('Card Number');
            setShowFullNumber(true); // Show fullNumber field

            // Autofill dashes for card numbers on initial render
            const currentValue = getValues('fullNumber');
            if (currentValue && !currentValue.includes('-')) {
                setValue('fullNumber', formatCardNumber(currentValue));
            }
        } else if (['Checking Account', 'Savings Account'].includes(paymentMethodType?.name)) {
            setLabel('Bank Number');
            setShowFullNumber(true); // Show fullNumber field

            // Remove dashes for bank numbers
            const currentValue = getValues('fullNumber');
            if (currentValue && currentValue.includes('-')) {
                setValue('fullNumber', sanitizeCardNumber(currentValue));
            }
        }
    }, [paymentMethodType, setValue, getValues]); // Re-run effect when dropdown value changes

    const onSubmit = (data) => {
        const sanitizedData = {
            ...data,
            fullNumber: data.fullNumber.replace(/-/g, ''), // Remove dashes
        };
        console.log('Form submitted:', sanitizedData);
        // Handle form submission logic here
    };

    const handleCancel = () => {
        navigate(-1); // Navigate to the previous page
    }

    return (
        <Card className="payment-method-detail-card">
            <form onSubmit={handleSubmit(onSubmit)} className="payment-method-detail-form form">
                <label>
                    Name:
                    <input 
                        type="text" 
                        {...register('name', { required: true, maxLength: 20 })}
                        aria-invalid={errors.name ? 'true' : 'false'}
                        className={errors.name ? 'error' : ''}
                        maxLength="20"
                    />
                </label>
                {errors.name && <p role='alert' className='field-error-message'>Name is required and must be 20 characters max</p>}

                <label>
                    Payment Method Type:
                    <select 
                        {...register('typeId', { required: true })}
                        aria-invalid={errors.typeId ? 'true' : 'false'}
                        className={errors.typeId ? 'error' : ''}
                    >
                        <option value="">Select Payment Method Type</option>
                        {mockPaymentTypes.map(paymentType => (
                            <option key={paymentType.id} value={paymentType.id}>
                                {paymentType.name}
                            </option>
                        ))}
                    </select>
                </label>
                {errors.typeId && <p role='alert' className='field-error-message'>Payment Method Type is required</p>}

                {showFullNumber && (
                    <label>
                        {label}:
                        <input 
                            type="text" 
                            {...register('fullNumber', {
                                // Updated validation logic to check length only if there's a value in the input
                                validate: value => {
                                    if (value && !/^[0-9-]*$/.test(value)) {
                                        return 'Only numbers and dashes are allowed';
                                    }
                                    const sanitizedValue = value.replace(/-/g, '');
                                    if (value && ['Credit Card', 'Debit Card'].includes(paymentMethodType.name)) {
                                        if (sanitizedValue.length !== 16) {
                                            return 'Card Number must be 16 digits';
                                        }
                                    } else if (value && ['Checking Account', 'Savings Account'].includes(paymentMethodType.name) && sanitizedValue.length < 10) {
                                        return 'Bank Number must be at least 10 digits';
                                    }
                                    return true;
                                }
                            })}
                            aria-invalid={errors.fullNumber ? 'true' : 'false'}
                            className={errors.fullNumber ? 'error' : ''}
                            maxLength={['Credit Card', 'Debit Card'].includes(paymentMethodType.name) ? 19 : 16} // 19 for cards with dashes, 16 for banks
                            onInput={(e) => {
                                if (['Credit Card', 'Debit Card'].includes(paymentMethodType.name)) {
                                    e.target.value = formatCardNumber(e.target.value);
                                } else {
                                    e.target.value = sanitizeCardNumber(e.target.value);
                                }
                            }}
                        />
                    </label>
                )}
                {errors.fullNumber && <p role='alert' className='field-error-message'>{errors.fullNumber.message}</p>}

                <div className="form-footer">
                    <input className="save-btn" type="submit" value="Save"/>
                    <input className="cancel-btn" type="button" value="Cancel" onClick={handleCancel} />
                </div>
            </form>
        </Card>
    );
};

export default PaymentMethodDetail;