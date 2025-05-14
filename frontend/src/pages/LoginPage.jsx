import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/UI/Loader';
import { useLoginMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';

const LoginPage = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [login, { isLoading }] = useLoginMutation();
	const { userInfo } = useSelector((state) => state.auth);

	//Handle redirects
	const { search } = useLocation();
	const searchParams = new URLSearchParams(search);
	const redirect = searchParams.get('redirect') || '/';

	useEffect(() => {
		if (userInfo) {
			if (userInfo.requiresPasswordReset) {
				navigate('/reset-password');
			} else {
				navigate(redirect);
			}
		}
	}, [userInfo, redirect, navigate]);

	const submitHandler = async (e) => {
		e.preventDefault();
		try {
			const res = await login({ email, password }).unwrap();
			dispatch(setCredentials({ ...res }));
		} catch (error) {
			toast.error(error?.data?.message || error.error);
		}
	};

	return (
		<div className="mx-auto flex w-full max-w-[1440px] flex-col place-items-center space-y-4 px-10 py-5">
			<h1 className="text-4xl font-bold text-off-white">Sign In</h1>
			<form
				onSubmit={submitHandler}
				className="flex w-full max-w-96 flex-col space-y-4"
			>
				<div>
					<label className="block text-xl text-off-white" htmlFor="email">
						Email Address
					</label>
					<input
						id="email"
						type="email"
						className="h-10 w-full p-2"
						onChange={(e) => setEmail(e.target.value)}
					></input>
				</div>
				<div>
					<label className="block text-xl text-off-white" htmlFor="password">
						Password
					</label>
					<input
						id="password"
						type="password"
						className="h-10 w-full p-2"
						onChange={(e) => setPassword(e.target.value)}
					></input>
				</div>
				<button
					className="mx-auto h-12 w-1/2 bg-creased-khaki p-2 text-xl"
					disabled={isLoading}
				>
					Login
				</button>
				{isLoading && <Loader />}
			</form>
			<div className="text-off-white">
				...or
				<Link
					to={redirect ? `/register?redirect=${redirect}` : '/register'}
					className="text-creased-khaki underline"
				>
					{' '}
					sign-up today!
				</Link>
			</div>
		</div>
	);
};

export default LoginPage;
