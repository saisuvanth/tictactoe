import React, { useRef, useState } from 'react'
import { IoIosArrowBack } from 'react-icons/io'
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button'
import useApi from '../hooks/useApi';

const StartGame = () => {
	const form = useRef();
	const navigate = useNavigate();
	const { createGame } = useApi();
	const [message, setMessage] = useState(false);

	const handleClick = () => form.current.requestSubmit();

	const handleSubmit = (e) => {
		e.preventDefault();
		const formData = new FormData(e.target);
		const data = Object.fromEntries(formData);
		console.log(data);
		createGame({ opponent: data.email }).then(res => {
			if (res) {
				setMessage({ status: 200, message: 'Game created' });
				setTimeout(() => {
					navigate(`/games`);
				}, 1000);
			}
			console.log(res);
		}).catch(err => {
			console.log(err);
			setMessage({ status: 400, message: err.data.message });
		})
	}

	return (
		<div className='h-screen w-screen'>
			<div className='flex flex-col justify-between p-4 h-full'>
				<div className='my-4'>
					<IoIosArrowBack size={30} onClick={() => navigate(-1)} />
				</div>
				<div className='flex flex-col m-3'>
					<p className='font-bold text-md'>Start a new game</p>
					<p className='font-bold text-3xl my-4'>Whom do you want to play with?</p>
				</div>
				<div className='flex flex-grow m-3 w-11/12'>
					<form ref={form} className='w-full' onSubmit={handleSubmit}>
						<div className='flex flex-col'>
							<label htmlFor="email" className='label ml-1'>
								Email
							</label>
							<input className='input' type="email" name="email" id="email" placeholder='Type their email here' />
						</div>
					</form>
				</div>
				<div className='m-2 btn-primary'>
					{message && <div className={`text-center w-full py-3 rounded text-white text-base font-semibold ${message.status === 200 ? 'bg-green-400' : 'bg-red-400'}`}>{message.message}</div>}
				</div>
				<div className='flex items-end m-2'>
					<Button text={"Start a New Game"} variant={'warning'} handleClick={handleClick} />
				</div>
			</div>
		</div>
	)
}

export default StartGame