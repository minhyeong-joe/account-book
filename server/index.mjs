import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
dotenv.config();

import { connectDB } from "./lib/mongoose.mjs";

// middleware
import { debuggingLogger, errorLogger } from "./utils/middleware/logging.mjs";

// API routes
import paymentMethodRoutes from "./routes/paymentMethodRoutes.mjs";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(
	morgan(
		':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" - :response-time ms'
	)
); // Logging middleware for HTTP requests
app.use(debuggingLogger); // Debugging middleware: logs endpoint, params, body, and method

// Routes
app.get("/", (req, res) => {
	res.send("This is root API");
});
// Payment method routes
app.use("/payment-methods", paymentMethodRoutes);

// Error handling middleware (always after all routes)
app.use(errorLogger);

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
