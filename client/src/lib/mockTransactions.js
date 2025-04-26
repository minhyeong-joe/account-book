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

const mockPaymentMethods = [
	{
		id: "1",
		name: "Visa...1234",
		type: "credit",
		fullNumber: "1234567812341234",
	},
	{ id: "2", name: "Cash", type: "cash", fullNumber: null },
	{
		id: "3",
		name: "Account...2369",
		type: "bank account",
		fullNumber: "9876543212369",
	},
];

let mockTransactions = [
	{
		id: "1",
		datetime: "2025-03-15T10:30",
		categoryId: "1",
		description: "Bought vegetables and fruits",
		amount: 50.25,
		transactionType: "expense",
		paymentMethodId: "1",
	},
	{
		id: "2",
		datetime: "2025-03-15T09:00",
		categoryId: "2",
		description: "Monthly salary",
		amount: 3000.0,
		transactionType: "income",
		paymentMethodId: "3",
	},
	{
		id: "3",
		datetime: "2025-03-20T19:45",
		categoryId: "3",
		description: "Dinner at a restaurant",
		amount: 75.0,
		transactionType: "expense",
		paymentMethodId: "2",
	},
	{
		id: "4",
		datetime: "2025-04-10T08:15",
		categoryId: "4",
		description: "Monthly metro pass",
		amount: 100.0,
		transactionType: "expense",
		paymentMethodId: "1",
	},
	{
		id: "5",
		datetime: "2025-04-14T20:00",
		categoryId: "5",
		description: "Movie tickets",
		amount: 30.0,
		transactionType: "expense",
		paymentMethodId: "2",
	},
	{
		id: "6",
		datetime: "2025-04-14T14:00",
		categoryId: "6",
		description: "Freelance project payment",
		amount: 500.0,
		transactionType: "income",
		paymentMethodId: "3",
	},
	{
		id: "7",
		datetime: "2025-04-20T16:30",
		categoryId: "7",
		description: "Bought new clothes",
		amount: 200.0,
		transactionType: "expense",
		paymentMethodId: "1",
	},
	{
		id: "8",
		datetime: "2025-04-22T12:00",
		categoryId: "8",
		description: "Received birthday gift",
		amount: 100.0,
		transactionType: "income",
		paymentMethodId: "2",
	},
];

mockTransactions = mockTransactions.map((transaction) => {
	const category = mockCategories.find(
		(cat) => cat.id === transaction.categoryId
	);
	const paymentMethod = mockPaymentMethods.find(
		(method) => method.id === transaction.paymentMethodId
	);

	const { categoryId: _, paymentMethodId: __, ...rest } = transaction;

	return {
		...rest,
		category: category || null,
		paymentMethod: paymentMethod || null,
	};
});

export { mockTransactions, mockCategories, mockPaymentMethods };
