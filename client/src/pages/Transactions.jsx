import React, { useState, useEffect } from 'react';
import { Plus, Trash2, ChevronLeft, ChevronRight, Check, X } from 'lucide-react';
import { Link } from 'react-router-dom';

import { SummaryCard, TransactionList } from '../components';
import mockTransactions from '../lib/mockTransactions'; // Mock data for transactions
import { MONTH_NAMES } from '../lib/constants';

import './Transactions.css';


const Transactions = () => {
    const now = new Date();
    const [year, setYear] = useState(now.getFullYear());
    const [month, setMonth] = useState(now.getMonth());
    const [deleteMode, setDeleteMode] = useState(false);
    const [transactions, setTransactions] = useState([]);
    const [selectedTransactions, setSelectedTransactions] = useState([]);

    // simulate fetching transactions from an API (use mock-up data for now)
    useEffect(() => {
        // Fetch transactions from an API or use mock data
        // filter & sort would be handled by the backend in a real-world scenario
        const filteredTransactions = mockTransactions.filter(transaction => {
            const [transactionYear, transactionMonth] = transaction.date.split('-').map(Number);
            return transactionYear === year && transactionMonth === month+1;
        }).sort((a, b) => {
            const dateA = new Date(`${a.date}T${a.time}`);
            const dateB = new Date(`${b.date}T${b.time}`);
            return dateB - dateA;
        });
        setTransactions(filteredTransactions);
        setDeleteMode(false);
        setSelectedTransactions([]);
    }, [year, month]);

    useEffect(() => {
        console.log('Selected Transactions:', selectedTransactions);
    }, [selectedTransactions]);
        

    // handlers
    const changeMonth = (offset) => {
        const newDate = new Date(year, month + offset, 1);
        setYear(newDate.getFullYear());
        setMonth(newDate.getMonth());
    }

    const onDeleteClick = () => {
        setDeleteMode(true);
    }

    const onDeleteConfirm = () => {
        setTransactions((prevTransactions) =>
            prevTransactions.filter(
                (transaction) => !selectedTransactions.includes(transaction.id)
            )
        );
        setDeleteMode(false);
        setSelectedTransactions([]);
    }

    const onDeleteCancel = () => {
        setDeleteMode(false);
    }

    const handleCheckboxChange = (transactionId) => {
        setSelectedTransactions((prevSelected) => {
            if (prevSelected.includes(transactionId)) {
                return prevSelected.filter((id) => id !== transactionId);
            } else {
                return [...prevSelected, transactionId];
            }
        });
    };

    return (
        <div className="transactions-page">
            <div className="header">
                <div className="month-selector">
                    <button className="prev-month select-btn" onClick={() => changeMonth(-1)}><ChevronLeft size={20} /></button>
                    <span className="current-month">{MONTH_NAMES[month]}, {year}</span>
                    <button className="next-month select-btn" onClick={() => changeMonth(1)}><ChevronRight size={20} /></button>
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
            <SummaryCard transactions={transactions} />
            <TransactionList transactions={transactions} deleteMode={deleteMode} onCheckboxChange={handleCheckboxChange} />
        </div>
    );
};

export default Transactions;