const formatTime = (time) => {
	const [hour, minute] = time.split(":").map(Number);
	const ampm = hour >= 12 ? "PM" : "AM";
	const formattedHour = hour % 12 || 12;
	return `${formattedHour}:${minute.toString().padStart(2, "0")} ${ampm}`;
};

const extractDate = (datetime) => {
	return datetime.split("T")[0]; // Extract date part (YYYY-MM-DD)
};

const extractYearMonth = (date) => {
	return date.split("-").map(Number);
};

const extractTime = (datetime) => {
	return datetime.split("T")[1]; // Extract time part (HH:MM:SS)
};

const groupTransactionsByDate = (transactions) =>
	transactions.reduce((acc, transaction) => {
		const { datetime, amount, transactionType } = transaction;
		const date = extractDate(datetime);
		if (!acc[date]) {
			acc[date] = { transactions: [], income: 0, expense: 0 };
		}
		acc[date].transactions.push(transaction);
		if (transactionType === "income") {
			acc[date].income += amount;
		} else {
			acc[date].expense += amount;
		}
		return acc;
	}, {});

const groupPaymentMethodsByType = (paymentMethods) =>
	paymentMethods.reduce((acc, payment) => {
		if (!acc[payment.type.id]) {
			acc[payment.type.id] = [];
		}
		acc[payment.type.id].push(payment);
		return acc;
	}, {});

export {
	formatTime,
	extractDate,
	extractYearMonth,
	extractTime,
	groupTransactionsByDate,
	groupPaymentMethodsByType,
};
