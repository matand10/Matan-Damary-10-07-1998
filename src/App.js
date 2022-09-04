import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { routes } from './routes';


import { Header } from './cmps/Header/Header';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const App = () => {
  return (
    <>
      <Header />
      <Routes>
        {routes.map(route => <Route key={route.path} exact element={<route.component />} path={route.path} />)}
      </Routes>
      <ToastContainer />
    </>
  );
}

