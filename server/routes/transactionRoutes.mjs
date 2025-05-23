import express from "express";
const router = express.Router();

import {
	getTransactions,
	getTransactionById,
	createTransaction,
	updateTransaction,
	deleteTransaction,
	deleteBatchTransactions,
} from "../controllers/transactionController.mjs";
import { requireBody, validateId, asyncHandler } from "../utils/validation.mjs";

// Category routes under "/categories"
router.get("/", asyncHandler(getTransactions));
router.get("/:id", validateId("id"), asyncHandler(getTransactionById));
router.post(
	"/",
	requireBody(
		"datetime",
		"category",
		"description",
		"amount",
		"transactionType",
		"paymentMethod"
	),
	asyncHandler(createTransaction)
);
router.put(
	"/:id",
	validateId("id"),
	requireBody(
		"datetime",
		"category",
		"description",
		"amount",
		"transactionType",
		"paymentMethod"
	),
	asyncHandler(updateTransaction)
);
router.delete("/", requireBody("ids"), asyncHandler(deleteBatchTransactions));
router.delete("/:id", validateId("id"), asyncHandler(deleteTransaction));

export default router;
