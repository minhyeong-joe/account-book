const endpoint = import.meta.env.VITE_API_ENDPOINT;

const getTransactions = async (
	year = "",
	month = "",
	type = "",
	paymentMethod = "",
	category = "",
	description = ""
) => {
	const params = new URLSearchParams();
	if (year) {
		params.append("year", year);
	}
	if (month) {
		params.append("month", month);
	}
	if (type) {
		params.append("type", type);
	}
	if (paymentMethod) {
		params.append("paymentMethod", paymentMethod);
	}
	if (category) {
		params.append("category", category);
	}
	if (description) {
		params.append("description", description);
	}
	const response = await fetch(
		`${endpoint}/transactions?${params.toString()}`,
		{
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
			params: {
				year,
				month,
				type,
				paymentMethod,
				category,
				description,
			},
		}
	);
	if (!response.ok) {
		const errorData = await response.json().catch(() => ({}));
		throw new Error(errorData.message || "Failed to fetch transactions");
	}

	return await response.json();
};

const getTransactionById = async (transactionId) => {
	const response = await fetch(`${endpoint}/transactions/${transactionId}`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	});
	if (!response.ok) {
		const errorData = await response.json().catch(() => ({}));
		throw new Error(errorData.message || "Failed to fetch transaction");
	}

	return await response.json();
};

const createTransaction = async (transaction) => {
	const response = await fetch(`${endpoint}/transactions`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(transaction),
	});
	if (!response.ok) {
		const errorData = await response.json().catch(() => ({}));
		throw new Error(errorData.message || "Failed to create transaction");
	}

	return await response.json();
};

const updateTransaction = async (transactionId, transaction) => {
	const response = await fetch(`${endpoint}/transactions/${transactionId}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(transaction),
	});
	if (!response.ok) {
		const errorData = await response.json().catch(() => ({}));
		throw new Error(errorData.message || "Failed to update transaction");
	}

	return await response.json();
};

const deleteBatchTransactions = async (transactionIds) => {
	const response = await fetch(`${endpoint}/transactions`, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			ids: transactionIds,
		}),
	});
	if (!response.ok) {
		const errorData = await response.json().catch(() => ({}));
		throw new Error(errorData.message || "Failed to delete transaction");
	}

	if (response.status === 204) {
		return true;
	}
};

export {
	getTransactions,
	getTransactionById,
	createTransaction,
	updateTransaction,
	deleteBatchTransactions,
};
