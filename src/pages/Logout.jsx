import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    // Limpiar el localStorage
    localStorage.clear();

    // Redirigir al login
    navigate('/');
  }, [navigate]);

  return null; // No necesita renderizar nada
}

export default Logout;