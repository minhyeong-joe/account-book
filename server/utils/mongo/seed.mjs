// This script seeds the database with initial data for payment types. //

// Import mongoose connection and PaymentType model
import { connectDB } from "../../lib/mongoose.mjs";
import {
	PaymentType,
	Category,
	PaymentMethod,
	Transaction,
} from "./models.mjs";

// Mock payment types (referenced from mockTransactions.js)
const paymentTypes = [
	{ name: "Cash" },
	{ name: "Checking Account" },
	{ name: "Savings Account" },
	{ name: "Credit Card" },
	{ name: "Debit Card" },
];

// Mock data
const categories = [
	{ name: "Groceries", type: "expense" },
	{ name: "Salary", type: "income" },
	{ name: "Dining", type: "expense" },
	{ name: "Transport", type: "expense" },
	{ name: "Entertainment", type: "expense" },
	{ name: "Freelance", type: "income" },
	{ name: "Shopping", type: "expense" },
	{ name: "Gift", type: "income" },
];

const paymentMethods = [
	{ name: "Visa...1234", typeId: null, fullNumber: "1234567812341234" },
	{ name: "Cash", typeId: null, fullNumber: null },
	{ name: "Account...2369", typeId: null, fullNumber: "9876543212369" },
	{ name: "Visa...3456", typeId: null, fullNumber: "1234567812343456" },
];

const transactions = [
	{
		datetime: "2025-03-15T10:30",
		category: "Groceries",
		description: "Bought vegetables and fruits",
		amount: 50.25,
		transactionType: "expense",
		paymentMethod: "Visa...1234",
	},
	{
		datetime: "2025-03-15T09:00",
		category: "Salary",
		description: "Monthly salary",
		amount: 3000.0,
		transactionType: "income",
		paymentMethod: "Account...2369",
	},
	{
		datetime: "2025-03-20T19:45",
		category: "Dining",
		description: "Dinner at a restaurant",
		amount: 75.0,
		transactionType: "expense",
		paymentMethod: "Cash",
	},
	{
		datetime: "2025-04-10T08:15",
		category: "Transport",
		description: "Monthly metro pass",
		amount: 100.0,
		transactionType: "expense",
		paymentMethod: "Visa...1234",
	},
	{
		datetime: "2025-04-14T20:00",
		category: "Entertainment",
		description: "Movie tickets",
		amount: 30.0,
		transactionType: "expense",
		paymentMethod: "Cash",
	},
	{
		datetime: "2025-04-14T14:00",
		category: "Freelance",
		description: "Freelance project payment",
		amount: 500.0,
		transactionType: "income",
		paymentMethod: "Account...2369",
	},
	{
		datetime: "2025-04-20T16:30",
		category: "Shopping",
		description: "Bought new clothes",
		amount: 200.0,
		transactionType: "expense",
		paymentMethod: "Visa...1234",
	},
	{
		datetime: "2025-04-22T12:00",
		category: "Gift",
		description: "Received birthday gift",
		amount: 100.0,
		transactionType: "income",
		paymentMethod: "Cash",
	},
];

async function seedPaymentTypes() {
	await connectDB();
	await PaymentType.deleteMany({});
	await PaymentType.insertMany(paymentTypes);
	console.log("Payment types seeded.");
	process.exit(0);
}

async function seedCategories() {
	await connectDB();
	await Category.deleteMany({});
	await Category.insertMany(categories);
	console.log("Categories seeded.");
	process.exit(0);
}

async function seedPaymentMethods() {
	await connectDB();
	await PaymentType.deleteMany({});
	await PaymentType.insertMany(paymentTypes);
	const paymentTypeDocs = await PaymentType.find();
	const paymentTypeMap = {};
	for (const pt of paymentTypeDocs) {
		paymentTypeMap[pt.name] = pt._id;
	}
	await PaymentMethod.deleteMany({});
	const paymentMethodsWithTypeId = [
		{
			name: "Visa...1234",
			typeId: paymentTypeMap["Credit Card"],
			fullNumber: "1234567812341234",
		},
		{ name: "Cash", typeId: paymentTypeMap["Cash"], fullNumber: null },
		{
			name: "Account...2369",
			typeId: paymentTypeMap["Checking Account"],
			fullNumber: "9876543212369",
		},
		{
			name: "Visa...3456",
			typeId: paymentTypeMap["Credit Card"],
			fullNumber: "1234567812343456",
		},
	];
	await PaymentMethod.insertMany(paymentMethodsWithTypeId);
	console.log("Payment methods seeded.");
	process.exit(0);
}

async function seedTransactions() {
	await connectDB();
	await Transaction.deleteMany({});
	await Transaction.insertMany(transactions);
	console.log("Transactions seeded.");
	process.exit(0);
}

// Uncomment the function you want to run
// seedPaymentTypes();
// seedCategories();
// seedPaymentMethods();
// seedTransactions();
