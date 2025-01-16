import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
import Footer from './components/Footer';
import './App.css';
import { AnimatePresence } from 'motion/react';

const App = () => {
    const location = useLocation();
    return (
        <div className="flex min-h-dvh flex-col justify-between">
            <Header />
            <main
                id="main"
                className="flex grow flex-col bg-newsletter-black"
            >
                <AnimatePresence mode="wait" initial={false}>
                    <Outlet key={location.pathname} />
                </AnimatePresence>
            </main>
            <Footer />
            <ToastContainer />
        </div>
    );
};

export default App;
