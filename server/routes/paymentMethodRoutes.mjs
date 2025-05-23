import express from "express";
const router = express.Router();
import {
	getPaymentMethods,
	createPaymentMethod,
	updatePaymentMethod,
	deletePaymentMethod,
	getPaymentMethodTypes,
} from "../controllers/paymentMethodController.mjs";
import { requireBody, validateId, asyncHandler } from "../utils/validation.mjs";

// Payment Method routes under "/payment-methods"
router.get("/", asyncHandler(getPaymentMethods));
router.post(
	"/",
	requireBody("name", "typeId"),
	asyncHandler(createPaymentMethod)
);
router.put(
	"/:id",
	validateId("id"),
	requireBody("name", "typeId"),
	asyncHandler(updatePaymentMethod)
);
router.delete("/:id", validateId("id"), asyncHandler(deletePaymentMethod));

// Payment Method Type route
router.get("/types", asyncHandler(getPaymentMethodTypes));

export default router;
