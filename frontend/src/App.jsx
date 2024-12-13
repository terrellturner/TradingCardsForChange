import React from 'react';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
import Footer from './components/Footer';
import './App.css';

const App = () => {
    return (
        <div className="flex min-h-dvh flex-col">
            <Header />
            <main
                id="main"
                className="flex h-full grow flex-col bg-newsletter-black"
            >
                <Outlet />
            </main>
            <Footer />
            <ToastContainer />
        </div>
    );
};

export default App;
