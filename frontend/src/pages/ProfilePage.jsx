import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
	useGetUserDetailsQuery,
	useUpdateUserMutation,
} from '../slices/usersApiSlice';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loader from '../components/UI/Loader';

const ProfilePage = () => {
	const { id: userId } = useParams();

	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');

	const {
		data: user,
		isLoading,
		refetch,
		error,
	} = useGetUserDetailsQuery(userId);

	const [updateUser, { isLoading: loadingUpdate }] = useUpdateUserMutation();

	const navigate = useNavigate();

	useEffect(() => {
		if (user) {
			setFirstName(user.firstName);
			setLastName(user.lastName);
			setEmail(user.email);
		}
	}, [user]);

	const submitHandler = async (e) => {
		e.preventDefault();
		try {
			await updateUser({ userId, firstName, lastName, email });
			toast.success('User updated!');
			refetch();
			navigate('/');
		} catch (error) {
			toast.error(error?.data?.message || error.error);
		}
	};

	if (isLoading) {
		return <Loader />;
	}

	return (
		<div className="space-y-5 p-10">
			<Link to="/">
				<button className="rounded-lg border border-creased-khaki bg-emerald-green p-3 text-creased-khaki">
					Go Back
				</button>
			</Link>
			<div className="flex w-full flex-col space-y-5 place-self-center rounded border border-creased-khaki bg-emerald-green p-10 text-off-white md:w-1/2">
				<h1 className="text-3xl">Welcome, {user.firstName}.</h1>
				{loadingUpdate && <Loader />}
				{isLoading ? (
					<Loader />
				) : (
					<form onSubmit={submitHandler} className="space-y-3">
						<fieldset id="name" className="flex flex-col space-y-1">
							<label>First Name</label>
							<input
								type="name"
								placeholder="Enter name"
								value={firstName}
								onChange={(e) => setFirstName(e.target.value)}
								className="p-2 text-black"
							></input>
						</fieldset>
						<fieldset id="name" className="flex flex-col space-y-1">
							<label>Last Name</label>
							<input
								type="name"
								placeholder="Enter name"
								value={lastName}
								onChange={(e) => setLastName(e.target.value)}
								className="p-2 text-black"
							></input>
						</fieldset>
						<fieldset id="email" className="flex flex-col space-y-1">
							<label>Email</label>
							<input
								type="email"
								placeholder="Enter price"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								className="p-2 text-black"
							></input>
						</fieldset>
						<button
							type="submit"
							className="rounded-lg border border-creased-khaki p-3"
						>
							Update
						</button>
					</form>
				)}
			</div>
		</div>
	);
};

export default ProfilePage;
