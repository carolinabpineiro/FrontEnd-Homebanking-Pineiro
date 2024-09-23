import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../redux/store'; 
import { register } from '../redux/actions/authActions';
import { toast } from 'react-toastify';

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
        toast.success('Account created successfully! You will be redirected to login.', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });

        setTimeout(() => {
          navigate('/'); 
        }, 3000);
      }
    } catch (err) {
      console.log('Error during registration', err);
    }
  };

  const handleLogin = () => {
    navigate('/');
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-green-700 opacity-95 p-24 rounded-lg shadow-lg w-1/2">
        <div className="flex flex-col items-center mb-8">
          <img src="/logo.png" alt="Logo" className="w-24 mb-2" />
          <h1 className="font-bold text-white">BANKING 55</h1>
        </div>

        <form onSubmit={handleRegister}>
          <div className="mb-6">
            <label htmlFor="firstName" className="block text-gray-200 text-sm font-bold mb-2">First Name</label>
            <input
              type="text"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your first name"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="lastName" className="block text-gray-200 text-sm font-bold mb-2">Last Name</label>
            <input
              type="text"
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your last name"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="email" className="block text-gray-200 text-sm font-bold mb-2">E-mail</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              required
            />
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
              required
            />
          </div>

          {status === 'failed' && <p className="text-red-700 text-lg font-semibold">{error}</p>} {/* Cambios aquí */}

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
      </div>
    </div>
  );
};

export default FormRegister;
