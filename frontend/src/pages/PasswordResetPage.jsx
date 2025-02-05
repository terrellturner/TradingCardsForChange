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

    const nav = useNavigate();
    const dis = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        try {
            await resetPassword({ newPw: newPassword });
            dis(logout())
            dis(clearCart());
            nav('/login');
        } catch (err) {
            console.error('Failed to reset password:', err);
        }
    };

    return (
        <div className="flex h-full grow place-items-center">
            <div className="max-w-lg mx-auto mt-8 p-6 bg-ipa-beige rounded-lg shadow flex justify-center h-72 text-newsletter-black">
                <div className='w-full flex flex-col pr-6'>
                    <h2 className="text-2xl font-bold mb-4">Set New Password</h2>
                    <caption className='w-full text-sm text-left'>An admin has initiated a password reset for your account.</caption>
                </div>
                <form onSubmit={handleSubmit} className='w-96'>
                    <div className="mb-4">
                        <label className="block mb-2">New Password</label>
                        <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="w-full p-2 border rounded"
                            required
                            minLength={8}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2">Confirm Password</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full p-2 border rounded"
                            required
                            minLength={8}
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-hops-green text-white p-2 rounded hover:bg-pale-ale-green"
                    >
                        {isLoading ? 'Resetting...' : 'Reset Password'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ResetPasswordPage