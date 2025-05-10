import React, { useMemo } from 'react';

import TransactionCard from './TransactionCard';
import { groupTransactionsByDate } from '../lib/utils';


const TransactionList = ({ transactions, deleteMode, onCheckboxChange }) => {
    const transactionsByDate = useMemo(() => groupTransactionsByDate(transactions), [transactions]);

    return (
        <div>
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