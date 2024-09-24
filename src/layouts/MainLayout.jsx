import React from 'react';
import Nav from '../components/Nav';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify'; // Importa el ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Importa los estilos de Toastify

function MainLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header>
        <Nav />
      </Header>
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
      <ToastContainer /> {/* Añade el ToastContainer aquí */}
    </div>
  );
}

export default MainLayout;