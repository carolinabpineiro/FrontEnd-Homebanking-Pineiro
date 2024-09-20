import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Login from './pages/Login'; // Página que utiliza FormLogin
import Register from './pages/Register'; // Página que utiliza FormRegister
import Accounts from './pages/Accounts';
import Account from './pages/Account';
import Cards from './pages/Cards';
import ApplyCard from './pages/ApplyCard';
import Loans from './pages/Loans';
import Transactions from './pages/Transactions';
import { ToastContainer } from 'react-toastify'; // Importamos ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Importamos los estilos de Toastify

function App() {
  return (
    <Router>
      <ToastContainer /> {/* Añadimos el contenedor de Toastify */}
      <Routes>
        {/* Rutas públicas */}
        <Route path="/" element={<Login />} />
        <Route path="register" element={<Register />} />
        
        {/* Rutas protegidas con MainLayout */}
        <Route path="/" element={<MainLayout />}>
          <Route path="accounts" element={<Accounts />} />
          <Route path="account/:id" element={<Account />} />
          <Route path="cards" element={<Cards />} />
          <Route path="/apply-card" element={<ApplyCard />} />
          <Route path="loans" element={<Loans />} />
          <Route path="transactions" element={<Transactions />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;