import React, { useContext, useEffect, useState } from 'react'
import { IoIosArrowBack } from 'react-icons/io'
import { useParams, useNavigate } from 'react-router-dom'
import { AuthContext } from '../AuthContext'
import Board from '../components/Board'
import Button from '../components/Button'
import XPiece from '../components/XPiece'
import useApi from '../hooks/useApi'
import useSocket from '../hooks/useSocket'

const Game = () => {
	const { id } = useParams();
	const { user } = useContext(AuthContext);
	const navigate = useNavigate();
	const { updateGame } = useApi();

	const [gameState, setGameState] = useState();
	const [player, setPlayer] = useState();

	const { updateBoard } = useSocket(id, (gm) => setGameState(gm));

	useEffect(() => {
		console.log(user, id);
		let game = user?.games.find(game => game._id === id);
		setGameState({ ...game })
		setPlayer(user?._id === game?.player1._id ? 1 : 2)
	}, [user, id])

	useEffect(() => {
		if (gameState?.board) {
			console.log(id)
			updateGame({ board: gameState.board, gameId: id }).then(res => console.log(res)).catch(err => console.log(err))
		}
	}, [id])

	const handleClick = (index) => {
		const board = [...gameState.board];
		board[index] = player;
		updateBoard(board)

	}


	return (
		<div className='h-screen w-screen'>
			<div className='flex flex-col p-4 h-full'>
				<div className='my-4'>
					<IoIosArrowBack size={30} onClick={() => navigate(-1)} />
				</div>
				<div className='flex flex-col m-2 h-full'>
					<p className='text-2xl font-bold'>Game with Rookie</p>
					<div className='mb-8'>
						<p className='text-gray-500'>Your Piece</p>
						<XPiece sz={50} />
					</div>
					<Board gameState={gameState} handleClick={handleClick} player={player} />
					{/* <div className='flex w-full mt-10 grow items-end' >
						<Button text={'Submit'} variant={'warning'} handleClick={() => updateBoard(gameState.board)} />
					</div> */}
				</div>
			</div>
		</div>
	)
}

export default Game