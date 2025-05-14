import { PaymentType, PaymentMethod } from "../utils/mongo/models.mjs";

// GET /payment-methods - List all payment methods
const getPaymentMethods = async (req, res) => {
	const paymentMethods = await PaymentMethod.find()
		.populate("typeId", "-__v")
		.select("-__v");
	res.status(200).json(paymentMethods);
};

// POST /payment-methods - Create a new payment method
const createPaymentMethod = async (req, res) => {
	const { name, typeId, fullNumber } = req.body;

	// Validate required fields
	if (!name || !typeId) {
		return res.status(400).json({ message: "Name and typeId are required" });
	}

	// Check if payment method already exists
	const existingPaymentMethod = await PaymentMethod.findOne({ name });
	if (existingPaymentMethod) {
		return res.status(400).json({ message: "Payment method already exists" });
	}

	// Create new payment method
	const newPaymentMethod = new PaymentMethod({
		name,
		typeId,
		fullNumber,
	});
	await newPaymentMethod.save();

	res.status(201).json(newPaymentMethod);
};

// PATCH /payment-methods/:id - Update a payment method
const updatePaymentMethod = async (req, res) => {
	const { name, typeId, fullNumber } = req.body;

	// Validate required fields
	if (!name || !typeId) {
		return res.status(400).json({ message: "Name and typeId are required" });
	}

	// Check if payment method exists
	const paymentMethod = await PaymentMethod.findByIdAndUpdate(
		req.params.id,
		{ name, typeId, fullNumber },
		{ new: true }
	).select("-__v");
	if (!paymentMethod) {
		return res.status(404).json({ message: "Payment method not found" });
	}

	res.status(200).json(paymentMethod);
};

// DELETE /payment-methods/:id - Delete a payment method
const deletePaymentMethod = async (req, res) => {
	// Check if payment method exists
	const paymentMethod = await PaymentMethod.findByIdAndDelete(req.params.id);
	if (!paymentMethod) {
		return res.status(404).json({ message: "Payment method not found" });
	}

	res.status(204).send();
};

// GET /payment-method/types - List all payment method types
const getPaymentMethodTypes = async (req, res) => {
	const paymentTypes = await PaymentType.find().select("-__v");
	res.status(200).json(paymentTypes);
};

export {
	getPaymentMethods,
	createPaymentMethod,
	updatePaymentMethod,
	deletePaymentMethod,
	getPaymentMethodTypes,
};
