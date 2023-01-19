const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");
const Game = require("../models/Game");

exports.signup = async (req, res, next) => {
	const email = req.body.email;
	const username = req.body.username;
	const password = req.body.password;
	const name = req.body.name;

	const user = new User({
		email, password, username, name, games: [],
	});
	try {
		const us = await user.save();
		res.status(201).json({ message: "User created!", userid: us._id });
	} catch (err) {
		console.log(err);
		if (!err.statusCode) {
			err.statusCode = 500;
		}
		next(err);
	};
};

exports.login = async (req, res, next) => {
	const username = req.body.username;
	const password = req.body.password;

	const user = await User.findOne({ username: username })
	if (!user) {
		const error = new Error("No such user exist");
		error.statusCode = 401;
		return next(error);
	}

	if (!bcrypt.compare(password, user.password)) {
		const error = new Error("Wrong password");
		error.statusCode = 401;
		return next(error);
	}

	try {

		const token = jwt.sign({ email: user.email, userId: user._id, },
			process.env.JWT_SECRET_KEY, { expiresIn: "1d", }
		);

		res.status(200).json({ token: token, userId: user._id.toString() });
	} catch (err) {
		if (!err.statusCode) {
			err.statusCode = 500;
		}
		next(err);
	};
};

