import mongoose from "mongoose";

// ensure required body fields
export const requireBody =
	(...fields) =>
	(req, res, next) => {
		const missing = fields.filter((f) => !req.body[f]);
		if (missing.length) {
			return res
				.status(400)
				.json({ message: `Missing required fields: ${missing.join(", ")}` });
		}
		next();
	};

// validate mongoose ObjectId
export const validateId = (param) => (req, res, next) => {
	if (!mongoose.Types.ObjectId.isValid(req.params[param])) {
		return res.status(400).json({ message: "Invalid ID" });
	}
	next();
};

// wrap async handlers and forward errors
export const asyncHandler = (fn) => (req, res, next) =>
	Promise.resolve(fn(req, res, next)).catch(next);
