import { useState, useEffect, useContext } from 'react';
import { io } from 'socket.io-client';
import { AuthContext } from '../AuthContext';

const useSocket = (room, updateCb) => {
	const { user } = useContext(AuthContext);
	const [socket, setSocket] = useState(null);
	const [roomId, setRoomId] = useState(room);


	useEffect(() => {
		const newSocket = io('http://localhost:3002', {
			auth: { id: user?._id }, transports: ['websocket']
		});
		newSocket.emit('join', roomId)
		setSocket(newSocket);

		return () => {
			if (socket) {
				socket.disconnect();
			}
		}

	}, [user, roomId]);

	useEffect(() => {
		if (socket)
			socket.on('updateBoard', (data) => {
				console.log('recieving ', data);
				if (data)
					updateCb(data);
			})

	}, [socket])

	const updateBoard = (board) => {
		socket.emit('updateBoard', { board, roomId });
	}

	return { socket, updateBoard }

}

export default useSocket;