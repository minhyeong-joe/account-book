import { useState } from 'react';

import { Plus, Trash2, Pencil } from 'lucide-react';
import { Link } from 'react-router-dom';

import { Card } from '../components';
import { groupPaymentMethodsByType } from '../lib/utils';

import '../styles/PaymentMethods.css';

import { mockPaymentMethods, mockPaymentTypes } from '../lib/mockTransactions';

const PaymentMethods = () => {
    const groupedPaymentMethods = groupPaymentMethodsByType(mockPaymentMethods);   
    const [paymentMethods, setPaymentMethods] = useState(groupedPaymentMethods);

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
            {mockPaymentTypes.map(type => (
                <Card key={type.id}>
                    <div className='card-header'>
                        <h2>{type.name}</h2>
                        <Link to={`/payment-method/new`} state={{ paymentMethod: { type: type }}} className='add-payment-method-link'>
                            <Plus size={20} className='add-payment-btn' />
                        </Link>
                    </div>
                    <ul className="payment-methods-list">
                        {paymentMethods[type.id]?.map(method => (
                            <li key={method.id} className='list-item'>
                                <span>{method.name}</span>
                                <div className="edit-and-delete-group">
                                    <Link to={`/payment-method/${method.id}`} state={{ paymentMethod: method }} className="edit-link">
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