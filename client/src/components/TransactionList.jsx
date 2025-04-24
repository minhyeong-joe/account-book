import React from 'react';

import TransactionCard from './TransactionCard';    

const TransactionList = ({ transactions, deleteMode, onCheckboxChange }) => {
    const transactionsByDate = transactions.reduce((acc, transaction) => {
        const { date, amount } = transaction;
        if (!acc[date]) {
            acc[date] = { transactions: [], income: 0, expense: 0 };
        }
        acc[date].transactions.push(transaction);
        if (amount > 0) {
            acc[date].income += amount;
        } else {
            acc[date].expense += Math.abs(amount);
        }
        return acc;
    }, {});

    return (
        <div className="transaction-list">
            {Object.entries(transactionsByDate).map(([date, { transactions, income, expense }]) => (
                <TransactionCard
                    key={date}
                    date={date}
                    income={income}
                    expense={expense}
                    transactions={transactions}
                    deleteMode={deleteMode}
                    onCheckboxChange={onCheckboxChange}
                />
            ))}
        </div>
    );
};

export default TransactionList;