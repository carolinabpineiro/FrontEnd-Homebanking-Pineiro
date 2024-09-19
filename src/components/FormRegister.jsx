import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../redux/store'; // Importamos los hooks
import { register } from '../redux/actions/authActions'; // Importamos la acción de registro

const FormRegister = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { status, error } = useAppSelector((state) => state.auth);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const result = await dispatch(register({ firstName, lastName, email, password }));
      if (result.type === 'auth/register/fulfilled') {
        navigate('/accounts'); // Redirigir al usuario después del registro
      }
    } catch (err) {
      console.log('Error during registration', err);
    }
  };

  const handleLogin = () => {
    navigate('/'); // Redirigir al login
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-green-700 opacity-90 p-24 rounded-lg shadow-lg w-1/2">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <img src="/logo.png" alt="Logo" className="w-24 mb-2" />
          <h1 className="font-bold text-white">BANKING 55</h1>
        </div>

        {/* Formulario de registro */}
        <form onSubmit={handleRegister}>
          <div className="mb-6">
            <label htmlFor="firstName" className="block text-gray-200 text-sm font-bold mb-2">First Name</label>
            <input
              type="text"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ingresa tu nombre"
              required
            />
          </div>

          {/* Campo de Last Name */}
          <div className="mb-6">
            <label htmlFor="lastName" className="block text-gray-200 text-sm font-bold mb-2">Last Name</label>
            <input
              type="text"
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ingresa tu apellido"
              required
            />
          </div>

          {/* Campo de E-mail */}
          <div className="mb-6">
            <label htmlFor="email" className="block text-gray-200 text-sm font-bold mb-2">E-mail</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ingresa tu email"
              required
            />
          </div>

          {/* Campo de Password */}
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-200 text-sm font-bold mb-2">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ingresa tu contraseña"
              required
            />
          </div>

          {/* Mensaje de error */}
          {status === 'failed' && <p className="text-red-500 text-sm">{error}</p>}

          {/* Botón de Register */}
          <div>
            <button
              type="submit"
              className="w-full bg-green-500 text-white p-3 rounded-lg font-semibold hover:bg-green-600 transition duration-300"
              disabled={status === 'loading'} // Deshabilitar si está cargando
            >
              {status === 'loading' ? 'Registrando...' : 'Register'}
            </button>
          </div>
        </form>

        {/* Enlace de Login */}
        <div className="mt-6 text-center">
          <p className="text-gray-200">
            ¿Ya tienes cuenta?
            <span className="text-blue-400 cursor-pointer hover:underline ml-2" onClick={handleLogin}>
              Login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default FormRegister;