const jwt = require("jsonwebtoken");

exports.isAuth = (req, res, next) => {
	const authHeader = req.get("Authorization");

	if (!authHeader) {
		const error = new Error("Not authenticated");
		error.statusCode = 401;
		return next(error);
	}

	const token = authHeader.split(" ")[1];

	let decodedToken;

	try {
		decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
	} catch (err) {
		err.statusCode = 500;
		return next(err);
	}

	if (!decodedToken) {
		const error = new Error("Not authenticated");
		error.statusCode = 401;
		return next(error);
	}

	req.userId = decodedToken.userId;
	next();
};





exports.errorHandler = (err, req, res, next) => {
	const status = err.statusCode || 500;
	const message = err.message;
	res.status(status).json({ message: message })
}
