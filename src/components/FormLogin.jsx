import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { login } from '../redux/actions/authActions';
import { toast, ToastContainer } from 'react-toastify';  
import 'react-toastify/dist/ReactToastify.css';  

const FormLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // Captura de errores específicos de cada campo
  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { status, error } = useAppSelector((state) => state.auth);

  const handleLogin = async (e) => {
    e.preventDefault();
    localStorage.removeItem('cards');

    // Reseteamos los errores
    setErrors({ email: '', password: '' });

    try {
      const result = await dispatch(login({ email, password }));

      if (result.type === 'auth/login/fulfilled') {
        navigate('/accounts');
      } else {
        // Capturamos y manejamos los errores del backend
        const backendError = result.payload;

        // Manejo de errores específicos según la respuesta del backend
        if (backendError) {
          if (backendError.includes('The Email field must not be empty')) {
            setErrors((prev) => ({ ...prev, email: 'Email field must not be empty' }));
          }
          if (backendError.includes('The Password field must not be empty')) {
            setErrors((prev) => ({ ...prev, password: 'Password field must not be empty' }));
          }
          if (backendError.includes('Sorry, email or password invalid')) {
            toast.error('Sorry, email or password invalid');
          }
        }
      }
    } catch (err) {
      console.log('Error during login', err);
      toast.error('An unexpected error occurred. Please try again later.');
    }
  };

  const handleRegister = () => {
    navigate('/register');
  };

  return (
    <div className="flex justify-center items-center h-screen p-4">
      <div className="bg-green-700 opacity-95 p-6 md:p-12 rounded-lg shadow-lg w-full md:w-1/2">
        <div className="flex flex-col items-center mb-8">
          <img src="/logo.png" alt="Logo" className="w-24 mb-2" />
          <h1 className="text-2xl md:text-4xl font-extrabold text-white">BANKING 55</h1>
        </div>
        <form onSubmit={handleLogin}>
          <div className="mb-6">
            <label htmlFor="email" className="block text-gray-200 text-sm font-bold mb-2">E-mail</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
            />
            {/* Mostrar error de email */}
            {errors.email && <p className="font-bold text-lg text-red-700">{errors.email}</p>}
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-200 text-sm font-bold mb-2">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
            />
            {/* Mostrar error de password */}
            {errors.password && <p className="font-bold text-lg text-red-700">{errors.password}</p>}
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-green-500 text-white p-3 rounded-lg font-semibold hover:bg-green-600 transition duration-300"
              disabled={status === 'loading'}
            >
              {status === 'loading' ? 'Logging in...' : 'Login'}
            </button>
          </div>
        </form>
        <div className="mt-6 text-center">
          <p className="text-gray-200">
            Don't have an account?
            <span className="text-blue-400 cursor-pointer hover:underline ml-2" onClick={handleRegister}>
              Register
            </span>
          </p>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
};

export default FormLogin;
