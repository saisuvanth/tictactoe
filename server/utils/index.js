const Game = require('../models/Game')

const checkWin = (board) => {
	const winConditions = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	];

	for (let i = 0; i < winConditions.length; i++) {
		const [a, b, c] = winConditions[i];
		if (board[a] && board[a] === board[b] && board[a] === board[c]) {
			return board[a];
		}
	}
	//draw check
	if (board.every((el) => el !== 0)) return 3;
	return 0;
}

const updateGameBoard = async (gameId, board, userId) => {
	const game = await Game.findById(gameId)
	console.log(userId, gameId)
	if (!game) {
		const error = new Error("No such game exist");
		error.statusCode = 404;
		throw error
	}
	if (game.board.toString() === board.toString()) {
		const error = new Error("No changes made");
		error.statusCode = 403;
		throw error
	}
	if (game.player1.toString() === userId && game.status !== "p1turn") {
		const error = new Error("Not your turn");
		error.statusCode = 403;
		throw error
	}
	if (game.player2.toString() === userId && game.status !== "p2turn") {
		const error = new Error("Not your turn");
		error.statusCode = 403;
		throw error
	}
	if (game.player1.toString() !== userId && game.player2.toString() !== userId) {
		const error = new Error("Not authorized");
		error.statusCode = 403;
		throw error
	}
	if (game.status === "p1won" || game.status === "p2won" || game.status === "draw") {
		const error = new Error("Game is already over");
		error.statusCode = 403;
		throw error
	}

	if (checkWin(board) === 1) game.status = "p1won";
	else if (checkWin(board) === 2) game.status = "p2won";
	else if (checkWin(board) === 3) game.status = "draw";
	else {
		if (game.status === "p1turn") game.status = "p2turn";
		else game.status = "p1turn";
	}
	game.board = board;
	const gm = await game.save();
	return game;
}

module.exports = { checkWin, updateGameBoard };
