import mongoose from "mongoose";

import { Transaction } from "../utils/mongo/models.mjs";
import {
	getMonthDatetimeRangeFilter,
	getYearDatetimeRangeFilter,
} from "../utils/datetime.mjs";

// GET /transactions - List all transactions
// optional query params for filtering:
// - year: YYYY
// - month: M or MM
// - type: "income" or "expense"
// - paymentMethod: payment method search term (similarity search)
// - category: category search term (similarity search)
// - description: description search term (similarity search)
const getTransactions = async (req, res) => {
	const { year, month, type, paymentMethod, category, description } = req.query;

	// Build the query object
	const query = {};
	if (year) {
		if (month) {
			query.datetime = getMonthDatetimeRangeFilter(year, month);
		} else {
			query.datetime = getYearDatetimeRangeFilter(year);
		}
	}
	if (month && !year) {
		return res
			.status(400)
			.json({ message: "Month filter requires year filter" });
	}
	if (type) {
		const VALID_TYPES = ["income", "expense"];
		let typeLower = type.toLowerCase();
		if (!VALID_TYPES.includes(typeLower)) {
			return res
				.status(400)
				.json({ message: `Type must be one of ${VALID_TYPES.join(", ")}` });
		}
		query.transactionType = typeLower;
	}
	if (paymentMethod) {
		query.paymentMethod = { $regex: paymentMethod, $options: "i" };
	}
	if (category) {
		query.category = { $regex: category, $options: "i" };
	}
	if (description) {
		query.description = { $regex: description, $options: "i" };
	}

	const transactions = await Transaction.find(query).select("-__v");
	res.status(200).json(transactions);
};

// POST /transactions - Create a new transaction
const createTransaction = async (req, res) => {
	const {
		datetime,
		transactionType,
		paymentMethod,
		category,
		description,
		amount,
	} = req.body;
	// Validate transaction type
	const VALID_TYPES = ["income", "expense"];
	let typeLower = transactionType.toLowerCase();
	if (!VALID_TYPES.includes(typeLower)) {
		return res.status(400).json({
			message: `Transaction type must be one of ${VALID_TYPES.join(", ")}`,
		});
	}
	const newTransaction = new Transaction({
		datetime,
		transactionType: typeLower,
		paymentMethod,
		category,
		description,
		amount,
	});
	await newTransaction.save();

	res.status(201).json(newTransaction);
};

// PATCH /transactions/:id - Update a transaction
const updateTransaction = async (req, res) => {
	const {
		datetime,
		transactionType,
		paymentMethod,
		category,
		description,
		amount,
	} = req.body;
	const VALID_TYPES = ["income", "expense"];
	let typeLower = transactionType.toLowerCase();
	const transaction = await Transaction.findByIdAndUpdate(
		req.params.id,
		{
			datetime,
			transactionType: typeLower,
			paymentMethod,
			category,
			description,
			amount,
		},
		{ new: true }
	).select("-__v");
	if (!transaction) {
		return res.status(404).json({ message: "Transaction not found" });
	}

	res.status(200).json(transaction);
};

// DELETE /transactions/:id - Delete a transaction
const deleteTransaction = async (req, res) => {
	const transaction = await Transaction.findByIdAndDelete(req.params.id);
	if (!transaction) {
		return res.status(404).json({ message: "Transaction not found" });
	}

	res.status(204).send();
};

// DELETE /transactions - Batch delete transactions based on 'ids' payload
const deleteBatchTransactions = async (req, res) => {
	let { ids } = req.body;
	if (typeof ids === "string") {
		ids = [ids];
	}
	for (const id of ids) {
		if (!mongoose.Types.ObjectId.isValid(id)) {
			return res.status(400).json({ message: "Invalid ID" });
		}
	}
	const transactions = await Transaction.deleteMany({
		_id: { $in: ids },
	});
	if (transactions.deletedCount === 0) {
		return res.status(404).json({ message: "No transactions found" });
	}

	res.status(204).send();
};

export {
	getTransactions,
	createTransaction,
	updateTransaction,
	deleteTransaction,
	deleteBatchTransactions,
};
