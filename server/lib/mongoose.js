require("dotenv").config();
const mongoose = require("mongoose");

const MONGO_URI = process.env.MONGO_DB_URI;

const clientOptions = {
	serverApi: {
		version: "1",
		strict: true,
		deprecationErrors: true,
	},
};

const connectDB = async () => {
	try {
		if (!MONGO_URI) {
			throw new Error("Missing required environment variable: MONGO_DB_URI");
		}
		await mongoose.connect(MONGO_URI, clientOptions);
		await mongoose.connection.db.admin().command({ ping: 1 });
		console.log("Connected to MongoDB successfully");
	} catch (error) {
		console.error("Error connecting to MongoDB:", error);
		process.exit(1); // Exit process with failure
	}
};

module.exports = { connectDB };
