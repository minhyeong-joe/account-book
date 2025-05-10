const express = require("express");
const { connectDB } = require("./lib/mongoose");
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// connect to MongoDB
connectDB();

// Routes
app.get("/", (req, res) => {
	res.send("Welcome to the Express server!");
});

// Start the server
app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
