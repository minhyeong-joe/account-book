import React, { useRef } from 'react';
import { Link } from 'react-router-dom';

import Card from '../components/Card';
import { formatTime, extractTime, toDatetimeLocal } from '../lib/utils';

import '../styles/TransactionCard.css';

const TransactionCard = ({ date, income, expense, transactions, deleteMode, onCheckboxChange }) => {
    const checkboxRefs = useRef({});

    const handleRowClick = (e, transaction) => {
        if (deleteMode) {
            e.preventDefault();
            const currentChecked = checkboxRefs.current[transaction.id]?.checked;
            checkboxRefs.current[transaction.id].checked = !currentChecked;
            onCheckboxChange(transaction.id);
        }
    }

    const renderCheckBox = transaction => (
        <input
            type="checkbox"
            className="delete-checkbox"
            onClick={(e) => e.stopPropagation()}
            onChange={() => onCheckboxChange(transaction.id)}
            ref={(el) => (checkboxRefs.current[transaction.id] = el)}
        />
    )

    return (
        <Card>
            <div className="transaction-card-header card-header">
                <span className="transaction-date">{date}</span>
                <div className="daily-total">
                    <span className="income">$ {income.toFixed(2)}</span>
                    <span className="expense">$ {expense.toFixed(2)}</span>
                </div>
            </div>
            {transactions.map((transaction) => (
                <Link
                    className={`transaction-item${deleteMode ? ' delete-mode' : ''}`}
                    key={transaction._id}
                    to={deleteMode ? '#' : `/transaction/${transaction.id}`}
                    state={{ transaction: transaction}}
                    onClick={(e) => handleRowClick(e, transaction)}
                >
                    {deleteMode && renderCheckBox(transaction)}
                    <span className="transaction-category">{transaction.category}</span>
                    <div className="desc-and-time">
                        <span className="transaction-description">{transaction.description}</span>
                        <span className="transaction-time">{formatTime(extractTime(toDatetimeLocal(transaction.datetime)))}</span>
                    </div>
                    <span
                        className={`transaction-amount ${
                            transaction.transactionType === 'income'? 'income' : 'expense'
                        }`}
                    >
                        $ {transaction.amount.toFixed(2)}
                    </span>
                </Link>
            ))}
        </Card>
    );
};

export default TransactionCard;