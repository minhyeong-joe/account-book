import React from 'react';
import { useState } from 'react';
import { Plus, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';
import Card from '../components/Card';
import './Transactions.css';

const Transactions = () => {
    const income = 2500.0;
    const expense = 1000.0;
    const total = income - expense;

    return (
        <div className="transactions-page">
            <div className="header">
                <div className="month-selector">
                    <button className="prev-month select-btn"><ChevronLeft size={20} /></button>
                    <span className="current-month">April, 2025</span>
                    <button className="next-month select-btn"><ChevronRight size={20} /></button>
                </div>
                <div className="btn-group">
                    <button className="add-transaction-btn"><Plus size={20} color="white" /></button>
                    <button className="delete-transactions-btn"><Trash2 size={20} color="white" /></button>
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
            <Card>
                <div className="card-header">
                    <span className="transaction-date">2025.04.14</span>
                    <div className="daily-total">
                        <span className="income">
                            $ 0.00
                        </span>
                        <span className="expense">
                            $ 50.18
                        </span>
                    </div>
                </div>
                <div className="transaction-item">
                    <span className="transaction-category">Category X</span>
                    <div className="desc-and-time">
                        <span className="transaction-description">Description of the transaction 2</span>
                        <span className="transaction-time">7:30 PM</span>
                    </div>
                    <span className="transaction-amount expense">$ 10.18</span>
                </div>
                <div className="transaction-item">
                    <span className="transaction-category">Category Y</span>
                    <div className="desc-and-time">
                        <span className="transaction-description">Description of the transaction 1</span>
                        <span className="transaction-time">4:00 PM</span>
                    </div>
                    <span className="transaction-amount expense">$ 40.00</span>
                </div>
            </Card>
            <Card>
                <div className="card-header">
                    <span className="transaction-date">2025.04.12</span>
                    <div className="daily-total">
                        <span className="income">
                            $ 2000.00
                        </span>
                        <span className="expense">
                            $ 0.00
                        </span>
                    </div>
                </div>
                <div className="transaction-item">
                    <span className="transaction-category">Category Z</span>
                    <div className="desc-and-time">
                        <span className="transaction-description">Description of the transaction</span>
                        <span className="transaction-time">8:00 PM</span>
                    </div>
                    <span className="transaction-amount income">$ 2000.00</span>
                </div>
            </Card>
        </div>
    );
};

export default Transactions;