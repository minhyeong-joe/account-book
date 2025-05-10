require("dotenv").config();
const mongoose = require("mongoose");

const clientOptions = {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	serverApi: {
		version: "1",
		strict: true,
		deprecationErrors: true,
	},
};

const connectDB = async () => {
	console.log(process.env.MONGO_DB_URI);

	try {
		await mongoose.connect(process.env.MONGO_DB_URI, clientOptions);
		await mongoose.connection.db.admin().command({ ping: 1 });
		console.log("Connected to MongoDB successfully");
	} catch (error) {
		console.error("Error connecting to MongoDB:", error);
		process.exit(1); // Exit process with failure
	}
};

module.exports = { connectDB };
