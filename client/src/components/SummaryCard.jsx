import React from 'react';

import Card from './Card';

import '../styles/SummaryCard.css';


const SummaryCard = ({transactions}) => {
    const income = transactions
        .filter(transaction => transaction.transactionType === 'income')
        .reduce((sum, transaction) => sum + transaction.amount, 0);
    const expense = transactions
        .filter(transaction => transaction.transactionType === 'expense')
        .reduce((sum, transaction) => sum + transaction.amount, 0);
    const total = income - expense;

    return (
        <Card>
            <div className="total-card">
                <div className="total-card-item">
                    <span className="label">Income</span>
                    <span className="value income">{income.toFixed(2)}</span>
                </div>
                <div className="total-card-item">
                    <span className="label">Expense</span>
                    <span className="value expense">{expense.toFixed(2)}</span>
                </div>
                <div className="total-card-item">
                    <span className="label">Total</span>
                    <span className={`value ${total >= 0 ? 'positive' : 'negative'}`}>{total.toFixed(2)}</span>
                </div>
            </div>
        </Card>
    )
}

export default SummaryCard;