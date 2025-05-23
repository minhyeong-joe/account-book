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

// Utility to convert UTC or ISO string to yyyy-MM-ddThh:mm for datetime-local input
function toDatetimeLocal(dt) {
	if (!dt) {
		return "";
	}
	const date = new Date(dt);
	const offset = date.getTimezoneOffset();
	const local = new Date(date.getTime() - offset * 60000);
	return local.toISOString().slice(0, 16);
}

const groupTransactionsByDate = (transactions) =>
	transactions.reduce((acc, transaction) => {
		const { datetime, amount, transactionType } = transaction;
		const date = extractDate(toDatetimeLocal(datetime));
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
		if (!acc[payment.type._id]) {
			acc[payment.type._id] = [];
		}
		acc[payment.type._id].push(payment);
		return acc;
	}, {});

// format card numbers
const formatCardNumber = (value) => {
	return value.replace(/[^0-9]/g, "").replace(/(\d{4})(?=\d)/g, "$1-");
};

// sanitize card numbers
const sanitizeCardNumber = (value) => {
	return value.replace(/[^0-9]/g, "");
};

// get last 4 digits of card or bank number
const getLast4Digits = (value) => {
	return value.slice(-4);
};

const getPaymentMethodName = (paymentMethod) => {
	if (paymentMethod.fullNumber) {
		return `${paymentMethod.name}...${getLast4Digits(
			paymentMethod.fullNumber
		)}`;
	}
	return paymentMethod.name;
};

export {
	formatTime,
	extractDate,
	extractYearMonth,
	extractTime,
	toDatetimeLocal,
	groupTransactionsByDate,
	groupPaymentMethodsByType,
	formatCardNumber,
	sanitizeCardNumber,
	getLast4Digits,
	getPaymentMethodName,
};
