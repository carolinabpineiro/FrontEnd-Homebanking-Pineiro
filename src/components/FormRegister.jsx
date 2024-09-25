import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../redux/store'; 
import { register } from '../redux/actions/authActions';
import { toast, ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';

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

  useEffect(() => {
    // Solo mostrar la tostada y redirigir si el estado es "fulfilled"
    if (status === 'fulfilled') {
      toast.success('Registration successful!');

      setTimeout(() => {
        navigate('/login'); // Redirige al login después de 2 segundos
      }, 2000);
    }
  }, [status, navigate]);

  const handleRegister = async (e) => {
    e.preventDefault();

    // Limpiar errores previos
    setFieldErrors({
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    });

    if (status === 'loading') return;

    const result = await dispatch(register({ firstName, lastName, email, password }));

    if (register.fulfilled.match(result)) {
      // No es necesario hacer nada aquí, ya que useEffect manejará el toast y la redirección.
    } else {
      const backendError = result.payload;
      
      // Manejar errores específicos de campos
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

  return (
    <div className="flex justify-center items-center h-screen p-4">
      <div className="bg-green-700 opacity-95 p-6 md:p-12 rounded-lg shadow-lg w-full md:w-1/2">
        <div className="flex flex-col items-center mb-8">
          <img src="/logo.png" alt="Logo" className="w-24 mb-2" />
          <h1 className="text-2xl md:text-4xl font-extrabold text-white">BANKING 55</h1>
        </div>

        <form onSubmit={handleRegister}>
          {/* Formulario igual que antes */}
          {/* Mostrar mensajes de error en los campos */}
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-200">
            Already have an account?
            <span className="text-blue-400 cursor-pointer hover:underline ml-2" onClick={() => navigate('/login')}>
              Login
            </span>
          </p>
        </div>
        <ToastContainer /> 
      </div>
    </div>
  );
};

export default FormRegister;

