import React from 'react';
import { useNavigate } from 'react-router-dom'; // Si usas React Router para la navegación

const FormRegister = () => {
  const navigate = useNavigate(); // Hook para la navegación

  const handleRegister = (e) => {
    e.preventDefault();
    navigate('/accounts');
  };

  const handleLogin = () => {
    // Redirige a la página de Login
    navigate('/');
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-green-300 p-24 rounded-lg shadow-lg w-full">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
    <img
      src="/logo.png"
      alt="Logo"
      className="w-24 mb-2"
    />
    <h1 className="font-bold">BANKING 55</h1>
  </div>
        {/* Formulario de registro */}
        <form onSubmit={handleRegister}>
         
          <div className="mb-6">
            <label
              htmlFor="firstName"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ingresa tu nombre"
              required
            />
          </div>

          {/* Campo de Last Name */}
          <div className="mb-6">
            <label
              htmlFor="lastName"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ingresa tu apellido"
              required
            />
          </div>

          {/* Campo de E-mail */}
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              E-mail
            </label>
            <input
              type="email"
              id="email"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ingresa tu email"
              required
            />
          </div>

          {/* Campo de Password */}
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ingresa tu contraseña"
              required
            />
          </div>

          {/* Botón de Register */}
          <div>
            <button
              type="submit"
              className="w-full bg-green-500 text-white p-3 rounded-lg font-semibold hover:bg-green-600 transition duration-300"
            >
              Register
            </button>
          </div>
        </form>

        {/* Enlace de Login */}
        <div className="mt-6 text-center">
          <p className="text-gray-700">¿Ya tienes cuenta? 
            <span 
              className="text-blue-500 cursor-pointer hover:underline ml-2"
              onClick={handleLogin}
            >
              Login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default FormRegister;