import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useChangePasswordMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/authSlice';
import { clearCart } from '../slices/cartSlice';
import { useDispatch } from 'react-redux';

const ResetPasswordPage = () => {
	const [newPassword, setNewPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [resetPassword, { isLoading }] = useChangePasswordMutation();

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (newPassword !== confirmPassword) {
			alert('Passwords do not match');
			return;
		}

		try {
			await resetPassword({ newPw: newPassword });
			dispatch(logout());
			dispatch(clearCart());
			navigate('/login');
		} catch (err) {
			console.error('Failed to reset password:', err);
		}
	};

	return (
		<div className="flex h-full grow place-items-center">
			<div className="mx-auto mt-8 flex h-72 max-w-lg justify-center rounded-lg bg-creased-khaki p-6 text-noir-de-vigne shadow">
				<div className="flex w-full flex-col pr-6">
					<h2 className="mb-4 text-2xl font-bold">Set New Password</h2>
					<caption className="w-full text-left text-sm">
						An admin has initiated a password reset for your account.
					</caption>
				</div>
				<form onSubmit={handleSubmit} className="w-96">
					<div className="mb-4">
						<label className="mb-2 block">New Password</label>
						<input
							type="password"
							value={newPassword}
							onChange={(e) => setNewPassword(e.target.value)}
							className="w-full rounded border p-2"
							required
							minLength={8}
						/>
					</div>
					<div className="mb-4">
						<label className="mb-2 block">Confirm Password</label>
						<input
							type="password"
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
							className="w-full rounded border p-2"
							required
							minLength={8}
						/>
					</div>
					<button
						type="submit"
						disabled={isLoading}
						className="w-full rounded bg-emerald-green p-2 text-white hover:bg-wasabi"
					>
						{isLoading ? 'Resetting...' : 'Reset Password'}
					</button>
				</form>
			</div>
		</div>
	);
};

export default ResetPasswordPage;
