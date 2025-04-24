import React, { useState } from 'react';
import { Plus, Trash2, ChevronLeft, ChevronRight, Check, X } from 'lucide-react';
import { Link } from 'react-router-dom';

import Card from '../components/Card';
import TransactionCard  from '../components/TransactionCard';
import mockTransactions from '../lib/mockTransactions'; // Mock data for transactions
import { MONTH_NAMES } from '../lib/constants';

import './Transactions.css';


const Transactions = () => {
    const now = new Date();
    const [year, setYear] = useState(now.getFullYear());
    const [month, setMonth] = useState(now.getMonth());
    const [deleteMode, setDeleteMode] = useState(false);

    const handlePrevMonth = () => {
        if (month === 1) {
            setMonth(12);
            setYear(year - 1);
        } else {
            setMonth(month - 1);
        }
    };

    const handleNextMonth = () => {
        if (month === 12) {
            setMonth(1);
            setYear(year + 1);
        } else {
            setMonth(month + 1);
        }
    };

    const onDeleteClick = () => {
        setDeleteMode(true);
    }

    const onDeleteConfirm = () => {
        // Logic to delete transactions goes here
        setDeleteMode(false);
    }

    const onDeleteCancel = () => {
        setDeleteMode(false);
    }

    const filteredTransactions = mockTransactions.filter(transaction => {
        const [transactionYear, transactionMonth] = transaction.date.split('-').map(Number);
        return transactionYear === year && transactionMonth === month+1;
    })

    const sortedTransactions = filteredTransactions.sort((a, b) => {
        const dateA = new Date(`${a.date}T${a.time}`);
        const dateB = new Date(`${b.date}T${b.time}`);
        return dateB - dateA;
    });

    const groupedTransactions = sortedTransactions.reduce((acc, transaction) => {
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

    const income = filteredTransactions
        .filter(transaction => transaction.amount > 0)
        .reduce((sum, transaction) => sum + transaction.amount, 0);
    const expense = filteredTransactions
        .filter(transaction => transaction.amount < 0)
        .reduce((sum, transaction) => sum + Math.abs(transaction.amount), 0);
    const total = income - expense;

    return (
        <div className="transactions-page">
            <div className="header">
                <div className="month-selector">
                    <button className="prev-month select-btn" onClick={handlePrevMonth}><ChevronLeft size={20} /></button>
                    <span className="current-month">{MONTH_NAMES[month]}, {year}</span>
                    <button className="next-month select-btn" onClick={handleNextMonth}><ChevronRight size={20} /></button>
                </div>
                <div className="btn-group">
                    {deleteMode ? (
                        <>
                            <button className="delete-confirm-btn" onClick={onDeleteConfirm}><Trash2 size={20} /></button>
                            <button className="delete-cancel-btn" onClick={onDeleteCancel}><X size={20} /></button>
                        </>
                    ) : (
                        <>
                            <Link to="/new-transaction">
                                <button className="add-transaction-btn"><Plus size={20} color="white" /></button>
                            </Link>
                            <button className="delete-transactions-btn" onClick={onDeleteClick}><Trash2 size={20} color="white" /></button>
                        </>
                    )}
                    
                </div>
            </div>
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

            {Object.entries(groupedTransactions).map(([date, { transactions, income, expense }]) => (
                <TransactionCard
                    key={date}
                    date={date}
                    income={income}
                    expense={expense}
                    transactions={transactions}
                    deleteMode={deleteMode}
                />
            ))}
        </div>
    );
};

export default Transactions;