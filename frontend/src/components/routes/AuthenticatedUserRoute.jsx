import React from 'react'
import { Navigate, useLocation, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux'

const ResetPasswordRoute = () => {

    const { userInfo } = useSelector((state) => state.auth);
    const loc = useLocation();

    // If user is not logged in, redirect to login
    if (!userInfo) {
        return <Navigate to="/login" state={{ from: loc }} replace />;
    }

    // If user needs password reset and isn't already on the reset page,
    // redirect to reset page
    if (userInfo.requiresPasswordReset &&
        loc.pathname !== '/reset-password') {
        return <Navigate to="/reset-password" replace />;
    }

    // If user doesn't need password reset but is on the reset page,
    // redirect to home
    if (!userInfo.requiresPasswordReset &&
        loc.pathname === '/reset-password') {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
}

export default ResetPasswordRoute