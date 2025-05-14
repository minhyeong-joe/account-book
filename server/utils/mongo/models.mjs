import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		unique: true,
	},
	type: {
		type: String,
		enum: ["income", "expense"],
		required: true,
	},
});

const PaymentTypeSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		unique: true,
	},
});

const PaymentMethodSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	typeId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "PaymentType",
		required: true,
	},
	fullNumber: {
		type: String,
		required: false,
	},
});

const TransactionSchema = new mongoose.Schema({
	datetime: {
		type: Date,
		required: true,
	},
	category: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	amount: {
		type: Number,
		required: true,
	},
	transactionType: {
		type: String,
		enum: ["income", "expense"],
		required: true,
	},
	paymentMethod: {
		type: String,
		required: true,
	},
});

const Category = mongoose.model("Category", CategorySchema);
const PaymentType = mongoose.model("PaymentType", PaymentTypeSchema);
const PaymentMethod = mongoose.model("PaymentMethod", PaymentMethodSchema);
const Transaction = mongoose.model("Transaction", TransactionSchema);

export { Category, PaymentType, PaymentMethod, Transaction };
