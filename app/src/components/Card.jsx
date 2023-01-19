import React from 'react'
import { Link } from 'react-router-dom'
import Button from './Button'

const turnCheck = (status, player) => {
	if (status === 'p1turn' && player === 'p1') {
		return true;
	} else if (status === 'p2turn' && player === 'p2') {
		return true;
	} else {
		return false;
	}
}

const checkWin = (status, player) => {
	if (status === 'p1won' && player === 'p1') {
		return true;
	} else if (status === 'p2won' && player === 'p2') {
		return true;
	} else {
		return false;
	}
}

const checkLoss = (status, player) => {
	if (status === 'p2won' && player === 'p1') {
		return true;
	} else if (status === 'p1won' && player === 'p2') {
		return true;
	} else {
		return false;
	}
}
const Card = ({ game, player }) => {
	return (
		<div className='flex flex-col mb-3 p-4 rounded-lg box'>
			<div className='text-2xl font-semibold'>
				Game with {player === 'p1' ? game?.player1.name : game?.player2.name}
			</div>
			<div className='flex flex-col'>
				<div>
					{checkWin(game.status, player) ? 'You won!' : checkLoss(game.status, player) ? 'You lose :(' : turnCheck(game.status, player) ? 'Your turn' : 'Opponent\'s turn'}
				</div>
				<div>
					{ }
				</div>
			</div>
			<div className='my-2'>
				{new Date(game.updatedAt).toLocaleString()}
			</div>
			<div className='px-2 mt-2'>
				<Link to={`/game/${game._id}`}>
					<Button variant={'warning'} text={['p2won', 'p1won'].includes(game.status) ? 'View Game' : 'Play!'} />
				</Link>
			</div>
		</div>
	)
}

export default Card