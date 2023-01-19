import React, { useRef, useState } from 'react'
import { IoIosArrowBack } from 'react-icons/io'
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button'
import useApi from '../hooks/useApi';

const Login = () => {
	const form = useRef();
	const navigate = useNavigate();
	const { login } = useApi();
	const [message, setMessage] = useState(false)

	const handleClick = () => {
		form.current.requestSubmit();
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		const formData = new FormData(e.target);
		const data = Object.fromEntries(formData);
		console.log(data);
		login(data).then(res => {
			console.log(res);
			localStorage.setItem('token', res.token);
			setMessage({ status: 200, message: 'User logged in' });
			setTimeout(() => {
				navigate('/games');
			}, 1000)
		}).catch(err => {
			setMessage({ status: 400, message: err.message });
		})
	}

	return (
		<div className='w-screen h-screen'>
			<div className='flex flex-col h-full justify-between'>
				<div className='m-4'>
					<IoIosArrowBack size={30} onClick={() => navigate(-1)} />
				</div>
				<div className='flex flex-grow flex-col p-7'>
					<div className='flex flex-col mb-5'>
						<p className='font-sm font-bold mb-2'>Login</p>
						<p className='text-4xl font-bold'>Please enter your details</p>
					</div>
					<form ref={form} onSubmit={handleSubmit}>
						<div className='flex flex-col my-4'>
							<label className='label' htmlFor="username">Username</label>
							<input className='input' type="text" name="username" id="username" />
						</div>
						<div className='flex flex-col'>
							<label className='label' htmlFor="password">Password</label>
							<input className='input' type="password" name="password" id="passsword" />
						</div>
					</form>
				</div>
				<div className='mx-6 btn-primary'>
					{message && <div className={`text-center w-full py-3 rounded text-white text-base font-semibold ${message.status === 200 ? 'bg-green-400' : 'bg-red-400'}`}>{message.message}</div>}
				</div>
				<div className='w-full p-6'>
					<Button text={'Login'} variant='warning' handleClick={handleClick} />
				</div>
			</div>
		</div>
	)
}

export default Login