import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();

import { connectDB } from "./lib/mongoose.mjs";

// middleware
import { debuggingLogger, errorLogger } from "./utils/middleware/logging.mjs";

// API routes
import paymentMethodRoutes from "./routes/paymentMethodRoutes.mjs";
import categoryRoutes from "./routes/categoryRoutes.mjs";
import transactionRoutes from "./routes/transactionRoutes.mjs";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173" }));
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
app.use("/categories", categoryRoutes);
app.use("/transactions", transactionRoutes);

// catch-all route for 404 errors
app.use((req, res) => {
	res.status(404).json({ message: "Route not found" });
});

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
