const debuggingLogger = (req, res, next) => {
	console.log("[DEBUG] Endpoint called:", req.method, req.originalUrl);
	console.log("[DEBUG] Params:", req.params);
	console.log("[DEBUG] Query:", req.query);
	console.log("[DEBUG] Body:", req.body);
	next();
};

const errorLogger = (err, req, res, next) => {
	console.error("[ERROR]", err.message);
	console.error(err.stack);
	res.status(500).json({ message: "Internal Server Error" });
};

export { debuggingLogger, errorLogger };
