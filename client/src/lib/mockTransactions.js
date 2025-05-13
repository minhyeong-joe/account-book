const mockCategories = [
	{ id: "1", name: "Groceries", type: "expense" },
	{ id: "2", name: "Salary", type: "income" },
	{ id: "3", name: "Dining", type: "expense" },
	{ id: "4", name: "Transport", type: "expense" },
	{ id: "5", name: "Entertainment", type: "expense" },
	{ id: "6", name: "Freelance", type: "income" },
	{ id: "7", name: "Shopping", type: "expense" },
	{ id: "8", name: "Gift", type: "income" },
];

const mockPaymentTypes = [
	{ id: "1", name: "Cash" },
	{ id: "2", name: "Checking Account" },
	{ id: "3", name: "Savings Account" },
	{ id: "4", name: "Credit Card" },
	{ id: "5", name: "Debit Card" },
];

let mockPaymentMethods = [
	{
		id: "1",
		name: "Visa...1234",
		typeId: "4",
		fullNumber: "1234567812341234",
	},
	{
		id: "2",
		name: "Cash",
		typeId: "1",
		fullNumber: null,
	},
	{
		id: "3",
		name: "Account...2369",
		typeId: "2",
		fullNumber: "9876543212369",
	},
	{
		id: "4",
		name: "Visa...3456",
		typeId: "4",
		fullNumber: "1234567812343456",
	},
];

let mockTransactions = [
	{
		id: "1",
		datetime: "2025-03-15T10:30",
		category: "Groceries",
		description: "Bought vegetables and fruits",
		amount: 50.25,
		transactionType: "expense",
		paymentMethod: "Visa...1234",
	},
	{
		id: "2",
		datetime: "2025-03-15T09:00",
		category: "Salary",
		description: "Monthly salary",
		amount: 3000.0,
		transactionType: "income",
		paymentMethod: "Account...2369",
	},
	{
		id: "3",
		datetime: "2025-03-20T19:45",
		category: "Dining",
		description: "Dinner at a restaurant",
		amount: 75.0,
		transactionType: "expense",
		paymentMethod: "Cash",
	},
	{
		id: "4",
		datetime: "2025-04-10T08:15",
		category: "Transport",
		description: "Monthly metro pass",
		amount: 100.0,
		transactionType: "expense",
		paymentMethod: "Visa...1234",
	},
	{
		id: "5",
		datetime: "2025-04-14T20:00",
		category: "Entertainment",
		description: "Movie tickets",
		amount: 30.0,
		transactionType: "expense",
		paymentMethod: "Cash",
	},
	{
		id: "6",
		datetime: "2025-04-14T14:00",
		category: "Freelance",
		description: "Freelance project payment",
		amount: 500.0,
		transactionType: "income",
		paymentMethod: "Account...2369",
	},
	{
		id: "7",
		datetime: "2025-04-20T16:30",
		category: "Shopping",
		description: "Bought new clothes",
		amount: 200.0,
		transactionType: "expense",
		paymentMethod: "Visa...1234",
	},
	{
		id: "8",
		datetime: "2025-04-22T12:00",
		category: "Gift",
		description: "Received birthday gift",
		amount: 100.0,
		transactionType: "income",
		paymentMethod: "Cash",
	},
];

mockPaymentMethods = mockPaymentMethods.map((method) => {
	const paymentType = mockPaymentTypes.find(
		(type) => type.id === method.typeId
	);

	const { typeId: _, ...rest } = method;

	return {
		...rest,
		type: paymentType || null,
	};
});

export {
	mockTransactions,
	mockCategories,
	mockPaymentMethods,
	mockPaymentTypes,
};
