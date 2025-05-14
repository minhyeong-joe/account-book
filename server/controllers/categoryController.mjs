import { Category } from "../utils/mongo/models.mjs";
import mongoose from "mongoose";

const getCategories = async (req, res) => {
	const categories = await Category.find().select("-__v");
	res.status(200).json(categories);
};

const createCategory = async (req, res) => {
	const { name, type } = req.body;

	// Validate required fields
	if (!name || !type) {
		return res.status(400).json({ message: "Name and Type are required" });
	}

	// Check if category with the same name and type already exists
	const existingCategory = await Category.findOne({ name, type });
	if (existingCategory) {
		return res.status(400).json({ message: "Category already exists" });
	}

	// Create new category
	const newCategory = new Category({
		name,
		type,
	});
	await newCategory.save();

	res.status(201).json(newCategory);
};

const updateCategory = async (req, res) => {
	const { name } = req.body;

	// Validate required fields
	if (!name) {
		return res.status(400).json({ message: "Name is required" });
	}

	// validate category ID
	if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
		return res.status(400).json({ message: "Invalid category ID" });
	}

	// Check if category exists
	const category = await Category.findByIdAndUpdate(
		req.params.id,
		{ name },
		{ new: true }
	).select("-__v");
	if (!category) {
		return res.status(404).json({ message: "Category not found" });
	}

	res.status(200).json(category);
};

const deleteCategory = async (req, res) => {
	// validate category ID
	if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
		return res.status(400).json({ message: "Invalid category ID" });
	}

	// Check if category exists
	const category = await Category.findByIdAndDelete(req.params.id);
	if (!category) {
		return res.status(404).json({ message: "Category not found" });
	}

	res.status(200).json({ message: "Category deleted successfully" });
};

export { getCategories, createCategory, updateCategory, deleteCategory };
