import '../styles/TransactionTypeBtnGroup.css';

const TransactionTypeBtnGroup = ({ type, setType }) => {
    return (
        <div className="transaction-type-btn-group">
            <button
                className={`transaction-type-btn income-btn ${type === 'income' ? 'active' : ''}`}
                onClick={() => setType('income')}
            >
                Income
            </button>
            <button
                className={`transaction-type-btn expense-btn ${type === 'expense' ? 'active' : ''}`}
                onClick={() => setType('expense')}
            >
                Expense
            </button>
        </div>
    )
}

export default TransactionTypeBtnGroup;