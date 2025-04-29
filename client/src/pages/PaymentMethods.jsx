
import { Plus, Trash2, Pencil } from 'lucide-react';
import { Link } from 'react-router-dom';

import Card from '../components/Card';
import { groupPaymentMethodsByType } from '../lib/utils';
import { mockPaymentMethods, mockPaymentTypes } from '../lib/mockTransactions';

import '../styles/PaymentMethods.css';

const PaymentMethods = () => {
    const groupedPaymentMethods = groupPaymentMethodsByType(mockPaymentMethods);    

    const handleEdit = (method) => {
        console.log('Edit clicked!');
        console.log(method);
    }

    const handleDelete = (method) => {
        console.log('Delete clicked!');
        console.log(method);
    }

    return (
        <div>
            {Object.entries(mockPaymentTypes).map(([key, type]) => (
                <Card key={key} className='payment-methods-card'>
                    <div className='card-header'>
                        <h2>{type.name}</h2>
                        <Link to={`/payment-method/new`} className='add-payment-method-link'>
                            <Plus size={20} className='add-payment-btn' />
                        </Link>
                    </div>
                    <ul className='payment-methods-list'>
                        {groupedPaymentMethods[type.id]?.map((method, index) => (
                            <li key={index} className='payment-methods-item'>
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