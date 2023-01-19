import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../AuthContext'
import Button from '../components/Button'
import Card from '../components/Card'
import { AiOutlinePlus } from 'react-icons/ai'

const Games = () => {
	const { user } = useContext(AuthContext);

	return (
		<div className='w-screen h-screen p-5'>
			<div className="flex flex-col">
				<div className='text-lg font-bold my-3 mb-5'>Your Games</div>
				{user?.games.length === 0 ? (
					<div className='flex flex-col text-7xl text-center font-home my-12 mt-32'>
						<p>No Games</p>
						<p>Found</p>
					</div>
				) : null}
				{user?.games?.map((game, index) => (
					<Card key={index} game={game} player={game?.player1._id === user._id ? 'p1' : 'p2'} />
				))}
				{user?.games.length === 0 ?
					<div className='w-full'>
						<Link to={'/start-game'}>
							<Button variant={'warning'} text={'Start a new game'} />
						</Link>
					</div>
					: <div className='absolute bottom-3 right-3 p-2'>
						<Link to={'/start-game'} className='bg-slate-800 text-white p-3 rounded-lg flex items-center'>
							<AiOutlinePlus className='inline-block mr-2' />
							<button>New Game</button>
						</Link>
					</div>}
			</div>
		</div>
	)
}

export default Games