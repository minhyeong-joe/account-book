import { Category } from "../utils/mongo/models.mjs";

// GET /categories - List all categories
const getCategories = async (req, res) => {
	const { type } = req.query;
	let filter = {};
	if (type) {
		const VALID_TYPES = ["income", "expense"];
		let typeLower = type.toLowerCase();
		if (!VALID_TYPES.includes(typeLower)) {
			return res
				.status(400)
				.json({ message: `Type must be one of ${VALID_TYPES.join(", ")}` });
		}
		filter = { type: typeLower };
	}
	const categories = await Category.find(filter).select("-__v");
	res.status(200).json(categories);
};

// POST /categories - Create a new category
const createCategory = async (req, res) => {
	const { name, type } = req.body;
	// Validate type
	const VALID_TYPES = ["income", "expense"];
	if (!VALID_TYPES.includes(type)) {
		return res
			.status(400)
			.json({ message: `Type must be one of ${VALID_TYPES.join(", ")}` });
	}
	// Check if category with the same name and type already exists
	const existingCategory = await Category.findOne({ name, type });
	if (existingCategory) {
		return res.status(400).json({ message: "Category already exists" });
	}
	const newCategory = new Category({
		name,
		type,
	});
	await newCategory.save();

	res.status(201).json(newCategory);
};

// PATCH /categories/:id - Update a category
const updateCategory = async (req, res) => {
	const { name } = req.body;
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

// DELETE /categories/:id - Delete a category
const deleteCategory = async (req, res) => {
	const category = await Category.findByIdAndDelete(req.params.id);
	if (!category) {
		return res.status(404).json({ message: "Category not found" });
	}
	res.status(204).send();
};

export { getCategories, createCategory, updateCategory, deleteCategory };
