const { Schema, model } = require('mongoose');

const GameSchema = new Schema({
	player1: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	},
	player2: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	},
	status: {
		type: String,
		enum: ['p1turn', 'p2turn', 'p1won', 'p2won', 'draw'],
		required: true
	},
	board: {
		type: Array,
		required: true
	}

}, { timestamps: true });

module.exports = model('Game', GameSchema);
