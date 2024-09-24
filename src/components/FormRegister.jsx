import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../redux/store'; 
import { register } from '../redux/actions/authActions';
import { toast, ToastContainer } from 'react-toastify'; // Importa Toastify
import 'react-toastify/dist/ReactToastify.css'; // Importa los estilos de Toastify

const FormRegister = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [fieldErrors, setFieldErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { status } = useAppSelector((state) => state.auth);

  const handleRegister = async (e) => {
    e.preventDefault();

    setFieldErrors({
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    });

    const result = await dispatch(register({ firstName, lastName, email, password }));

    if (register.fulfilled.match(result)) {
      toast.success('Registration successful!'); // Toast de éxito
      navigate('/'); 
    } else {
      const backendError = result.payload;

      if (backendError.includes('Name field')) {
        setFieldErrors((prev) => ({ ...prev, firstName: backendError }));
      }
      if (backendError.includes('Last Name field')) {
        setFieldErrors((prev) => ({ ...prev, lastName: backendError }));
      }
      if (backendError.includes('Email field') || backendError.includes('already registered')) {
        setFieldErrors((prev) => ({ ...prev, email: backendError }));
      }
      if (backendError.includes('Password field')) {
        setFieldErrors((prev) => ({ ...prev, password: backendError }));
      }
    }
  };

  const handleLogin = () => {
    navigate('/');
  };

  return (
    <div className="flex justify-center items-center h-screen p-4">
      <div className="bg-green-700 opacity-95 p-6 md:p-12 rounded-lg shadow-lg w-full md:w-1/2">
        <div className="flex flex-col items-center mb-8">
          <img src="/logo.png" alt="Logo" className="w-24 mb-2" />
          <h1 className="text-2xl md:text-4xl font-extrabold text-white">BANKING 55</h1>
        </div>

        <form onSubmit={handleRegister}>
          <div className="mb-6">
            <label htmlFor="firstName" className="block text-gray-200 text-sm font-bold mb-2">First Name</label>
            <input
              type="text"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className={`w-full p-3 border rounded-lg focus:outline-none ${fieldErrors.firstName ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Enter your first name"
            />
            {fieldErrors.firstName && <p className="font-bold">{fieldErrors.firstName}</p>}
          </div>

          <div className="mb-6">
            <label htmlFor="lastName" className="block text-gray-200 text-sm font-bold mb-2">Last Name</label>
            <input
              type="text"
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className={`w-full p-3 border rounded-lg focus:outline-none ${fieldErrors.lastName ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Enter your last name"
            />
            {fieldErrors.lastName && <p className="font-bold">{fieldErrors.lastName}</p>}
          </div>

          <div className="mb-6">
            <label htmlFor="email" className="block text-gray-200 text-sm font-bold mb-2">E-mail</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full p-3 border rounded-lg focus:outline-none ${fieldErrors.email ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Enter your email"
            />
            {fieldErrors.email && <p className="font-bold">{fieldErrors.email}</p>}
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-200 text-sm font-bold mb-2">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full p-3 border rounded-lg focus:outline-none ${fieldErrors.password ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Enter your password"
            />
            {fieldErrors.password && <p className="font-bold">{fieldErrors.password}</p>}
          </div>

          <div>
            <button
              type="submit"
              className="w-full bg-green-500 text-white p-3 rounded-lg font-semibold hover:bg-green-600 transition duration-300"
              disabled={status === 'loading'}
            >
              {status === 'loading' ? 'Registering...' : 'Register'}
            </button>
          </div>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-200">
            Already have an account?
            <span className="text-blue-400 cursor-pointer hover:underline ml-2" onClick={handleLogin}>
              Login
            </span>
          </p>
        </div>
        <ToastContainer /> {/* Coloca el ToastContainer al final */}
      </div>
    </div>
  );
};

export default FormRegister;
