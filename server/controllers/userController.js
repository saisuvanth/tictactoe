const User = require("../models/User");
const Game = require("../models/Game");
const { checkWin, updateGameBoard } = require("../utils");

exports.getProfile = async (req, res, next) => {
	const userId = req.userId;
	try {
		const user = await User.findById(userId);
		if (!user) {
			const error = new Error("No such user exist");
			error.statusCode = 401; // Not authenticated
			return next(error);
		}
		const games = await Game.find({ $or: [{ player1: userId }, { player2: userId }] })
			.populate(["player1", "player2"]).sort({ updatedAt: -1 });
		res.status(200).json({ _id: user._id, username: user.username, email: user.email, games, });
	} catch (err) {
		if (!err.statusCode) {
			err.statusCode = 500;
		}
		next(err);
	};
};


exports.getGames = async (req, res, next) => {
	const userId = req.userId;
	const games = await Game.find({ $or: [{ player1: userId }, { player2: userId }] }).sort({ updatedAt: 1 });
	console.log(games);
	res.status(200).json({ message: "Fetched games successfully.", games: games });
}


exports.getGame = async (req, res, next) => {
	const gameId = req.params.gameId;
	const game = await Game.findById(gameId)
	// console.log(game);
	if (!game) {
		const error = new Error("No such game exist");
		error.statusCode = 404;
		return next(error);
	}
	if (game.player1.toString() !== req.userId && game.player2.toString() !== req.userId) {
		const error = new Error("Not authorized");
		error.statusCode = 403;
		return next(error);
	}
	res.status(200).json({ message: "Fetched game successfully.", game: game });
};

exports.createGame = async (req, res, next) => {
	const p2mail = req.body.opponent;
	let p1id = req.userId;
	let p2id;
	try {
		const user2 = await User.findOne({ email: p2mail })
		if (!user2) {
			const error = new Error("User 2 does not exist");
			error.statusCode = 404;
			return next(error);
		}
		p2id = user2._id;
		// console.log(p1id, p2id);
		const game = new Game({ player1: p1id, player2: p2id, board: new Array(9).fill(0), status: "p1turn" });
		const gm = await game.save();
		res.status(201).json({ message: "Game created!", gameId: gm._id });
	} catch (err) {
		if (!err.statusCode) {
			err.statusCode = 500;
		}
		next(err);
	}
};

exports.updateGame = async (req, res, next) => {
	const gameId = req.params.gameId;
	const board = req.body.board;
	// console.log(board);
	try {
		const gm = await updateGameBoard(gameId, board, req.userId)
		res.status(200).json({ message: "Game updated successfully.", game: gm });
	} catch (err) {
		console.log(err);
		if (!err.statusCode) {
			err.statusCode = 500;
		}
		next(err);
	}
};

