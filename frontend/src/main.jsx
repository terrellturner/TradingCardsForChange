import React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import App from './App.jsx';
import './index.css';
import HomePage from './pages/HomePage.jsx';
import ProductPage from './pages/ProductPage.jsx';
import CartPage from './pages/CartPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import RegistrationPage from './pages/RegistrationPage.jsx';
import CheckoutPage from './pages/CheckoutPage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import OrderPage from './pages/OrderPage.jsx';
import AdminRoute from "./components/AdminRoute.jsx";
import UsersPage from './pages/admin/UsersPage.jsx';
import UserDetailPage from './pages/admin/UserDetailPage.jsx';
import ProductsPage from './pages/admin/ProductsPage.jsx';
import ProductDetailPage from './pages/admin/ProductDetailPage.jsx';
import OrdersPage from './pages/admin/OrdersPage.jsx';


const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<App />}>
            <Route index={true} path="/" element={<HomePage />}></Route>
            <Route path="/product/:id" element={<ProductPage />}></Route>
            <Route path="/cart" element={<CartPage />}></Route>
            <Route path="/login" element={<LoginPage />}></Route>
            <Route path="/about" element={<AboutPage />}></Route>
            <Route path="/register" element={<RegistrationPage />}></Route>
            <Route path="/checkout/" element={<CheckoutPage />}></Route>
            <Route path="/order/:id" element={<OrderPage />} />

            <Route path="" element={<AdminRoute />}>
                <Route path="/admin/products" element={<ProductsPage />} />
                <Route
                    path="/admin/products/:pageNumber"
                    element={<ProductsPage />}
                />
                <Route path="/admin/product/:id/edit" element={<ProductDetailPage />} />
                <Route path="/admin/users" element={<UsersPage />} />
                <Route path="/admin/user/:id/edit" element={<UserDetailPage />} />
                <Route path="/admin/orders" element={<OrdersPage />} />
            </Route>
        </Route>
    )
);

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Provider store={store}>
            <PayPalScriptProvider deferLoading={true}>
                <RouterProvider router={router} />
            </PayPalScriptProvider>
        </Provider>
    </StrictMode>
);
