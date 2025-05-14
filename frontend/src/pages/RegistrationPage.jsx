import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/UI/Loader';
import { useRegisterMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';

const RegistrationPage = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [register, { isLoading }] = useRegisterMutation();

	const { userInfo } = useSelector((state) => state.auth);

	//Handle redirects
	const { search } = useLocation();
	const searchParams = new URLSearchParams(search);
	const redirect = searchParams.get('redirect') || '/';

	useEffect(() => {
		if (userInfo) {
			navigate(redirect);
		}
	}, [userInfo, redirect, nav]);

	const submitHandler = async (e) => {
		e.preventDefault();
		if (password !== confirmPassword) {
			toast.error('Passwords do not match.');
		} else {
			try {
				const res = await register({
					email,
					password,
					firstName,
					lastName,
				}).unwrap();
				dispatch(setCredentials({ ...res }));
				navigate(redirect);
			} catch (err) {
				toast.error(err?.data?.message || err.message);
			}
		}
	};

	return (
		<div className="mx-auto flex w-full max-w-[1440px] flex-col place-items-center space-y-4 px-10 py-5">
			<h1 className="text-4xl font-bold text-off-white">Create an Account</h1>
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
					<label className="block text-xl text-off-white" htmlFor="firstName">
						First Name
					</label>
					<input
						id="firstName"
						type="firstName"
						className="h-10 w-full p-2"
						onChange={(e) => setFirstName(e.target.value)}
					></input>
				</div>
				<div>
					<label className="block text-xl text-off-white" htmlFor="lastName">
						Last Name
					</label>
					<input
						id="lastName"
						type="lastName"
						className="h-10 w-full p-2"
						onChange={(e) => setLastName(e.target.value)}
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
				<div>
					<label
						className="block text-xl text-off-white"
						htmlFor="confirmPassword"
					>
						Confirm Password
					</label>
					<input
						id="confirmPassword"
						type="password"
						className="h-10 w-full p-2"
						onChange={(e) => setConfirmPassword(e.target.value)}
					></input>
				</div>
				<button
					className="mx-auto h-12 w-1/2 bg-creased-khaki p-2 text-xl"
					disabled={isLoading}
				>
					Create Account
				</button>
				{isLoading && <Loader />}
			</form>
			<div className="text-off-white">
				...or
				<Link
					to={redirect ? `/login?redirect=${redirect}` : '/login'}
					className="text-creased-khaki underline"
				>
					{' '}
					login with your existing account.
				</Link>
			</div>
		</div>
	);
};

export default RegistrationPage;
