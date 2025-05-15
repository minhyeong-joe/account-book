import express from "express";
const router = express.Router();

import {
	getCategories,
	createCategory,
	updateCategory,
	deleteCategory,
} from "../controllers/categoryController.mjs";
import { requireBody, validateId, asyncHandler } from "../utils/validation.mjs";

// Category routes under "/categories"
router.get("/", asyncHandler(getCategories));
router.post("/", requireBody("name", "type"), asyncHandler(createCategory));
router.patch(
	"/:id",
	validateId("id"),
	requireBody("name"),
	asyncHandler(updateCategory)
);
router.delete("/:id", validateId("id"), asyncHandler(deleteCategory));

export default router;
