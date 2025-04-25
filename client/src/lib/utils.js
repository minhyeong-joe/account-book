const formatTime = (time) => {
	const [hour, minute] = time.split(":").map(Number);
	const ampm = hour >= 12 ? "PM" : "AM";
	const formattedHour = hour % 12 || 12;
	return `${formattedHour}:${minute.toString().padStart(2, "0")} ${ampm}`;
};

const groupTransactionsByDate = (transactions) =>
	transactions.reduce((acc, transaction) => {
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

export { formatTime, groupTransactionsByDate };
