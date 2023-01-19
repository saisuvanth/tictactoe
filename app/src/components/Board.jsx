import React from 'react'
import OPiece from './OPiece'
import XPiece from './XPiece'

const samePlayer = (state, player) => {
	return state.status === 'p1turn' ? player === 1 ? true : false : state.status === 'p2turn' ? player === 2 ? true : false : false;
}

const Board = ({ gameState, handleClick, player }) => {


	return (
		<div className='flex flex-col bg-yellow-200'>
			<div className='my-2 text-base font-semibold text-center'>
				{ }
				{gameState?.status === 'p1turn' && player === 1 ? 'Your Move' : gameState?.status === 'p2turn' && player === 2 ? 'Your Move' : gameState?.status === 'p1won' ? player === 1 ? 'You Won' : 'You Lost' : gameState?.status === 'p2won' ? player === 2 ? 'You Won' : 'You Lost' : gameState?.status === 'draw' ? 'Draw' : 'Waiting for Opponent\'n'}
			</div>
			<div className='grid gap-1.5 grid-flow-row grid-cols-3'>
				{gameState?.board?.map((state, index) => (
					<div key={index} className='cell' onClick={samePlayer(gameState, player) ? () => handleClick(index) : () => { console.log('hehe') }}>
						{state === player ? <XPiece sz={90} /> : state === (player === 1 ? 2 : 1) ? <OPiece sz={90} /> : null}
					</div>
				))}
			</div>
		</div>
	)
}


export default Board