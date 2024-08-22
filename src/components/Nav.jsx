import React from 'react';
import { Link } from 'react-router-dom';

function Nav() {
  return (
    <nav className="flex items-center justify-between p-4 bg-green-900 text-white w-full">
      {/* Contenedor del Logo y Texto */}
      <div className="flex items-center space-x-4">
        <Link to="/">
          <img src="/logo.png" alt="logo" className="h-24 w-auto" />
        </Link>
        <span className="text-xl font-bold">BANKING 55</span>
      </div>

      {/* Menú de Navegación */}
      <div className="flex space-x-4 flex-grow justify-center md:justify-end">
        <Link 
          to="/accounts" 
          className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800 transition w-32 text-center"
        >
          Accounts
        </Link>
        <Link 
          to="/cards" 
          className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800 transition w-32 text-center"
        >
          Cards
        </Link>
        <Link 
          to="/loans" 
          className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800 transition w-32 text-center"
        >
          Loans
        </Link>
        <Link 
          to="/transactions" 
          className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800 transition w-32 text-center"
        >
          Transactions
        </Link>
      </div>

      {/* Icono de Logout */}
      <div className="ml-4">
        <Link to="/logout">
          <img src="/public/logout.png" alt="Logout" className="h-12 w-auto" />
        </Link>
      </div>
    </nav>
  );
}

export default Nav;