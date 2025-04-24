import React from 'react';
import { Square } from 'lucide-react';

import Card from '../components/Card';
import { formatTime } from '../lib/utils';

// import '../pages/Transactions.css';

const TransactionCard = ({date, income, expense, transactions, deleteMode}) => {

    return (<Card key={date}>
        <div className="card-header">
            <span className="transaction-date">{date}</span>
            <div className="daily-total">
                <span className="income">$ {income.toFixed(2)}</span>
                <span className="expense">$ {expense.toFixed(2)}</span>
            </div>
        </div>
        {transactions.map((transaction, index) => (
            <div 
                className={`transaction-item${deleteMode ? ' delete-mode' : ''}`} 
                key={index}
            >
                {deleteMode && (
                    <input type="checkbox" className="delete-checkbox" />
                )}
                <span className="transaction-category">{transaction.category}</span>
                <div className="desc-and-time">
                    <span className="transaction-description">{transaction.description}</span>
                    <span className="transaction-time">{formatTime(transaction.time)}</span>
                </div>
                <span className={`transaction-amount ${transaction.amount > 0 ? 'income' : 'expense'}`}>
                    $ {Math.abs(transaction.amount).toFixed(2)}
                </span>
            </div>
        ))}
    </Card>)
};

export default TransactionCard;