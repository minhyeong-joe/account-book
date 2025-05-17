import { useState, useEffect } from 'react';

import { Plus, Trash2, Pencil } from 'lucide-react';
import { Link } from 'react-router-dom';

import { Card } from '../components';
import { groupPaymentMethodsByType } from '../lib/utils';

import '../styles/PaymentMethods.css';

import { getPaymentMethods, getPaymentMethodTypes } from '../apis/paymentMethods';

const PaymentMethods = () => {
    const [paymentMethods, setPaymentMethods] = useState({});
    const [paymentTypes, setPaymentTypes] = useState([]);
    
    useEffect(() => {
        const fetchPaymentMethods = async () => {
            try {
                const paymentMethods = await getPaymentMethods();
                setPaymentMethods(groupPaymentMethodsByType(paymentMethods));
            } catch (error) {
                console.error('Error fetching payment methods:', error);
            }
        };

        const fetchPaymentMethodTypes = async () => {
            try {
                const paymentMethodTypes = await getPaymentMethodTypes();
                setPaymentTypes(paymentMethodTypes);
            } catch (error) {
                console.error('Error fetching payment method types:', error);
            }
        };

        fetchPaymentMethods();
        fetchPaymentMethodTypes();
    }, []);

    const handleEdit = (method) => {
        console.log('Edit clicked!');
        console.log(method);
    }

    const handleDelete = (method) => {
        const updatedPaymentMethods = paymentMethods[method.type.id].filter(item => item.id !== method.id);
        setPaymentMethods(prevState => ({ ...prevState, [method.type.id]: updatedPaymentMethods }));
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
                                <span>{method.name}</span>
                                <div className="edit-and-delete-group">
                                    <Link to={`/payment-method/${method._id}`} state={{ paymentMethod: method }} className="edit-link">
                                        <Pencil size={20} className="edit-icon" onClick={() => handleEdit(method)} />
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