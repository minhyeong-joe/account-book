import express from "express";
const router = express.Router();
import {
	getPaymentMethods,
	createPaymentMethod,
	updatePaymentMethod,
	deletePaymentMethod,
	getPaymentMethodTypes,
} from "../controllers/paymentMethodController.mjs";

// Payment Method routes under "/payment-methods"
router.get("/", getPaymentMethods);
router.post("/", createPaymentMethod);
router.patch("/:id", updatePaymentMethod);
router.delete("/:id", deletePaymentMethod);

// Payment Method Type route
router.get("/types", getPaymentMethodTypes);

export default router;
