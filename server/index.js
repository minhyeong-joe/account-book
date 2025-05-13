const express = require("express");
require("dotenv").config();
const { connectDB } = require("./lib/mongoose");
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Routes
app.get("/", (req, res) => {
	res.send("This is root API");
});

/* startServer: await DB connection before listening */
async function startServer() {
	try {
		await connectDB();
		app.listen(PORT, () => {
			console.log(`Server is running on http://localhost:${PORT}`);
		});
	} catch (error) {
		console.error("Failed to connect to MongoDB", error);
		process.exit(1);
	}
}

startServer();
