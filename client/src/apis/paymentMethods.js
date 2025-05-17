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

export { getPaymentMethods, getPaymentMethodTypes };
