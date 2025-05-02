import { useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useEffect, useState, useCallback } from 'react';

import Card from '../components/Card';
import { formatCardNumber, sanitizeCardNumber } from '../lib/utils';

import '../styles/Form.css';
import '../styles/common.css';

import { mockPaymentTypes } from '../lib/mockTransactions';


const PaymentMethodDetail = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const { paymentMethod } = state || {};
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

    const [label, setLabel] = useState('');
    const [showFullNumber, setShowFullNumber] = useState(true);

    const isPaymentTypeCard = useCallback(() => {
        return ['Credit Card', 'Debit Card'].includes(paymentMethodType.name);
    }, [paymentMethodType]);

    const isPaymentTypeBank = useCallback(() => {
        return ['Checking Account', 'Savings Account'].includes(paymentMethodType.name);
    }, [paymentMethodType]);

    useEffect(() => {
		const currentValue = getValues("fullNumber");

		if (paymentMethodType?.name === "Cash") {
			setLabel("");
			setShowFullNumber(false);
			setValue("fullNumber", "");
		} else if (
			isPaymentTypeCard()
		) {
			setLabel("Card Number");
			setShowFullNumber(true);
			if (currentValue && !currentValue.includes("-")) {
				setValue("fullNumber", formatCardNumber(currentValue));
			}
		} else if (
			isPaymentTypeBank()
		) {
			setLabel("Bank Number");
			setShowFullNumber(true);
			if (currentValue && currentValue.includes("-")) {
				setValue("fullNumber", sanitizeCardNumber(currentValue));
			}
		}
    }, [paymentMethodType, getValues, setValue, setLabel, setShowFullNumber, isPaymentTypeBank, isPaymentTypeCard]);


    const onFullNumberChange = e => {
        const newValue = e.target.value;
        const formattedValue = isPaymentTypeCard() ? formatCardNumber(newValue) : sanitizeCardNumber(newValue);
        setValue('fullNumber', formattedValue, { shouldValidate: true });
    }

    const fullNumberValidation = (value) => {
        if (value && !/^[0-9-]*$/.test(value)) {
            return 'Only numbers and dashes are allowed';
        }
        const sanitizedValue = value.replace(/-/g, '');
        if (isPaymentTypeCard()) {
            if (sanitizedValue.length !== 16) {
                return 'Card Number must be 16 digits';
            }
        } else if (isPaymentTypeBank() && sanitizedValue.length < 10) {
            return 'Bank Number must be at least 10 digits';
        }
        return true;
    }

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
        <Card className="narrow-card">
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
                                validate: value => fullNumberValidation(value)
                            })}
                            aria-invalid={errors.fullNumber ? 'true' : 'false'}
                            className={errors.fullNumber ? 'error' : ''}
                            maxLength={isPaymentTypeCard() ? 19 : 16} // 19 for cards with dashes, 16 for banks
                            onInput={onFullNumberChange} // Call the function on input change}
                            placeholder={isPaymentTypeCard() ? 'XXXX-XXXX-XXXX-XXXX': ''}
                        />
                    </label>
                )}
                {showFullNumber && errors.fullNumber && <p role='alert' className='field-error-message'>{errors.fullNumber.message}</p>}

                <div className="form-footer">
                    <input className="save-btn" type="submit" value="Save"/>
                    <input className="cancel-btn" type="button" value="Cancel" onClick={handleCancel} />
                </div>
            </form>
        </Card>
    );
};

export default PaymentMethodDetail;