import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../redux/store'; // Importamos los hooks
import { login } from '../redux/actions/authActions'; // Importamos la acción de login

const FormLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  
  const { isAuthenticated, status, error } = useAppSelector((state) => state.auth); // Seleccionamos el estado de auth

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const result = await dispatch(login({ email, password }));
      if (result.type === 'auth/login/fulfilled') {
        navigate('/accounts');  // Si el login es exitoso, redirigimos a la vista de cuentas
      }
    } catch (err) {
      console.log('Error during login', err);
    }
  };

  const handleRegister = () => {
    navigate('/register');
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-green-700 opacity-90 p-24 rounded-lg shadow-lg w-1/2">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <img src="/logo.png" alt="Logo" className="w-24 mb-2" />
          <h1 className="font-bold text-white">BANKING 55</h1>
        </div>

        {/* Formulario de inicio de sesión */}
        <form onSubmit={handleLogin}>
          <div className="mb-6">
            <label htmlFor="email" className="block text-gray-200 text-sm font-bold mb-2">E-mail</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}  // Actualizamos el estado local
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ingresa tu email"
              required
            />
          </div>

          {/* Campo de Contraseña */}
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-200 text-sm font-bold mb-2">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}  // Actualizamos el estado local
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ingresa tu contraseña"
              required
            />
          </div>

          {/* Mensaje de error */}
          {status === 'failed' && <p className="text-red-500 text-sm">{error}</p>}

          {/* Botón de Iniciar Sesión */}
          <div>
            <button
              type="submit"
              className="w-full bg-green-500 text-white p-3 rounded-lg font-semibold hover:bg-green-600 transition duration-300"
              disabled={status === 'loading'} // Deshabilitar si está cargando
            >
              {status === 'loading' ? 'Iniciando sesión...' : 'Login'}
            </button>
          </div>
        </form>

        {/* Enlace de Registro */}
        <div className="mt-6 text-center">
          <p className="text-gray-200">
            ¿No tienes cuenta?
            <span className="text-blue-400 cursor-pointer hover:underline ml-2" onClick={handleRegister}>
              Register
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default FormLogin;