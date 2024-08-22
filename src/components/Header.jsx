import React from 'react';

function Header({ children }) {
  return (
    <header className="bg-green-800 text-white p-1">
      {children}
    </header>
  );
}

export default Header;
