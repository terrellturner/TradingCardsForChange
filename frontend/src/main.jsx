import React from "react";
import { StrictMode } from 'react'
import { createRoot, } from 'react-dom/client'
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from 'react-router-dom'
import {Provider} from 'react-redux';
import store from './store';
import App from './App.jsx'
import './index.css'
import HomePage from './pages/HomePage.jsx'
import ProductPage from './pages/ProductPage.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index={true} path='/' element={<HomePage />}>
      </Route>
      <Route path='/product/:id' element={<ProductPage />}>
      </Route>
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  </StrictMode>,
)
