const endpoint = import.meta.env.VITE_API_ENDPOINT;

const getPaymentMethods = async () => {
	const response = await fetch(`${endpoint}/payment-methods`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (!response.ok) {
		throw new Error("Failed to fetch payment methods");
	}

	return await response.json();
};

const getPaymentMethodTypes = async () => {
	const response = await fetch(`${endpoint}/payment-methods/types`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (!response.ok) {
		throw new Error("Failed to fetch payment method types");
	}

	return await response.json();
};

const createPaymentMethod = async (paymentMethod) => {
	const response = await fetch(`${endpoint}/payment-methods`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(paymentMethod),
	});

	if (!response.ok) {
		throw new Error("Failed to create payment method");
	}

	return await response.json();
};

const updatePaymentMethod = async (paymentMethod) => {
	const response = await fetch(
		`${endpoint}/payment-methods/${paymentMethod._id}`,
		{
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(paymentMethod),
		}
	);

	if (!response.ok) {
		throw new Error("Failed to update payment method");
	}

	return await response.json();
};

const deletePaymentMethod = async (id) => {
	const response = await fetch(`${endpoint}/payment-methods/${id}`, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (!response.ok) {
		throw new Error("Failed to delete payment method");
	}

	// If response status is 204 (No Content), do not try to parse JSON
	if (response.status === 204) {
		return true;
	}
};

export {
	getPaymentMethods,
	getPaymentMethodTypes,
	createPaymentMethod,
	updatePaymentMethod,
	deletePaymentMethod,
};
