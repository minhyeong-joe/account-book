import { useState, useEffect } from 'react';

import { Plus, Trash2, Pencil } from 'lucide-react';
import { Link } from 'react-router-dom';

import { Card } from '../components';
import { groupPaymentMethodsByType, getPaymentMethodName } from '../lib/utils';

import '../styles/PaymentMethods.css';

import { getPaymentMethods, deletePaymentMethod } from '../apis/paymentMethods';
import { usePaymentMethodTypes } from '../contexts/PaymentMethodTypesContext';

const PaymentMethods = () => {
    const [paymentMethods, setPaymentMethods] = useState({});
    const paymentTypes = usePaymentMethodTypes();
    
    useEffect(() => {
        const fetchPaymentMethods = async () => {
            try {
                const paymentMethods = await getPaymentMethods();
                setPaymentMethods(groupPaymentMethodsByType(paymentMethods));
            } catch (error) {
                console.error('Error fetching payment methods:', error);
            }
        };

        fetchPaymentMethods();
    }, []);

    const handleDelete = async (method) => {
        try {
            await deletePaymentMethod(method._id);
            const updatedPaymentMethods = paymentMethods[method.type._id].filter(item => item._id !== method._id);
            setPaymentMethods(prevState => ({ ...prevState, [method.type._id]: updatedPaymentMethods }));
        } catch (error) {
            console.error('Error deleting payment method:', error);
        }
    }

    return (
        <div>
            {paymentTypes?.map(type => (
                <Card key={type._id}>
                    <div className='card-header'>
                        <h2>{type.name}</h2>
                        <Link to={`/payment-method/new`} state={{ paymentMethod: { type: type }}} className='add-payment-method-link'>
                            <Plus size={20} className='add-payment-btn' />
                        </Link>
                    </div>
                    <ul className="payment-methods-list">
                        {paymentMethods?.[type._id]?.map(method => (
                            <li key={method._id} className='list-item'>
                                <span>{getPaymentMethodName(method)}</span>
                                <div className="edit-and-delete-group">
                                    <Link to={`/payment-method/${method._id}`} state={{ paymentMethod: method }} className="edit-link">
                                        <Pencil size={20} className="edit-icon"/>
                                    </Link>
                                    <Trash2 size={20} className="delete-icon" onClick={() => handleDelete(method)} />
                                </div>
                            </li>
                        ))}
                    </ul>
                </Card>
            ))}
        </div>
    );
};

export default PaymentMethods;