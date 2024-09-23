import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Nav() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="flex items-center justify-between p-4 bg-green-900 text-white w-full flex-wrap">
      {/* Contenedor del Logo y Texto */}
      <div className="flex items-center space-x-4">
        <Link to="/">
          <img src="/logo.png" alt="logo" className="h-24 w-auto" />
        </Link>
        <span className="text-2xl font-extrabold md:text-3xl">BANKING 55</span>
      </div>

      {/* Botón del Menú Hamburguesa */}
      <div className="md:hidden">
        <button onClick={toggleMenu} className="focus:outline-none">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </div>

      {/* Menú de Navegación */}
      <div className={`flex-grow md:flex ${isOpen ? 'flex' : 'hidden'} md:justify-end flex-col md:flex-row`}>
        <Link 
          to="/accounts" 
          className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800 transition w-full md:w-32 md:mr-4 mb-2 md:mb-0"
        >
          Accounts
        </Link>
        <Link 
          to="/cards" 
          className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800 transition w-full md:w-32 md:mr-4 mb-2 md:mb-0"
        >
          Cards
        </Link>
        <Link 
          to="/loans" 
          className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800 transition w-full md:w-32 md:mr-4 mb-2 md:mb-0"
        >
          Loans
        </Link>
        <Link 
          to="/transactions" 
          className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800 transition w-full md:w-32"
        >
          Transactions
        </Link>
      </div>

      {/* Icono de Logout */}
      <div className="ml-4">
        <Link to="/logout">
          <img src="/public/logout.png" alt="Logout" className="h-12 w-auto cursor-pointer" />
        </Link>
      </div>
    </nav>
  );
}

export default Nav;
