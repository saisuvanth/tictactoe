require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { connect } = require('mongoose');
const { errorHandler } = require('./middleware');
const authRouter = require('./routes/authRouter');
const userRouter = require('./routes/userRouter');
const app = express();
const server = require('http').createServer(app);
const { Server } = require('socket.io');
const { updateGameBoard } = require('./utils');
const io = new Server(server, {
	cors: {
		origin: '*',
		credentials: true
	}
});

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use(authRouter)
app.use(userRouter);


app.use(errorHandler)

io.use((socket, next) => {
	const id = socket.handshake.auth.id;
	if (!id) {
		return next(new Error('invalid id'))
	}
	socket.userId = id;
	next();
})

io.on('connection', (socket) => {
	console.log('a user connected');
	socket.join(socket.userId);

	socket.on('disconnect', () => {
		console.log('user disconnected');
	});

	socket.on('join', (room) => {
		socket.join(room);
		console.log('joined room: ' + room);
	})

	socket.on('updateBoard', async ({ board, roomId }) => {
		console.log('updateBoard: ' + board, roomId);
		let gm;
		try {
			gm = await updateGameBoard(roomId, board, socket.userId)
		} catch (err) {
			console.log(err);
		} finally {
			io.to(roomId).emit('updateBoard', gm);
		}
	})

	socket.on('message', ({ message, room }) => {
		console.log(message);
		socket.to(room).emit('message', message);
	})
});


connect(process.env.MONGODB_URI)
	.then((result) => {
		server.listen(process.env.PORT, () => {
			console.log(`Server is running on port ${process.env.PORT}`);
		});
	})
	.catch((err) => {
		console.log(err);
	});