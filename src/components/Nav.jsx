import React from 'react';
import { Link } from 'react-router-dom';

function Nav() {
  return (
    <nav className="flex items-center justify-around p-4 bg-green-900 text-white w-full">
      {/* Menú de Navegación */}
      <div className="flex flex-col md:flex-row items-center justify-around w-full space-y-2 md:space-y-0">
        {/* Enlaces a la izquierda */}
        <div className="flex space-x-4 item-center w-full md:w-auto">
          <Link to="/accounts" className="border border-green-300 px-3 py-2 rounded hover:bg-green-700 transition whitespace-nowrap w-32 text-center">
            Accounts
          </Link>
          <Link to="/cards" className="border border-green-300 px-3 py-2 rounded hover:bg-green-700 transition whitespace-nowrap w-32 text-center">
            Cards
          </Link>
        </div>

        {/* Logo en el medio */}
        <div className="flex items-center justify-center flex-grow md:w-auto">
          <Link to="/">
            <img src="/logo.png" alt="logo" className="h-32 max-w-full " />
          </Link>
        </div>

        {/* Enlaces a la derecha */}
        <div className="flex space-x-4 items-center w-full md:w-auto">
          <Link to="/loans" className="border border-green-300 px-3 py-2 rounded hover:bg-green-700 transition whitespace-nowrap w-32 text-center">
            Loans
          </Link>
          <Link to="/transactions" className="border border-green-300 px-3 py-2 rounded hover:bg-green-700 transition whitespace-nowrap w-32 text-center">
            Transactions
          </Link>
        </div>
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