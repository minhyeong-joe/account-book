import { useState, useEffect } from 'react';
import { Plus, Trash2, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { Link } from 'react-router-dom';

import { SummaryCard, TransactionList } from '../components';
import { MONTH_NAMES } from '../lib/constants';
import { useFlash } from '../contexts/FlashContext';

import { getTransactions, deleteBatchTransactions } from '../apis/transaction';

import '../styles/Transactions.css';


const Transactions = () => {
    const now = new Date();
    const [year, setYear] = useState(now.getFullYear());
    const [month, setMonth] = useState(now.getMonth());
    const [deleteMode, setDeleteMode] = useState(false);
    const [transactions, setTransactions] = useState([]);
    const [transactionsToBeRemoved, setTransactionsToBeRemoved] = useState([]);
    const { showFlash } = useFlash();

    // simulate fetching transactions from an API (use mock-up data for now)
    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const response = await getTransactions(year, month + 1);
                setTransactions(response);
            } catch (error) {
                showFlash(error.message || 'Failed to fetch transactions', 'error');
            }
            setDeleteMode(false);
            setTransactionsToBeRemoved([]);
        }
        
        fetchTransactions();
        
    }, [year, month, showFlash]);

    const changeMonth = (offset) => {
        const newDate = new Date(year, month + offset, 1);
        setYear(newDate.getFullYear());
        setMonth(newDate.getMonth());
    }

    const onDeleteClick = () => {
        setDeleteMode(true);
    }

    const onDeleteConfirm = async () => {
        if (transactionsToBeRemoved.length === 0) {
            setDeleteMode(false);
            setTransactionsToBeRemoved([]);
            return;
        }
        // remove transactions from the server
        try {
            await deleteBatchTransactions(transactionsToBeRemoved);
        } catch (error) {
            showFlash(error.message || 'Failed to delete transactions', 'error');
            return;
        }
        // remove transactions from the state
        setTransactions((prevState) =>
            prevState.filter(
                (transaction) => !transactionsToBeRemoved.includes(transaction._id)
            )
        );
        setDeleteMode(false);
        setTransactionsToBeRemoved([]);
    }

    const onDeleteCancel = () => {
        setDeleteMode(false);
    }

    const handleCheckboxChange = (transactionId) => {
        setTransactionsToBeRemoved((prevState) => {
            if (prevState.includes(transactionId)) {
                return prevState.filter((id) => id !== transactionId);
            } else {
                return [...prevState, transactionId];
            }
        });
    };

    return (
        <div className="transactions-page">
            <div className="transactions-page-header">
                <div className="month-selector">
                    <button className="prev-month select-btn" onClick={() => changeMonth(-1)}><ChevronLeft size={20} /></button>
                    <span className="current-month">{MONTH_NAMES[month]}, {year}</span>
                    <button className="next-month select-btn" onClick={() => changeMonth(1)}><ChevronRight size={20} /></button>
                </div>
                <div className="btn-group transactions-btn-group">
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