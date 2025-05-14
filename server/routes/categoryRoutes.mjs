import express from "express";
const router = express.Router();

import {
	getCategories,
	createCategory,
	updateCategory,
	deleteCategory,
} from "../controllers/categoryController.mjs";

// Category routes under "/categories"
router.get("/", getCategories);
router.post("/", createCategory);
router.patch("/:id", updateCategory);
router.delete("/:id", deleteCategory);

export default router;
